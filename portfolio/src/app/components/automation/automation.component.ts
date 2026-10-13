import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { onFirstView } from '../../utils/in-view';

interface AutomationCase {
  title: string;
  problem: string;
  solution: string;
  result: string;
  stack: string[];
}

@Component({
  selector: 'app-automation',
  imports: [],
  templateUrl: './automation.component.html',
  styleUrl: './automation.component.scss'
})
export class AutomationComponent implements AfterViewInit, OnDestroy {
  @ViewChild('automationSection') automationSection!: ElementRef<HTMLElement>;
  isVisible = false;
  private stopObserving = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  // The flow shown at the top of the section: the real chain maintained in production.
  flow = ['Octadesk', 'Coda', 'ZapSign', 'ADVBOX'];

  // Source of truth: the CV (public/JAMESON_HENRIQUE_CV.pdf). Keep both in sync.
  cases: AutomationCase[] = [
    {
      title: 'Auditoria diária de protocolos judiciais',
      problem: 'A Controladoria não tinha como saber quais petições concluídas ainda não tinham sido protocoladas.',
      solution: 'Criei uma auditoria que roda todo dia, confere de 30 a 40 petições concluídas e aponta as que estão sem protocolo.',
      result: 'A Controladoria passou a acompanhar todos os protocolos diariamente e a encaminhar as pendências aos responsáveis.',
      stack: []
    },
    {
      title: 'Fluxo de assinatura de contrato',
      problem: 'Falhas deixavam clientes sem cadastro no sistema jurídico, perdiam anexos enviados pelo WhatsApp e deixavam passar CPF inválido.',
      solution: 'Depurei o fluxo no nível do payload e corrigi as falhas entre Octadesk, Coda, ZapSign e ADVBOX.',
      result: 'Acabaram os cerca de 5 retrabalhos manuais por semana em que a equipe recriava cliente e processo à mão.',
      stack: ['Make', 'Octadesk', 'ZapSign', 'ADVBOX', 'Webhooks']
    },
    {
      title: 'Auditoria de segurança das automações',
      problem: 'As automações em produção nunca tinham passado por uma revisão de segurança e qualidade.',
      solution: 'Auditei os cenários e encontrei credenciais expostas, risco de ações duplicadas (cadastro e mensagem ao cliente em dobro) e falhas de paginação.',
      result: 'Tudo virou um backlog de correção priorizado por risco.',
      stack: ['Make', 'APIs REST', 'Idempotência', 'Paginação']
    },
    {
      title: 'Migração do Make para o n8n',
      problem: 'O departamento precisava decidir se valia migrar para o n8n self-hosted, sem dados de uso reais.',
      solution: 'Medi o uso real das duas contas do grupo (≈7.300 execuções/mês), recomendei a arquitetura e escrevi ferramentas em Python que auditam os cenários e os convertem para o n8n.',
      result: 'A migração entrou no planejamento do departamento.',
      stack: ['n8n', 'Make', 'Python']
    },
    {
      title: 'IA na triagem de documentos judiciais',
      problem: 'Os planos de ação jurídicos gerados por IA tinham dados inconsistentes e apresentação fraca.',
      solution: 'Reescrevi as instruções que geram o plano em cinco áreas (concurso público, servidor público, saúde, improbidade e geral), com saída estruturada.',
      result: 'Melhor qualidade dos dados e da apresentação do documento entregue.',
      stack: ['Gemini API', 'Engenharia de prompt']
    }
  ];

  ngAfterViewInit() {
    this.stopObserving = onFirstView(this.automationSection.nativeElement, this.cdr, () => (this.isVisible = true));
  }

  ngOnDestroy() {
    this.stopObserving();
  }
}
