import { ICard } from "./ICard";

export interface IModalCard {
  open: boolean;
  onCancel: () => void;
  headerText: string;
  cardData?: ICard;
}
