import { siteConfig } from "@/lib/data"
import type { Locale } from "@/lib/i18n"
import type { LegalDocument } from "@/lib/legal/types"

const { name, phone } = siteConfig

export const cookiePolicy: Record<Locale, LegalDocument> = {
  en: {
    label: "LEGAL",
    title: "Cookie Policy",
    intro: `This Cookie Policy explains how ${name} uses cookies and similar technologies on this website, and how you can control them.`,
    sections: [
      {
        id: "what-are-cookies",
        heading: "What are cookies?",
        paragraphs: [
          "Cookies are small text files stored by your browser when you visit a website. Similar technologies include pixels, tags and local identifiers. They help a site work, remember your choices and measure how it is used.",
        ],
      },
      {
        id: "categories",
        heading: "Categories we use",
        list: [
          "Strictly necessary — required for the site to work securely and to remember your cookie choice. These are always on.",
          "Analytics — help us understand which pages are useful and how visitors find us (Google Analytics).",
          "Marketing — measure the results of our Google Ads campaigns, such as calls and quote requests that came from an ad.",
          "Third-party content — the embedded Google Map on our home and contact pages may set Google cookies when it loads.",
        ],
      },
      {
        id: "cookie-list",
        heading: "Cookies on this website",
        table: {
          headers: ["Cookie", "Provider", "Purpose", "Duration", "Category"],
          rows: [
            ["mayord_consent", name, "Stores your cookie preferences", "6 months", "Necessary"],
            ["_ga", "Google Analytics", "Distinguishes unique visitors", "2 years", "Analytics"],
            ["_ga_<ID>", "Google Analytics", "Keeps track of the current session", "2 years", "Analytics"],
            ["_gcl_au", "Google Ads", "Measures ad conversions", "3 months", "Marketing"],
            ["_gcl_aw, _gcl_gs", "Google Ads", "Stores ad click information to attribute calls and leads", "3 months", "Marketing"],
            ["IDE, test_cookie", "Google (doubleclick.net)", "Ad delivery and measurement", "Up to 13 months", "Marketing"],
            ["NID, AEC", "Google Maps", "Map preferences and abuse prevention", "Up to 6 months", "Third-party content"],
          ],
        },
      },
      {
        id: "consent-mode",
        heading: "How your choice is applied",
        paragraphs: [
          "We use Google Consent Mode. When you decline a category, Google tags on this site stop storing or reading cookies for that category and only send limited, cookie-less signals that do not identify you.",
          "Visitors from the European Economic Area, the United Kingdom and Switzerland must opt in before analytics or marketing cookies are used. Visitors elsewhere can opt out at any time. If your browser sends a Global Privacy Control signal, marketing cookies are turned off automatically.",
        ],
      },
      {
        id: "manage",
        heading: "Managing your preferences",
        paragraphs: [
          "You can change or withdraw your choice at any time using the Cookie Settings button below or the link in the footer of every page. When you withdraw consent we also delete the related cookies we can access.",
          "You can also block or delete cookies in your browser settings, opt out of Google Analytics with Google's browser add-on (tools.google.com/dlpage/gaoptout), and manage ad personalization at adssettings.google.com. Blocking all cookies may cause parts of the site to stop working.",
        ],
        showCookieSettings: true,
      },
      {
        id: "contact",
        heading: "Questions",
        paragraphs: [`If you have questions about cookies, call us at ${phone} or see our Privacy Policy.`],
      },
    ],
  },
  es: {
    label: "LEGAL",
    title: "Política de Cookies",
    intro: `Esta Política de Cookies explica cómo ${name} usa cookies y tecnologías similares en este sitio web, y cómo puede controlarlas.`,
    sections: [
      {
        id: "que-son",
        heading: "¿Qué son las cookies?",
        paragraphs: [
          "Las cookies son pequeños archivos de texto que su navegador guarda cuando visita un sitio web. Las tecnologías similares incluyen píxeles, etiquetas e identificadores locales. Ayudan a que el sitio funcione, recuerdan sus preferencias y miden cómo se usa.",
        ],
      },
      {
        id: "categorias",
        heading: "Categorías que usamos",
        list: [
          "Estrictamente necesarias — imprescindibles para que el sitio funcione de forma segura y para recordar su preferencia de cookies. Siempre están activas.",
          "Analítica — nos ayudan a entender qué páginas son útiles y cómo nos encuentran los visitantes (Google Analytics).",
          "Marketing — miden los resultados de nuestras campañas de Google Ads, como llamadas y cotizaciones que provienen de un anuncio.",
          "Contenido de terceros — el mapa de Google integrado en las páginas de inicio y contacto puede establecer cookies de Google al cargarse.",
        ],
      },
      {
        id: "lista-de-cookies",
        heading: "Cookies en este sitio web",
        table: {
          headers: ["Cookie", "Proveedor", "Finalidad", "Duración", "Categoría"],
          rows: [
            ["mayord_consent", name, "Guarda sus preferencias de cookies", "6 meses", "Necesaria"],
            ["_ga", "Google Analytics", "Distingue visitantes únicos", "2 años", "Analítica"],
            ["_ga_<ID>", "Google Analytics", "Mantiene el estado de la sesión", "2 años", "Analítica"],
            ["_gcl_au", "Google Ads", "Mide conversiones de anuncios", "3 meses", "Marketing"],
            ["_gcl_aw, _gcl_gs", "Google Ads", "Guarda información del clic en el anuncio para atribuir llamadas y cotizaciones", "3 meses", "Marketing"],
            ["IDE, test_cookie", "Google (doubleclick.net)", "Entrega y medición de anuncios", "Hasta 13 meses", "Marketing"],
            ["NID, AEC", "Google Maps", "Preferencias del mapa y prevención de abusos", "Hasta 6 meses", "Contenido de terceros"],
          ],
        },
      },
      {
        id: "modo-de-consentimiento",
        heading: "Cómo se aplica su elección",
        paragraphs: [
          "Usamos el Modo de Consentimiento de Google. Cuando rechaza una categoría, las etiquetas de Google en este sitio dejan de guardar o leer cookies de esa categoría y solo envían señales limitadas, sin cookies, que no le identifican.",
          "Los visitantes del Espacio Económico Europeo, el Reino Unido y Suiza deben aceptar antes de que se usen cookies de analítica o marketing. Los visitantes de otros lugares pueden excluirse en cualquier momento. Si su navegador envía una señal Global Privacy Control, las cookies de marketing se desactivan automáticamente.",
        ],
      },
      {
        id: "gestionar",
        heading: "Cómo gestionar sus preferencias",
        paragraphs: [
          "Puede cambiar o retirar su elección en cualquier momento con el botón Configuración de cookies que aparece abajo o con el enlace en el pie de cada página. Al retirar su consentimiento también eliminamos las cookies relacionadas a las que tenemos acceso.",
          "También puede bloquear o eliminar cookies en la configuración de su navegador, excluirse de Google Analytics con el complemento de Google (tools.google.com/dlpage/gaoptout) y gestionar la personalización de anuncios en adssettings.google.com. Bloquear todas las cookies puede hacer que partes del sitio dejen de funcionar.",
        ],
        showCookieSettings: true,
      },
      {
        id: "preguntas",
        heading: "Preguntas",
        paragraphs: [`Si tiene preguntas sobre las cookies, llámenos al ${phone} o consulte nuestra Política de Privacidad.`],
      },
    ],
  },
}
