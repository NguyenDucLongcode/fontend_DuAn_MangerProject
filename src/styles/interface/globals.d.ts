declare global {
  interface PaginationUserData {
    address: string | null;
    createdAt: string | null;
    dataGroup: {
      name: string;
    };
    email: string;
    groupId: number;
    id: number;
    isCustomer: string;
    name: string | null;
    phone: string | null;
    sex: string | null;
  }
  interface PaginationRoleData {
    id: number;
    url: string;
    description: string;
    createdAt: string;
  }
}

export {};
