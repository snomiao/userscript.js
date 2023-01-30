const SPAN_PRECISION = 15 * 60e3;

export default function po2dt([dday, dtime]: [number, number]) {
  return dday * 86400e3 + dtime * SPAN_PRECISION;
}
