export interface RefetchState {
  refetchPaginationUser: (() => void) | null;
  refetchPaginationRole: (() => void) | null;
  refetchPaginationAssign: (() => void) | null;
  refetchPaginationProject: (() => void) | null;
}
