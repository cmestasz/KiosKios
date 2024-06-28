export interface FormField {
  tipoCampo: TipoCampo;
  name: string;
  label: string;
  attributes?: Attributes;
  content?: Content
}

export type TipoCampo = 'input' | 'select' | 'textarea';

export interface Attributes {
  [key : string]: string;
}

export interface Content {
  tag: string;
  inner: string;
  attributes?: Attributes;
}