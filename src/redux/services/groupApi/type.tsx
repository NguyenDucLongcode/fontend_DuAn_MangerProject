// get all group
export interface GroupResponse {
  data: Group[];
  errCode: number;
  message: string;
}
interface Group {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}
