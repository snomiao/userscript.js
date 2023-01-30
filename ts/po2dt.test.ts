import { expect, it } from "vitest";
import po2dt from "./po2dt";

it("po2dt", () => {
  /* unit test */
  expect(po2dt([1, 0])).toEqual(86400e3);
  expect(po2dt([-1, 0])).toEqual(-86400e3);
  expect(po2dt([1, 1])).toEqual(86400e3 + 15 * 60e3);
  expect(po2dt([1, -1])).toEqual(86400e3 - 15 * 60e3);
  expect(po2dt([-1, 1])).toEqual(-86400e3 + 15 * 60e3);
  expect(po2dt([-1, -1])).toEqual(-86400e3 - 15 * 60e3);
  expect(po2dt([0, 1])).toEqual(15 * 60e3);
  expect(po2dt([0, -1])).toEqual(-15 * 60e3);
});
