e = $$("video")?.[0];
c = (d) => ("vcc", d, d && (e.currentTime += d));
s = x = v = a = t = id = 0;
n = () => +new Date() / 1e3;
push = (f) => (
  "vcp",
  [
    (a = f),
    (t = n()),
    (id ||= setInterval(() => {
      dt = -(t - (t += (dt = n()) - t));
      ds =
        0 |
        -(
          s -
          (x +=
            dt * (v = v * Math.exp(-dt * (Math.abs(a) === 0 ? 1 : 0)) + dt * a))
        );
      s += ds;
      c(ds);
      console.log(
        "vcv",
        ds,
        x,
        v,
        a,
        t,
        dt,
        Math.exp(-dt * (Math.abs(a) === 0 ? 1 : 0))
      );
      Math.abs(v) + Math.abs(a) <= 0.1 && (clearInterval(id), (id = 0));
    }, 200)),
  ]
);
onkeyup = onkeydown = ({ key, type }) =>
  ((d) =>
    d &&
    (push(d * { keydown: 60, keyup: 0 }[type]),
    e.stopPropagation(),
    e.preventDefault()))({ h: -1, l: 1 }[key]);
