export interface FormData {
  name: string;
  phone: string;
  city: string;
  email?: string;
  lead_type: string;
  comments?: string;
}

export interface LeadFormProps {
  slugs: string[];
  onSubmit: (data: FormData) => void;
}