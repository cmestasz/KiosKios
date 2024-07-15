export interface User {
  id: number;
  email: string;
  username: string;
  telefono: string;
  yape_qr?: string;
  tipo: 'US' | 'DU' | 'AD';
}
