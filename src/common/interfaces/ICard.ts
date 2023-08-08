import { Dayjs } from "dayjs";
import { ICompany } from "./ICompany";

export interface ICard {
  id: string;
  title: string;
  status: string;
  description?: string;
  appearance: Dayjs;
  company: ICompany;
}
