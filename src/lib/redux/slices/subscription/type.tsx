import { AccountUser } from "../auth/type";

export interface SubScriptionState {
  inforSubScription: InforSubScription | null;
}

export interface InforSubScription {
  id: string;
  plan: string;
  expiresAt: string;
  price: number;
  createdAt: string;
  user: AccountUser;
}
