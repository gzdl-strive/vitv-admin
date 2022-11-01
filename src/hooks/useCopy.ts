import Clipboard from 'clipboard';

//如果是svg标签或use标签，使用clipboard报错，需要将事件在父盒子的div上触发
const findParentNode = (node: Element): Element => {
  const nodeName = node?.nodeName;
  if (nodeName === 'svg' || nodeName === 'use') {
    return findParentNode(node?.parentNode as Element);
  }
  return node;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useCopy(text: any, event: Event) {
  const node = findParentNode(event.target as Element);
  const clipboard = new Clipboard(node, {
    text: () => text || '默认值'
  });
  clipboard.on('success', () => {
    window.$toast('success', '复制成功!');
    //释放内存
    clipboard.destroy();
  })
  clipboard.on('error', () => {
    window.$toast('success', '失败!');
    //释放内存
    clipboard.destroy(); 
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { (clipboard as any).onClick(event) }
}