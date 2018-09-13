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
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        // constructor
        function Enemy(assetManager, assetName, _scaleX, _scaleY) {
            if (_scaleX === void 0) { _scaleX = 1; }
            if (_scaleY === void 0) { _scaleY = 1; }
            var _this = _super.call(this, assetManager, assetName) || this;
            _this.scaleX = _scaleX;
            _this.scaleY = _scaleY;
            _this.Start();
            return _this;
        }
        Enemy.prototype.Start = function () {
            this.rotation = 180;
            this.health = 5;
            this.name = "enemy";
        };
        Enemy.prototype.Update = function () {
        };
        Enemy.prototype.CheckBounds = function () {
        };
        return Enemy;
    }(objects.GameObject));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=enemy.js.map