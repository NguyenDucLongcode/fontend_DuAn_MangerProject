declare global {
  //data selected group
  interface GroupResponse {
    data: Group[];
    errCode: number;
    message: string;
  }
}

export {};
