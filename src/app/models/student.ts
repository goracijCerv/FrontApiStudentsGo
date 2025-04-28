export interface Student {
  id: number;
  name: string;
  lastname: string;
  email: string;
  number: number;
  age: number;
}

export interface EmailPayload {
  to: string;
  subject: string;
  greeting: string;
  message: string;
  actionDetails: string;
  steps: string[];
  recipientName: string;
  senderName: string;
  senderTitle: string;
}
