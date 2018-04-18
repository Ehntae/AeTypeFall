/** [Shared] True when client realm is actively executing */
declare const CLIENT : boolean;

/** [Shared] True when server realm is actively executing */
declare const SERVER : boolean;

/**
 * [Shared]
 * Starfall's builtin print function
 * @param messages A variable argument list of strings to print 
 */
declare function print(...messages: string[]): void;

/**
 * [Shared]
 * Garry's recursive table-printing function (useful to see the keys and values that comprise an array)
 * @param table Lua table object to print
 */
declare function printTable(table: object): void;

declare function chip(): IEntity;
declare function owner(): IEntity;


/** [Shared] Starfall's builtin hook library */
declare namespace hook {
    /**
     * [Shared]
     * Used to attach named callbacks (hooks) to specific events (for event driven code execution)
     * @param eventName Name of the event to 'hook' the callback to
     * @param hookName Unique identifier for the hook being attached to the event
     * @param callback The function that is called(back) whenever the event fires
     */
    function add(eventName: string, hookName: string, callback: Function): void;

    /**
     * [Shared]
     * Used to remove callbacks (hooks) from a specified event
     * @param eventName Name of the event the hook is attached to
     * @param hookName Unique identifier for the hook to remove from the event
     */
    function remove(eventName: string, hookName: string): void;
}

/** [Client] Starfall's builtin render library */
declare namespace render {
    function drawRect(x: number, y: number, width: number, height: number): void;
    function drawRectOutline(x: number, y: number, width: number, height: number): void;
    function drawRoundedBox(cornerRadius: number, x: number, y: number, width: number, height: number): void;
    function drawRoundedBoxEX(cornerRadius: number, x: number, y: number, width: number, height: number, 
        roundTopLeft: boolean, roundTopRight: boolean, roundBottomLeft: boolean, roundBottomRight: boolean): void;
    function drawSimpleText(x: number, y: number, text: string, xAlignment?: any, yAlignment?: any): void; // TODO: Figure out type
    function drawText(x: number, y: number, alignment: any): void; // TODO: Figure out type
    function setColor(color: IColor): void;
    /** !TupleReturn */
    function cursorPos(player: IPlayer): [number, number]; // TODO: Create interface for this 
}

declare interface IFilter {
    (ent: IEntity) : boolean
}

declare namespace find {
    function all(filter: IFilter): IEntity[];
    function allPlayers(filter: IFilter): IEntity[];
    function byClass(className: string, filter: IFilter): IEntity[];
    function byModel(model: string, filter: IFilter): IEntity[];
    function inBox(corner1: IVector, corner2: IVector, filter: IFilter): IEntity[];
    function inCone(pos: IVector, direction: IVector, distance: number, radius: number, filter: IFilter): IEntity[]; // TODO: Confirm that direction is a Vector, not an Angle.
    function inSphere(center: IVector, radius: number, filter: IFilter): IEntity[];
}

declare namespace holograms {
    function canSpawn(): boolean;
    function create(pos: IVector, ang: IAngle, model: string, scale?: IVector): IHologram;
    function hologramsLeft(): number;
}

declare interface IScreenVector {
    x: number,
    y: number,
    visible: true
}

/** [Shared] Starfall's builtin vector construction function */
declare function Vector(x: number, y: number, z?:number): IVector;

/** [Shared] Starfall's builtin render library */
declare interface IVector {
    x: number;
    y: number;
    z?: number;

    add(IVector: IVector): void;
    cross(IVector: IVector): IVector;
    div(IVector: IVector): void;
    dot(IVector: IVector): number;
    getIAngle(): IAngle;
    getDistance(IVector: IVector): number;
    getDistanceSqr(IVector: IVector): number;
    getLength(): number;
    getLength2D(): number;
    getLengthSqr(): number;
    getLength2DSqr(): number;
    getNormalized(): IVector;
    isEqualTol(IVector: IVector, tolerance: number): boolean;
    isZero(): boolean;
    mul(scalar: number): void;
    normalize(): void;
    rotate(IAngle: IAngle): void;
    rotateAroundAxis(axis: IVector, degrees: number, radians: number): IVector; // TODO: See what can be optionalized here.
    set(IVector: IVector): void;
    setX(x: number): IVector;
    setY(y: number): IVector;
    setZ(z: number): IVector;
    setZero(): void;
    sub(IVector: IVector): void;
    toScreen(): IScreenVector;
    vdiv(IVector: IVector): void;
    vmul(IVector: IVector): void;
    withinAABox(IVector1: IVector, IVector2: IVector): boolean;
}

/** [Shared] Starfall's builtin angle construction function */
declare function Angle(pitch: number, yaw:number, roll: number): IAngle;

/** [Shared] Starfall's builtin angle library */
declare interface IAngle {
    p: number;
    y: number;
    r: number;
    pitch: number;
    yaw: number;
    roll: number;
    
    getForward(): IVector
    getNormalized(): IAngle
    getRight(): IVector
    getUp(): IVector
    isZero(): boolean
    normalize(): void
    rotateAroundAxis(axis: IVector, degrees: number, radians: number): IAngle; // TODO: See what can be optionalized here.
    set(IAngle: IAngle): void;
    setP(pitch: number): IAngle;
    setR(roll: number): IAngle;
    setY(yaw: number): IAngle;
    setZero(): void;
}

/** [Client] Starfall's builtin bass library */
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

/** [Shared] Starfall's builtin color construction function */
declare function Color(red: number, green: number, blue: number, alpha?: number): IColor;

/** [Shared] Starfall's builtin color library */
declare interface IColor {
    r: number;
    g: number;
    b: number;
    h: number;
    s: number;
    v: number;

    hsvToRGB(): IColor;
    rgbToHSV(): IColor;
    setA(a: number): IColor;
    setB(g: number): IColor;
    setG(b: number): IColor;
    setR(r: number): IColor;
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

/** [Shared] Starfall's builtin entity library */
declare interface IEntity {
    addCollisionListener(callback: Function): void;
    applyAngForce(IAngle: IAngle): void;
    applyDamage(damage: number, attacker: IEntity, inflictor: IEntity): void; // TODO: Verify that attacker and inflictor are, in fact, entities.
    applyForceCenter(force: IVector): void;
    applyForceOffset(force: IVector, offset: IVector): void;
    applyTorque(torque: IVector): void;
    breakEnt(): void;
    emitSound(path: string, level?: number, pitch?: number, channel?: number): void; //TODO: clarify this by interrogating sfex devs
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
    getBonePosition(bone?:number): any; // TODO: Figure out how this function returns.
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
    localToWorld(IVector: IVector): IVector;
    localToWorldIAngles(IAngle: IAngle): IAngle;
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
    setIAngles(IAngle: IAngle): void;
    setBodygroup(id: number, value: number): void;
    setColor(color: IColor): void;
    setDrawShadow(enable: boolean, IPlayer: IPlayer): void;
    setDrawShadow(enable: boolean, IPlayers: IPlayer[]): void;
    setFrozen(state: boolean): void;
    setHologramMesh(mesh: IMesh): void;
    setHologramRenderBounds(IVector1: IVector, IVector2: IVector): void;
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
    setTrails(startSize: number, endSize: number, length: number, material: string, color: IColor, attachmentID?: number, additive?: boolean): void;
    setVelocity(velocity: IVector): void;
    translateBoneToPhysBone(id: number): number;
    translatePhysBoneToBone(id: number): number;
    unparent(): void; // ? Does this not take any argments? It doesn't according to the docs, anyways.
    worldToLocal(IVector: IVector): IVector;
    worldToLocalIAngles(IAngle: IAngle): IAngle;
}

/**
 * Stub VMatrix Interface
 */
declare interface IVMatrix {
    // TODO: Populate Stub IVMatrix Interface
}

/**
 * Stub Player Interface
 */
declare interface IPlayer {
    // TODO: Populate Stub Player Interface
}

/**
 * Stub PhysObj Interface
 */
declare interface IPhysObj {
    // TODO: Populate Stub PhysObj Interface
}

/**
 * Starfall's Mesh Type
 */
declare interface IMesh {
    // TODO: Verify that there isn't actually anything else that can be done to Meshes.
    destroy(): void;
    draw(): void;
}

/** [Server] Starfall's builtin hook library */
declare interface IHologram extends IEntity {
    getAnimationLength(): number;
    getAnimationNumber(name: string): number;
    getFlexes(): any; // TODO: Make an interface for this return type.
    getPose(name: string): number; // TODO: Verify that this actually returns a number.
    setAngVel(angVel: IVector): void;
    setAnimation(name: string, frame: number, rate: number): void;
    setClip(index: number, enabled: boolean, origin: IVector, normal: IVector, local: boolean): void; // TODO: Verify that normal is a Vector.
    setFlexScale(scale: IVector): void; // TODO: Ensure that scale is a Vector, and not an number.
    setFlexWeight(id: number, weight: number): void;
    setModel(model: string): void;
    setPose(name: string, value: number): void; // TODO: Ensure that value is a number.
    setScale(scale: IVector): void;
    setVel(vel: IVector): void;
    suppressEngineLighting(suppress: boolean): void;
}
