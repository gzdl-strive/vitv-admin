import { h } from 'vue';
import SvgIcon from '@/components/SvgIcon/index.vue';

const moonCom = h(SvgIcon, { name: 'moon', height: '2rem', width: '2rem' });
const sunCom = h(SvgIcon, { name: 'sun', height: '2rem', width: '2rem' });

export {
  moonCom,
  sunCom
}