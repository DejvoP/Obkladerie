export type InquiryStatus = "pending" | "done";

export type AdminInquiry = {
  id: string;
  name: string;
  company?: string;
  email: string;
  createdAt: string;
  message: string;
  productName?: string;
  status: InquiryStatus;
  isNew: boolean;
};

export const initialInquiries: AdminInquiry[] = [
  {
    id: "1",
    name: "Michaela Holubová",
    company: "LONG STORY SHORT s.r.o.",
    email: "michaela@longstoryshort.cz",
    createdAt: "2026-09-24T15:05:00",
    message:
      "Dobrý den, poptávám obklady do koupelny v bytě 3+1. Preferujeme matný povrch v tónu travertinu, přibližně 28 m². Prosím o návrh a orientační cenu včetně dopravy.",
    status: "pending",
    isNew: true,
  },
  {
    id: "2",
    name: "Jan Novák",
    email: "jan.novak@email.cz",
    createdAt: "2026-09-23T10:22:00",
    message:
      "Zdravím, zajímá mě venkovní dlažba na terasu cca 40 m². Potřebuji protišmykový povrch a odolnost vůči mrazu. Máte skladem něco v šedé?",
    status: "pending",
    isNew: true,
  },
  {
    id: "3",
    name: "Eva Svobodová",
    company: "Ateliér SVOBODA",
    email: "eva@atelier-svoboda.cz",
    createdAt: "2026-09-20T09:14:00",
    message:
      "Dobrý den, pro klienta hledám velkoformátové dlažby s mramorovým efektem. Ideálně 120×60 cm, lesk. Můžete poslat vzorky do studia?",
    status: "pending",
    isNew: false,
  },
  {
    id: "4",
    name: "Petr Dvořák",
    email: "petr.dvorak@gmail.com",
    createdAt: "2026-09-18T16:40:00",
    message:
      "Dobrý den, chtěl bych doplňky k obkladům — sokly a spárovací hmotu v barvě blízké antracitu. Děkuji.",
    status: "done",
    isNew: false,
  },
  {
    id: "5",
    name: "Klára Benešová",
    company: "Beneš Interiéry",
    email: "klara@benes-interiery.cz",
    createdAt: "2026-09-15T11:08:00",
    message:
      "Poptávám dřevodekor obklady do kuchyně, přibližně 12 m². Preferujeme teplý dub. Prosím o možnosti a termín dodání.",
    status: "done",
    isNew: false,
  },
];

export function formatInquiryDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("cs-CZ", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function inquiryDisplayName(inquiry: AdminInquiry) {
  return inquiry.company
    ? `${inquiry.name} / ${inquiry.company}`
    : inquiry.name;
}

export function countPendingInquiries(items: AdminInquiry[]) {
  return items.filter((item) => item.status === "pending").length;
}

export function parseInquiryMessage(raw: string): {
  productName?: string;
  message: string;
} {
  const match = raw.match(/^Produkt:\s*(.+?)\n\s*\n?([\s\S]*)$/);
  if (!match) return { message: raw };
  return {
    productName: match[1].trim() || undefined,
    message: match[2].trim(),
  };
}
