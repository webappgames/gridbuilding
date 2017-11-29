import Vector3 from './Vector3';
export default class Brick {
    from: Vector3;
    to: Vector3;
    constructor(from: Vector3, to: Vector3);
    readonly size: Vector3;
    readonly center: Vector3;
}
