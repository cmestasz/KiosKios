export interface FormField {
  tipoCampo: 'input' | 'select' | 'textarea';
  name: string;
  label: string;
  validators?: { [key: string]: string };
  attributes?: { [key: string]: string };
  options?: { label: string; value: any }[];
}