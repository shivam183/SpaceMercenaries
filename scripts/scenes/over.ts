module scenes {
    export class OverScene extends objects.Scene {

        //Private Instance Variables
        private _titleLabel: objects.Label;
        private _highScore: objects.Label;
        private _currentScore: objects.Label;
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
            objects.Game.currentScene = config.Scene.PLAY;
        }

        //Public Methods

        public Start(): void {
            objects.Scene.music.stop();
            objects.Scene.music = createjs.Sound.play("end_music");
            objects.Scene.music.loop = -1;
            objects.Scene.music.volume = 1;

            if(objects.Game.current_score > objects.Game.high_score){
                objects.Game.high_score = objects.Game.current_score;
            }

            this._background = new objects.GameObject(this.assetManager, "background04", false);
            this._titleLabel = new objects.Label("GAME OVER", "bold 80px", "Orbitron", "#FFFFFF", 400, 50, false);
            this._titleLabel.textAlign = 'center';

            this._highScore = new objects.Label("High Score: "+ objects.Game.high_score, 
            "bold 40px", "Orbitron", "#FFFFFF", 400, 200, false);
            this._highScore.textAlign = 'center';

            this._currentScore = new objects.Label("Your Score: "+ objects.Game.current_score, 
            "bold 30px", "Orbitron", "#FFFFFF", 400, 250, false);
            this._currentScore.textAlign = 'center';


            this._banner = new objects.GameObject(this.assetManager, "createJS_logo");
            this._banner.x = 700;
            this._banner.y = 550;

            //this._titleLabel = new objects.Label("SPACE WARS", "60px", "Consolas", "#000000", 400, 200, true);
            this._startButton = new objects.Button(this.assetManager, "start_button", 400, 350, true);
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
            this.addChild(this._titleLabel);
            this.addChild(this._highScore);
            this.addChild(this._currentScore);
            this.addChild(this._startButton);
        }
    }
}