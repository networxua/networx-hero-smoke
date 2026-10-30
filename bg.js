// Variant B helpers around WebGL-Fluid-Simulation (Pavel Dobryakov, MIT): gyro tilt drives the fluid on phones.
(() => {
  let last = null;
  addEventListener('deviceorientation', e => {
    if (e.gamma == null || !window.NX_move) return;
    const fx = Math.min(.95, Math.max(.05, .5 + e.gamma / 60)), fy = Math.min(.95, Math.max(.05, .5 + (e.beta - 45) / 60));
    if (last && Math.hypot(fx - last[0], fy - last[1]) < .004) return; last = [fx, fy]; window.NX_move(fx, fy);
  });
})();
