#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying vec4 normal;

uniform int nSuppliesDelivered;

void main() {
    float separator = -0.5 + (1.0/5.0)*float(nSuppliesDelivered);

    if(coords.x > separator){
        gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
    }
    else{
        gl_FragColor.rgb =  vec3(1.0 - (0.6 + coords.x / 0.6), 0.6 + coords.x / 0.6, 0);
        gl_FragColor.a = 1.0;
    }
}