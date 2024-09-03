module scenes {
    export class StartScene extends objects.Scene {

        //Private Instance Variables
        private _titleLabel: objects.Label;
        private _startButton: objects.Button;
        private _background: objects.GameObject;
        private _banner: objects.GameObject;

        //Public Properties

        //Constructor
        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager);

            this.Start();
        }

        //Private Methods

        private _startButtonClick(): void {
            objects.Game.currentScene = config.Scene.STAGE01;
        }

        //Public Methods

        public Start(): void {

            objects.Scene.music = createjs.Sound.play("intro_music");
            objects.Scene.music.loop = -1;
            objects.Scene.music.volume = 1;

            this._background = new objects.GameObject(this.assetManager, "background04", false);
            this._titleLabel = new objects.Label("SPACE\nMERCENARIES", "bold 60px", "Orbitron", "#FFFFFF", 800, 150, true);
            this._titleLabel.textAlign = "center";

            this._banner = new objects.GameObject(this.assetManager, "createJS_logo");
            this._banner.x = 700;
            this._banner.y = 550;

            //this._titleLabel = new objects.Label("SPACE WARS", "60px", "Consolas", "#000000", 400, 200, true);
            this._startButton = new objects.Button(this.assetManager, "start_button", 400, 300, true);
            this._startButton.scaleX = 0.3;
            this._startButton.scaleY = 0.3;
            this._startButton.on("click", this._startButtonClick);

            this.Main();
        }

        public Update(): void {

        }

        public Main(): void {
            // add the welcome kabek to the scene
            this.addChild(this._background);
            this.addChild(this._banner);
            //add the startbutton to the scene
            this.addChild(this._titleLabel);
            this.addChild(this._startButton);
        }
    }
}