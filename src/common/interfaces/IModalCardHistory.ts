import { ICompany } from "./ICompany";

export interface IModalCardHistory {
  open: boolean;
  onCancel: () => void;
  company: ICompany;
}
