export type FullScreenAction = 'enable' | 'cancel';

export type VerifyCodeType = 'blend' | 'number' | 'letter';
export type VerifyCodeOpt = {
  id: string;
  parentId: string;
  width?: number;
  height?: number;
  type?: VerifyCodeType;
  code?: string;
}