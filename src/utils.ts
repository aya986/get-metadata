export const currentTime = () => {
  return new Date().getTime();
};

export function getNumber(num: any) {
  try {
    return Number(num);
  } catch (err: any) {
    return -1;
  }
}

export function jsonSafeParse(json_str: string | object | null) {
  if (!json_str) return null;
  try {
    if (typeof json_str == "object") return json_str;
    return JSON.parse(json_str);
  } catch (err) {
    return null;
  }
}
export function ArrayCount(arr: any) {
  try {
    if (typeof arr == "object" && arr.length >= 0) return arr.length;
  } catch (err) { }
  return -1;
}
/** 
    Return int number between 0 -> (max - 1)
*/
export function randomNum(max?: number) {
  if (!max) {
    max = 2;
  }
  if (max <= 1) {
    return 0;
  }
  let rand = Math.floor(Math.random() * max);
  if (rand == max) rand = max - 1;
  return rand;
}

export function stringInject(main_str: string, params: any) {
  for (const key in params) {
    let replace = "\\$\\{" + key + "\\}";
    let re = new RegExp(replace, "g");
    main_str = main_str.replace(re, String(params[key]));
  }
  return main_str;
}