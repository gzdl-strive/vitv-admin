import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-message-box.css';
import 'element-plus/theme-chalk/el-notification.css';
import {
  MessageType,
  MessageFunc,
  ConfirmOptions,
  ConfirmFunc,
  NotifyType,
  NotifyFunc
} from './typing';

declare global {  //设置全局属性
  interface Window {  //window对象属性
    $toast: MessageFunc;   //加入对象
    $confirm: ConfirmFunc;
    $notify: NotifyFunc;
  }
}

const MessageTip = {
  install: () => {
    //封装ElMessage
    window.$toast = (type: MessageType, message: string, duration?: number):Promise<void> => {
      return new Promise((resolve) => {
        ElMessage({
          type,
          message,
          duration,
          showClose: true,
          onClose: () => resolve()
        })
      })
    },
    //封装MessageBox
    window.$confirm = (options: ConfirmOptions): Promise<void> => {
      return new Promise((resolve, reject) => {
        ElMessageBox(options)
          .then(() => resolve())
          .catch(() => reject())
      })
    }
    //封装Notifycation
    window.$notify = (title: string, message: string, type: NotifyType, duration?: number) => {
      ElNotification({
        title,
        message,
        type,
        duration: duration || 2000
      })
    }
  }
}

export default MessageTip;