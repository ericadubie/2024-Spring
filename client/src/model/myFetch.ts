export function rest(url: string) {
  return fetch(url).then((x) => x.json());
}
