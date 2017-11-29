import Vector3 from './Vector3';
export default class Grid3<T> {
    private _grid;
    constructor(_grid: T[][][]);
    readonly array: T[][][];
    readonly length: Vector3;
    readonly lengthY: number;
    readonly lengthX: number;
    readonly lengthZ: number;
    setCell(position: Vector3, value: T): void;
    iterate(callback: (value: T, position: Vector3) => void, rowCallback?: (y: number) => void, floorCallback?: (z: number) => void): void;
    getBooleanGrid(testValue: T): Grid3<boolean>;
    toString(): string;
}
