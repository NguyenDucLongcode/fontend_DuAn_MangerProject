declare global {
  type RefetchState = {
    refetchPagination: (() => void) | null;
  };
}

export {};
