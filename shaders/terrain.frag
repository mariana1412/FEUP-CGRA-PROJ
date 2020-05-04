#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

void main() {
    vec4 color = vec4(0, 0, 0, 0);//texture2D(waterTex, vTextureCoord + timeFactor * vec2(0.1, 0.1));
	//vec4 map = texture2D(waterMap, vTextureCoord + timeFactor * vec2(0.1, 0.1));

	gl_FragColor = color;
}