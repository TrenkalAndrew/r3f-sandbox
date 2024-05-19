precision highp float;

varying float vPattern;

uniform float uTime;

struct ColorStop {
    vec3 color;
    float position;
};

#define COLOR_RAMP(colors, factor, finalColor) { \
    int index = 0; \
    for(int i = 0; i < colors.length() - 1; i++){ \
       ColorStop currentColor = colors[i]; \
       bool isInBetween = currentColor.position <= factor; \
       index = int(mix(float(index), float(i), float(isInBetween))); \
    } \
    ColorStop currentColor = colors[index]; \
    ColorStop nextColor = colors[index + 1]; \
    float range = nextColor.position - currentColor.position; \
    float lerpFactor = (factor - currentColor.position) / range; \
    finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
} \

void main() {
    vec3 color;

    vec3 mainColor = vec3(0.1, 0.4, 0.9);

    mainColor.r *= 0.9 * sin(uTime) / 3.2;
    mainColor.r *= 1.1 * sin(uTime / 2.0) / 2.5;
    mainColor.r *= 0.8 * sin(uTime / 5.0) / 4.0;
    mainColor.rgb += 0.1;

    ColorStop[4] colors = ColorStop[](
        ColorStop(vec3(1), 0.0),
        ColorStop(vec3(1), 0.01),
        ColorStop(mainColor, 0.1),
        ColorStop(vec3(0.01, 0.05, 0.2), 1.0)
    );

    COLOR_RAMP(colors,vPattern, color)

    gl_FragColor = vec4(color,1.0);
}