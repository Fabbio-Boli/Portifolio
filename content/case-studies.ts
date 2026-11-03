export type CaseStudy = {
  eyebrow: string;
  overview: string;
  highlights: string[];
  technologies: string[];
  note?: string;
};

export const caseStudies: Record<string, CaseStudy> = {
  "Fabbio-Boli/codex-automation-recommender": {
    eyebrow: "Ferramenta para fluxos de desenvolvimento",
    overview:
      "Plugin independente de terceiros para o OpenAI Codex que lê um repositório e recomenda melhorias de configuração com base em evidências encontradas no próprio projeto.",
    highlights: [
      "Mapeia stack, fluxos e configuração existente a partir de arquivos como manifests, documentação e CI.",
      "Prioriza oportunidades em instruções de projeto, skills, agentes, hooks, MCP, plugins e recursos nativos, sempre com evidência, benefícios e contrapartidas.",
      "É estritamente consultivo: não instala ferramentas, não edita arquivos, não altera configurações e não conecta serviços.",
    ],
    technologies: ["Codex plugin", "Skills", "AGENTS.md", "MCP"],
    note:
      "Projeto comunitário independente, sem afiliação ou endosso da OpenAI. A aplicação de qualquer recomendação exige uma solicitação separada e explícita.",
  },
  "Fabbio-Boli/challenge-toledo": {
    eyebrow: "Projeto acadêmico em equipe · 2023",
    overview:
      "Gêmeo digital de um ambiente de pesagem industrial criado para o Challenge Toledo (Toledo do Brasil — PRIX), conectando um protótipo ESP32 a um ambiente virtual no Unreal Engine.",
    highlights: [
      "A simulação no Unreal Engine 5.1.1 recebe e envia dados ao protótipo por comunicação serial bidirecional.",
      "A arquitetura documentada usa AWS IoT Core, IoT Analytics e QuickSight para telemetria e dashboards.",
      "O repositório inclui o projeto Unreal, o firmware do ESP32, o diagrama de ligações e imagens da arquitetura.",
    ],
    technologies: ["C++", "Unreal Engine", "ESP32", "AWS IoT", "QuickSight"],
    note:
      "Projeto desenvolvido em equipe no 4º ano de Engenharia da Computação na FIAP; esta página descreve o trabalho documentado pelo repositório, não atribuições individuais.",
  },
  "Fabbio-Boli/sdc-eletrolls": {
    eyebrow: "Projeto em equipe · Plataforma ATS",
    overview:
      "Plataforma de recrutamento para o Shopping do Cidadão, com jornadas para candidatos e para a gestão de vagas por Recursos Humanos.",
    highlights: [
      "Inclui autenticação, gestão de vagas, candidaturas, perfis e telas de acompanhamento.",
      "O fluxo de match organiza vagas e candidatos por compatibilidade declarada no projeto.",
      "Também documenta processos seletivos, hackathons e a iniciativa de capacitação Educa Cidadão.",
    ],
    technologies: ["PHP", "MySQL", "JavaScript", "HTML", "CSS", "Bootstrap"],
    note:
      "Projeto em equipe. A descrição resume funcionalidades e tecnologias presentes no repositório e não atribui contribuições específicas a uma pessoa.",
  },
  "Fabbio-Boli/agv-bosch": {
    eyebrow: "Projeto em equipe · Desafio Bosch",
    overview:
      "Jabuti-AGV é um veículo guiado automaticamente para apoio ao transporte e à gestão de estoque em um cenário de armazém.",
    highlights: [
      "O protótipo parte de uma Raspberry Pi Zero W e segue linha com sensor de refletância.",
      "Sensores de chuva e ultrassônico ajustam a operação e ajudam a detectar obstáculos.",
      "RFID identifica cargas e posições; o repositório descreve registro em SQLite e comunicação por MQTT.",
    ],
    technologies: ["Python", "Raspberry Pi", "RFID", "SQLite", "MQTT"],
    note:
      "Projeto em equipe. Segundo o README, a câmera OV7670 foi retirada do protótipo final por limitações de tempo e compatibilidade de hardware.",
  },
};

export const standaloneProjects = [
  {
    slug: "nutri-nex",
    title: "Nutri Nex",
    summary:
      "Aplicação mobile voltada a nutrição, com arquitetura, interface e serviços descritos no currículo.",
    language: "TypeScript",
    topics: ["mobile", "react-native", "supabase"],
    caseStudy: {
      eyebrow: "Projeto editorial · 2026",
      overview:
        "Aplicação mobile desenvolvida do zero com React Native e Capacitor, conforme o currículo fornecido.",
      highlights: [
        "Interface responsiva e foco em desempenho no aplicativo móvel.",
        "Banco de dados relacional e fluxos de autenticação estruturados no ecossistema Supabase.",
        "Motores lógicos Nex Score e Smart Swap para apoiar a experiência do produto.",
        "O projeto chegou à fase de testes fechados na Google Play.",
      ],
      technologies: ["React Native", "Capacitor", "Supabase"],
      note:
        "Ainda não há repositório público ou demonstração verificada para este projeto.",
    } satisfies CaseStudy,
  },
];
