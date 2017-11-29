import Vector3 from './Vector3';
export default class Wall {
    from: Vector3;
    to: Vector3;
    constructor(from: Vector3, to: Vector3);
    isJoinable(wall2: Wall): boolean;
    joinWith(wall2: Wall): Wall;
    static joinWalls(originalWalls: Wall[]): Wall[];
}
