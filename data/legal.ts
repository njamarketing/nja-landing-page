import { WEBSITE_OFFER } from "@/lib/website-briefing";

export type LegalKind = "privacy" | "terms";
export type LegalSection = { id: string; title: string; paragraphs: string[] };
export type LegalDocument = {
  title: string;
  intro: string;
  highlights: string[];
  sections: LegalSection[];
};

const section = (
  id: string,
  title: string,
  ...paragraphs: string[]
): LegalSection => ({ id, title, paragraphs });
export const legalUpdated = "2026-09-16";
export const legalEmail = "sac@njamarketing.com.br";

const pt: Record<LegalKind, LegalDocument> = {
  privacy: {
    title: "Política de Privacidade",
    intro:
      "Entenda como os seus dados são utilizados ao conhecer a NJA, solicitar uma proposta ou contratar nossos serviços de marketing, comunicação e criação de sites.",
    highlights: [
      "Dados para atender ao seu projeto",
      "Clareza sobre serviços externos",
      "Um canal para exercer seus direitos",
    ],
    sections: [
      section(
        "responsavel",
        "Quem somos e a quem esta política se aplica",
        "Esta política abrange o site njamarketing.com.br e os contatos comerciais da NJA Consultoria e Marketing, cuja sede fica em Foz do Iguaçu, Paraná. Para assuntos relacionados aos seus dados, entre em contato pelo e-mail sac@njamarketing.com.br.",
        "A NJA decide como utilizar os dados recebidos para seu próprio atendimento. Em projetos nos quais trata dados em nome de clientes, as responsabilidades e instruções devem constar do contrato específico. Aplicativos, sites de clientes e serviços de terceiros possuem seus próprios avisos de privacidade.",
      ),
      section(
        "dados",
        "Dados utilizados no atendimento e nos projetos",
        "Ao solicitar contato, uma proposta ou a criação de um site, você pode informar nome, empresa, telefone, e-mail, segmento, cidade, serviços, objetivos, preferências visuais, domínio e links para materiais. Também podemos receber mensagens, imagens e informações necessárias ao desenvolvimento do projeto e à contratação.",
        "Não envie senhas, dados completos de cartão ou dados pessoais sensíveis pelo briefing. Compartilhe materiais de outras pessoas somente quando tiver autorização ou outra justificativa adequada para esse uso.",
        "O acesso ao site e a recursos externos pode gerar registros técnicos, como endereço IP, navegador, páginas acessadas e horários, nos serviços que entregam e protegem esses recursos.",
      ),
      section(
        "finalidades",
        "Por que utilizamos essas informações",
        "Utilizamos informações de contato e de projeto para responder solicitações, elaborar propostas, organizar o briefing, executar serviços e prestar suporte. Informações da contratação também apoiam faturamento e registros comerciais.",
        "Conforme a finalidade, o tratamento se apoia em procedimentos contratuais solicitados por você, execução de contrato, obrigações legais, exercício de direitos ou consentimento. O legítimo interesse exige avaliação de necessidade e dos impactos sobre o titular. O contato sobre um projeto não representa autorização irrestrita para publicidade.",
      ),
      section(
        "briefing",
        "Como funciona o briefing pelo WhatsApp",
        "O formulário de criação de sites mantém um rascunho no armazenamento da sessão do navegador para permitir que você retome o preenchimento na mesma aba. Esse rascunho não é enviado automaticamente a uma base de dados da NJA.",
        "Ao continuar para o WhatsApp, os campos preenchidos são incluídos no link usado para abrir a mensagem nesse serviço. O WhatsApp recebe esse conteúdo ao abrir o link; a equipe da NJA recebe a mensagem quando você confirma o envio na conversa. Se escolher copiar o briefing, o texto será colocado na área de transferência do dispositivo.",
      ),
      section(
        "navegador",
        "Cookies e armazenamento no navegador",
        "O site pode lembrar o idioma selecionado por meio de um cookie. O rascunho do briefing usa sessionStorage, normalmente encerrado ao fechar a aba. As curtidas da demonstração visual usam localStorage e permanecem no navegador até que os dados do site sejam apagados.",
        "Você pode remover esses dados nas configurações do navegador. Isso pode apagar preferências e rascunhos. Esses recursos não equivalem à criação de uma conta ou ao envio de suas curtidas para uma rede social. A inclusão de novas ferramentas de publicidade ou medição deverá ser acompanhada da informação e dos controles adequados.",
      ),
      section(
        "terceiros",
        "Prestadores, conteúdo externo e compartilhamento",
        "Conforme o serviço solicitado, informações necessárias podem ser tratadas por prestadores de hospedagem, comunicação, registro de domínio, pagamento e execução do projeto. A unidade da NJA envolvida no atendimento pode receber os dados necessários para dar continuidade à sua solicitação.",
        "O site exibe recursos externos, como miniaturas de vídeos, imagens e bandeiras de idiomas. O carregamento desses recursos comunica dados técnicos aos respectivos provedores. Ao reproduzir vídeos, usar o WhatsApp, acessar redes sociais ou abrir o pagamento externo, também se aplicam as políticas desses serviços. Os dados de cartão são inseridos no ambiente do provedor de pagamento, e não no briefing.",
        "Alguns prestadores podem processar dados fora do Brasil. Quando uma transferência internacional estiver sob responsabilidade da NJA, deverão ser observados os mecanismos e as garantias aplicáveis. Solicite esclarecimentos sobre os prestadores envolvidos em seu atendimento pelo canal de privacidade.",
      ),
      section(
        "retencao",
        "Conservação e proteção",
        "Os dados recebidos no atendimento são conservados conforme a duração da negociação, do projeto e do suporte, além das necessidades de registro, das obrigações legais e do exercício de direitos. A exclusão de dados do navegador não apaga mensagens já enviadas ou registros da contratação.",
        "A proteção das informações exige controle de acesso e cuidados compatíveis com cada operação. Nenhum ambiente digital é isento de riscos. Se identificar exposição indevida ou suspeita de incidente envolvendo seus dados, informe nosso canal de atendimento.",
      ),
      section(
        "direitos",
        "Seus direitos e como solicitar atendimento",
        "Nos termos da LGPD, você pode solicitar confirmação, acesso, correção, informações sobre compartilhamento, portabilidade quando aplicável e eliminação, anonimização ou bloqueio nas hipóteses legais. Também pode revogar consentimento e apresentar oposição quando cabível.",
        "Envie sua solicitação para sac@njamarketing.com.br, com uma descrição do pedido e um meio de retorno. Podemos solicitar informações proporcionais para confirmar sua identidade. A resposta observará os prazos legais e explicará eventuais limites à exclusão ou ao atendimento. Você também pode recorrer à ANPD.",
      ),
      section(
        "atualizacoes",
        "Público e atualizações",
        "Este site apresenta serviços voltados a empresas e profissionais e não solicita intencionalmente dados de crianças. Se houver envio indevido, entre em contato para que a situação seja avaliada.",
        "Esta política pode ser atualizada para refletir mudanças no site, nos serviços ou nas regras aplicáveis. A data da versão aparece nesta página; mudanças que exijam nova informação ou manifestação do titular deverão receber o tratamento correspondente.",
      ),
    ],
  },
  terms: {
    title: "Termos e Condições",
    intro:
      "Informações para navegar pelo site e entender a contratação de consultoria, marketing, identidade de marca, produção audiovisual e sites institucionais da NJA.",
    highlights: [
      "Escopo definido antes de começar",
      "Condições claras para o site institucional",
      "Respeito à oferta e aos seus direitos",
    ],
    sections: [
      section(
        "aplicacao",
        "Sobre estes termos",
        "Estes termos se aplicam ao site njamarketing.com.br, apresentado pela NJA Consultoria e Marketing, com sede em Foz do Iguaçu, Paraná. O canal de atendimento é sac@njamarketing.com.br.",
        "A navegação não cria uma assinatura ou contratação automática. A contratação depende da oferta aplicável, da confirmação comercial e das condições informadas ao cliente. Propostas e contratos detalham cada projeto e devem ser interpretados em conjunto com a oferta, sem afastar direitos legais.",
      ),
      section(
        "servicos",
        "Serviços e propostas",
        "A NJA apresenta soluções de consultoria e estratégia, marketing e vendas, mídia paga, redes sociais, SEO, posicionamento e identidade de marca, produção audiovisual, incluindo Video Momentum, e criação de sites institucionais.",
        "Entregáveis, cronograma, revisões, canais de atendimento, responsabilidades e valores devem ser definidos na oferta ou proposta contratada. Verbas de anúncios, licenças, deslocamentos e serviços de terceiros não devem ser presumidos como inclusos: confirme sua previsão no orçamento.",
        "Os resultados de campanhas e ações dependem também do mercado, do investimento, das plataformas e da operação do cliente. Cases e exemplos não constituem promessa de faturamento, posição em buscadores ou volume específico de vendas.",
      ),
      section(
        "site",
        "Oferta de criação de site institucional",
        `A oferta apresentada no site prevê desenvolvimento por ${WEBSITE_OFFER.development}, em pagamento único, e hospedagem com manutenção por ${WEBSITE_OFFER.monthly} por mês, sem reajuste, conforme anunciado para esse plano. O primeiro ano de um domínio .br está incluso, sujeito à disponibilidade; a renovação a partir do segundo ano é paga à parte.`,
        "O produto é um site institucional informativo para apresentar a empresa, seus serviços e contatos, com direcionamento ao WhatsApp. Não inclui e-commerce, carrinho, checkout próprio, login, painel administrativo, banco de dados ou funcionalidades de backend.",
        "Ajustes de conteúdo e novas seções devem ser alinhados com a NJA dentro do escopo contratado. Ampliações de projeto são avaliadas e orçadas separadamente, com aprovação prévia do cliente.",
      ),
      section(
        "prazo",
        "Briefing, materiais e prazo de entrega",
        "O prazo anunciado de até 48 horas para o site institucional começa após a confirmação do pagamento e o recebimento do briefing e dos materiais completos. O cliente deve fornecer informações corretas, logo, textos, fotos, contatos e os dados necessários ao domínio.",
        "Concluir o formulário abre o WhatsApp com a mensagem preparada; é necessário confirmar o envio na conversa. O pagamento acontece no endereço externo indicado ou conforme a orientação comercial da NJA. Abrir o link não confirma o pagamento.",
        "Mudanças de escopo, materiais pendentes ou impedimentos técnicos precisam ser comunicados e ter seus efeitos no cronograma alinhados entre as partes. O prazo desta oferta não se aplica automaticamente aos demais serviços.",
      ),
      section(
        "dominio",
        "Domínio, hospedagem e continuidade",
        "O registro depende da disponibilidade do nome e das regras do registrador. Caso já possua um domínio, o cliente deverá viabilizar os acessos ou ajustes necessários à conexão do site. Dados de titularidade, renovação e gestão de acesso devem ser confirmados durante a contratação.",
        "A manutenção e a hospedagem acompanham o plano contratado. Migração, entrega de arquivos, transferência de domínio e continuidade após o encerramento devem ser organizadas conforme o contrato e os direitos aplicáveis. O cliente pode solicitar orientação antes de cancelar.",
      ),
      section(
        "materiais",
        "Materiais, direitos e aprovações",
        "O cliente deve ter direito de uso sobre marcas, fotografias, vídeos, textos, músicas e demais materiais fornecidos, inclusive autorização de imagem quando necessária. Não deve enviar conteúdo ilícito, enganoso ou que viole direitos de terceiros.",
        "A titularidade e as licenças das peças finais, arquivos editáveis, código e recursos de terceiros devem constar da proposta ou do contrato. O envio de materiais não autoriza uso irrestrito fora do projeto. A divulgação de trabalhos e depoimentos em portfólio deve respeitar as autorizações e os compromissos de confidencialidade aplicáveis.",
      ),
      section(
        "cancelamento",
        "Cancelamento, arrependimento e reembolso",
        "Solicite cancelamento ou esclarecimentos pelo e-mail sac@njamarketing.com.br ou pelo canal em que contratou, identificando o projeto. O encerramento, os valores eventualmente devidos e os procedimentos de transição seguem a oferta, o contrato e a legislação; estes termos não criam multa, fidelidade ou proibição geral de reembolso.",
        "Quando houver relação de consumo e contratação fora do estabelecimento, inclusive pela internet, aplica-se o direito de arrependimento de sete dias, contado da assinatura ou do recebimento do produto ou serviço, conforme o caso, com devolução dos valores na forma da lei. Os direitos relativos a falhas no serviço também permanecem preservados.",
      ),
      section(
        "uso",
        "Uso do site e serviços externos",
        "Não é permitido usar o site para fraude, tentativa de acesso indevido, distribuição de conteúdo malicioso ou violação de direitos. Marcas e materiais apresentados no site não podem ser reutilizados sem a licença ou autorização correspondente.",
        "Links de WhatsApp, redes sociais, vídeos e pagamentos levam a serviços com regras próprias. A NJA não controla a disponibilidade dessas plataformas, sem prejuízo das responsabilidades que lhe cabem pelos serviços contratados.",
      ),
      section(
        "unidades",
        "Unidades e oportunidades de franquia",
        "As páginas de unidades apresentam a sede matriz e a expansão da NJA. O envio de interesse em uma franquia não concede direitos sobre a marca nem formaliza uma operação. Condições, documentos e responsabilidades serão tratados no processo específico de contratação.",
        "Em serviços prestados por uma unidade, a proposta deve identificar a pessoa jurídica responsável pela contratação, pelo faturamento e pelo atendimento.",
      ),
      section(
        "contato",
        "Privacidade, versões e resolução de dúvidas",
        "O uso de dados pessoais é explicado na Política de Privacidade. Estes termos podem ser atualizados, preservadas as condições já contratadas e os direitos aplicáveis. A data indicada identifica esta versão.",
        "Dúvidas e solicitações podem ser encaminhadas para sac@njamarketing.com.br. Aplicam-se as leis brasileiras e as regras de competência cabíveis, inclusive as garantias de acesso do consumidor aos órgãos de defesa e ao Judiciário.",
      ),
    ],
  },
};

const en: Record<LegalKind, LegalDocument> = {
  privacy: {
    title: "Privacy Policy",
    intro:
      "How your information is used when you explore NJA, request a proposal or hire our marketing, communication and website services.",
    highlights: [
      "Information to support your project",
      "Clarity about external services",
      "A channel to exercise your rights",
    ],
    sections: [
      section(
        "responsavel",
        "Who we are and scope",
        "This policy covers njamarketing.com.br and commercial enquiries to NJA Consultoria e Marketing, headquartered in Foz do Iguaçu, Paraná, Brazil. Contact sac@njamarketing.com.br about your information.",
        "NJA determines how information is used for its own enquiries. When processing data for clients, responsibilities and instructions belong in the specific agreement. Apps, client websites and third-party services have their own privacy notices.",
      ),
      section(
        "dados",
        "Information used for enquiries and projects",
        "You may provide your name, company, phone, email, industry, location, services, goals, design preferences, domain and links to materials. Messages, images and information required for delivery and contracting may also be received.",
        "Do not submit passwords, full card details or sensitive personal information in the brief. Only share other people's materials with permission or another appropriate justification. Access to the site and external resources may create technical records, including IP address, browser, pages and access times, with the providers delivering those resources.",
      ),
      section(
        "finalidades",
        "Purposes and legal grounds",
        "Contact and project information supports enquiries, proposals, briefing, delivery, support, billing and commercial records.",
        "Depending on the purpose, grounds include requested contractual steps, contract performance, legal duties, exercise of rights or consent. Legitimate interest requires an assessment of necessity and individual impact. A project enquiry is not unrestricted permission for advertising.",
      ),
      section(
        "briefing",
        "WhatsApp brief",
        "The website brief is saved in your browser session so you can resume it in the same tab. It is not automatically sent to an NJA database.",
        "Continuing to WhatsApp includes your completed fields in the link used to prepare the message. WhatsApp receives that content when the link opens; the NJA team receives the message when you send it in the conversation. Copying the brief places its text on your device's clipboard.",
      ),
      section(
        "navegador",
        "Cookies and browser storage",
        "A cookie may remember your language. The brief uses sessionStorage, normally cleared when the tab closes. Likes in the visual demonstration use localStorage and remain until the site's browser data is cleared.",
        "You can remove this data in your browser settings, which may erase preferences and drafts. These features do not create an account or send likes to a social network. New advertising or measurement tools must be accompanied by appropriate information and controls.",
      ),
      section(
        "terceiros",
        "Providers and external content",
        "As needed for your request, hosting, communication, domain registration, payment and project providers may process necessary information. The NJA unit handling your enquiry may receive relevant details.",
        "External images, video thumbnails and language flags communicate technical data to their providers when loaded. Playing videos, opening WhatsApp, visiting social networks or external checkout also involves those services' policies. Card details are entered with the payment provider, not in the brief.",
        "Providers may process data outside Brazil. International transfers for which NJA is responsible must follow applicable safeguards. Contact us for information about the providers involved in your project.",
      ),
      section(
        "retencao",
        "Retention and protection",
        "Enquiry data is retained according to negotiation, delivery and support needs, record keeping, legal duties and the exercise of rights. Clearing browser data does not delete messages already sent or contracting records.",
        "Protecting information requires appropriate access controls and care. No digital environment is risk-free. Report suspected exposure or incidents through our contact channel.",
      ),
      section(
        "direitos",
        "Your rights",
        "Under Brazil's LGPD, you may request confirmation, access, correction, sharing information, applicable portability, deletion, anonymisation or blocking, withdraw consent and object where legally available.",
        "Email sac@njamarketing.com.br with your request and contact details. Proportionate identity verification may be required. Responses follow legal deadlines and explain applicable limits. You may also contact Brazil's data protection authority, ANPD.",
      ),
      section(
        "atualizacoes",
        "Audience and updates",
        "This site serves businesses and professionals and does not intentionally request children's data. Contact us about inappropriate submissions.",
        "This policy may change with the site, services or applicable rules. The version date appears on this page. Changes requiring further notice or an individual's decision must be handled accordingly.",
      ),
    ],
  },
  terms: {
    title: "Terms and Conditions",
    intro:
      "Information about this website and hiring NJA for consulting, marketing, brand identity, audiovisual production and institutional websites.",
    highlights: [
      "Scope agreed before work begins",
      "Clear website offer conditions",
      "Respect for the offer and your rights",
    ],
    sections: [
      section(
        "aplicacao",
        "Scope of these terms",
        "These terms cover njamarketing.com.br, presented by NJA Consultoria e Marketing, headquartered in Foz do Iguaçu, Paraná, Brazil. Contact: sac@njamarketing.com.br.",
        "Browsing does not create a subscription or purchase. Contracting depends on the applicable offer, commercial confirmation and disclosed conditions. Proposals and agreements detail each project alongside the offer and do not override statutory rights.",
      ),
      section(
        "servicos",
        "Services and proposals",
        "NJA offers consulting, marketing and sales strategy, paid media, social media, SEO, positioning, brand identity, audiovisual production including Video Momentum, and institutional websites.",
        "Deliverables, schedules, revisions, support, responsibilities and prices must be defined in the offer or proposal. Confirm whether advertising spend, licences, travel or external services are included.",
        "Campaign outcomes also depend on market conditions, budget, platforms and the client's operation. Examples and case studies do not promise revenue, search rankings or a specific number of sales.",
      ),
      section(
        "site",
        "Institutional website offer",
        `The advertised plan includes a one-time development fee of ${WEBSITE_OFFER.development} and hosting with maintenance for ${WEBSITE_OFFER.monthly} per month, without increases as advertised for this plan. The first year of a .br domain is included, subject to availability; renewal from year two is charged separately.`,
        "This is an informational website presenting the business, services and contacts with WhatsApp links. E-commerce, cart, its own checkout, login, admin panel, databases and backend features are excluded.",
        "Content adjustments and new sections must be agreed within scope. Project expansions require a separate assessment, quote and prior approval.",
      ),
      section(
        "prazo",
        "Brief, materials and delivery",
        "The advertised delivery period of up to 48 hours starts after payment confirmation and receipt of the complete brief and materials, including accurate information, logo, text, photos, contacts and domain details.",
        "Completing the form prepares a WhatsApp message; you must send it in the conversation. Payment takes place through the indicated external address or commercial instructions. Opening a link does not confirm payment.",
        "Scope changes, missing materials or technical obstacles must be communicated and their schedule impact agreed. This deadline does not automatically apply to other services.",
      ),
      section(
        "dominio",
        "Domain, hosting and continuity",
        "Registration depends on name availability and registry rules. Clients with existing domains must arrange the necessary access or configuration. Ownership, renewal and access management must be confirmed during contracting.",
        "Hosting and maintenance follow the contracted plan. Migration, file delivery, domain transfer and post-termination continuity must be organised according to the agreement and applicable rights. Request guidance before cancelling.",
      ),
      section(
        "materiais",
        "Materials and rights",
        "Clients must have rights to supplied brands, photos, videos, text, music and other materials, including image permissions where needed. Illegal, misleading or infringing content must not be submitted.",
        "Ownership and licences for final work, editable files, code and external assets belong in the proposal or agreement. Submitting materials does not grant unrestricted use outside the project. Portfolio publication and testimonials must respect applicable permissions and confidentiality.",
      ),
      section(
        "cancelamento",
        "Cancellation and refunds",
        "Request cancellation through sac@njamarketing.com.br or your contracting channel, identifying the project. Termination, amounts due and transition follow the offer, agreement and law. These terms do not introduce penalties, a minimum term or a blanket no-refund rule.",
        "Where Brazilian consumer law applies to remote purchases, the seven-day withdrawal right runs from signing or receiving the product or service, as applicable, with reimbursement according to law. Rights regarding defective services remain protected.",
      ),
      section(
        "uso",
        "Website use and external services",
        "Fraud, unauthorised access, malicious content and rights violations are prohibited. Website brands and materials require the appropriate permission or licence for reuse.",
        "WhatsApp, social networks, videos and payment links involve services with their own rules. NJA does not control their availability, without excluding its own obligations for contracted services.",
      ),
      section(
        "unidades",
        "Units and franchise enquiries",
        "Unit pages introduce NJA's headquarters and expansion. Expressing franchise interest does not grant brand rights or establish a franchise. Conditions and documentation belong to the specific contracting process.",
        "A unit's proposal must identify the legal entity responsible for contracting, billing and support.",
      ),
      section(
        "contato",
        "Privacy, versions and questions",
        "The Privacy Policy explains personal information use. These terms may be updated while respecting existing contracts and applicable rights. The date identifies this version.",
        "Contact sac@njamarketing.com.br. Brazilian law and applicable jurisdiction rules govern, including consumers' rights to seek protection from competent authorities and courts.",
      ),
    ],
  },
};

const es: Record<LegalKind, LegalDocument> = {
  privacy: {
    title: "Política de Privacidad",
    intro:
      "Cómo se utiliza tu información al conocer NJA, solicitar una propuesta o contratar servicios de marketing, comunicación y creación de sitios web.",
    highlights: [
      "Datos para atender tu proyecto",
      "Claridad sobre servicios externos",
      "Un canal para ejercer tus derechos",
    ],
    sections: [
      section(
        "responsavel",
        "Quiénes somos y alcance",
        "Esta política abarca njamarketing.com.br y las consultas comerciales a NJA Consultoria e Marketing, con sede en Foz do Iguaçu, Paraná, Brasil. Contacto sobre datos personales: sac@njamarketing.com.br.",
        "NJA decide cómo utilizar los datos de su propia atención. Cuando trata datos por cuenta de clientes, las responsabilidades e instrucciones deben constar en el contrato específico. Las aplicaciones, los sitios de clientes y los servicios externos tienen sus propios avisos.",
      ),
      section(
        "dados",
        "Información de contacto y proyectos",
        "Puedes proporcionar nombre, empresa, teléfono, correo, sector, ciudad, servicios, objetivos, preferencias visuales, dominio y enlaces a materiales. También podemos recibir mensajes, imágenes e información necesaria para el proyecto y la contratación.",
        "No envíes contraseñas, datos completos de tarjetas ni datos sensibles en el briefing. Comparte materiales de otras personas solo con autorización u otra justificación adecuada. El acceso al sitio y a recursos externos puede generar registros técnicos de IP, navegador, páginas y horarios en los proveedores que los entregan.",
      ),
      section(
        "finalidades",
        "Finalidades y fundamentos",
        "La información permite responder consultas, elaborar propuestas, organizar el briefing, ejecutar proyectos, prestar soporte, facturar y mantener registros comerciales.",
        "Según la finalidad, se aplican procedimientos contractuales solicitados, ejecución del contrato, obligaciones legales, ejercicio de derechos o consentimiento. El interés legítimo requiere evaluar la necesidad y el impacto sobre la persona. Una consulta no autoriza publicidad sin límites.",
      ),
      section(
        "briefing",
        "Briefing por WhatsApp",
        "El formulario guarda un borrador en la sesión del navegador para retomarlo en la misma pestaña. No lo envía automáticamente a una base de datos de NJA.",
        "Al continuar a WhatsApp, los campos se incluyen en el enlace que prepara el mensaje. WhatsApp recibe ese contenido al abrir el enlace; el equipo de NJA recibe el mensaje cuando confirmas el envío en la conversación. Copiar el briefing coloca el texto en el portapapeles del dispositivo.",
      ),
      section(
        "navegador",
        "Cookies y almacenamiento",
        "Una cookie puede recordar el idioma. El briefing utiliza sessionStorage, que normalmente se elimina al cerrar la pestaña. Los Me gusta de la demostración visual usan localStorage y permanecen hasta borrar los datos del sitio.",
        "Puedes eliminar estos datos en el navegador, lo que puede borrar preferencias y borradores. Estas funciones no crean una cuenta ni envían Me gusta a redes sociales. Nuevas herramientas de publicidad o medición deben incorporar información y controles adecuados.",
      ),
      section(
        "terceiros",
        "Proveedores y contenido externo",
        "Según la solicitud, proveedores de alojamiento, comunicación, dominios, pagos y ejecución pueden tratar información necesaria. La unidad de NJA que atienda tu consulta puede recibir los datos relevantes.",
        "Imágenes, miniaturas de videos y banderas externas comunican datos técnicos a sus proveedores al cargarse. Reproducir videos, abrir WhatsApp, visitar redes sociales o acceder al pago externo también implica sus políticas. Los datos de tarjeta se introducen en el proveedor de pago, no en el briefing.",
        "Algunos proveedores pueden tratar datos fuera de Brasil. Las transferencias internacionales bajo responsabilidad de NJA deben respetar las garantías aplicables. Solicita información sobre los proveedores de tu proyecto por nuestro canal de privacidad.",
      ),
      section(
        "retencao",
        "Conservación y protección",
        "Los datos de atención se conservan según la negociación, el proyecto, el soporte, los registros, las obligaciones legales y el ejercicio de derechos. Borrar el navegador no elimina mensajes enviados ni registros de contratación.",
        "La protección requiere controles de acceso y cuidados apropiados. Ningún entorno digital está libre de riesgos. Informa posibles exposiciones o incidentes a nuestro canal de atención.",
      ),
      section(
        "direitos",
        "Tus derechos",
        "La LGPD brasileña permite solicitar confirmación, acceso, corrección, información sobre comunicaciones, portabilidad cuando proceda, eliminación, anonimización o bloqueo; también revocar el consentimiento y oponerse cuando corresponda.",
        "Escribe a sac@njamarketing.com.br con tu solicitud y contacto. Podemos verificar tu identidad de forma proporcional. La respuesta respetará los plazos legales y explicará las limitaciones aplicables. También puedes acudir a la ANPD.",
      ),
      section(
        "atualizacoes",
        "Público y actualizaciones",
        "Este sitio está dirigido a empresas y profesionales y no solicita intencionalmente datos de niños. Contáctanos si se produce un envío indebido.",
        "La política puede cambiar con el sitio, los servicios o las normas. La fecha identifica la versión. Los cambios que requieran información adicional o una decisión del titular recibirán el tratamiento correspondiente.",
      ),
    ],
  },
  terms: {
    title: "Términos y Condiciones",
    intro:
      "Información para navegar y contratar consultoría, marketing, identidad de marca, producción audiovisual y sitios institucionales de NJA.",
    highlights: [
      "Alcance definido antes de comenzar",
      "Condiciones claras para tu sitio",
      "Respeto a la oferta y tus derechos",
    ],
    sections: [
      section(
        "aplicacao",
        "Aplicación de estos términos",
        "Estos términos abarcan njamarketing.com.br, presentado por NJA Consultoria e Marketing, con sede en Foz do Iguaçu, Paraná, Brasil. Contacto: sac@njamarketing.com.br.",
        "Navegar no crea una suscripción ni una compra. La contratación depende de la oferta, la confirmación comercial y las condiciones informadas. Las propuestas y contratos detallan cada proyecto junto con la oferta, sin excluir derechos legales.",
      ),
      section(
        "servicos",
        "Servicios y propuestas",
        "NJA ofrece consultoría, estrategia de marketing y ventas, publicidad paga, redes sociales, SEO, posicionamiento, identidad de marca, producción audiovisual, incluido Video Momentum, y sitios institucionales.",
        "Entregables, plazos, revisiones, atención, responsabilidades y precios deben definirse en la oferta o propuesta. Confirma si se incluyen inversión publicitaria, licencias, desplazamientos y servicios externos.",
        "Los resultados también dependen del mercado, la inversión, las plataformas y la operación del cliente. Los casos y ejemplos no garantizan facturación, posiciones en buscadores ni ventas específicas.",
      ),
      section(
        "site",
        "Oferta de sitio institucional",
        `El plan anunciado incluye desarrollo por ${WEBSITE_OFFER.development}, en un pago, y alojamiento con mantenimiento por ${WEBSITE_OFFER.monthly} mensuales, sin aumentos según lo anunciado para este plan. Incluye el primer año de un dominio .br, sujeto a disponibilidad; su renovación desde el segundo año se paga aparte.`,
        "Es un sitio informativo para presentar la empresa, sus servicios y contactos, con enlaces a WhatsApp. No incluye comercio electrónico, carrito, checkout propio, acceso de usuarios, panel administrativo, base de datos ni funciones de backend.",
        "Los ajustes de contenido y nuevas secciones se acuerdan dentro del alcance. Las ampliaciones requieren evaluación, presupuesto separado y aprobación previa.",
      ),
      section(
        "prazo",
        "Briefing, materiales y entrega",
        "El plazo anunciado de hasta 48 horas comienza tras confirmar el pago y recibir el briefing y los materiales completos: información correcta, logo, textos, fotos, contactos y datos del dominio.",
        "Completar el formulario prepara un mensaje en WhatsApp; debes enviarlo en la conversación. El pago se realiza en la dirección externa indicada o según las instrucciones comerciales. Abrir el enlace no confirma el pago.",
        "Los cambios de alcance, materiales pendientes o impedimentos técnicos deben comunicarse y sus efectos en el calendario acordarse. Este plazo no se aplica automáticamente a otros servicios.",
      ),
      section(
        "dominio",
        "Dominio, alojamiento y continuidad",
        "El registro depende de la disponibilidad y las reglas del registrador. Si ya tienes dominio, debes facilitar los accesos o ajustes necesarios. Titularidad, renovación y gestión de accesos se confirman en la contratación.",
        "Alojamiento y mantenimiento siguen el plan contratado. Migración, archivos, transferencia del dominio y continuidad tras finalizar se organizan según el contrato y los derechos aplicables. Puedes solicitar orientación antes de cancelar.",
      ),
      section(
        "materiais",
        "Materiales y derechos",
        "El cliente debe tener derechos sobre marcas, fotos, videos, textos, música y otros materiales enviados, incluidas autorizaciones de imagen cuando correspondan. No debe enviar contenido ilícito, engañoso o que infrinja derechos.",
        "La titularidad y las licencias de piezas finales, editables, código y recursos externos deben constar en la propuesta o contrato. Enviar materiales no autoriza usos ilimitados fuera del proyecto. El portafolio y los testimonios deben respetar permisos y confidencialidad.",
      ),
      section(
        "cancelamento",
        "Cancelación y reembolso",
        "Solicita la cancelación por sac@njamarketing.com.br o por el canal de contratación, identificando el proyecto. Finalización, importes y transición siguen la oferta, el contrato y la ley. Estos términos no crean multas, permanencia ni una prohibición general de reembolso.",
        "Cuando se aplique la normativa brasileña de consumo a una contratación a distancia, existe un derecho de desistimiento de siete días desde la firma o recepción del producto o servicio, según corresponda, con devolución conforme a la ley. Se mantienen los derechos por fallas del servicio.",
      ),
      section(
        "uso",
        "Uso del sitio y servicios externos",
        "Se prohíben fraude, acceso indebido, contenido malicioso e infracciones de derechos. Reutilizar marcas y materiales requiere la licencia o autorización correspondiente.",
        "WhatsApp, redes sociales, videos y pagos tienen reglas propias. NJA no controla su disponibilidad, sin excluir sus responsabilidades por los servicios contratados.",
      ),
      section(
        "unidades",
        "Unidades y franquicias",
        "Las páginas de unidades presentan la sede y la expansión de NJA. Expresar interés no concede derechos sobre la marca ni formaliza una franquicia. Condiciones y documentos se tratarán en el proceso específico.",
        "La propuesta de cada unidad debe identificar la persona jurídica responsable de contratación, facturación y atención.",
      ),
      section(
        "contato",
        "Privacidad, versiones y consultas",
        "La Política de Privacidad explica el uso de datos. Estos términos pueden actualizarse respetando contratos vigentes y derechos aplicables. La fecha identifica la versión.",
        "Contacto: sac@njamarketing.com.br. Se aplican las leyes brasileñas y las reglas de competencia correspondientes, incluidas las garantías de acceso del consumidor a autoridades y tribunales.",
      ),
    ],
  },
};

export function getLegalCopy(locale: string, kind: LegalKind): LegalDocument {
  return (locale === "en" ? en : locale === "es" ? es : pt)[kind];
}

export function getLegalUi(locale: string) {
  if (locale === "en")
    return {
      badge: "Trust and transparency",
      updated: "Updated",
      contents: "On this page",
      contact: "Questions or requests?",
      contactText:
        "Contact NJA about your project, contract or personal information.",
      related: "Related document",
      sources: "Legal references",
    };
  if (locale === "es")
    return {
      badge: "Confianza y transparencia",
      updated: "Actualización",
      contents: "En esta página",
      contact: "¿Dudas o solicitudes?",
      contactText:
        "Habla con NJA sobre tu proyecto, contrato o datos personales.",
      related: "Documento relacionado",
      sources: "Referencias legales",
    };
  return {
    badge: "Confiança e transparência",
    updated: "Atualização",
    contents: "Nesta página",
    contact: "Dúvidas ou solicitações?",
    contactText:
      "Fale com a NJA sobre seu projeto, sua contratação ou seus dados pessoais.",
    related: "Documento relacionado",
    sources: "Referências legais",
  };
}
