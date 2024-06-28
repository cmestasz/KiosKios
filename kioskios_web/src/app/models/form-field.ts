export interface FormField {
  tipoCampo: TipoCampo;
  name: string;
  label: string;
  attributes?: Attributes;
}

export type TipoCampo = 'input' | 'select' | 'textarea';

export interface Attributes {
  [key : string]: string;
}