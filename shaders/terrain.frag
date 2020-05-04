#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler1;
uniform sampler2D uSampler2;


void main() {
    vec4 color = texture2D(uSampler1, vTextureCoord);//texture2D(waterTex, vTextureCoord + timeFactor * vec2(0.1, 0.1));


	gl_FragColor = color;
}