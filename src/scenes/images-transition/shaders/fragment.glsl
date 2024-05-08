precision highp float;

varying vec2 normalizedSource;
varying vec2 normalizedDestination;

uniform sampler2D sourceTexture;
uniform sampler2D destinationTexture;
uniform float progress;

void main() {
    vec3 sourceTextureColor = texture2D(sourceTexture, normalizedSource).rgb;
    vec3 destinationTextureColor = texture2D(destinationTexture, normalizedDestination).rgb;

    vec3 color = mix(sourceTextureColor, destinationTextureColor, progress);

    gl_FragColor = vec4(color, 1.0);
}