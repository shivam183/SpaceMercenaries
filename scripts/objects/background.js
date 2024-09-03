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
    var Background = /** @class */ (function (_super) {
        __extends(Background, _super);
        // constructor
        function Background(assetManager, assetName) {
            var _this = _super.call(this, assetManager.getResult(assetName)) || this;
            _this.x = 0;
            _this.Start();
            return _this;
        }
        Background.prototype._reset = function () {
            this.y = -1200;
        };
        Background.prototype._move = function () {
            this.y += this._dy;
        };
        Background.prototype._checkBounds = function () {
            if (this.y >= 0) {
                this._reset();
            }
        };
        Background.prototype.Start = function () {
            this._dy = 2;
            this._reset();
        };
        Background.prototype.Update = function () {
            this._move();
            this._checkBounds();
        };
        return Background;
    }(createjs.Bitmap));
    objects.Background = Background;
})(objects || (objects = {}));
//# sourceMappingURL=background.js.map