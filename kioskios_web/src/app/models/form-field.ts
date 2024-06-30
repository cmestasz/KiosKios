export interface FormField {
  tipoCampo: TipoCampo;
  name: string;
  label: string;
  type?: string;
  validators?: Validators;
  attributes?: Attributes;
  options?: Option[];
}

export type TipoCampo = 'input' | 'select' | 'textarea';

export interface Validators {
  [key : string]: string;
}

export interface Attributes {
  [key : string]: string;
}

export interface Option {
  label: string;
  value: any;
}