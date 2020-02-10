class EndScene extends Scene {

	private score: eui.Label
	private restartButton: eui.Button

	public constructor() {
		super();
		this.skinName = "resource/scenes/EndScene.exml";
	}

	protected onComplete() {
		const currentScore = egret.localStorage.getItem('score')
		this.score.text = `得分: ${currentScore}`;
		(this.restartButton.labelDisplay as eui.Label).size = 40
		this.restartButton.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			SceneManager.setScene(new PlayScene())
		}, this)
	}
}