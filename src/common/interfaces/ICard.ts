import { Dayjs } from "dayjs";
import { ICompany } from "./ICompany";

export interface ICard {
  id: string;
  status: string;
  description?: string;
  appearance: Dayjs;
  company: ICompany;
  creation: Dayjs;
}
