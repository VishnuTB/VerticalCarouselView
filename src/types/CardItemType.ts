export interface CardItemType {
  id: number;
  type: 'debit' | 'credit';
  balance: number;
  userImage: string;
}
