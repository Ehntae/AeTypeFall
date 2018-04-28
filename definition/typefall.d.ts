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
// tslint:disable-next-line:interface-name
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

/** Bitlib (release 25) is luaJITs bitwise implementation (C) */
declare namespace bit {
	const bits: number;

	/**
	 * @description Returns the bitwise or of the w's
	 * @param w1 Bitwise operand 1
	 * @param wn Bitwise operands n...
	 */
	function bor(w1: number, ...wn: number[]): number;

	/**
	 * @description Returns the bitwise and of the w's
	 * @param w1 Bitwise operand 1
	 * @param wn Bitwise operands n...
	 */
	function band(w1: number, ...wn: number[]): number;
}



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

/**
 * @realm Shared
 * Generally used to get the player who placed the processor.
 * @returns IEntity Representing the player who owns the Starfall processor running this code.
 */
declare function owner(): IEntity;


/**
 * @realm Shared
 * @description Used to get the entity object representing the player with a given userId.
 * @example Type "status" in console to get userIds
 * @param userId The userId of the player you want to get.
 * @returns IEntity | undefined Will be undefined (nil) if the userId is invalid.
 */
declare function player(userId: number): IEntity | undefined;


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
	function add(eventName: string, hookName: string, callback: () => void): void;

	/**
	 * @realm Shared
	 * @description Used to remove callbacks (hooks) from a specified event
	 * @param eventName Name of the event the 'hook' is attached to
	 * @param hookName Unique identifier for the hook to remove from the event
	 */
	function remove(eventName: string, hookName: string): void;
}

/**
 * @realm Client
 * @description Starfall's builtin render library
 */
declare namespace render {

	function drawRect(x: number, y: number, width: number, height: number): void;

	function drawRectOutline(x: number, y: number, width: number, height: number): void;

	function drawRoundedBox(cornerRadius: number, x: number, y: number, width: number, height: number): void;

	function drawRoundedBoxEX(
		cornerRadius: number, x: number, y: number, width: number, height: number,
		roundTopLeft: boolean, roundTopRight: boolean, roundBottomLeft: boolean, roundBottomRight: boolean,
	): void;

	function drawSimpleText(x: number, y: number, text: string, xAlignment?: number, yAlignment?: number): void;
	// function drawText(x: number, y: number, alignment: any): void; // TODO: Figure out type

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
	function cursorPos(player: IEntity): [number, number]; // ? Create interface for this?
}


declare type IFilter = (entity: IEntity) => boolean;

declare namespace find {
	function all(filter: IFilter): IEntity[];
	function allPlayers(filter: IFilter): IEntity[];
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
	function post( // TODO: Determine the type of params, headers, and reason.
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
 * @description Starfall's builtin render library
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
	isWeldedTo(): boolean;
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
 * Stub VMatrix Interface
 */
declare interface IVMatrix {
	STUB: any;
	// TODO: Populate Stub IVMatrix Interface
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
// tslint:disable-next-line:max-file-line-count

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
// tslint:disable-next-line:max-file-line-count
