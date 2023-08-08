import { ICompany } from "./ICompany";

export interface IModalCompany {
  open: boolean;
  onCancel: () => void;
  companyData: ICompany;
}
