interface IntroItem {
  id: string;
  title: string;
  content: string;
}

const IntroList: IntroItem[] = [
  {
    id: '001',
    title: '系统介绍',
    content: 'vitv-admin是一个通过Vite构建的，基于Vue3、Element-Plus、TypeScript搭建的管理系统，为中小型项目开发提供开箱即用的解决方案。'
  },
  {
    id: '002',
    title: '我的目的',
    content: '学习Vite、Vue3和TS等。顺便学学ThreeJS的基础知识以及Blender建模技巧.'
  }
];

export default IntroList;