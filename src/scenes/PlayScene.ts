/// <reference path="../components/Box.ts" />

interface IBoxData {
	row: number
	column: number
	box: Box
}

class PlayScene extends Scene {
	private gameContainer: eui.Group
	private score: eui.Label

	private bullet: Bullet
	private maxCol: number = 7;
	private maxRow: number = 10
	private boxSize: number = 80;
	private space = 5
	private speed = 1000
	private hiddenBoxs: IBoxData[] = []
	private displayBoxs: IBoxData[] = []
	private player: IBoxData
	private boxCount = 8
	private beginX
	private beginY
	private boxScore = 5
	private currentScore = 0
	public constructor() {
		super();
		this.skinName = "resource/scenes/PlayScene.exml";
	}


	protected onComplete() {
		this.createBackground()
		this.createMatrixBox()
		this.createDisplayBoxs()
		this.createPlayer()
		egret.localStorage.setItem("score", this.currentScore.toString())
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => this.onTouch(), this)
		this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
	}

	private updateScore() {
		this.currentScore += this.boxScore
		this.score.text = `得分: ${this.currentScore}`
		egret.localStorage.setItem("score", this.currentScore.toString())
	}

	private createDisplayBoxs() {
		const boxs = this.hiddenBoxs.sort(() => Math.random() - 0.5).slice(0, this.boxCount)
		this.displayBoxs = [...boxs]
		this.hiddenBoxs = this.hiddenBoxs.filter(box => !boxs.includes(box))
		this.displayBoxs.forEach(({box}) => box.addClock())
	}


	private createPlayer(box?) {
		if (!box) {
			const [target] = this.displayBoxs
			box = target
		}

		this.player = box
		this.player.box.setPlayer(true)
	}


	private onTouch() {
		if (this.bullet) {
			return
		}

		const rotation = this.player.box.rotation - 90
		const x = this.beginX + (this.player.column - 1) * (this.boxSize + this.space) + this.boxSize * 0.5
		const y = this.beginY + (this.player.row - 1) * (this.boxSize + this.space) + this.boxSize * 0.5
		const shootX = x + Math.cos(rotation * Math.PI / 180) * this.boxSize / 2.5;
		const shootY = y + Math.sin(rotation * Math.PI / 180) * this.boxSize / 2.5;
		this.createBullet(shootX, shootY, rotation)
	}


	private update() {
		if (this.bullet) {
			// 更新位置
			this.updateBulletPosition()
			const hitTarget = this.checkBulletHit()

			if (hitTarget) {
				this.onBulletHit(hitTarget)
			}
			this.onOverBound()
		}
	}

	private onOverBound() {
		if (this.bullet) {
			const isXOver = (this.bullet.x < this.beginX) || (this.bullet.x > this.gameContainer.width - this.beginX)
			const isYOver = (this.bullet.y < this.beginY) || (this.bullet.y > this.gameContainer.height - this.beginY)

			if (isXOver || isYOver) {
				this.gameContainer.removeChild(this.bullet)
				this.bullet = undefined
				SceneManager.setScene(new EndScene())
			}
		}
	}

	private onBulletHit(target: IBoxData) {
		// 删除player
		this.displayBoxs = this.displayBoxs.filter(x => x !== this.player)
		this.hiddenBoxs.push(this.player)
		this.hiddenBoxs = this.hiddenBoxs.sort((x, y) => Math.random() - 0.5)
		this.player.box.removeClock()
		target.box.setPlayer(true)
		this.gameContainer.removeChild(this.bullet)
		this.bullet = null
		this.player = target
		this.updateScore()

		const newBox = this.hiddenBoxs.pop()
		this.displayBoxs.push(newBox)
		newBox.box.addClock()
	}


	private checkBulletHit() {
		const {x, y} = this.bullet.localToGlobal()
		const boxs = this.displayBoxs.filter(box => box != this.player).map(box => box)
		return boxs.find(({box: {clock}}) => clock.hitTestPoint(x, y))

	}

	private updateBulletPosition() {
		this.bullet.x += Math.cos(this.bullet.rotation * Math.PI / 180) * this.bullet.speed;
		this.bullet.y += Math.sin(this.bullet.rotation * Math.PI / 180) * this.bullet.speed;
	}

	/**
	 * 创建子弹
	 */
	private createBullet(x, y, rotation) {
		this.bullet = new Bullet(rotation)
		this.bullet.x = x
		this.bullet.y = y
		this.bullet.rotation = rotation
		this.gameContainer.addChild(this.bullet)
	}

	/**
	 * 创建页面背景
	 */
	private createBackground() {
		const background = new egret.Bitmap(RES.getRes("game_bg"));
		background.width = this.width
		background.height = this.height
		this.addChildAt(background, 0)
	}

	/**
	 * 创建时钟矩阵棋盘
	 */
	private createMatrixBox() {
		this.validateNow()

		this.beginX = (this.gameContainer.width - this.maxCol * this.boxSize - (this.maxCol - 1) * this.space) / 2
		this.beginY = (this.gameContainer.height - this.maxRow * this.boxSize - (this.maxRow - 1) * this.space) / 2

		for (let column = 1; column <= this.maxCol; column++) {
			for (let row = 1; row < this.maxRow; row++) {
				const box = new Box()
				box.width = this.boxSize
				box.height = this.boxSize
				box.x = this.beginX + (column - 1) * (this.space + this.boxSize)
				box.y = this.beginY + (row - 1) * (this.space + this.boxSize)

				this.hiddenBoxs.push({
					column,
					row,
					box
				})
				this.gameContainer.addChild(box)
			}
		}
	}

}