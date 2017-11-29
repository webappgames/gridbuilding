export default class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
    add(vector3: Vector3): Vector3;
    subtract(vector3: Vector3): Vector3;
    scale(scale: number): Vector3;
    toArray(): [number, number, number];
}
