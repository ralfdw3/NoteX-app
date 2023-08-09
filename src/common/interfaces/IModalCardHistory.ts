import { ICard } from "./ICard";

export interface IModalCardHistory {
  open: boolean;
  onCancel: () => void;
  companyId: string;
  companyName?: string;
  allCompanyCards: ICard[];
  totalPages: number;
  pageNumber: number;
  handlePageNumber: () => void;
}
