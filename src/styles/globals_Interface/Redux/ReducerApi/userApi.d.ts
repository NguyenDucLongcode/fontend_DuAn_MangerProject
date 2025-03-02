declare global {
  // get User by id
  interface getUserByIdRequest {
    errCode: number;
    data: DataUserById;
    message: string;
  }
  interface DataUserById {
    name: string;
    email: string;
    phone: string;
    sex: string;
    address: string;
    isCustomer: string;
    groupId: number;
    createdAt: string;
    dataGroup: {
      name: string;
    };
  }
}

export {};
