// Contacts and product links supplied in the original NJA links page.
export const NJA_LINKS = {
  commercial: "https://wa.me/554535230355",
  support: "https://wa.me/554598553609",
  finance: "https://wa.me/5545998538512",
  bahia: "https://wa.me/5573991861410",
  ebook: "https://pay.kiwify.com.br/mDUTaM3",
  planner: "https://pay.kiwify.com.br/YeEzE1J",
  instagram: "https://www.instagram.com/njamarketing/",
  facebook: "https://www.facebook.com/njaconsultoriaemarketing",
} as const;

const pt = {
  seoTitle: "Links e contatos | NJA Marketing",
  seoDescription:
    "Encontre os canais oficiais da NJA Marketing: criação de sites, atendimento, comercial, financeiro, materiais e redes sociais.",
  language: "Selecionar idioma",
  home: "Ir para o site da NJA",
  badge: "Estratégia. Presença. Crescimento.",
  title: "Sua marca merece",
  highlight: "ser encontrada.",
  description:
    "Sites, marketing e soluções para sua empresa crescer. O próximo passo começa por aqui.",
  navigation: "Serviços e canais da NJA",
  offer: {
    eyebrow: "Sua empresa no digital",
    title: "Criação de sites",
    pricePrefix: "por",
    monthly: "/mês de hospedagem e manutenção",
    action: "Conheça a oferta e solicite seu site",
  },
  contact: "Fale com a nossa equipe",
  commercial: {
    title: "Setor Comercial",
    description: "Vamos conversar sobre o seu negócio",
  },
  support: {
    title: "Setor de Atendimento",
    description: "Suporte e informações para clientes",
  },
  finance: {
    title: "Setor Financeiro",
    description: "Pagamentos e assuntos financeiros",
  },
  bahiaTitle: "Unidade Teixeira de Freitas · BA",
  bahia: {
    title: "Setor Comercial · Bahia",
    description: "Fale com a equipe da unidade",
  },
  resources: "Conteúdo para ir além",
  ebook: {
    title: "E-book de vendas NJA",
    description: "Acesse nosso material de vendas",
  },
  planner: {
    title: "Planner Empresarial Anual",
    description: "Organize suas metas e ações",
  },
  follow: "Acompanhe a NJA",
  website: {
    title: "Acesse nosso site",
    description: "Conheça a agência e o portfólio",
  },
  instagram: { title: "Instagram", description: "Conteúdos e bastidores" },
  facebook: { title: "Facebook", description: "Novidades da agência" },
  external: "Abre em uma nova aba",
  tagline: "Ideias que ganham presença.",
  privacy: "Privacidade",
  terms: "Termos de uso",
};

type LinksPageCopy = typeof pt;

const en: LinksPageCopy = {
  seoTitle: "Links and contacts | NJA Marketing",
  seoDescription:
    "Find NJA Marketing’s official channels: website creation, customer support, sales, billing, resources and social media.",
  language: "Select language",
  home: "Go to the NJA website",
  badge: "Strategy. Presence. Growth.",
  title: "Your brand deserves",
  highlight: "to be found.",
  description:
    "Websites, marketing and solutions to grow your business. Your next step starts here.",
  navigation: "NJA services and channels",
  offer: {
    eyebrow: "Your business online",
    title: "Website creation",
    pricePrefix: "for",
    monthly: "/month for hosting and maintenance",
    action: "Explore the offer and request your website",
  },
  contact: "Talk to our team",
  commercial: { title: "Sales", description: "Let’s talk about your business" },
  support: {
    title: "Customer Support",
    description: "Help and information for customers",
  },
  finance: {
    title: "Billing",
    description: "Payments and financial enquiries",
  },
  bahiaTitle: "Teixeira de Freitas branch · Bahia",
  bahia: { title: "Sales · Bahia", description: "Talk to the local team" },
  resources: "Resources to go further",
  ebook: {
    title: "NJA Sales E-book",
    description: "Explore our sales resource",
  },
  planner: {
    title: "Annual Business Planner",
    description: "Organize your goals and actions",
  },
  follow: "Follow NJA",
  website: {
    title: "Visit our website",
    description: "Meet the agency and explore our portfolio",
  },
  instagram: {
    title: "Instagram",
    description: "Content and behind the scenes",
  },
  facebook: { title: "Facebook", description: "News from the agency" },
  external: "Opens in a new tab",
  tagline: "Ideas that make a presence.",
  privacy: "Privacy",
  terms: "Terms of use",
};

const es: LinksPageCopy = {
  seoTitle: "Enlaces y contactos | NJA Marketing",
  seoDescription:
    "Encuentra los canales oficiales de NJA Marketing: creación de sitios, atención al cliente, ventas, finanzas, materiales y redes sociales.",
  language: "Seleccionar idioma",
  home: "Ir al sitio de NJA",
  badge: "Estrategia. Presencia. Crecimiento.",
  title: "Tu marca merece",
  highlight: "ser encontrada.",
  description:
    "Sitios web, marketing y soluciones para hacer crecer tu empresa. El próximo paso empieza aquí.",
  navigation: "Servicios y canales de NJA",
  offer: {
    eyebrow: "Tu empresa en el mundo digital",
    title: "Creación de sitios web",
    pricePrefix: "por",
    monthly: "/mes de alojamiento y mantenimiento",
    action: "Conoce la oferta y solicita tu sitio",
  },
  contact: "Habla con nuestro equipo",
  commercial: { title: "Ventas", description: "Conversemos sobre tu negocio" },
  support: {
    title: "Atención al Cliente",
    description: "Soporte e información para clientes",
  },
  finance: { title: "Finanzas", description: "Pagos y asuntos financieros" },
  bahiaTitle: "Unidad Teixeira de Freitas · Bahía",
  bahia: {
    title: "Ventas · Bahía",
    description: "Habla con el equipo de la unidad",
  },
  resources: "Contenido para ir más allá",
  ebook: {
    title: "E-book de ventas NJA",
    description: "Accede a nuestro material de ventas",
  },
  planner: {
    title: "Planner Empresarial Anual",
    description: "Organiza tus metas y acciones",
  },
  follow: "Sigue a NJA",
  website: {
    title: "Visita nuestro sitio",
    description: "Conoce la agencia y el portafolio",
  },
  instagram: {
    title: "Instagram",
    description: "Contenido y detrás de escena",
  },
  facebook: { title: "Facebook", description: "Novedades de la agencia" },
  external: "Se abre en una nueva pestaña",
  tagline: "Ideas que ganan presencia.",
  privacy: "Privacidad",
  terms: "Términos de uso",
};

export function getLinksPageCopy(locale: string): LinksPageCopy {
  return locale === "en" ? en : locale === "es" ? es : pt;
}
