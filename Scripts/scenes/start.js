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
    var StartScene = /** @class */ (function (_super) {
        __extends(StartScene, _super);
        //Public Properties
        //Constructor
        function StartScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        //Private Methods
        StartScene.prototype._startButtonClick = function () {
            objects.Game.currentScene = config.Scene.STAGE01;
        };
        //Public Methods
        StartScene.prototype.Start = function () {
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
        };
        StartScene.prototype.Update = function () {
        };
        StartScene.prototype.Main = function () {
            // add the welcome kabek to the scene
            this.addChild(this._background);
            this.addChild(this._banner);
            //add the startbutton to the scene
            this.addChild(this._titleLabel);
            this.addChild(this._startButton);
        };
        return StartScene;
    }(objects.Scene));
    scenes.StartScene = StartScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=start.js.map