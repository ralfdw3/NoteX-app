import { ICard } from "./ICard";

export interface IModalEditCard {
  open: boolean;
  onCancel: () => void;
  cardData?: ICard;
}
