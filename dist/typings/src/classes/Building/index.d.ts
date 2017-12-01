import Vector2 from '../Vector2';
import Grid3 from '../Grid3';
import Wall from '../Wall';
import Brick from '../Brick';
export interface IGridSize {
    [key: string]: number[];
    x: number[];
    y: number[];
    z: number[];
}
export default class Building extends Grid3<string> {
    size: IGridSize;
    center: Vector2;
    constructor(grid: string[][][], size: IGridSize, center: Vector2);
    getWalls(): Wall[];
    positionOnGrid(axis: string, gridCellPosition: number): number;
    getBricks(): Brick[];
    toString(): string;
    static fromFloorStrings(buildingString: string[]): Building;
}
