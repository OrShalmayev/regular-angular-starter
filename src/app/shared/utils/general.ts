import { isFunction, uniqBy, isNull } from "lodash";

// export function upsert<T>(
//   array1: T[],
//   array2: T[],
//   idKey: keyof T,
//   merger: (entity1: T, entity2: T) => T = (a, b) => ({ ...a, ...b })
// ): T[] {
//   array1 ??= [];
//   array2 ??= [];
//   const ids = uniqBy([...array1, ...array2], idKey).map(o => o[idKey]);
//   return ids.reduce((acc, id) => {
//     const item1 = array1.find(o => o[idKey as string] === id);
//     const item2 = array2.find(o => o[idKey as string] === id);
//     return [...acc, { ...merger(item1, item2) }];
//   }, []);
// }

export function replaceNullWithUndefined<T extends Record<any, any>>(obj: T): T {
  return Object.entries(obj).reduce((acc, [key, value]) => ({ ...acc, [key]: value ?? undefined }), {}) as T;
}

export function downloadBase64(filename: string, base64: string): void {
  const url = `data:application/octet-stream;base64,${base64}`;
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  a.remove();
}

export function transformPercentInReal(valor: number, percentage: number): number {
  if (!valor || !percentage) {
    return 0;
  }
  return valor * (percentage / 100);
}

export function transformRealInPercentual(valorBase: number, valor: number): number {
  if (!valor || !valorBase) {
    return 0;
  }
  return (valor / valorBase) * 100;
}

export function findRight<T = any>(array: T[], predicate: (element: T, index: number) => any): T | undefined {
  if (!array?.length || !isFunction(predicate)) {
    return undefined;
  }
  let index = array.length;
  while (index--) {
    const element = array[index];
    if (predicate(element, index)) {
      return element;
    }
  }
  return undefined;
}

export function isNotNil<T>(value: T): value is NonNullable<T> {
  return !isNull(value);
}

export function parseUrlFromGuard(url: string, redirectTo: string): string {
  let urlParams: URL | undefined;
  try {
    urlParams = new URL('http://localhost' + url);
  } catch {}
  url = urlParams?.pathname ?? url;
  const urlTokens = url.split('/');
  const redirectToTokens = redirectTo.split('/');

  let token = redirectToTokens.shift();

  while (token) {
    if (token !== '.' && token !== '..') {
      redirectToTokens.unshift(token);
      break;
    }

    if (token === '..') {
      urlTokens.pop();
    }

    token = redirectToTokens.shift();
  }

  urlTokens.push(...redirectToTokens);

  return urlTokens.join('/');
}
