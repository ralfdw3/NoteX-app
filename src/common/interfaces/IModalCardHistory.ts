export interface IModalCardHistory {
  open: boolean;
  onCancel: () => void;
  companyId: string;
  companyCode: string;
  companyName?: string;
}
