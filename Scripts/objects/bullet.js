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
    var Bullet = /** @class */ (function (_super) {
        __extends(Bullet, _super);
        // constructor
        function Bullet(assetManager, assetName) {
            var _this = _super.call(this, assetManager, assetName) || this;
            _this.Start();
            return _this;
        }
        Bullet.prototype.Start = function () {
            this.name = "bullet";
            this.scaleX = 1.3;
            this.scaleY = 1.3;
        };
        Bullet.prototype.Update = function () {
            this.CheckBounds();
        };
        Bullet.prototype.CheckBounds = function () {
            if (this.y <= -100) {
                objects.Game.stage.removeChild(this);
                console.log("Enemy removed");
            }
        };
        return Bullet;
    }(objects.GameObject));
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=bullet.js.map