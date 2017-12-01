(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const Building_1 = __webpack_require__(1);
	exports.Building = Building_1.default;
	//import ExtendedMaze from './src/classes/Maze/ExtendedMaze';
	const Grid3_1 = __webpack_require__(4);
	exports.Grid3 = Grid3_1.default;
	const Wall_1 = __webpack_require__(5);
	exports.Wall = Wall_1.default;
	const Vector2_1 = __webpack_require__(8);
	exports.Vector2 = Vector2_1.default;
	const Vector3_1 = __webpack_require__(3);
	exports.Vector3 = Vector3_1.default;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const config_1 = __webpack_require__(2);
	const Vector3_1 = __webpack_require__(3);
	const Grid3_1 = __webpack_require__(4);
	const Wall_1 = __webpack_require__(5);
	const Brick_1 = __webpack_require__(6);
	const fromFloorStrings_1 = __webpack_require__(7);
	class Building extends Grid3_1.default {
	    constructor(grid, size, center) {
	        super(grid);
	        this.size = size;
	        this.center = center;
	    }
	    getWalls() {
	        let wallsMixed = [];
	        config_1.CHARS
	            .filter((charConfig) => charConfig.id !== 'NONE')
	            .forEach((charConfig) => {
	            const walls = [];
	            this.getBooleanGrid(charConfig.id).iterate((val, pos) => {
	                if (val) {
	                    walls.push(new Wall_1.default(pos, pos));
	                }
	            });
	            const joinedWalls = Wall_1.default.joinWalls(walls);
	            wallsMixed = wallsMixed.concat(joinedWalls);
	        });
	        return wallsMixed;
	    }
	    positionOnGrid(axis, gridCellPosition) {
	        let position = Math.floor(gridCellPosition / 2) * (this.size[axis][0] + this.size[axis][1]);
	        if (gridCellPosition % 2 === 1) {
	            position += this.size[axis][0];
	        }
	        if (axis === 'y') {
	            position = -position; //todo max position
	        }
	        return position;
	    }
	    getBricks() {
	        const center = new Vector3_1.default(
	        //todo maybe between
	        this.positionOnGrid('x', this.center.x), this.positionOnGrid('y', this.center.y), 0);
	        const bricks = [];
	        this.getWalls().forEach((wall) => {
	            bricks.push(new Brick_1.default(new Vector3_1.default(this.positionOnGrid('x', wall.from.x), this.positionOnGrid('y', wall.from.y), this.positionOnGrid('z', wall.from.z)).subtract(center), new Vector3_1.default(this.positionOnGrid('x', wall.to.x + 1), this.positionOnGrid('y', wall.to.y + 1), this.positionOnGrid('z', wall.to.z + 1)).subtract(center)));
	        });
	        return bricks;
	    }
	    toString() {
	        let output = '';
	        this.iterate((val, pos) => {
	            const charConfig = config_1.CHARS.find((charConfig) => charConfig.id === val) || config_1.CHARS[0];
	            //console.log(charConfig,y,x);
	            output += charConfig.chars[pos.x % 2];
	        }, () => {
	            output += '\n';
	        }, () => {
	            output += '\n\n\n';
	        });
	        return output;
	    }
	    //todo maybe better
	    static fromFloorStrings(buildingString) {
	        return fromFloorStrings_1.default(buildingString);
	    }
	}
	exports.default = Building;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	//todo remove
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CHARS = [
	    {
	        id: 'NONE',
	        chars: [' ', '   ', ':', ':::']
	    },
	    {
	        id: 'PILLAR',
	        chars: ['+']
	    },
	    {
	        id: 'VERTICAL',
	        chars: ['|']
	    },
	    {
	        id: 'HORIZONTAL',
	        chars: ['-', '---']
	    },
	    {
	        id: 'PLATE',
	        chars: ['#', '###']
	    }
	];
	/*export const CHARS = [
	    {
	        id: 'NONE',
	        chars: [
	            [[' '], ['   ']],
	            [[' '], ['   ']]
	        ]
	    },
	    {
	        id: 'PLATE',
	        chars: [
	            [[], []],
	            [[], [':::']]
	        ]
	    },
	    {
	        id: 'PILLAR',
	        chars: [
	            [['+'], []],
	            [[], []]
	        ]
	    },
	    {
	        id: 'VERTICAL',
	        chars: [
	            [['|'], []],
	            [['|'], []]
	        ]
	    },
	    {
	        id: 'HORIZONTAL',
	        chars: [
	            [['-'], ['---']],
	            [[], []]
	        ]
	    }
	];*/ 


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	class Vector3 {
	    constructor(x, y, z) {
	        this.x = x;
	        this.y = y;
	        this.z = z;
	    }
	    add(vector3) {
	        return new Vector3(this.x + vector3.x, this.y + vector3.y, this.z + vector3.z);
	    }
	    subtract(vector3) {
	        return new Vector3(this.x - vector3.x, this.y - vector3.y, this.z - vector3.z);
	    }
	    scale(scale) {
	        return new Vector3(this.x * scale, this.y * scale, this.z * scale);
	    }
	    toArray() {
	        return [this.x, this.y, this.z];
	    }
	}
	exports.default = Vector3;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const Vector3_1 = __webpack_require__(3);
	class Grid3 {
	    constructor(_grid) {
	        this._grid = _grid;
	    }
	    get array() {
	        return this._grid;
	    }
	    get length() {
	        return new Vector3_1.default(this.lengthX, this.lengthY, this.lengthZ);
	    }
	    get lengthY() {
	        return this._grid.length;
	    }
	    get lengthX() {
	        return this._grid[0].length; //todo better
	    }
	    get lengthZ() {
	        return this._grid[0][0].length; //todo better
	    }
	    setCell(position, value) {
	        this._grid[position.z] = this._grid[position.z] || [];
	        this._grid[position.z][position.y] = this._grid[position.z][position.y] || [];
	        this._grid[position.z][position.y][position.x] = value;
	    }
	    /*getCell(position: IVector3): T | undefined {
	        const grid2d = this._grid[position.z] || [];
	        const grid1d = grid2d[position.y] || [];
	        return grid1d[position.x];
	    }*/
	    iterate(callback, rowCallback, floorCallback) {
	        for (let z = 0; z < this._grid.length; z++) {
	            for (let y = 0; y < this._grid[z].length; y++) {
	                for (let x = 0; x < this._grid[z][y].length; x++) {
	                    callback(this._grid[z][y][x], new Vector3_1.default(x, y, z));
	                }
	                if (typeof rowCallback !== 'undefined')
	                    rowCallback(y);
	            }
	            if (typeof floorCallback !== 'undefined')
	                floorCallback(z);
	        }
	    }
	    getBooleanGrid(testValue) {
	        const booleanGrid = new Grid3([]);
	        this.iterate((val, pos) => {
	            booleanGrid.setCell(pos, val === testValue);
	        });
	        return booleanGrid;
	    }
	    toString() {
	        let output = '';
	        this.iterate((val, pos) => {
	            output += val ? '██' : '  ';
	        }, () => {
	            output += '\n';
	        }, () => {
	            output += '\n\n\n';
	        });
	        return output;
	    }
	}
	exports.default = Grid3;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const Vector3_1 = __webpack_require__(3);
	//todo name Wall vs Grid3Brick ?????????????
	class Wall {
	    constructor(from, to) {
	        this.from = from;
	        this.to = to;
	    }
	    isJoinable(wall2) {
	        const wall1 = this;
	        return ([
	            {
	                axis1: 'x',
	                axis2: 'y',
	                axis3: 'z'
	            },
	            {
	                axis1: 'y',
	                axis2: 'z',
	                axis3: 'x'
	            },
	            {
	                axis1: 'z',
	                axis2: 'x',
	                axis3: 'y'
	            }
	        ].some(({ axis1, axis2, axis3 }) => (((wall1.from[axis1] === wall2.from[axis1] && wall1.to[axis1] === wall2.to[axis1])
	            &&
	                (wall1.from[axis2] === wall2.from[axis2] && wall1.to[axis2] === wall2.to[axis2])) &&
	            (wall1.to[axis3] + 1 === wall2.from[axis3] || wall2.to[axis3] + 1 === wall1.from[axis3]))));
	    }
	    /*joinWithInPlace(wall2: Wall): void {
	        const wall1 = this;
	        this.from = {
	            x: Math.min(wall1.from.x, wall2.from.x),
	            y: Math.min(wall1.from.y, wall2.from.y),
	            z: Math.min(wall1.from.z, wall2.from.z),
	        };
	        this.to = {
	            x: Math.max(wall1.to.x, wall2.to.x),
	            y: Math.max(wall1.to.y, wall2.to.y),
	            z: Math.max(wall1.to.z, wall2.to.z),
	        };
	    }*/
	    joinWith(wall2) {
	        const wall1 = this;
	        return new Wall(new Vector3_1.default(Math.min(wall1.from.x, wall2.from.x), Math.min(wall1.from.y, wall2.from.y), Math.min(wall1.from.z, wall2.from.z)), new Vector3_1.default(Math.max(wall1.to.x, wall2.to.x), Math.max(wall1.to.y, wall2.to.y), Math.max(wall1.to.z, wall2.to.z)));
	    }
	    static joinWalls(originalWalls) {
	        function joinWallToWalls(oldWalls, newWall) {
	            let joinedWall = newWall;
	            const newWalls = [];
	            for (const oldWall of oldWalls) {
	                if (joinedWall.isJoinable(oldWall)) {
	                    joinedWall = newWall.joinWith(oldWall);
	                }
	                else {
	                    newWalls.push(oldWall);
	                }
	            }
	            if (joinedWall !== newWall) {
	                return joinWallToWalls(newWalls, joinedWall);
	            }
	            else {
	                newWalls.push(newWall);
	                return newWalls;
	            }
	        }
	        let newWalls = [];
	        for (const wall of originalWalls) {
	            newWalls = joinWallToWalls(newWalls, wall);
	        }
	        return newWalls;
	    }
	}
	exports.default = Wall;


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	class Brick {
	    constructor(from, to) {
	        this.from = from;
	        this.to = to;
	    }
	    get size() {
	        return this.to.subtract(this.from);
	    }
	    get center() {
	        return this.from.add(this.to).scale(.5);
	    }
	}
	exports.default = Brick;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const Vector2_1 = __webpack_require__(8);
	const index_1 = __webpack_require__(1);
	const config_1 = __webpack_require__(2);
	function createPlateString(floorString) {
	    let deskString = '';
	    for (let i = 0; i < floorString.length; i++) {
	        if (floorString[i] === ' ') {
	            deskString += floorString[i];
	        }
	        else if (floorString[i] === '\n') {
	            deskString += floorString[i];
	        }
	        else {
	            deskString += '#';
	        }
	    }
	    return deskString;
	}
	function fromFroorString(floorString) {
	    floorString = floorString.trim();
	    const array = [];
	    let y = 0;
	    for (let rowString of floorString.split('\n')) {
	        array[y] = [];
	        let x = 0;
	        for (let i = 0; i < rowString.length; i += x % 2 === 0 ? 3 : 1) {
	            const substring = rowString.substring(i, i + (x % 2 === 0 ? 1 : 3));
	            const charConfig = config_1.CHARS.find((charConfig) => charConfig.chars.indexOf(substring) !== -1);
	            if (typeof charConfig === 'undefined') {
	                throw new Error(`String "${substring}" has no meaning in building ASCII config."`);
	            }
	            else {
	                array[y][x] = charConfig.id;
	            }
	            x++;
	        }
	        y++;
	    }
	    return array;
	}
	function default_1(buildingString) {
	    const grid = [];
	    buildingString.forEach((floorString, i) => {
	        const plate = fromFroorString(createPlateString(floorString));
	        //if(i===0)grid.push(plate);
	        grid.push(fromFroorString(floorString));
	        grid.push(plate);
	    });
	    return new index_1.default(grid, {
	        x: [3, 10],
	        y: [3, 10],
	        z: [10, 0.5],
	    }, new Vector2_1.default(5, 5));
	}
	exports.default = default_1;


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	class Vector2 {
	    constructor(x, y) {
	        this.x = x;
	        this.y = y;
	    }
	    add(vector3) {
	        return new Vector2(this.x + vector3.x, this.y + vector3.y);
	    }
	    subtract(vector3) {
	        return new Vector2(this.x - vector3.x, this.y - vector3.y);
	    }
	    scale(scale) {
	        return new Vector2(this.x * scale, this.y * scale);
	    }
	    toArray() {
	        return [this.x, this.y];
	    }
	}
	exports.default = Vector2;


/***/ }
/******/ ])));
//# sourceMappingURL=gridbuilding.js.map