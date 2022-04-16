class Clock extends egret.Sprite {
    private bg: egret.Bitmap
    public stick: egret.Bitmap

    constructor() {
        super()
        // 创建时钟背景
        this.createClockBG()
        // 创建时钟指针
        this.createStick()
        // 时钟旋转动画
        const direction = (Math.random() > 0.5)
        egret.Tween.get(this.stick, { loop: true }).to({ rotation: 360 * (direction ? 1 : -1) }, 1000)
    }

    /**
     * 设置始终样式
     */
    public toggleClockStyle(state = false) {
        this.bg.texture = RES.getRes(state ? 'player' : 'other')
        this.stick.texture = RES.getRes(state ? 'playerStick' : 'otherStick')
    }

    /**
     * 绘制始终背景
     */
    createClockBG() {
        this.bg = new egret.Bitmap()
        this.bg.texture = RES.getRes('other')
        this.bg.width = 60
        this.bg.height = 60
        this.addChild(this.bg)
    }

    /**
     * 绘制时钟指针
     */
    createStick() {
        this.stick = new egret.Bitmap()
        this.stick.texture = RES.getRes('otherStick')
        this.stick.width = 10
        this.stick.height = 30
        this.stick.x = this.width / 2
        this.stick.y = this.stick.height
        this.stick.anchorOffsetX = this.stick.width / 2
        this.stick.anchorOffsetY = this.stick.height - 5
        this.toggleClockStyle(false)
        this.addChild(this.stick)
    }
}