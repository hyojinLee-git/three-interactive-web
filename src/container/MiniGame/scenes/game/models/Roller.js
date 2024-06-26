import * as THREE from "three";
import * as CANNON from "cannon-es";
import gsap from "gsap";

export class Roller extends THREE.Mesh {
    name = "roller";
    _body = null;

    get body() {
        return this._body;
    }

    set body(body) {
        this._body = body;
    }
    constructor(width, height, depth, position) {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshBasicMaterial({ color: 0x4682b4 });

        super(geometry, material);

        this.receiveShadow = false;
        this.castShadow = true;

        this.body = new PhysicsRoller(width, height, depth, position);
    }
}

class PhysicsRoller extends CANNON.Body {
    constructor(width, height, depth, position) {
        const duration = Math.random() * 2 + 0.5;
        const shape = new CANNON.Box(
            new CANNON.Vec3(
                width / 2 + (0.2 / duration) * (width / 2),
                height / 2,
                depth / 2
            )
        );
        const material = new CANNON.Material();

        super({ shape, material, mass: 0, position });
        this.update(duration);
    }

    update(duration) {
        const quaternion = {
            y: 0,
        };
        this.anime = gsap.to(quaternion, {
            duration,
            y: Math.PI * 2,
            yoyo: false,
            ease: "none",
            repeat: -1,
            onUpdate: () => {
                const axis = new CANNON.Vec3(0, 1, 0);
                this.quaternion.setFromAxisAngle(axis, quaternion.y);
            },
        });
    }
    reset() {
        this.anime.kill();
    }
}
