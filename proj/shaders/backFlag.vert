#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

uniform float phase;

void main() {

    vTextureCoord = aTextureCoord;

    vec3 offset = vec3(0.0, 0.0, 0.0); 

    offset.z = sin(aVertexPosition.x*10.0 - phase*2.0)*0.2*(1.0-vTextureCoord.x);

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}