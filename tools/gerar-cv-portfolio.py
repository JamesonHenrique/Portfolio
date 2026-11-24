#!/usr/bin/env python3
"""Generate the one-page A4 portfolio résumé from tools/cv-portfolio.md.

    # name          @ tagline           > contact
    ## section      ### heading (optional date after |)
    - bullet        _ context           ^ project stack
    * detail line   <!-- pagebreak -->  explicit page break

Inline **bold**, backticks, and contact and project links are supported.
"""
import argparse
import os
from pathlib import Path
import re
import sys

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import HRFlowable, PageBreak, Paragraph, SimpleDocTemplate, Table

BASE = os.path.dirname(os.path.abspath(__file__))
FONTE_DIR = "/usr/share/fonts/truetype/crosextra"
NAVY = colors.HexColor("#1F3864")
AZUL = colors.HexColor("#2F5597")
GRAFITE = colors.HexColor("#1F1F1F")
CINZA = colors.HexColor("#595959")
LINHA = colors.HexColor("#BFBFBF")

FRAME_PADDING = 6
MARGEM_L = 12 * mm - FRAME_PADDING
MARGEM_R = MARGEM_L
MARGEM_T = 12 * mm - FRAME_PADDING
MARGEM_B = 12 * mm - FRAME_PADDING


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
        "nome": ParagraphStyle("nome", fontName=FONTE + "-Bold", fontSize=17, leading=18, textColor=NAVY),
        "tagline": ParagraphStyle("tagline", fontName=FONTE + "-Bold", fontSize=9.0, leading=9.8,
                                  textColor=GRAFITE),
        "contato": ParagraphStyle("contato", fontName=FONTE + "-Bold", fontSize=8.3, leading=9.1, textColor=CINZA,
                                  spaceAfter=0.15 * mm),
        "secao": ParagraphStyle("secao", fontName=FONTE + "-Bold", fontSize=9.5, leading=10.2, textColor=NAVY,
                                spaceBefore=1.7 * mm, keepWithNext=True),
        "cargo": ParagraphStyle("cargo", fontName=FONTE + "-Bold", fontSize=9.0, leading=9.7, textColor=GRAFITE,
                                spaceBefore=0.95 * mm, keepWithNext=True),
        "date": ParagraphStyle("date", fontName=FONTE + "-Bold", fontSize=8.2, leading=9.0,
                               alignment=TA_RIGHT, textColor=CINZA),
        "sub": ParagraphStyle("sub", fontName=FONTE + "-Italic", fontSize=pt - 0.3, leading=pt + 0.7,
                              textColor=CINZA),
        "corpo": ParagraphStyle("corpo", fontName=FONTE, fontSize=pt, leading=pt + 0.85, textColor=GRAFITE,
                                alignment=TA_LEFT, spaceBefore=0.28 * mm),
        "bullet": ParagraphStyle("bullet", fontName=FONTE, fontSize=pt, leading=pt + 0.85, textColor=GRAFITE,
                                 leftIndent=3.3 * mm, bulletIndent=0,
                                 spaceBefore=0.28 * mm),
        "tech": ParagraphStyle("tech", fontName=FONTE + "-Italic", fontSize=pt - 0.3, leading=pt + 0.7,
                               textColor=CINZA, spaceBefore=0.15 * mm, spaceAfter=0.35 * mm, keepWithNext=True),
    }


LINK_PATTERN = re.compile(
    r"(?P<email>[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})"
    r"|(?P<web>(?:linkedin\.com/in|github\.com)/[\w./-]+)"
    r"|(?P<phone>\(\d{2}\) \d{5}-\d{4})"
)


def link_markup(match):
    label = match.group()
    if match.lastgroup == "email":
        url = f"mailto:{label}"
    elif match.lastgroup == "phone":
        digits = re.sub(r"\D", "", label)
        url = f"tel:+55{digits}"
    else:
        url = f"https://{label}"
    return f'<link href="{url}" color="{AZUL.hexval()}">{label}</link>'


def markup(t):
    """Escape source text before rendering inline styles and known links."""
    t = t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    t = re.sub(r"`([^`]+)`", r"\1", t)
    t = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", t)
    return LINK_PATTERN.sub(link_markup, t)


def ler(caminho):
    return [
        line for line in Path(caminho).read_text(encoding="utf-8").splitlines()
        if line.strip() and (line == "<!-- pagebreak -->" or not line.lstrip().startswith("<!--"))
    ]

def montar(linhas, pt):
    st = estilos(pt)
    flow = []
    for l in linhas:
        if l == "<!-- pagebreak -->":
            flow.append(PageBreak())
        elif l.startswith("# "):
            flow.append(Paragraph(markup(l[2:]), st["nome"]))
            flow.append(HRFlowable(width="100%", thickness=0.9, color=AZUL, spaceBefore=0.4 * mm,
                                   spaceAfter=0.75 * mm))
        elif l.startswith("@ "):
            flow.append(Paragraph(markup(l[2:]), st["tagline"]))
        elif l.startswith("> "):
            flow.append(Paragraph(markup(l[2:]), st["contato"]))
        elif l.startswith("## "):
            flow.append(Paragraph(markup(l[3:].upper()), st["secao"]))
            rule = HRFlowable(width="100%", thickness=0.5, color=LINHA, spaceBefore=0.35 * mm,
                              spaceAfter=0.5 * mm)
            rule.keepWithNext = True
            flow.append(rule)
        elif l.startswith("### "):
            title, separator, date = l[4:].partition(" | ")
            heading = Paragraph(markup(title), st["cargo"])
            if separator:
                date_width = 68 * mm if len(date) > 30 else 36 * mm
                content_width = A4[0] - MARGEM_L - MARGEM_R - 2 * FRAME_PADDING
                row = Table([[heading, Paragraph(markup(date), st["date"])]],
                            colWidths=[content_width - date_width, date_width],
                            spaceBefore=st["cargo"].spaceBefore,
                            style=[("VALIGN", (0, 0), (-1, -1), "TOP"),
                                   ("LEFTPADDING", (0, 0), (-1, -1), 0),
                                   ("RIGHTPADDING", (0, 0), (0, 0), 3 * mm),
                                   ("RIGHTPADDING", (1, 0), (1, 0), 0),
                                   ("TOPPADDING", (0, 0), (-1, -1), 0),
                                   ("BOTTOMPADDING", (0, 0), (-1, -1), 0)])
                row.keepWithNext = True
                flow.append(row)
            else:
                flow.append(heading)
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
                            subject="Desenvolvedor Full Stack — TypeScript, Java, Spring Boot e Angular")
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
    pt = float(os.environ.get("CV_FONTE_PT") or 8.85)
    construir(a.md, a.saida, pt)
    n = paginas(a.saida)
    if n != 1:
        print(f"ERRO: o currículo ocupou {n} página(s). O currículo deve ocupar exatamente uma página A4.",
              file=sys.stderr)
        sys.exit(1)
    print(f"gerado {a.saida} — {n} página A4, corpo {pt:.2f} pt")
