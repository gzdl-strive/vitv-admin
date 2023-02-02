export interface AddOrEditAccount {
  title: string;
  type: 'add' | 'edit';
  username: string;
  password: string;
}