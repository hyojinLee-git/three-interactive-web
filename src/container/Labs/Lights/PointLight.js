import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Light } from "./Light";

export default class PointLight extends Light {
    _canvas = null;
    _camera = null;
    _renderer = null;
    _scene = null;
    _controls = null;

    constructor() {
        const $wrapper = document.createElement("div");
        $wrapper.id = "point-light";

        const $h2 = document.createElement("h2");
        $h2.innerText = "PointLight";

        $wrapper.appendChild($h2);

        const $canvas = document.createElement("canvas");

        $wrapper.appendChild($canvas);

        document.querySelector("#labs-lights").appendChild($wrapper);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: $canvas,
        });
        renderer.setClearColor(0x333333);
        renderer.setSize(window.innerWidth / 3, window.innerHeight / 2);

        document.querySelector("#labs-lights").appendChild($wrapper);

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / 3 / (window.innerHeight / 2),
            0.1,
            100
        );
        camera.position.set(15, 15, 15);

        const controls = new OrbitControls(camera, $canvas);

        super(scene);

        this._canvas = $canvas;
        this._renderer = renderer;
        this._scene = scene;
        this._camera = camera;
        this._controls = controls;
    }

    render() {
        this.create();
        this.createLight();
        this.resize();
        this.draw();
    }

    createLight() {
        const light = new THREE.PointLight(0xffffff);
        light.position.set(0, 3, 0);
        const lightHelper = new THREE.PointLightHelper(light);
        this._scene.add(light);
        this._scene.add(lightHelper);
    }

    draw() {
        this._renderer.render(this._scene, this._camera);

        this._controls.update();

        requestAnimationFrame(() => this.draw());
    }

    resize() {
        this._camera.aspect = window.innerWidth / 3 / (window.innerHeight / 2);
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(window.innerWidth / 3, window.innerHeight / 2);
        this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
}