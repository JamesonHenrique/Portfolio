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
      problem: 'Era preciso conhecer os riscos de segurança e qualidade das automações que já rodavam em produção.',
      solution: 'Auditei os cenários e encontrei credenciais expostas, risco de ações duplicadas (cadastro e mensagem ao cliente em dobro) e falhas de paginação.',
      result: 'Consolidei tudo num backlog de correção priorizado.',
      stack: ['Make', 'APIs REST', 'Idempotência', 'Paginação']
    },
    {
      title: 'Migração do Make para o n8n',
      problem: 'O departamento avaliava migrar as automações do Make para o n8n self-hosted.',
      solution: 'Conduzi o estudo de viabilidade: medi o uso real das duas contas do grupo (≈7.300 execuções/mês), recomendei a arquitetura e desenvolvi ferramentas em Python que auditam as automações e as convertem para o n8n.',
      result: 'A migração entrou no planejamento do departamento.',
      stack: ['n8n', 'Make', 'Python']
    },
    {
      title: 'IA na triagem de documentos judiciais',
      problem: 'O plano de ação jurídico gerado com IA (Gemini) precisava de dados melhores e de uma apresentação melhor.',
      solution: 'Reescrevi as instruções que geram o plano em cinco áreas: concurso público, servidor público, saúde, improbidade e geral.',
      result: 'Melhorou a qualidade dos dados e a apresentação do documento.',
      stack: ['Gemini API']
    }
  ];

  ngAfterViewInit() {
    this.stopObserving = onFirstView(this.automationSection.nativeElement, this.cdr, () => (this.isVisible = true));
  }

  ngOnDestroy() {
    this.stopObserving();
  }
}
