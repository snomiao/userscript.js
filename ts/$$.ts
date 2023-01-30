
export function $$(sel: string, el = document) {
  return [...el.querySelectorAll(sel)] as HTMLElement[];
}
