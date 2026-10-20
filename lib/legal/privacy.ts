import { siteConfig } from "@/lib/data"
import type { Locale } from "@/lib/i18n"
import type { LegalDocument } from "@/lib/legal/types"

const { name, phone, address } = siteConfig

export const privacyPolicy: Record<Locale, LegalDocument> = {
  en: {
    label: "LEGAL",
    title: "Privacy Policy",
    intro: `This Privacy Policy explains how ${name} ("we", "us") collects, uses, shares and protects personal information when you visit our website, request a quote, call, text or message us. We are a small, family-owned business and we only collect what we need to help you with your tires.`,
    sections: [
      {
        id: "who-we-are",
        heading: "Who we are",
        paragraphs: [
          `${name} is located at ${address.full}. You can reach us at ${phone}. We are the controller of the personal information described in this policy.`,
        ],
      },
      {
        id: "information-we-collect",
        heading: "Information we collect",
        paragraphs: ["Information you give us:"],
        list: [
          "Contact details such as your name, phone number and (optionally) email address.",
          "Vehicle and service details such as tire size, vehicle make/model, the service you are interested in and any message you send.",
          "Information you share when you call, text or message us on WhatsApp, including your phone number and the content of the conversation.",
          "Information collected automatically: IP address, device and browser type, pages viewed, referring website, approximate location derived from IP, ad click identifiers (for example a Google Ads click ID) and interactions such as tapping a call or WhatsApp button. This is collected through cookies and similar technologies described in our Cookie Policy.",
        ],
      },
      {
        id: "how-we-use",
        heading: "How we use your information",
        list: [
          "To respond to quote requests, answer questions and provide tire and mobile roadside services.",
          "To dispatch mobile service to your location when you ask for it.",
          "To operate, secure and improve our website, including preventing spam and abuse.",
          "To understand which pages and ads bring customers to us (analytics and ad measurement), subject to your cookie choices.",
          "To comply with legal obligations and protect our rights.",
        ],
      },
      {
        id: "how-we-share",
        heading: "How we share information",
        paragraphs: [
          "We do not sell your personal information for money. We share information only with service providers that help us run our business, under agreements that limit their use of it:",
        ],
        list: [
          "Web3Forms — delivers contact form submissions to our inbox.",
          "Vercel — hosts this website.",
          "Google (Analytics, Ads, Tag Manager and Maps) — website analytics, advertising measurement and embedded maps.",
          "Meta (WhatsApp) — only if you choose to message us on WhatsApp.",
          "Authorities or advisors when required by law, to respond to legal process, or to protect the safety of our customers, staff or the public.",
        ],
      },
      {
        id: "targeted-advertising",
        heading: "Advertising cookies and your opt-out rights",
        paragraphs: [
          "Some state privacy laws treat the use of advertising cookies to measure or personalize ads as \"sharing\" or \"targeted advertising\". You can opt out at any time with the Cookie Settings button below or in the footer of every page.",
          "We honor Global Privacy Control (GPC). If your browser sends a GPC signal, we automatically turn off advertising cookies for that browser.",
        ],
        showCookieSettings: true,
      },
      {
        id: "your-rights",
        heading: "Your privacy rights",
        paragraphs: [
          "Depending on where you live — including under the Maryland Online Data Privacy Act and similar state laws, and the GDPR for visitors from Europe — you may have the right to:",
        ],
        list: [
          "Confirm whether we process your personal information and access a copy of it.",
          "Correct inaccurate information.",
          "Delete your personal information.",
          "Receive your information in a portable format.",
          "Opt out of targeted advertising, sale of personal data, and profiling.",
          "Appeal our decision if we decline your request.",
        ],
      },
      {
        id: "exercising-rights",
        heading: "How to make a request",
        paragraphs: [
          `Call us at ${phone}, send us a message through our contact page, or write to us at ${address.full}. We may need to verify your identity before acting on a request. We will respond within 45 days, and we will never discriminate against you for exercising your rights. If we deny your request you may appeal by replying to our decision; if you are still not satisfied you may contact the Maryland Attorney General's Office.`,
        ],
      },
      {
        id: "calls-and-texts",
        heading: "Calls, text messages and WhatsApp",
        paragraphs: [
          "When you submit a form or contact us, you agree that we may call or text you at the number you provided about your request. We do not send marketing text messages, and we do not share your mobile number with third parties for their marketing. Message and data rates may apply. Reply STOP at any time to stop receiving texts.",
        ],
      },
      {
        id: "retention",
        heading: "How long we keep information",
        paragraphs: [
          "We keep quote requests and customer communications for as long as needed to serve you and for our business records, generally no longer than 24 months unless the law requires otherwise. Analytics data is retained by Google for up to 14 months. Your cookie choice is stored for 6 months.",
        ],
      },
      {
        id: "security",
        heading: "How we protect information",
        paragraphs: [
          "This website is served only over encrypted HTTPS connections and uses modern browser security protections. Access to customer information is limited to the people who need it to help you. No method of transmission or storage is 100% secure, so please do not send sensitive information such as payment card numbers through our forms.",
        ],
      },
      {
        id: "children",
        heading: "Children",
        paragraphs: [
          "Our website and services are intended for adults. We do not knowingly collect personal information from children under 13, and we do not sell or use for targeted advertising the data of anyone we know to be under 18. If you believe a child has sent us information, contact us and we will delete it.",
        ],
      },
      {
        id: "international",
        heading: "Visitors outside the United States",
        paragraphs: [
          "We operate in Maryland, USA and information is processed in the United States. Visitors from the European Economic Area, the United Kingdom and Switzerland are asked for consent before any analytics or advertising cookies are used.",
        ],
      },
      {
        id: "changes",
        heading: "Changes to this policy",
        paragraphs: [
          "We may update this policy from time to time. The date at the top of the page shows when it was last changed. Significant changes will be highlighted on this website.",
        ],
      },
      {
        id: "contact",
        heading: "Contact us",
        paragraphs: [`${name} · ${address.full} · ${phone}`],
      },
    ],
  },
  es: {
    label: "LEGAL",
    title: "Política de Privacidad",
    intro: `Esta Política de Privacidad explica cómo ${name} ("nosotros") recopila, usa, comparte y protege la información personal cuando usted visita nuestro sitio web, solicita una cotización, nos llama, nos envía un mensaje de texto o nos escribe. Somos un negocio familiar pequeño y solo recopilamos lo necesario para ayudarle con sus llantas.`,
    sections: [
      {
        id: "quienes-somos",
        heading: "Quiénes somos",
        paragraphs: [
          `${name} está ubicado en ${address.full}. Puede comunicarse con nosotros al ${phone}. Somos el responsable de la información personal descrita en esta política.`,
        ],
      },
      {
        id: "informacion-que-recopilamos",
        heading: "Información que recopilamos",
        paragraphs: ["Información que usted nos proporciona:"],
        list: [
          "Datos de contacto como su nombre, número de teléfono y (opcionalmente) correo electrónico.",
          "Datos del vehículo y del servicio, como la medida de la llanta, marca/modelo del vehículo, el servicio que le interesa y cualquier mensaje que nos envíe.",
          "Información que comparte cuando nos llama, nos envía un mensaje de texto o nos escribe por WhatsApp, incluido su número de teléfono y el contenido de la conversación.",
          "Información recopilada automáticamente: dirección IP, tipo de dispositivo y navegador, páginas visitadas, sitio de procedencia, ubicación aproximada según la IP, identificadores de clics en anuncios (por ejemplo, el ID de clic de Google Ads) e interacciones como tocar el botón de llamar o de WhatsApp. Se recopila mediante cookies y tecnologías similares descritas en nuestra Política de Cookies.",
        ],
      },
      {
        id: "como-usamos",
        heading: "Cómo usamos su información",
        list: [
          "Para responder a solicitudes de cotización, contestar preguntas y prestar servicios de llantas y asistencia móvil.",
          "Para enviar el servicio móvil a su ubicación cuando usted lo solicita.",
          "Para operar, proteger y mejorar nuestro sitio web, incluida la prevención de spam y abusos.",
          "Para entender qué páginas y anuncios nos traen clientes (analítica y medición de anuncios), según sus preferencias de cookies.",
          "Para cumplir con obligaciones legales y proteger nuestros derechos.",
        ],
      },
      {
        id: "como-compartimos",
        heading: "Cómo compartimos la información",
        paragraphs: [
          "No vendemos su información personal a cambio de dinero. Solo compartimos información con proveedores que nos ayudan a operar el negocio, bajo acuerdos que limitan su uso:",
        ],
        list: [
          "Web3Forms — entrega los formularios de contacto a nuestro correo.",
          "Vercel — aloja este sitio web.",
          "Google (Analytics, Ads, Tag Manager y Maps) — analítica web, medición de publicidad y mapas integrados.",
          "Meta (WhatsApp) — solo si usted decide escribirnos por WhatsApp.",
          "Autoridades o asesores cuando la ley lo exija, para responder a procesos legales o para proteger la seguridad de nuestros clientes, empleados o el público.",
        ],
      },
      {
        id: "publicidad-dirigida",
        heading: "Cookies de publicidad y su derecho a excluirse",
        paragraphs: [
          "Algunas leyes estatales de privacidad consideran el uso de cookies publicitarias para medir o personalizar anuncios como \"compartir\" datos o \"publicidad dirigida\". Puede excluirse en cualquier momento con el botón Configuración de cookies que aparece abajo o en el pie de cada página.",
          "Respetamos la señal Global Privacy Control (GPC). Si su navegador envía una señal GPC, desactivamos automáticamente las cookies publicitarias en ese navegador.",
        ],
        showCookieSettings: true,
      },
      {
        id: "sus-derechos",
        heading: "Sus derechos de privacidad",
        paragraphs: [
          "Según dónde viva — incluida la Ley de Privacidad de Datos en Línea de Maryland (MODPA) y leyes estatales similares, y el RGPD para visitantes de Europa — usted puede tener derecho a:",
        ],
        list: [
          "Confirmar si tratamos su información personal y obtener una copia.",
          "Corregir información inexacta.",
          "Eliminar su información personal.",
          "Recibir su información en un formato portátil.",
          "Excluirse de la publicidad dirigida, la venta de datos personales y la elaboración de perfiles.",
          "Apelar nuestra decisión si rechazamos su solicitud.",
        ],
      },
      {
        id: "como-ejercer",
        heading: "Cómo hacer una solicitud",
        paragraphs: [
          `Llámenos al ${phone}, envíenos un mensaje desde nuestra página de contacto o escríbanos a ${address.full}. Es posible que necesitemos verificar su identidad antes de atender la solicitud. Responderemos dentro de 45 días y nunca le discriminaremos por ejercer sus derechos. Si rechazamos su solicitud, puede apelar respondiendo a nuestra decisión; si aún no está satisfecho, puede comunicarse con la Oficina del Fiscal General de Maryland.`,
        ],
      },
      {
        id: "llamadas-y-mensajes",
        heading: "Llamadas, mensajes de texto y WhatsApp",
        paragraphs: [
          "Cuando envía un formulario o se comunica con nosotros, acepta que podamos llamarle o enviarle mensajes de texto al número que proporcionó sobre su solicitud. No enviamos mensajes de texto de mercadeo y no compartimos su número con terceros para fines de mercadeo. Pueden aplicarse tarifas de mensajes y datos. Responda STOP en cualquier momento para dejar de recibir mensajes.",
        ],
      },
      {
        id: "conservacion",
        heading: "Cuánto tiempo conservamos la información",
        paragraphs: [
          "Conservamos las solicitudes de cotización y las comunicaciones con clientes el tiempo necesario para atenderle y para nuestros registros, por lo general no más de 24 meses salvo que la ley exija otra cosa. Google conserva los datos de analítica hasta 14 meses. Su preferencia de cookies se guarda por 6 meses.",
        ],
      },
      {
        id: "seguridad",
        heading: "Cómo protegemos la información",
        paragraphs: [
          "Este sitio se sirve únicamente mediante conexiones HTTPS cifradas y usa protecciones de seguridad modernas del navegador. El acceso a la información de clientes está limitado a las personas que la necesitan para ayudarle. Ningún método de transmisión o almacenamiento es 100% seguro, por lo que le pedimos no enviar información sensible, como números de tarjetas de pago, a través de nuestros formularios.",
        ],
      },
      {
        id: "menores",
        heading: "Menores de edad",
        paragraphs: [
          "Nuestro sitio y servicios están dirigidos a adultos. No recopilamos a sabiendas información de menores de 13 años, y no vendemos ni usamos para publicidad dirigida los datos de personas que sabemos que son menores de 18. Si cree que un menor nos envió información, contáctenos y la eliminaremos.",
        ],
      },
      {
        id: "internacional",
        heading: "Visitantes fuera de Estados Unidos",
        paragraphs: [
          "Operamos en Maryland, EE. UU., y la información se procesa en Estados Unidos. A los visitantes del Espacio Económico Europeo, el Reino Unido y Suiza se les pide su consentimiento antes de usar cookies de analítica o publicidad.",
        ],
      },
      {
        id: "cambios",
        heading: "Cambios a esta política",
        paragraphs: [
          "Podemos actualizar esta política ocasionalmente. La fecha al inicio de la página indica la última modificación. Los cambios importantes se destacarán en este sitio web.",
        ],
      },
      {
        id: "contacto",
        heading: "Contáctenos",
        paragraphs: [`${name} · ${address.full} · ${phone}`],
      },
    ],
  },
}
