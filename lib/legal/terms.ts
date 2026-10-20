import { siteConfig } from "@/lib/data"
import type { Locale } from "@/lib/i18n"
import type { LegalDocument } from "@/lib/legal/types"

const { name, phone, address } = siteConfig

export const termsOfService: Record<Locale, LegalDocument> = {
  en: {
    label: "LEGAL",
    title: "Terms of Service",
    intro: `These Terms of Service govern your use of this website and the services offered by ${name}. By using the site or requesting service, you agree to these terms.`,
    sections: [
      {
        id: "quotes",
        heading: "Quotes, prices and availability",
        paragraphs: [
          "Prices and quotes given online, by phone, text or WhatsApp are estimates based on the information you provide. The final price is confirmed at the time of service after we inspect your vehicle and tires. Tire inventory, especially used tires, changes daily and is subject to availability.",
        ],
      },
      {
        id: "used-tires",
        heading: "Used tires",
        paragraphs: [
          "Every used tire is inspected before sale. Tread depth, age and appearance vary from tire to tire, and we will describe the condition to you. Unless we tell you otherwise in writing, used tires are sold as-is without a manufacturer warranty. Keeping tires properly inflated, rotated and maintained is the vehicle owner's responsibility.",
        ],
      },
      {
        id: "mobile-service",
        heading: "Mobile tire service",
        paragraphs: [
          "Mobile service is available within our service area around Edgewater, MD. Arrival times are estimates and may change because of traffic, weather or other jobs. For everyone's safety we may decline or reschedule service at locations we consider unsafe, such as active highway lanes. You must be the owner of the vehicle or authorized to request service on it.",
        ],
      },
      {
        id: "customer-responsibilities",
        heading: "Your responsibilities",
        list: [
          "Provide accurate information about your vehicle, tire size and location.",
          "Provide wheel lock keys when needed and tell us about any known wheel, sensor or vehicle issues.",
          "Inspect the work before leaving and tell us right away about any concern.",
        ],
      },
      {
        id: "warranties",
        heading: "Warranties",
        paragraphs: [
          "New tires carry the manufacturer's warranty, where applicable. We stand behind our workmanship; if there is a problem with work we performed, contact us promptly and we will make it right. Except as stated here or required by law, services are provided without other warranties, express or implied.",
        ],
      },
      {
        id: "liability",
        heading: "Limitation of liability",
        paragraphs: [
          `To the fullest extent permitted by Maryland law, ${name} is not liable for indirect, incidental or consequential damages, and our total liability for any claim related to a service is limited to the amount you paid for that service. Nothing in these terms limits liability that cannot be limited under applicable law.`,
        ],
      },
      {
        id: "website-use",
        heading: "Use of this website",
        paragraphs: [
          "Website content is provided for general information and may change without notice. You agree not to misuse the site, including by attempting to gain unauthorized access, interfering with its operation, submitting spam or false requests, or scraping content with automated tools.",
          "Reviews shown on this site come from Google and Yelp and reflect the opinions of their authors. Links to third-party websites are provided for convenience and are governed by those websites' own terms and privacy policies.",
        ],
      },
      {
        id: "ip",
        heading: "Intellectual property",
        paragraphs: [
          `The ${name} name, logo, photos and website content belong to us or our licensors and may not be copied or reused without permission.`,
        ],
      },
      {
        id: "law",
        heading: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of the State of Maryland. Any dispute will be handled in the state or federal courts located in Anne Arundel County, Maryland, unless the law requires otherwise.",
        ],
      },
      {
        id: "changes",
        heading: "Changes to these terms",
        paragraphs: ["We may update these terms from time to time. The date at the top of the page shows the latest version."],
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
    title: "Términos de Servicio",
    intro: `Estos Términos de Servicio rigen el uso de este sitio web y de los servicios que ofrece ${name}. Al usar el sitio o solicitar un servicio, usted acepta estos términos.`,
    sections: [
      {
        id: "cotizaciones",
        heading: "Cotizaciones, precios y disponibilidad",
        paragraphs: [
          "Los precios y cotizaciones dados en línea, por teléfono, texto o WhatsApp son estimados basados en la información que usted proporciona. El precio final se confirma al momento del servicio después de inspeccionar su vehículo y sus llantas. El inventario de llantas, especialmente de llantas usadas, cambia a diario y está sujeto a disponibilidad.",
        ],
      },
      {
        id: "llantas-usadas",
        heading: "Llantas usadas",
        paragraphs: [
          "Cada llanta usada se inspecciona antes de la venta. La profundidad del dibujo, la antigüedad y la apariencia varían de una llanta a otra, y le describiremos su estado. Salvo que le indiquemos lo contrario por escrito, las llantas usadas se venden en el estado en que se encuentran, sin garantía del fabricante. Mantener las llantas con la presión adecuada, rotadas y en buen estado es responsabilidad del dueño del vehículo.",
        ],
      },
      {
        id: "servicio-movil",
        heading: "Servicio móvil de llantas",
        paragraphs: [
          "El servicio móvil está disponible dentro de nuestra zona de servicio alrededor de Edgewater, MD. Los tiempos de llegada son estimados y pueden cambiar por tráfico, clima u otros trabajos. Por la seguridad de todos, podemos rechazar o reprogramar el servicio en lugares que consideremos inseguros, como carriles activos de autopista. Usted debe ser el dueño del vehículo o estar autorizado para solicitar el servicio.",
        ],
      },
      {
        id: "responsabilidades",
        heading: "Sus responsabilidades",
        list: [
          "Proporcionar información precisa sobre su vehículo, la medida de la llanta y su ubicación.",
          "Entregar la llave de seguridad de los rines cuando sea necesario e informarnos de cualquier problema conocido en rines, sensores o el vehículo.",
          "Revisar el trabajo antes de irse e informarnos de inmediato cualquier inquietud.",
        ],
      },
      {
        id: "garantias",
        heading: "Garantías",
        paragraphs: [
          "Las llantas nuevas cuentan con la garantía del fabricante, cuando aplique. Respaldamos nuestro trabajo; si hay un problema con un trabajo que realizamos, contáctenos pronto y lo resolveremos. Salvo lo indicado aquí o lo que exija la ley, los servicios se prestan sin otras garantías, expresas o implícitas.",
        ],
      },
      {
        id: "responsabilidad",
        heading: "Limitación de responsabilidad",
        paragraphs: [
          `En la máxima medida permitida por la ley de Maryland, ${name} no es responsable de daños indirectos, incidentales o consecuentes, y nuestra responsabilidad total por cualquier reclamo relacionado con un servicio se limita al monto que usted pagó por ese servicio. Nada en estos términos limita la responsabilidad que no pueda limitarse según la ley aplicable.`,
        ],
      },
      {
        id: "uso-del-sitio",
        heading: "Uso de este sitio web",
        paragraphs: [
          "El contenido del sitio se ofrece como información general y puede cambiar sin previo aviso. Usted acepta no hacer mal uso del sitio, lo que incluye intentar acceder sin autorización, interferir con su funcionamiento, enviar spam o solicitudes falsas, o extraer contenido con herramientas automatizadas.",
          "Las reseñas mostradas en este sitio provienen de Google y Yelp y reflejan la opinión de sus autores. Los enlaces a sitios de terceros se ofrecen por conveniencia y se rigen por los términos y políticas de privacidad de esos sitios.",
        ],
      },
      {
        id: "propiedad-intelectual",
        heading: "Propiedad intelectual",
        paragraphs: [
          `El nombre ${name}, el logotipo, las fotos y el contenido del sitio nos pertenecen a nosotros o a nuestros licenciantes y no pueden copiarse ni reutilizarse sin permiso.`,
        ],
      },
      {
        id: "ley-aplicable",
        heading: "Ley aplicable",
        paragraphs: [
          "Estos términos se rigen por las leyes del Estado de Maryland. Cualquier disputa se atenderá en los tribunales estatales o federales del condado de Anne Arundel, Maryland, salvo que la ley exija otra cosa.",
        ],
      },
      {
        id: "cambios",
        heading: "Cambios a estos términos",
        paragraphs: ["Podemos actualizar estos términos ocasionalmente. La fecha al inicio de la página indica la versión más reciente."],
      },
      {
        id: "contacto",
        heading: "Contáctenos",
        paragraphs: [`${name} · ${address.full} · ${phone}`],
      },
    ],
  },
}
