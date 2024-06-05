varying vec2 vUv;

void main()
{
    gl_PointSize = 20.0;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

    vUv = uv;
}