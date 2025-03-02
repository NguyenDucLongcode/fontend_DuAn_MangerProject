declare global {
  type RefetchState = {
    refetchPagination: (() => void) | null;
    refetchModalUpdateUser: (() => void) | null;
  };
}

export {};
