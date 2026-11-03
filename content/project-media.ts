export type ProjectMedia = {
  imageSrc: string;
  imageAlt: string;
  demoUrl?: string;
};

export const projectMedia: Record<string, ProjectMedia> = {
  "Fabbio-Boli/codex-automation-recommender": {
    imageSrc: "/projects/codex-automation-recommender.svg",
    imageAlt: "Ilustração de uma análise de repositório e recomendações para Codex",
  },
  "Fabbio-Boli/challenge-toledo": {
    imageSrc: "/projects/challenge-toledo.png",
    imageAlt: "Protótipo de gêmeo digital do Challenge Toledo aberto no Unreal Engine",
  },
  "Fabbio-Boli/sdc-eletrolls": {
    imageSrc: "/projects/sdc-eletrolls.png",
    imageAlt: "Tela de apresentação da plataforma de recrutamento SDC-Eletrolls",
  },
  "Fabbio-Boli/agv-bosch": {
    imageSrc: "/projects/agv-bosch.png",
    imageAlt: "Diagrama da arquitetura do projeto Jabuti-AGV para o desafio Bosch",
    demoUrl: "https://www.youtube.com/watch?v=U6FojX3zOjM",
  },
  "nutri-nex": {
    imageSrc: "/projects/nutri-nex.svg",
    imageAlt: "Ilustração de uma experiência mobile de nutrição conectada a dados",
  },
};
