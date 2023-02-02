import { CommonObject } from "@/typing";

export type StandardAPICode = '200' | '404' | '500'; // 成功 | 请求错误 | 服务器异常

export type StandardAPIOpt = {
  code: StandardAPICode;
  data: CommonObject;
  currentPage: number;
  pageSize: number;
  total: number;
}