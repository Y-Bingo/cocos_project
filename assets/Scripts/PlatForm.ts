const { ccclass, property } = cc._decorator;

/** 楼梯/障碍物类型 */
export enum EFloorType {
    NONE = 0,
    MOCK = 1,
    BOMB = 2,
    DIAMOND = 3,
    MUSHROOM = 4,
    STONE = 5,
}

@ccclass
export default class PlatForm extends cc.Component {

    /** 障碍物 */
    @property( cc.Node )
    block: cc.Node = null;

    /** 平台类型 */
    @property
    private _floorType: EFloorType = -1;

    @property
    get floorType() { return this._floorType; }

    set floorType( value: EFloorType ) {
        if ( isNaN( value ) ) return;
        if ( this._floorType == value ) return;
        value = Math.max( Math.min( value, EFloorType.STONE ), EFloorType.NONE );

        this._floorType = value;
        this._changeType();
    }

    private _changeType(): void {
        let sprite = this.block.getComponent( cc.Sprite );
        sprite.spriteFrame = this.blockFrameList[ this._floorType ];
    }

    /** 图片类型 */
    @property( [ cc.SpriteFrame ] )
    blockFrameList: cc.SpriteFrame[] = [];

    /** 下落 */
    drop( x: number, y: number ): void {
        this.node.runAction( cc.moveTo( 0.25, x, y ) );
    }

    /** 坠落 */
    fall(): void {
        let drop = cc.moveBy( 0.2, 0, -150 );
        let call = cc.callFunc( () => {
            this.node.removeFromParent( true );
        } );

        this.node.runAction( cc.sequence( drop, call ) );
    }
}
