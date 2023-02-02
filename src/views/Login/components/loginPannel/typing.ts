import GetVerifyCode from "@/utils/getVerifyCode";

export type ForgotData = {
  step: 0 | 1;
  verifyCode: string;
  g: GetVerifyCode | null;
  checkLoading: boolean;
  viewPwd: boolean;
}