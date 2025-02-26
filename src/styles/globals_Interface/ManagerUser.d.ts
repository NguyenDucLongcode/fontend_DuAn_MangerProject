declare global {
  interface User {
    No: number;
    email: string;
    userName: string;
    phone: string;
    group: string;
    id: number;
  }

  interface ItemUser {
    id: number | string;
    name: string;
    email?: string;
    phone?: string;
    dataGroup?: {
      name?: string;
    };
  }
}

export {};
