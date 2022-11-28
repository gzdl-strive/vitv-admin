import { ElementDefaultConfig } from './typing';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

const defaultConfig: ElementDefaultConfig = {
  size: 'default',
  zIndex: 1000,
  button: {
    autoInsertSpace: false
  },
  message: {
    max: 2
  },
  locale: zhCn
}

export {
  defaultConfig
}