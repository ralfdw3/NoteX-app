import { Dayjs } from "dayjs";

export interface ICard {
  id: number;
  title: string;
  status: string;
  description?: string;
  appearance: Dayjs;
  company: string;
}
