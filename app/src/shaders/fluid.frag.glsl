precision mediump float;

uniform sampler2D uFluidTex;
uniform vec4 iMouse;
uniform vec2 uResolution;
uniform float uBrushSize;
uniform float uBrushStrength;
uniform float uFluidDecay;
uniform float uTrailLength;
uniform float uStopDecay;

varying vec2 vUv;

vec3 encodeFluid(vec3 v) {
  return v / 0.8 + 0.5;
}

vec3 decodeFluid(vec3 c) {
  return (c - 0.5) * 0.8;
}

void main() {
  vec2 pixel = vUv;
  vec3 texel = vec3(1.0 / uResolution.x, 1.0 / uResolution.y, 0.0);

  vec3 fluid = decodeFluid(texture2D(uFluidTex, vUv).rgb);
  float vx = fluid.x;
  float vy = fluid.y;
  float ink = fluid.z;

  vec3 left = decodeFluid(texture2D(uFluidTex, vUv - texel.xz).rgb);
  vec3 right = decodeFluid(texture2D(uFluidTex, vUv + texel.xz).rgb);
  vec3 up = decodeFluid(texture2D(uFluidTex, vUv + texel.zy).rgb);
  vec3 down = decodeFluid(texture2D(uFluidTex, vUv - texel.zy).rgb);

  vec2 dc = vec2(right.x - left.x, up.y - down.y);
  float avgInk = (left.z + right.z + up.z + down.z) * 0.25;

  vx -= dc.x;
  vy -= dc.y;

  ink = mix(ink, avgInk, 0.28);

  vx *= uFluidDecay;
  vy *= uFluidDecay;
  ink *= uTrailLength;

  vec2 mousePos = iMouse.xy;
  vec2 mousePrev = iMouse.zw;
  vec2 motion = mousePos - mousePrev;
  float motionLen = length(motion);
  if (motionLen > 6.0) {
    motion = motion / motionLen * 6.0;
  }

  float dim = max(uResolution.x, uResolution.y);
  vec2 q = pixel - (mousePos / dim);
  float dist = length(q);
  q = q / dist;
  if (dist < 0.001) {
    q = vec2(0.0);
  }

  float brushSizeFactor = 2.2e-4 / uBrushSize;
  float strengthFactor = 0.03 * uBrushStrength;
  float brush = exp(dist * dist * -brushSizeFactor);
  vec2 swirl = cross(vec3(q, 0.0), vec3(0.0, 0.0, 1.0)).xy;

  vx += motion.x * strengthFactor * brush;
  vy += motion.y * strengthFactor * brush;

  vx += swirl.x * strengthFactor * brush * 0.5;
  vy += swirl.y * strengthFactor * brush * 0.5;

  ink += brush * length(motion) * 0.15;

  float cursorIdle = smoothstep(1.0, 0.0, motionLen);
  float idleDistFactor = 1.0 - smoothstep(0.0, uBrushSize * 4.0 / uResolution.x, dist);
  float idleDecay = mix(1.0, uStopDecay, cursorIdle * idleDistFactor);

  vx *= idleDecay;
  vy *= idleDecay;
  ink *= idleDecay;

  vx = clamp(vx, -0.4, 0.4);
  vy = clamp(vy, -0.4, 0.4);
  ink = clamp(ink, -0.4, 0.4);

  gl_FragColor = vec4(encodeFluid(vec3(vx, vy, ink)), 1.0);
}
