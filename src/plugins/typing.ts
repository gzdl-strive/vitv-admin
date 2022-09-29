import { ElMessageBoxOptions } from 'element-plus/lib/components/message-box/index';

export type MessageType = 'success' | 'info' | 'warning' | 'error';
export type MessageFunc = (type: MessageType, message: string, duration?: number) => Promise<void>;

export type ConfirmOptions = ElMessageBoxOptions;
export type ConfirmFunc = (options: ElMessageBoxOptions) => Promise<void>;

export type NotifyType = 'success' | 'info' | 'warning' | 'error';
export type NotifyFunc = (title: string, message: string, type: NotifyType, duration?: number) => void;