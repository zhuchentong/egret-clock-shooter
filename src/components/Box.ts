/// <reference path="./Clock.ts" />

class Box extends egret.Sprite {
    public clock: Clock

    public get rotation() {
        return this.clock.stick.rotation
    }
    constructor() {
        super()
        this.createBox()
    }

    private createBox() {
        const box = new egret.Bitmap()
        box.texture = RES.getRes("rect");
        this.addChild(box)
    }

    public addClock() {
        // 获取缩放比例 0.7 - 1
        const scale = Math.random() * 0.4 + 0.6

        this.clock = new Clock()
        // 设置缩放比例
        this.clock.scaleX = scale
        this.clock.scaleY = scale
        // 设置缩放中心
        this.clock.anchorOffsetX = this.clock.width / 2
        this.clock.anchorOffsetY = this.clock.height / 2
        // 设置位置
        this.clock.x = this.width / 2
        this.clock.y = this.height / 2
        this.addChild(this.clock)
    }

    public removeClock() {
        this.removeChild(this.clock)
        this.clock = undefined
    }

    public setPlayer(state = true) {
        this.clock.toggleClockStyle(state)
    }
}