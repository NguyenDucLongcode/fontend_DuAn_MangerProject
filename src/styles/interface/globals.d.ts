declare global {
  interface PaginationUserData {
    address: string | null;
    createdAt: string | null;
    group: {
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

  interface PaginationProjectData {
    id: number;
    name: string;
    startDate: string;
    description: string;
    projectManagerId: number;
    customerId: number;
    createdAt: string;
  }
}

export {};
