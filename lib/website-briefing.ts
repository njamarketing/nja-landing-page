export const WEBSITE_OFFER = {
  phone: "+55 45 3523-0355",
  development: "R$ 300,00",
  monthly: "R$ 99,90",
  delivery: "48h",
};

export const briefingFields = {
  company: { step: 0, max: 100, required: true },
  contact: { step: 0, max: 100, required: true },
  phone: { step: 0, max: 24, required: true },
  email: { step: 0, max: 160, required: true },
  segment: { step: 0, max: 100, required: true },
  location: { step: 0, max: 120, required: true },
  about: { step: 1, max: 500, required: true },
  services: { step: 1, max: 500, required: true },
  goal: { step: 1, max: 30, required: true },
  style: { step: 1, max: 30, required: false },
  brand: { step: 1, max: 200, required: false },
  domainStatus: { step: 1, max: 30, required: true },
  domain: { step: 1, max: 253, required: false },
  links: { step: 1, max: 300, required: false },
  notes: { step: 1, max: 300, required: false },
} as const;

export type BriefingField = keyof typeof briefingFields;
export type WebsiteBriefing = Record<BriefingField, string>;
export type BriefingError =
  | "required"
  | "phone"
  | "email"
  | "about"
  | "services"
  | "length";

export const emptyBriefing = Object.fromEntries(
  Object.keys(briefingFields).map((key) => [key, ""]),
) as WebsiteBriefing;

export const briefingOptions = {
  goal: ["contact", "credibility", "showcase"],
  style: ["modern", "elegant", "bold", "help"],
  domainStatus: ["register", "existing", "help"],
} as const;

export function validateBriefing(briefing: WebsiteBriefing, step?: number) {
  const errors: Partial<Record<BriefingField, BriefingError>> = {};

  for (const key of Object.keys(briefingFields) as BriefingField[]) {
    const field = briefingFields[key];
    if (step !== undefined && field.step !== step) continue;
    const value = briefing[key].trim();

    if (field.required && !value) errors[key] = "required";
    else if (value.length > field.max) errors[key] = "length";
    else if (
      key === "phone" &&
      (!/^[+\d\s().-]+$/.test(value) ||
        !/^\d{10,15}$/.test(value.replace(/\D/g, "")))
    )
      errors[key] = "phone";
    else if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      errors[key] = "email";
    else if (key === "about" && value.length < 20) errors[key] = "about";
    else if (key === "services" && value.length < 5) errors[key] = "services";
    else if (
      key in briefingOptions &&
      value &&
      !(
        briefingOptions[
          key as keyof typeof briefingOptions
        ] as readonly string[]
      ).includes(value)
    )
      errors[key] = "required";
  }

  return errors;
}

const whatsappLabels: Record<BriefingField, string> = {
  company: "Empresa",
  contact: "Responsável",
  phone: "WhatsApp",
  email: "E-mail",
  segment: "Segmento",
  location: "Cidade / região de atendimento",
  about: "Sobre a empresa e público",
  services: "Serviços e diferenciais",
  goal: "Objetivo do site",
  style: "Estilo visual",
  brand: "Marca, cores e materiais",
  domainStatus: "Situação do domínio",
  domain: "Domínio atual ou desejado",
  links: "Redes sociais, referências e materiais",
  notes: "Observações",
};

const whatsappOptions: Record<string, Record<string, string>> = {
  goal: {
    contact: "Receber contatos pelo WhatsApp",
    credibility: "Transmitir credibilidade",
    showcase: "Apresentar serviços e portfólio",
  },
  style: {
    modern: "Moderno e clean",
    elegant: "Elegante e sóbrio",
    bold: "Criativo e marcante",
    help: "Quero a orientação da NJA",
  },
  domainStatus: {
    register: "Quero registrar um domínio .br",
    existing: "Já tenho um domínio",
    help: "Preciso de ajuda para escolher",
  },
};

export function buildBriefingMessage(briefing: WebsiteBriefing) {
  const lines = (Object.keys(briefingFields) as BriefingField[]).flatMap(
    (key) => {
      const value = briefing[key].trim();
      return value
        ? [
            `*${whatsappLabels[key]}:* ${whatsappOptions[key]?.[value] ?? value}`,
          ]
        : [];
    },
  );

  return [
    "Olá, NJA! Quero contratar a criação do meu site institucional.",
    "",
    "*BRIEFING — SITE NJA*",
    ...lines,
    "",
    "*OFERTA ESCOLHIDA*",
    `Desenvolvimento: ${WEBSITE_OFFER.development} (pagamento único).`,
    `Manutenção e hospedagem: ${WEBSITE_OFFER.monthly}/mês, sem reajuste.`,
    "Primeiro ano de domínio .br incluso no desenvolvimento, sujeito à disponibilidade. Renovação a partir do segundo ano à parte.",
    "Site no ar em até 48 horas após confirmação do pagamento e recebimento do briefing e dos materiais completos.",
    "Escopo: site institucional informativo, sem e-commerce, login, banco de dados ou funcionalidades de backend.",
    "Autorizo o contato da NJA sobre este projeto e estou ciente dos valores e do escopo acima.",
  ].join("\n");
}

export function getBriefingWhatsAppUrl(
  phone: string,
  briefing: WebsiteBriefing,
) {
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(buildBriefingMessage(briefing))}`;
}

export function getWebsitePaymentUrl(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" && !url.username && !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}
