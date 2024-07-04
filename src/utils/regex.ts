export const ESCAPE_REG_EXPRESSION = (str: string) =>
  str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
