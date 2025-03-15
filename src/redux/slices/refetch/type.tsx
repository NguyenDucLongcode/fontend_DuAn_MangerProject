export interface RefetchState {
  refetchPaginationUser: (() => void) | null;
  refetchPaginationRole: (() => void) | null;
}
