export interface InboundRequest {
  location: string;
  category: string;
  supplierOrganisation: string;
  invoiceNumber?: string;
  paymentMethod: string;
  amount: number;
  description?: string;
  advertisedLvEvent: "Y" | "N";
  contact?: string;
  notes?: string;
  postcode?: string;
  lvTransportReq: "Y" | "N";
  expDeliveryDate?: string;
  thankyouSent: "Y" | "N";
  thankyouInitial?: string;
  usagePlan?: string;
  tags: { name: string }[];
}

export const locations = [
  "Brent",
  "Wandsworth",
  "Camden",
  "Hounslow",
  "Roehampton",
  "Southwark",
  "Tooting",
  "Other",
];

export const paymentMethodEnum = {
  Invoice: "Invoice",
  Card: "Card",
  Cash: "Cash",
  Equals: "Equals",
  Other: "Other",
};
