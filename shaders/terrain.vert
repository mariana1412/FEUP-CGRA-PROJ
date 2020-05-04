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


void main() {

    vTextureCoord = aTextureCoord;

    vec3 offset = vec3(0, 0, 0);
   /* aVertexNormal*texture2D(waterMap, fract(vTextureCoord + timeFactor*vec2(0.1, 0.1))).b*0.05;*/
    
    //shade = vec4(aVertexPosition+offset, 1.0);

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

}