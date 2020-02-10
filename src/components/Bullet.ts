
class Bullet extends egret.Bitmap
{
    public angle: number;
    public speed: number;
    public rotation
    
    public constructor( rotation)
    {
        super();
        this.texture = RES.getRes( "playerPoint" );
        this.anchorOffsetX = this.width >> 1;
        this.anchorOffsetY = this.height >> 1;
        this.speed = 15;
        this.rotation - rotation
    }
}