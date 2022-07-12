/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import { ElMessageBoxOptions } from 'element-plus/lib/components/message-box/index';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-message-box.css';
import 'element-plus/theme-chalk/el-notification.css';

declare global {  //设置全局属性
  interface Window {  //window对象属性
    $toast: (type: any, message: string, duration?: number) => Promise<void>;   //加入对象
    $confirm: (options: ElMessageBoxOptions) => Promise<void>;
    $notify: (title: string, message: string, type: any, duration?: number) => void;
  }
}

const ShowMessage = {
  install: () => {
    //封装ElMessage
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.$toast = async (type: any, message: string, duration?: number):Promise<void> => {
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
    window.$confirm = (options: ElMessageBoxOptions): Promise<void> => {
      return new Promise((resolve, reject) => {
        ElMessageBox(options)
          .then(() => resolve())
          .catch(() => reject())
      })
    }
    //封装Notifycation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.$notify = (title: string, message: string, type: any, duration?: number) => {
      ElNotification({
        title,
        message,
        type,
        duration: duration || 2000
      })
    }
  }
}

export default ShowMessage;