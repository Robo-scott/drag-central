precision mediump float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uDistortionAmount;
uniform float uLineThickness;
uniform float uLineScale;
uniform float uScrollX;
uniform float uScrollY;
uniform sampler2D uFluidTex;

varying vec2 vUv;

vec3 palette(float t) {
  vec3 a = vec3(0.5, 0.5, 0.5);
  vec3 b = vec3(0.5, 0.5, 0.5);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.263, 0.416, 0.557);
  return a + b * cos(6.28318 * (c * t + d));
}

vec3 contourColor(float value) {
  float t = clamp(value * 1.2, 0.0, 1.0);
  int band = int(t * 4.0);
  if (band == 0) return vec3(0.043, 0.043, 0.043);
  if (band == 1) return vec3(0.078, 0.078, 0.078);
  if (band == 2) return vec3(0.176, 0.176, 0.176);
  if (band == 3) return vec3(0.627, 0.627, 0.627);
  return vec3(0.769, 0.086, 0.110);
}

void main() {
  vec2 uv = vUv;

  vec3 fluid = (texture2D(uFluidTex, vUv).rgb - 0.5) * 0.8;

  uv += fluid.xy * uDistortionAmount;

  uv.x *= uResolution.x / uResolution.y;

  uv.x += uScrollX;
  uv.y += uScrollY;

  float d = -length(uv);
  d += sin(uv.x * 4.0 + uTime * 0.3) * 0.08;
  d += sin(uv.y * 3.0 + uTime * 0.2) * 0.06;
  d += sin((uv.x + uv.y) * 2.0) * 0.05;
  d += fluid.z * 0.5;

  float pattern = sin(d * uLineScale);

  float lines = smoothstep(1.0 - uLineThickness, 1.0, abs(pattern));

  float height = (d + 1.0) * 0.5;

  vec3 col = palette(height + uTime * 0.04);

  col *= 0.5 + 0.5 * abs(pattern);

  col = contourColor(height);

  col += vec3(0.08, 0.08, 0.08) * lines;

  col *= smoothstep(1.0, 0.3, length(vUv - 0.5) * 1.5);

  gl_FragColor = vec4(col, 1.0);

  #include <colorspace_fragment>
}
