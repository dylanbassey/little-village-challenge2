export interface InboundRequest {
  location: string;
  inboundCategory: string;
  supplier: string;
  orderNumber: string;
  paymentMethod: paymentMethodEnum;
  amount: number;
  advertisedLVEvent: boolean;
  contact: string;
  notes: string;
  postcode: string;
  LVTransportRequired: boolean;
  expectedDeliveryDate: string;
  thankYouSent: boolean;
  thankYouInitial: string;
  usagePlan: string;
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

export enum paymentMethodEnum {
  Invoice = "Invoice",
  Card = "Card",
  Cash = "Cash",
  Equals = "Equals",
  Other = "Other",
}
