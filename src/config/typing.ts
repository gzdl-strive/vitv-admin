export interface ElementDefaultConfig {
  readonly size?: 'small' | 'default' | 'large',
  readonly zIndex?: number;
  readonly button?: {
    autoInsertSpace: boolean;
  };
  readonly message?: {
    max: number;
  }
}