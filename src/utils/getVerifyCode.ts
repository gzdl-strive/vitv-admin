import { VerifyCodeType, VerifyCodeOpt } from './typing';
import { generateRandomNum, generateRandomColor } from './index';

class GetVerifyCode {
  id: string;
  parentId: string;
  width: number;
  height: number;
  type: VerifyCodeType;
  code: string;
  numList: string[];
  letterList: string[];
  constructor(_options: VerifyCodeOpt) {
    this.id = _options.id;
    this.parentId = _options.parentId;
    this.width = _options.width ? _options.width : 150;
    this.height = _options.height ? _options.height : 50;
    this.type = _options.type ? _options.type : 'blend';
    this.code = _options.code ? _options.code : '';

    this.numList = getAllNum();
    this.letterList = getAllLetter();

    this._init();
    this.refresh();
  }
  // 初始化画布
  _init() {
    const parentContainer: HTMLElement | null = document.querySelector(`#${this.parentId}`);
    if (!parentContainer) return;
    parentContainer.innerHTML = '';
    const canvas = document.createElement('canvas');

    canvas.id = this.id;
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.setAttribute('style', 'cursor: pointer;');
    parentContainer.appendChild(canvas);

    canvas.onclick = () => {
      this.refresh();
    }
  }
  // 刷新验证码
  refresh() {
    // 将之前的code清空
    this.code = '';
    const canvas: HTMLCanvasElement | null = document.querySelector(`#${this.id}`);
    if (!canvas || !canvas.getContext) return;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ctx = canvas.getContext('2d')!;
    ctx.textBaseline = 'middle';
    ctx.fillStyle = generateRandomColor(160, 240);
    ctx.fillRect(0, 0, this.width, this.height);

    let codeList: string[] = [];
    if (this.type === 'blend') {
      codeList = [...this.numList, ...this.letterList];
    } else if (this.type === 'number') {
      codeList = this.numList;
    } else {
      codeList = this.letterList;
    }
    // 生成随机数/字母
    for (let i = 1; i <= 4; i++) {
      const code = codeList[generateRandomNum(0, codeList.length)];
      this.code += code;

      ctx.font = `${generateRandomNum(this.height / 2, this.height)}px SimHei`;
      ctx.fillStyle = generateRandomColor(0, 255);
      ctx.shadowOffsetX = generateRandomNum(-3, 3);
      ctx.shadowOffsetY = generateRandomNum(-3, 3);
      ctx.shadowBlur = generateRandomNum(-3, 3);
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";

      const x = this.width / 6 * i;
      const y = this.height / 2;
      const deg = generateRandomNum(-30, 30);

      // 设置旋转角度和坐标原点
      ctx.translate(x, y);
      ctx.rotate(deg * Math.PI / 180);
      ctx.fillText(code, 0, 0);
      // 恢复旋转角度和坐标原点
      ctx.rotate(-deg * Math.PI / 180);
      ctx.translate(-x, -y);
    }
    // 生成干扰线
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = generateRandomColor(40, 200);
      ctx.beginPath();
      ctx.moveTo(generateRandomNum(0, this.width), generateRandomNum(0, this.height));
      ctx.lineTo(generateRandomNum(0, this.width), generateRandomNum(0, this.height));
      ctx.stroke();
    }
    // 生成干扰点
    for(let i = 0; i < this.width/4; i++) {
      ctx.fillStyle = generateRandomColor(0, 255);
      ctx.beginPath();
      ctx.arc(generateRandomNum(0, this.width), generateRandomNum(0, this.height), 1, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
  // 校验验证码
  validate(_code: string) {
    const code = _code.toLowerCase();
    return this.code.toLowerCase() === code;
  }
}
// 生成数字数组
function getAllNum(): string[] {
  return "0,1,2,3,4,5,6,7,8,9".split(',');
}
// 生成字母数组
function getAllLetter(): string[] {
  return 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'.split(',');
}

export default GetVerifyCode;