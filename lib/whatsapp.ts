const messages = {
  pt: {
    analysis: "Olá, NJA! Gostaria de agendar uma análise gratuita para o meu negócio.",
    about: "Olá, NJA! Conheci a consultoria pelo site e gostaria de agendar uma análise gratuita para o meu negócio.",
    portfolio: "Olá, NJA! Vi o portfólio e gostaria de agendar uma análise gratuita para conversar sobre um projeto para a minha empresa.",
    franchise: "Olá, NJA! Tenho interesse em ser um franqueado e gostaria de saber mais sobre o modelo de franquia e os próximos passos.",
    customWebsite: "Olá, NJA! Preciso de um site com funcionalidades além do plano institucional e gostaria de conversar sobre um projeto personalizado.",
    websiteQuestions: "Olá, NJA! Tenho dúvidas sobre a criação do site institucional e gostaria de mais informações.",
    websiteCampaign: "Olá, NJA! Vim pela página Site Profissional e quero contratar um site para minha empresa. Como podemos começar?",
    contact: "Olá, NJA! Vim pelo site e gostaria de conversar com a equipe sobre os serviços de consultoria e marketing.",
    service: "Olá, NJA! Gostaria de agendar uma análise gratuita para conversar sobre {service} para a minha empresa.",
  },
  en: {
    analysis: "Hello, NJA! I would like to schedule a free review for my business.",
    about: "Hello, NJA! I learned about your consultancy on the website and would like to schedule a free review for my business.",
    portfolio: "Hello, NJA! I saw your portfolio and would like to schedule a free review to discuss a project for my business.",
    franchise: "Hello, NJA! I am interested in becoming a franchisee and would like to learn about your franchise model and next steps.",
    customWebsite: "Hello, NJA! I need a website with features beyond the business website plan and would like to discuss a custom project.",
    websiteQuestions: "Hello, NJA! I have questions about your business website service and would like more information.",
    websiteCampaign: "Hello, NJA! I came from the Professional Website page and would like to order a website for my business. How can we get started?",
    contact: "Hello, NJA! I came from your website and would like to discuss your consulting and marketing services.",
    service: "Hello, NJA! I would like to schedule a free review to discuss {service} for my business.",
  },
  es: {
    analysis: "¡Hola, NJA! Me gustaría agendar un análisis gratuito para mi negocio.",
    about: "¡Hola, NJA! Conocí su consultoría en el sitio web y me gustaría agendar un análisis gratuito para mi negocio.",
    portfolio: "¡Hola, NJA! Vi su portafolio y me gustaría agendar un análisis gratuito para conversar sobre un proyecto para mi empresa.",
    franchise: "¡Hola, NJA! Me interesa ser franquiciado y quisiera conocer el modelo de franquicia y los próximos pasos.",
    customWebsite: "¡Hola, NJA! Necesito un sitio con funciones adicionales al plan institucional y quisiera conversar sobre un proyecto personalizado.",
    websiteQuestions: "¡Hola, NJA! Tengo dudas sobre la creación del sitio institucional y quisiera más información.",
    websiteCampaign: "¡Hola, NJA! Vengo de la página Sitio Profesional y quiero contratar un sitio para mi empresa. ¿Cómo podemos empezar?",
    contact: "¡Hola, NJA! Vengo del sitio web y quisiera conversar sobre sus servicios de consultoría y marketing.",
    service: "¡Hola, NJA! Me gustaría agendar un análisis gratuito para conversar sobre {service} para mi empresa.",
  },
};

export function getWhatsAppUrl(
  phone: string,
  locale: string,
  subject: keyof typeof messages.pt,
  service = "",
) {
  const copy = messages[locale as keyof typeof messages] ?? messages.pt;
  const message = copy[subject].replace("{service}", service);
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
