class SceneManager {
    // 管理器单例
    public static sceneManager: SceneManager

    // 当前舞台
    private readonly stage: egret.DisplayObjectContainer // 场景容器

    // 场景列表
    private readonly scenes = []

    // 当前场景
    private scene


    /**
     * 获取单例
     */
    public static get instance() {
        if (!this.sceneManager) {
            throw new Error("请初始化基本场景")
        }
        return this.sceneManager
    }

    public constructor(stage, scenes) {
        // 注册舞台
        this.stage = stage
        // 注册场景
        this.registerScenes(scenes)
        SceneManager.sceneManager = this
    }

    /**
     * 注册场景
     */
    public registerScene(key, scene) {
        this.scenes.push({
            key,
            scene: scene
        })
    }

    /**
     * 注册多场景
     */
    public registerScenes(scenes) {
        Object.entries(scenes).forEach(([key, scene]) => {
            this.registerScene(key, scene)
        })
    }

    /**
     * 设置场景
     */
    public static setScene(scene) {
        this.instance.stage.removeChildren()

        const getScene = () => typeof scene === 'string' ?
            SceneManager.instance.scenes.find(x => x.key === scene).scene :
            scene
            
        this.instance.stage.addChild(getScene())
        this.instance.scene = getScene()
    }

    public static clearScene() {
        this.instance.stage.removeChildren()
    }

    /**
     * 初始化游戏，显示开始游戏场景
     */
    public initGame() {
        let [{scene}] = this.scenes

        // 如果有游戏场景，移除掉
        if (this.stage.numChildren) {
            this.stage.removeChildren()
        }
        // 添加开始场景
        SceneManager.setScene(scene)
    }
}