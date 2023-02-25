varying vec3 vertexNormal;
void main() {
    float intensity = pow(0.75 - dot(vertexNormal, vec3(0, 0, 1.0)), 0.5);
    gl_FragColor = vec4(0.0, 1.0, 0.518, 1.0) * intensity;
}

