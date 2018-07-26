/*! *************************************************************************
	This is a derivative project to AeGType; Typescript, C#, and Javascript transpilation
	for Garry's mods' development.

	typefall.d.ts serves as the culimation of efforts that goes towards documenting
	and type-defining the poorly documented starfall. This definition project follows
	both the GPI-NUx9 standards, and the TDP (Typescript Definitions Procedures) for high
	quality definition assurance.

	Copyright (C) 2018  Aeomi

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
***************************************************************************** !*/

/* *****************************************************************************
	! Project JSDoc Standards

	* Required decorators; in order:

	@realm
		* Realm  | Must be one of: Server, Client, Shared
	@description
		* ...    | Describe general use case
	@param
		* Name   | Parameter name
		* ...    | Always provide information on the parameter's purpose
	@returns
		* ...    | Always provide information on the returning value

	* Notes
		* The sentences that comprise JSDocs must end in a periods

/* *********************************** End ************************************* */


// * Typescript Builtins (adapted) * //

interface Table<K, V> {
	key: K;
	value: V;
}

interface Map<K, V> {

	get(key: K): void;
	set(key: K, value: V): void
	containsKey(key: K): boolean;

	/**
	 * Remove a key, and its value from the map
	 * @param key The key to remove
	 * @returns Returns whether the key to remove existed
	 */
	remove(key: K): boolean;
	
	keys(): K[];
	values(): V[];

	items(): Table<K, V>[];

	count(): number;

}


// * Builtins * //

/**
 * @description Primitive types
 * @description number | string | boolean
 */
declare type Primative = number | string | boolean;


/**	Conversion builtins */

/**
 * @realm Shared
 * @description Convert a given value into a string.
 * @param value The target of the conversion.
 * @returns A primitive input is guarenteed to convert successfully.
 */
declare function tostring(value: Primative): string;

/**
 * @realm Shared
 * @description Attempt to convert a given value into a string
 * @param value The target of the conversion.
 * @returns As the input can be of any value, a failure to convert may occur.
 */
declare function tostring(value: any): string | undefined;

/**
 * @realm Shared
 * @description Attempt to convert a string or a number into a number with the option
 * of changing its numeric base.
 * @param value The target of the conversion.
 * @param base The radix (numeric base) for the conversion.
 */
declare function tonumber(value: (string | number), base?: number): number;


/**
 * Reserved names; recursively blocking interface for reserved Lua keywords.
 */
declare interface RESERVED {
	DO_NOT_USE_RESERVED_NAME: RESERVED;
}

declare const elseif: RESERVED;
declare const repeat: RESERVED;
declare const local: RESERVED;
declare const until: RESERVED;
declare const goto: RESERVED;
declare const then: RESERVED;
declare const and: RESERVED;
declare const nil: RESERVED;
declare const end: RESERVED;
declare const not: RESERVED;

/**
 * @realm Shared
 * @description True when client realm is actively executing.
 */
declare const CLIENT: boolean;

/**
 * @realm Shared
 * @description True when server realm is actively executing.
 */
declare const SERVER: boolean;

/**
 * @realm Shared
 * @description Starfall's builtin print function.
 * @param messages A variable argument list of primatives to print.
 */
declare function print(...messages: Primative[]): void;


/**
 * @realm Shared
 * @description Garry's recursive table-printing function (useful to see the keys and values that comprise an array).
 * @param table Lua table object to print.
 */
declare function printTable(table: object): void;

/**
 * @realm Shared
 * Used to get the entity type representation of the Starfall processor that the code is executing from.
 * @returns IEntity The Starfall processor.
 */
declare function chip(): IEntity;

declare function setName(name: string): void;

/**
 * @realm Shared
 * Generally used to get the player who placed the processor.
 * @returns IEntity Representing the player who owns the Starfall processor running this code.
 */
declare function owner(): IEntity;


/**
 * @realm Shared
 * @description Same as owner() when used on serverside, but returns local client when used clientside.
 * Used to get the entity object representing the player with a given userId when the argument is provided.
 * @example Type "status" in console to get userIds
 * @param userId The userId of the player you want to get.
 */
declare function player(userId?: number): IEntity | undefined;

/**
 * Hookable events
 * @note Make sure to check for eventParameters to see what data the event passes to the callback
 */

// declare type HOOKABLE_EVENTS = string;
declare enum HOOKABLE_EVENTS {
	/**
	 * @realm Client
	 * @description Event occurs when a frame is requested to be drawn on screen (both 2D & 3D contexts)
	 */
	RENDER = "render",

	/**
	 * @realm Shared
	 * @description 
	 * @eventParameter {IEntity} | Entity that had been driven
	 * @eventParameter {IPlayer} | Player that had driven the entity
	 */
	END_ENTITY_DRIVING = "EndEntityDriving",

	/**
	 * @realm Shared
	 * @description Called when an entity is removed
	 * @eventParameter {IEntity} | Entity being removed
	 */
	ENTITY_REMOVED = "EntityRemoved",

	/**
	 * @realm Shared
	 * @description Called when a player presses a key
	 * @eventParameter {IPlayer} | Player who is pressing the key
	 * @eventParameter {KEY_CODE} | The keycode for the key being pressed
	 */
	KEY_PRESS = "KeyPress",

	/**
	 * @realm Shared
	 * @description Called when a player releases a key
	 * @eventParameter {IPlayer} | Player who released the key
	 * @eventParameter {KEY_CODE} | The keycode for the key being released
	 */
	KEY_RELEASE = "KeyRelease",

	/**
	 * @realm Shared
	 * @description Event occurs when an input wired to the Starfall chip is written to
	 * @eventParameter {string} | The name of the input
	 * @eventParameter {any} | The value of the input
	 */
	INPUT_CHANGED = "input"
}

declare type Byte = string;

declare namespace string {
	function len(str: string): number;
	function sub(str: string, start: number, end: number): string;
	function byte(str: string, index?: number): Byte;
}

/**
 * @realm Shared
 * @description Starfall's builtin hook library
 */
declare namespace hook {
	/**
	 * @realm Shared
	 * @description Used to attach named callbacks (hooks) to specific events (for event driven code execution)
	 * @param eventName Name of the event to 'hook' the callback to
	 * @param hookName Unique identifier for the hook being attached to the event
	 * @param callback The function that is called(back) whenever the event fires
	 */
	function add(eventName: HOOKABLE_EVENTS, hookName: string, callback: Function): void;

	/**
	 * @realm Shared
	 * @description Used to remove callbacks (hooks) from a specified event
	 * @param eventName Name of the event the 'hook' is attached to
	 * @param hookName Unique identifier for the hook to remove from the event
	 */
	function remove(eventName: HOOKABLE_EVENTS, hookName: string): void;
}


/**
 * @realm Shared
 * @description Starfall's builtin timer library
 */
declare namespace timer {
	function adjust(name: string, delay: number, repetitions: number, callback: Function): boolean;
	function create(name: string, delay: number, repetitions: number, callback: Function): void;
	function curtime(): number;
	function exists(name: string): boolean;
	function frametime(): number;
	function getTimersLeft(): number;
	function pause(name: string): boolean;
	function realtime(): number;
	function remove(name: string): void;
	function repsleft(name: string): number | undefined;
	function simple(delay: number, callback: Function): void;
	function start(name: string): boolean;
	function stop(name: string): boolean;
	function systime(): number;
	function timeleft(name: string): number | undefined;
	function toggle(name: string): number; // TODO: Return type is "status of the timer" make sure this is actually a number
	function unpause(name: string): boolean;
}

declare enum INPUT_KEYCODES {
	RUN			=	4096,
	LEFT		=	128,
	WALK		=	262144,
	FORWARD		=	8,
	DUCK		=	4,
	SCORE		=	65536,
	JUMP		=	2,
	USE			=	32,
	BACK		=	16,
	WEAPON1		=	1048576,
	MOVERIGHT	=	1024,
	RELOAD		=	8192,
	ALT2		=	32768,
	CANCEL		=	64,
	ATTACK2		=	2048,
	ALT1		=	16384,
	RIGHT		=	256,
	MOVELEFT	=	512,
	WEAPON2		=	2097152,
	ZOOM		=	524288,
	ATTACK		=	1,
	GRENADE1	=	8388608,
	SPEED		=	131072,
	GRENADE2	=	16777216,
	BULLRUSH	=	4194304
}


/**
 * @realm Shared
 * @description Starfall's builtin input library
 */
declare namespace input {
	function enableCursor(state: boolean): void;
	/** 
	 * !TupleReturn 
	 */
	function getCursorPos(): [number, number];
	function getKeyName(keyId: number): string;
	function isControlDown(): boolean;
	function isKeyDown(key: INPUT_KEYCODES): boolean;
	function isShiftDown(): boolean;
	function lookupBinding(binding: string): [number, string];
	function screenToVector(x: number, y: number): IVector;
}

declare interface IPolygon {
	x: number;
	y: number;
	u?: number;
	v?: number;
}

declare type IMaterial = any;

declare type IMarkupObject = any;

declare type IMatrix = any;

declare enum TEXTFILTER {
	NONE,
	POINT,
	LINEAR,
	ANISOTRPIC
}

declare enum STENCILOPERATION {
	STENCILOPERATION_KEEP 		= 1,
	STENCILOPERATION_ZERO 		= 2,
	STENCILOPERATION_REPLACE 	= 3,
	STENCILOPERATION_INCRSAT 	= 4,
	STENCILOPERATION_DECRSAT 	= 5,
	STENCILOPERATION_INVERT 	= 6,
	STENCILOPERATION_INCR 		= 7,
	STENCILOPERATION_DECR 		= 8
}

declare enum STENCILCOMPARISONFUNCTION {
	STENCILCOMPARISONFUNCTION_NEVER 		= 1,
	STENCILCOMPARISONFUNCTION_LESS 			= 2,
	STENCILCOMPARISONFUNCTION_EQUAL 		= 3,
	STENCILCOMPARISONFUNCTION_LESSEQUAL 	= 4,
	STENCILCOMPARISONFUNCTION_GREATER 		= 5,
	STENCILCOMPARISONFUNCTION_NOTEQUAL 		= 6,
	STENCILCOMPARISONFUNCTION_GREATEREQUAL 	= 7,
	STENCILCOMPARISONFUNCTION_ALWAYS 		= 8
}


declare function Matrix(): IVMatrix;




/**
 * @realm Client
 * @description Starfall's builtin render library
 */
declare namespace render {

	function drawRect(x: number, y: number, width: number, height: number): void;

	function drawRectOutline(x: number, y: number, width: number, height: number): void;

	function drawRectFast(x: number, y: number, width: number, height: number): void;
	
	function drawRoundedBox(radius: number, x: number, y: number, width: number, height: number): void;
	
	function drawRoundedBoxEx(radius: number, x: number, y: number, width: number, height: number,
		topLeft: boolean, topRight: boolean, bottomLeft: boolean, bottomRight: boolean): void;

	function drawCircle(x: number, y: number, radius: number): void;

	function drawLine(x1: number, y1: number, x2: number, y2: number): void;

	function drawPoly(vertices: IPolygon[]): void;

	function drawRectOutline(x: number, y: number, width: number, height: number): void;

	function drawRoundedBox(cornerRadius: number, x: number, y: number, width: number, 
		height: number): void;

	function drawRoundedBoxEX(cornerRadius: number, x: number, y: number, width: number, 
		height: number, roundTopLeft: boolean, roundTopRight: boolean, roundBottomLeft: boolean, 
		roundBottomRight: boolean): void;

	function drawSimpleText(x: number, y: number, text: string, xAlignment?: number, yAlignment?: number): void;
	
	function drawText(x: number, y: number, alignment: any): void;

	function setColor(color: IColor): void;

	/**
	 * !TupleReturn
	 * @realm Clientside
	 * @description Used to get the cursor position
	 * @example let [x, y] = render.cursorPos(owner());
	 * @param player The player to get the cursor position of
	 *	(it will be null if they are not looking at the screen)
	 * @returns [number, number]
	 */
	function cursorPos(player?: IEntity): [number, number]; // ? Create interface for this?

	function clear(color: IColor, clearDepth?: boolean): void;

	function createFont(font: string, size: number, weight: number, antialias: boolean, 
		additive: boolean, shadow: boolean, outline: boolean, blur: boolean, extended: boolean): void;

	function createRenderTarget(name: string): void;

	function destroyRenderTarget(name: string): void;

	function destroyTexture(material: string): void;

	function drawTexturedRect(x: number, y: number, w: number, height: number): void;

	function drawTexturedRectFast(x: number, y: number, w: number, height: number): void;

	function drawTexturedRectRotated(x: number, y: number, w: number, height: number, angle: number): void;

	function drawTexturedRectRotatedFast(x: number, y: number, w: number, height: number, angle: number): void;

	function drawTexturedRectUV(x: number, y: number, width: number, height: number, startU: number, 
		startV: number, endU: number, endV: number): void;

	function drawTexturedRectUVFast(x: number, y: number, width: number, height: number, startU: number, 
		startV: number, endU: number, endV: number, UVHack: boolean): void;

	function enableDepth(enable: boolean): void;

	function enableScissorRect(startX: number, startY: number, endX: number, endY: number): void;

	function getDefaultFont(): string;

	/**
	 * !TupleReturn
	*/
	function getGameResolution(): [number, number];

	/**
	 * !TupleReturn
	*/
	function getResolution(): [number, number];

	function getScreenEntity(): IEntity;

	function getScreenInfo(entity: IEntity): any;

	// /**
	//  * !TupleReturn
	// */
	function getTextSize(text: string): number;

	function getTextureID(texturePath: string, callback: Function): IMaterial;

	function isHUDActive(): boolean;

	function parseMarkup(markupString: string, maxSize: number): IMarkupObject;

	function popMatrix(): void;

	function popViewMatrix(): void;

	function pushMatrix(matrix: IMatrix, relativeToWorld: boolean): void;

	function pushViewMatrix(viewMatrix: IVMatrix): void;

	function readPixel(x: number, y: number): IColor;

	function selectRenderTarget(name?: string): void;

	function setBackgroundColor(color: IColor, screen: IEntity): void;

	function setColor(color: IColor): void;

	function setCullMode(mode: boolean): void;	// might have to change this to an int

	function setFilterMag(textFilter: TEXTFILTER): void;

	function setFilterMin(textFilter: TEXTFILTER): void;

	function setFont(font: string): void;

	function setMaterial(material: IMaterial): void;

	function setRGBA(r: number, g: number, b: number, a: number): void;

	function setRenderTargetTexture(name: string): void;

	function setStencilCompareFunction(compareFunction: STENCILCOMPARISONFUNCTION): void;

	function setStencilEnable(enable: boolean): void;

	function setStencilFailOperation(operation: STENCILOPERATION): void;

	function setStencilPassOperation(operation: STENCILOPERATION): void;

	function setStencilReferenceValue(referenceValue: number): void;

	function setStencilTestMask(mask: number): void;

	function setStencilWriteMask(mask: number): void;

	function setStencilZFailOperation(operation: STENCILOPERATION): void;

	function setTexture(material: IMaterial): void;

	function setTextureFromScreen(entity: IEntity): void;

	function traceSurfaceColor(vector1: IVector, vector2: IVector): void;

}

declare type IFilter = (entity: IEntity) => boolean;

declare namespace find {
	function all(filter: IFilter): IEntity[];
	function allPlayers(filter?: (player: IPlayer) => boolean): IPlayer[];
	function byClass(className: string, filter: IFilter): IEntity[];
	function byModel(model: string, filter: IFilter): IEntity[];
	function inBox(corner1: IVector, corner2: IVector, filter: IFilter): IEntity[];
	// TODO: Confirm that direction is a Vector, not an Angle:
	function inCone(pos: IVector, direction: IVector, distance: number, radius: number, filter: IFilter): IEntity[];
	function inSphere(center: IVector, radius: number, filter: IFilter): IEntity[];
}

declare namespace holograms {
	function canSpawn(): boolean;
	function create(pos: IVector, ang: IAngle, model: string, scale?: IVector): IHologram;
	function hologramsLeft(): number;
}

declare namespace prop {
	function canSpawn(): void;
	function create(pos: IVector, ang: IAngle, model: string, frozen: boolean): IEntity;
	function createComponent(pos: IVector, ang: IAngle, entityClass: string, model: string, frozen: boolean): any; // TODO: Determine Return Type
	function createSent(pos: IVector, ang: IAngle, entityClass: string, frozen: boolean): IEntity;
	function propsLeft(): number;
	function setPropClean(on: boolean): void;
	function setPropUndo(on: boolean): void;
	function spawnRate(): number;
}

declare namespace http {
	function Encode(data: any): string;
	function canRequest(): boolean;
	function get(
		url: string, callbackSuccess: (url: string, length: number, headers: any, code: number) => void, // TODO: Determine the type of headers.
		callbackFail: (reason: any) => void, headers: any // TODO: Determine the types of reason and headers.
	): string;
	function post(// TODO: Determine the type of params, headers, and reason.
		url: string, params: any, callbackSuccess: (url: string, length: number, headers: any, code: number) => void,
		callbackFail: (reason: any) => void, headers: any
	): void;
}

declare namespace net {
	function getBytesLeft(): void;
	function isStreaming(): boolean;
	function readAngle(): IAngle;
	function readBit(): number;
	function readColor(): IColor;
	function readData(n: number): string;
	function readDouble(): number;
	function readEntity(): IEntity;
	function readFloat(): number;
	function readInt(n: number): number;
	function readMatrix(): IVMatrix;
	function readStream(cb: (data: any) => void): void; // TODO: Determine the type of data
	function readString(): string;
	function readUInt(n: number): number;
	function readVector(): IVector;
	function receive(name: string, func: (length: number, ply: (IPlayer | undefined)) => void): void;
	function send(target?: any, unreliable?: boolean): void; // TODO: Determine the type of target
	function start(name: string): void;
	function writeAngle(t: IAngle): void;
	function writeBit(t: boolean): void;
	function writeColor(t: IColor): void;
	function writeData(t: string, n: number): void; // TODO: Determine the type of t
	function writeDouble(t: number): void;
	function writeEntity(t: IEntity): void;
	function writeFloat(t: number): void;
	function writeInt(t: number, n: number): void;
	function writeMatrix(t: IVMatrix): void;
	function writeStream(str: string): void;
	function writeString(t: string): void;
	function writeUInt(t: number, n: number): void; // * It should be noted that the number n < 33 and t >= 0. Put this in the tsdoc string.
	function writeVector(t: IVector): void;
}

declare interface IScreenVector {
	x: number;
	y: number;
	visible: true;
}

/**
 * @realm Shared
 * @description Starfall's builtin vector construction function
 */
declare function Vector(x: number, y: number, z?: number): IVector;

/**
 * @realm Shared
 * @description Starfall's builtin Vector library
 */
declare interface IVector {
	x: number;
	y: number;
	z?: number;

	add(vector: IVector): void;
	cross(vector: IVector): IVector;
	div(vector: IVector): void;
	dot(vector: IVector): number;
	getIAngle(): IAngle;
	getDistance(vector: IVector): number;
	getDistanceSqr(vector: IVector): number;
	getLength(): number;
	getLength2D(): number;
	getLengthSqr(): number;
	getLength2DSqr(): number;
	getNormalized(): IVector;
	isEqualTol(vector: IVector, tolerance: number): boolean;
	isZero(): boolean;
	mul(scalar: number): void;
	normalize(): void;
	rotate(angle: IAngle): void;
	// TODO: See what can be optionalized here:
	rotateAroundAxis(axis: IVector, degrees: number, radians: number): IVector;
	set(vector: IVector): void;
	setX(x: number): IVector;
	setY(y: number): IVector;
	setZ(z: number): IVector;
	setZero(): void;
	sub(vector: IVector): void;
	toScreen(): IScreenVector;
	vdiv(vector: IVector): void;
	vmul(vector: IVector): void;
	withinAABox(vector1: IVector, vector2: IVector): boolean;
}

/**
 * @realm Shared
 * @description Starfall's builtin angle construction function
 */
declare function Angle(pitch: number, yaw: number, roll: number): IAngle;

/**
 * @realm Shared
 * @description Starfall's builtin angle library
 */
declare interface IAngle {
	p: number;
	y: number;
	r: number;
	pitch: number;
	yaw: number;
	roll: number;

	getForward(): IVector;
	getNormalized(): IAngle;
	getRight(): IVector;
	getUp(): IVector;
	isZero(): boolean;
	normalize(): void;
	// TODO: See what can be optionalized here.
	rotateAroundAxis(axis: IVector, degrees: number, radians: number): IAngle;
	set(angle: IAngle): void;
	setP(pitch: number): IAngle;
	setR(roll: number): IAngle;
	setY(yaw: number): IAngle;
	setZero(): void;
}

/**
 * @realm Client
 * @description Starfall's builtin bass library
 */
declare interface IBass {
	getFFT(samples: number): number[];
	getLength(): number;
	getTime(): number;
	isOnline(): true;
	isValid(): true;
	pause(): void;
	play(): void;
	setFade(min: number, max: number): void;
	setLooping(loop: boolean): void;
	setPitch(pitch: number): void;
	setPos(pos: IVector): void;
	setTime(time: number): void;
	setVolume(volume: number): void;
	stop(): void;
}

/**
 * @realm Shared
 * @description Starfall's builtin color construction function
*/
declare function Color(red: number, green: number, blue: number, alpha?: number): IColor;

/**
 * @realm Shared
 * @description Starfall's builtin color library.
*/
declare interface IColor {
	r: number;
	g: number;
	b: number;
	a?: number;
	h: number;
	s: number;
	v: number;

	hsvToRGB(): IColor;
	rgbToHSV(): IColor;
	setR(r: number): IColor;
	setG(b: number): IColor;
	setB(g: number): IColor;
	setA(a: number): IColor;
}

/*declare enum CHAN {
	REPLACE,
	AUTO,
	WEAPON,
	VOICE,
	ITEM,
	BODY,
	STREAM,
	STATIC,
	VOICE2,
	VOICE_BASE,
	USER_BASE
}*/


/**
 * @realm Shared
 * @description Garry's mod's [CollisionData interface](http://wiki.garrysmod.com/page/Structures/CollisionData).
 */
declare interface ICollisionData {
	/** The collision position */
	HitPos: IVector;

	/** The other collision entity */
	HitEntity: IEntity;

	/** The entity's velocity before the collision  */
	OurOldVelocity: IVector;

	/** Other entity's physics object  */
	HitObject: IPhysObj;

	/** Time since the last collision with this HitEntity */
	DeltaTime: number;

	/** Speed of the other entity before the collision  */
	TheirOldVelocity: IVector;

	/** The speed of the entity before the collision  */
	Speed: number;

	/** Normal of the surface that hit the other entity */
	HitNormal: IVector;

	/** Entity's physics object */
	PhysObject: IPhysObj;

}


/**
 * @realm Shared
 * @description Starfall's builtin entity library.
 */
declare interface IEntity {
	addCollisionListener(callback: (collisionData: ICollisionData) => void): void;
	applyAngForce(angle: IAngle): void;

	// TODO: Verify that attacker and inflictor are, in fact, entities.
	applyDamage(damage: number, attacker: IEntity, inflictor: IEntity): void;
	applyForceCenter(force: IVector): void;
	applyForceOffset(force: IVector, offset: IVector): void;
	applyTorque(torque: IVector): void;
	breakEnt(): void;
	// TODO: clarify this by interrogating sfex devs
	emitSound(path: string, level?: number, pitch?: number, channel?: number): void;
	enableDrag(enable: boolean): void;
	enableGravity(enable: boolean): void;
	enableMotion(enable: boolean): void;
	enableSphere(enable: boolean): void;
	entIndex(): number;
	extinguish(): void;
	getIAngles(): IAngle;
	getIAngleVelocity(): IAngle;
	getIAngleVelocityIAngle(): IAngle;
	getAttachment(index: number): any; // TODO: Figure out how this function returns.
	getAttachmentParent(): number;
	getBoneCount(): number;
	getBoneMatrix(index?: number): IVMatrix;
	getBoneName(bone?: number): string;
	getBoneParent(bone?: number): string;
	getBonePosition(bone?: number): any; // TODO: Figure out how this function returns.
	getClass(): string;
	getColor(): IColor;
	getEyeIAngles(): IAngle;
	getEyePos(): IVector; // TODO: Figure out how this returns in the case of the IEntity being a ragdoll.
	getForward(): IVector;
	getHealth(): number;
	getInertia(): IVector;
	getMass(): number;
	getMassCenter(): IVector;
	getMassCenterW(): IVector;
	getMaterial(): string;
	getMaterials(): any; // TODO: Figure out what this returns.
	getMaxHealth(): number;
	getModel(): string;
	getOwner(): IPlayer;
	getParent(): IEntity;
	getPhysicsObject(): IPhysObj;
	getPhysicsObjectCount(): number;
	getPhysicsObjectNum(id: number): IPhysObj;
	getPhysMaterial(): string; // TODO: Verify this return type.
	getPos(): IVector;
	getRight(): IVector;
	getSkin(): number;
	getSubMaterial(index: number): string;
	getUp(): IVector;
	getVelocity(): IVector;
	getWaterLevel(): number;
	ignite(): void;
	isFrozen(): boolean;
	isNPC(): boolean;
	isOnGround(): boolean;
	isPlayer(): boolean;
	isValid(): boolean;
	isValidPhys(): boolean;
	isVehicle(): boolean;
	isWeapon(): boolean;
	isWeldedTo(): IEntity;
	linkComponent(entity: IEntity): void;
	localToWorld(angle: IVector): IVector;
	localToWorldIAngles(angle: IAngle): IAngle;
	lookupAttachment(name: string): number; // TODO: Verify the type of name.
	lookupBone(name: string): number;
	manipulateBoneIAngles(id: number, ang: IAngle): void;
	manipulateBonePosition(id: number, pos: IVector): void;
	manipulateBoneScale(id: number, pos: IVector): void;
	obbCenter(): IVector;
	obbCenterW(): IVector;
	obbSize(): IVector;
	remove(): void;
	removeCollisionListener(): void;
	removeTrails(): void;
	setIAngles(angle: IAngle): void;
	setBodygroup(id: number, value: number): void;
	setColor(color: IColor): void;
	setDrawShadow(enable: boolean, angle: IPlayer): void;
	// setDrawShadow(enable: boolean, IPlayers: IPlayer[]): void;
	setFrozen(state: boolean): void;
	setHologramMesh(mesh: IMesh): void;
	setHologramRenderBounds(angle: IVector, vector: IVector): void;
	setHologramRenderMatrix(matrix: IVMatrix): void;
	setInertia(inertia: IVector): void;
	setMass(mass: number): void;
	setMaterial(material: string): void;
	setNocollideAll(enable: boolean): void;
	setNoDraw(disable: boolean): void;
	setParent(parent: IEntity, attachment?: string): void;
	setPhysMaterial(material: string): void; // TODO: Verify that material is indeed a string
	setPos(pos: IVector): void;
	setRenderFX(renderfx: number): void;
	setRenderMode(rendermode: number): void;
	setSkin(index: number): void;
	setSolid(solid: boolean): void;
	setSubMaterial(index: number, material: string): void;
	setTrails(
		startSize: number, endSize: number, length: number, material: string, color: IColor,
		attachmentID?: number, additive?: boolean,
	): void;
	setVelocity(velocity: IVector): void;
	translateBoneToPhysBone(id: number): number;
	translatePhysBoneToBone(id: number): number;
	unparent(): void; // ? Does this not take any argments? It doesn't according to the docs, anyways.
	worldToLocal(vector: IVector): IVector;
	worldToLocalIAngles(angle: IAngle): IAngle;
}


/**
 * VMatrix Interface
 */
declare interface IVMatrix {
	getAngles(): IAngle;
	/** !TupleReturn */
	getAxisAngle(): [number, number];
	getField(): any;
	getForward(): IVector;
	getInverse(): IVMatrix;
	getInverseTR(): IVMatrix;
	getRight(): IVector;
	getScale(): IVector;
	getTranslation(): IVector;
	getTransposed(): IMatrix;
	getUp(): IVector;
	invert(): boolean;
	invertTR(): void;
	isIdentity(): boolean;
	isRotationMatrix(): boolean;
	rotate(angle: IAngle): void;
	scale(vector: IVector): void;
	scaleTranslation(amount: number): void;
	set(sourceMatrix: IVMatrix): void;
	setAngles(angle: IAngle): void;
	setField(row: number, column: number, value: any): void;
	setForward(forward: IVector): void;
	setIdentity(): void;
	setRight(rightVector: IVector): void;
	setScale(scale: IVector): void;
	setTranslation(vector: IVector): void;
	setUp(upVector: IVector): void;
	toTable(): any;
	translate(vector: IVector): void;
	transpose(): void;
}


declare interface IPlayer extends IEntity {
	getActiveWeapon(): string;
	getAimVector(): IVector;
	getArmor(): number;
	getDeaths(): number;
	getEyeTrace(): any; // TODO: Add ITraceResult
	getFOV(): number;
	getFrags(): number;
	getFriendStatus(): string;
	getJumpPower(): number;
	getMaxSpeed(): number;
	getName(): string;
	getPing(): number;
	getRunSpeed(): number;
	getShootPos(): IVector;
	getSteamID(): string;
	getTeam(): number;
	getTeamName(): string;
	getUniqueID(): string;
	getUserID(): number;
	getVehicle(): IEntity; // TODO: Change this to IVehicle once that is added.
	getViewEntity(): IEntity;
	getWeapon(wep: string): any; // TODO: Change this to IWeapon once that is added. Also, find a better name for wep
	getWeapons(): any; // TODO: Change this to IWeapon[] once that is added.
	hasGodMode(): boolean;
	inVehicle(): boolean;
	isAdmin(): boolean;
	isAlive(): boolean;
	isBot(): boolean;
	isConnected(): boolean;
	isCrouching(): boolean;
	isFlashlightOn(): boolean;
	isFrozen(): boolean;
	isMuted(): boolean;
	isNPC(): boolean;
	isNoclipped(): boolean;
	isPlayer(): boolean;
	isSuperAdmin(): boolean;
	isUserGroup(group: any): boolean; // TODO: Determine the type of group.
	keyDown(key: any): boolean; // TODO: Change group to some sort of key enum.
	setViewEntity(ent: IEntity): void;
}


declare interface ITraceResult {
	Entity: IEntity,
	Fraction: number,
	FractionLeftSolid: number,
	Hit: boolean,
	HitBox: number,
	HitGroup: number,
	HitNoDraw: boolean,
	HitNonWorld: boolean,
	HitNormal: IVector,
	HitPos: IVector,
	HitSky: boolean,
	HitTexture: string,
	HitWorld: boolean,
	MatType: number,
	Normal: IVector,
	PhysicsBone: number,
	StartPos: IVector,
	SurfaceProps: number,
	StartSolid: boolean,
	AllSolid: boolean
}


declare namespace trace {
	function trace(
		startPosition: IVector, endPosition: IVector,
		filter?: IFilter, traceMask?: any, 	// any => unknown
		collisionGroup?: any, 				// any => unknown

	): ITraceResult;
}


/**
 * Stub PhysObj Interface
 */
declare interface IPhysObj {
	STUB: any;
	// TODO: Populate Stub PhysObj Interface
}


/**
 * @realm Shared
 * @description Starfall's Mesh Type
 */
declare interface IMesh {
	// TODO: Verify that there isn't actually anything else that can be done to Meshes.
	destroy(): void;
	draw(): void;
}


declare interface IHologram extends IEntity {
	getAnimationLength(): number;
	getAnimationNumber(name: string): number;
	getFlexes(): any; // TODO: Make an interface for this return type.
	getPose(name: string): number; // TODO: Verify that this actually returns a number.
	setAngVel(angVel: IVector): void;
	setAnimation(name: string, frame: number, rate: number): void;
	// TODO: Verify that normal is a Vector.
	setClip(index: number, enabled: boolean, origin: IVector, normal: IVector, local: boolean): void;
	setFlexScale(scale: IVector): void; // TODO: Ensure that scale is a Vector, and not an number.
	setFlexWeight(id: number, weight: number): void;
	setModel(model: string): void;
	setPose(name: string, value: number): void; // TODO: Ensure that value is a number.
	setScale(scale: IVector): void;
	setVel(vel: IVector): void;
	suppressEngineLighting(suppress: boolean): void;
}


declare interface IPhysObj {
	applyForceCenter(force: IVector): void;
	applyForceOffset(force: IVector, position: IVector): void;
	applyTorque(torque: IVector): void;
	enableDrag(drag: boolean): void;
	enableGravity(grav: boolean): void;
	enableMotion(move: boolean): void;
	getAngleVelocity(): IVector;
	getAngles(): IAngle;
	getEntity(): IEntity;
	getInertia(): IVector;
	getMass(): number;
	getMassCenter(): IVector;
	getMaterial(): string;
	getMesh(): any; // TODO: Create an interface for wiki.garrysmod.com/page/Structures/MeshVertex
	getMeshConvexes(): any; // TODO: Create an interface for wiki.garrysmod.com/page/Structures/MeshVertex
	getPos(): IVector;
	getVelocity(): IVector;
	isValid(): boolean;
	localToWorld(vec: IVector): IVector;
	localToWorldVector(vec: IVector): IVector;
	setInertia(inertia: IVector): void;
	setMass(mass: number): void;
	setMaterial(material: string): void;
	setPos(pos: IVector): void;
	setVelocity(vel: IVector): void;
	wake(): void;
	worldToLocal(vec: IVector): IVector;
	worldToLocalVector(vec: IVector): IVector;
}
