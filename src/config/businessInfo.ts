import { formatDateDisplay } from '../utils/dateUtils.ts';

/**
 * SRI VENKATESHWARA EARTH MOVERS
 * Business Configuration & Placeholders
 * 
 * NOTE: All contact details, pricing, reviews, and address information below
 * are placeholders and can be replaced with verified business data.
 */

export const BUSINESS_INFO = {
  name: "SRI VENKATESHWARA EARTH MOVERS",
  shortName: "SV Earth Movers",
  tagline: "Reliable Earth Moving Equipment for Your Project",
  subtitle: "Quality machinery. On-time service. Ready when you need it.",
  
  // Contact Details (Matching official business logo)
  phone: "+91 9944745410",              // Official Contact Number
  phoneSecondary: "+91 94433 12345",     // [PLACEHOLDER - Site Manager Contact]
  whatsapp: "+91 9944745410",          // Official WhatsApp Number
  email: "contact@srivenkateshwaraearthmovers.com", // [PLACEHOLDER]
  
  // Location Placeholders
  address: "NH-44 Bypass Road, Industrial Estate, Salem - Namakkal Highway, Tamil Nadu 637001", // [PLACEHOLDER]
  city: "Namakkal / Salem",
  state: "Tamil Nadu",
  country: "India",
  pincode: "637001",
  workingHours: "Monday - Sunday: 6:00 AM - 10:00 PM",
  emergencySupport: "24/7 Breakdown Assistance & Operator Support",
  
  // Service Coverage Area
  serviceArea: "Salem, Namakkal, Erode, Coimbatore, Karur, Tiruppur & Surrounding Districts",
  
  // Social & Map Links
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125218.42398516244!2d78.07722425!3d11.218889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babce281315e985%3A0xa1969a2399999a0!2sNamakkal%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  
  // Trust Badges
  trustPoints: [
    {
      title: "Well-Maintained Machinery",
      desc: "Regularly serviced with OEM certified spare parts & genuine lubricants."
    },
    {
      title: "Reliable & Safe Operation",
      desc: "Licensed heavy machinery operators with 8+ years on-site experience."
    },
    {
      title: "Flexible Rental Options",
      desc: "Transparent hourly, daily, weekly, or project-based packages."
    },
    {
      title: "Quick Availability & Support",
      desc: "Rapid on-site mobilization and prompt backup machine replacement."
    }
  ]
};

/**
 * Generate formatted WhatsApp URL with prefilled text
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const cleanPhone = BUSINESS_INFO.whatsapp.replace(/[^0-9]/g, '');
  const message = customMessage || `Hello Sri Venkateshwara Earth Movers, I am interested in inquiring about equipment rental for my construction project.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate WhatsApp URL with prefilled message containing selected equipment and requested dates.
 * Format matching specification:
 * "Hello, I am interested in renting the [EQUIPMENT] from [START DATE] to [END DATE]. Please confirm availability and rental details."
 */
export function getEquipmentBookingWhatsAppUrl(
  equipmentName: string,
  startDateStr?: string,
  endDateStr?: string
): string {
  const start = startDateStr ? formatDateDisplay(startDateStr) : '[START DATE]';
  const end = endDateStr ? formatDateDisplay(endDateStr) : start;
  const message =
    start === end
      ? `Hello, I am interested in renting the ${equipmentName} on ${start}. Please confirm availability and rental details.`
      : `Hello, I am interested in renting the ${equipmentName} from ${start} to ${end}. Please confirm availability and rental details.`;
  return getWhatsAppUrl(message);
}

/**
 * Generate direct Call URL
 */
export function getCallUrl(): string {
  const cleanPhone = BUSINESS_INFO.phone.replace(/[^0-9+]/g, '');
  return `tel:${cleanPhone}`;
}
