var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var OverScene = /** @class */ (function (_super) {
        __extends(OverScene, _super);
        //Public Properties
        //Constructor
        function OverScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        //Private Methods
        OverScene.prototype._startButtonClick = function () {
            objects.Game.currentScene = config.Scene.PLAY;
        };
        //Public Methods
        OverScene.prototype.Start = function () {
            objects.Scene.music.stop();
            objects.Scene.music = createjs.Sound.play("end_music");
            objects.Scene.music.loop = -1;
            objects.Scene.music.volume = 1;
            if (objects.Game.current_score > objects.Game.high_score) {
                objects.Game.high_score = objects.Game.current_score;
            }
            this._background = new objects.GameObject(this.assetManager, "background04", false);
            this._titleLabel = new objects.Label("GAME OVER", "bold 80px", "Orbitron", "#FFFFFF", 400, 50, false);
            this._titleLabel.textAlign = 'center';
            this._highScore = new objects.Label("High Score: " + objects.Game.high_score, "bold 40px", "Orbitron", "#FFFFFF", 400, 200, false);
            this._highScore.textAlign = 'center';
            this._currentScore = new objects.Label("Your Score: " + objects.Game.current_score, "bold 30px", "Orbitron", "#FFFFFF", 400, 250, false);
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
        };
        OverScene.prototype.Update = function () {
        };
        OverScene.prototype.Main = function () {
            // add the welcome kabek to the scene
            this.addChild(this._background);
            this.addChild(this._banner);
            this.addChild(this._titleLabel);
            this.addChild(this._highScore);
            this.addChild(this._currentScore);
            this.addChild(this._startButton);
        };
        return OverScene;
    }(objects.Scene));
    scenes.OverScene = OverScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=over.js.map