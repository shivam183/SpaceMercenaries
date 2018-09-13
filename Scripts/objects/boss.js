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
var objects;
(function (objects) {
    var Boss = /** @class */ (function (_super) {
        __extends(Boss, _super);
        // constructor
        function Boss(assetManager, assetName, _scaleX, _scaleY) {
            if (_scaleX === void 0) { _scaleX = 1; }
            if (_scaleY === void 0) { _scaleY = 1; }
            var _this = _super.call(this, assetManager, assetName, true) || this;
            _this.scaleX = _scaleX;
            _this.scaleY = _scaleY;
            _this.Start();
            return _this;
        }
        Boss.prototype.Start = function () {
            this.x = 0 + this.regX;
            this.y = 0 + this.regY;
            this.rotation = 180;
            this.health = 400;
            this.name = "boss";
            this._enemy_blt = new objects.Bullet(objects.Game.assetManager, "bullet02");
            this.Update();
        };
        Boss.prototype.Update = function () {
            createjs.Tween.get(this).to({ x: 800 - this.regX }, 1500).to({ x: 0 + this.regX }, 1500).loop = -1;
            this.CheckCollision();
        };
        Boss.prototype.CheckCollision = function () {
        };
        return Boss;
    }(objects.GameObject));
    objects.Boss = Boss;
})(objects || (objects = {}));
//# sourceMappingURL=boss.js.map