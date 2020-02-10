class StartScene extends Scene {
	private stickImg: eui.Image
	private startButton: eui.Button

	public constructor() {
		super();
		this.skinName = "resource/scenes/StartScene.exml";
	}

	protected onComplete() {
		// this.stickImg.anchorOffsetX = this.stickImg.width / 2
		// this.stickImg.x = this.width / 2 + this.stickImg.width / 2
		// console.log(this.stickImg.x )
		// const tween = egret.Tween.get(this.stickImg, { loop: true })
		// tween.to({ rotation: 360 }, 1000)
		(this.startButton.labelDisplay as eui.Label).size = 40
		this.startButton.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>this.startGame(), this)
	}

	private startGame() {
		SceneManager.setScene('play')
	}
}