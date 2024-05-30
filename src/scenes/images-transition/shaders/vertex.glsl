precision highp float;

#define PI 3.1415926538

varying vec2 normalizedSource;
varying vec2 normalizedDestination;

attribute vec2 source;
attribute vec2 destination;

uniform vec2 resolution;
uniform float progress;
uniform sampler2D sourceTexture;
uniform float devicePixelRatio;

void main() {
    vec3 sourcePosition = vec3(source, 0.0);
    vec3 destinationPosition = vec3(destination, 0.0);

    vec3 positions = mix(sourcePosition, destinationPosition, progress);
    positions *= 1. / resolution.x;
    positions.xy = positions.xy - 0.5;

    float distanceBetweenPoints = distance(destination.xy, source.xy);

    positions.z = 0.001 * distanceBetweenPoints * sin(PI * progress);

    normalizedSource = source / resolution.x;
    normalizedDestination = destination / resolution.x;
    
    vec4 mvPosition = modelViewMatrix * vec4(positions, 1.);
    
    gl_PointSize = ( 1. / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}