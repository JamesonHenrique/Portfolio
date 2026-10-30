#!/usr/bin/env python3
"""Gerador do CV principal do portfólio (1 página, A4).

Layout reproduzido do CV que estava no ar até 27/10 (Carlito, nome em navy com régua azul,
seções em caixa alta com régua cinza, bullets com destaque em negrito) — o dono preferiu este
formato ao do gerador de candidaturas (bot/gerar_cv.py), que é mais enxuto.

Uso:
    python3 tools/gerar-cv-portfolio.py [-o portfolio/public/JAMESON_HENRIQUE_CV.pdf]

Texto: tools/cv-portfolio.md (markup mínimo):
    #  nome            @  tagline            >  contato
    ## seção           ### título de vaga/projeto
    -  bullet          _  contexto em cinza itálico
    ^  stack da vaga em cinza itálico        *  linha "Rótulo: valor"
    **negrito** inline
"""
import argparse
import os
import re
import sys

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate

BASE = os.path.dirname(os.path.abspath(__file__))
FONTE_DIR = "/usr/share/fonts/truetype/crosextra"
NAVY = colors.HexColor("#1F3864")
AZUL = colors.HexColor("#2F5597")
GRAFITE = colors.HexColor("#1F1F1F")
CINZA = colors.HexColor("#595959")
LINHA = colors.HexColor("#BFBFBF")

MARGEM_L = 15 * mm
MARGEM_R = 15 * mm
MARGEM_T = 11 * mm
MARGEM_B = 10 * mm


def registrar_fontes():
    """Carlito (métrica do Calibri, a fonte do CV antigo). Sem ela, cai no Helvetica."""
    try:
        for nome, arq in (("Carlito", "Carlito-Regular.ttf"), ("Carlito-Bold", "Carlito-Bold.ttf"),
                          ("Carlito-Italic", "Carlito-Italic.ttf"),
                          ("Carlito-BoldItalic", "Carlito-BoldItalic.ttf")):
            pdfmetrics.registerFont(TTFont(nome, os.path.join(FONTE_DIR, arq)))
        pdfmetrics.registerFontFamily("Carlito", normal="Carlito", bold="Carlito-Bold",
                                      italic="Carlito-Italic", boldItalic="Carlito-BoldItalic")
        return "Carlito"
    except Exception:
        return "Helvetica"


FONTE = registrar_fontes()


def estilos(pt):
    return {
        "nome": ParagraphStyle("nome", fontName=FONTE + "-Bold", fontSize=20, leading=22, textColor=NAVY),
        "tagline": ParagraphStyle("tagline", fontName=FONTE + "-Bold", fontSize=9.6, leading=11.5,
                                  textColor=GRAFITE),
        "contato": ParagraphStyle("contato", fontName=FONTE + "-Bold", fontSize=8.2, leading=12, textColor=CINZA,
                                  spaceAfter=0.6 * mm),
        "secao": ParagraphStyle("secao", fontName=FONTE + "-Bold", fontSize=10.2, leading=11.6, textColor=NAVY,
                                spaceBefore=2.6 * mm),
        "cargo": ParagraphStyle("cargo", fontName=FONTE + "-Bold", fontSize=9.4, leading=11.4, textColor=GRAFITE,
                                spaceBefore=0.9 * mm),
        "sub": ParagraphStyle("sub", fontName=FONTE + "-Italic", fontSize=pt - 0.3, leading=pt + 1.4,
                              textColor=CINZA),
        "corpo": ParagraphStyle("corpo", fontName=FONTE, fontSize=pt, leading=pt + 1.55, textColor=GRAFITE,
                                alignment=TA_LEFT, spaceBefore=0.6 * mm),
        "bullet": ParagraphStyle("bullet", fontName=FONTE, fontSize=pt, leading=pt + 1.55, textColor=GRAFITE,
                                 leftIndent=3.6 * mm, firstLineIndent=-3.6 * mm, bulletIndent=0,
                                 spaceBefore=0.5 * mm),
        "tech": ParagraphStyle("tech", fontName=FONTE + "-Italic", fontSize=pt - 0.3, leading=pt + 1.4,
                               textColor=CINZA, spaceBefore=0.4 * mm, spaceAfter=1.2 * mm),
    }


def markup(t):
    """`**texto**` vira <b>; o resto é escapado para o ReportLab."""
    t = t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    return re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", t)


def ler(caminho):
    out = []
    for bruta in open(caminho, encoding="utf-8"):
        l = bruta.rstrip("\n")
        if l.strip() and not l.lstrip().startswith("<!--"):
            out.append(l)
    return out


def montar(linhas, pt):
    st = estilos(pt)
    flow = []
    for l in linhas:
        if l.startswith("# "):
            flow.append(Paragraph(markup(l[2:]), st["nome"]))
            flow.append(HRFlowable(width="100%", thickness=0.9, color=AZUL, spaceBefore=0.4 * mm,
                                   spaceAfter=1.6 * mm))
        elif l.startswith("@ "):
            flow.append(Paragraph(markup(l[2:]), st["tagline"]))
        elif l.startswith("> "):
            flow.append(Paragraph(markup(l[2:]), st["contato"]))
        elif l.startswith("## "):
            flow.append(Paragraph(markup(l[3:].upper()), st["secao"]))
            flow.append(HRFlowable(width="100%", thickness=0.5, color=LINHA, spaceBefore=0.1 * mm,
                                   spaceAfter=0.6 * mm))
        elif l.startswith("### "):
            flow.append(Paragraph(markup(l[4:]), st["cargo"]))
        elif l.startswith("_ "):
            flow.append(Paragraph(markup(l[2:]), st["sub"]))
        elif l.startswith("^ "):
            flow.append(Paragraph(markup(l[2:]), st["tech"]))
        elif l.startswith("- "):
            flow.append(Paragraph(markup(l[2:]), st["bullet"], bulletText="•"))
        elif l.startswith("* "):     # "Rótulo: valor" — sem marcador, como no CV antigo
            flow.append(Paragraph(markup(l[2:]), st["corpo"]))
        else:
            flow.append(Paragraph(markup(l), st["corpo"]))
    return flow


def construir(md, saida, pt):
    doc = SimpleDocTemplate(saida, pagesize=A4, leftMargin=MARGEM_L, rightMargin=MARGEM_R,
                            topMargin=MARGEM_T, bottomMargin=MARGEM_B,
                            title="Jameson Henrique Cruz Sabino — Currículo",
                            author="Jameson Henrique Cruz Sabino",
                            subject="Desenvolvedor de Software Júnior — Java, Spring Boot e Angular")
    doc.build(montar(ler(md), pt))


def paginas(pdf):
    try:
        from pypdf import PdfReader
        return len(PdfReader(pdf).pages)
    except Exception:
        import subprocess
        saida = subprocess.run(["pdfinfo", pdf], capture_output=True, text=True).stdout
        m = re.search(r"Pages:\s+(\d+)", saida)
        return int(m.group(1)) if m else 0


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("-o", "--saida", default=os.path.join(BASE, "..", "portfolio", "public",
                                                          "JAMESON_HENRIQUE_CV.pdf"))
    ap.add_argument("--md", default=os.path.join(BASE, "cv-portfolio.md"))
    a = ap.parse_args()
    inicial = float(os.environ.get("CV_FONTE_PT") or 8.6)
    for pt in [inicial - 0.15 * i for i in range(7)]:
        construir(a.md, a.saida, round(pt, 2))
        n = paginas(a.saida)
        if n == 1:
            print("gerado %s — 1 página, corpo %.2fpt" % (a.saida, pt))
            break
    else:
        print("ERRO: não caiu para 1 página nem em 7.7pt — corte texto", file=sys.stderr)
        sys.exit(1)
