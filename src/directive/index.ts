import { App } from 'vue';

const directiveFiles = import.meta.globEager("./*.ts");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const directives = Object.values(directiveFiles).map((key: any) => {
  return key.default;
});

const dirctive = {
  install: (app: App<Element>) => {
    directives.forEach(directive => directive(app))
  }
}

export default dirctive;