import { User } from "./user";

export interface Response {
  status: number;
  message: string;
  user?: User;
}
