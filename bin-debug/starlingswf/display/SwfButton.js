var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var starlingswf;
(function (starlingswf) {
    var SwfButton = (function (_super) {
        __extends(SwfButton, _super);
        function SwfButton(skin) {
            var _this = _super.call(this) || this;
            _this.addChild(skin);
            _this.touchEnabled = true;
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.mouseDown, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.mouseUp, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.mouseClick, _this);
            return _this;
        }
        SwfButton.prototype.mouseDown = function (evt) {
            this.scaleX = 0.9;
            this.scaleY = 0.9;
        };
        SwfButton.prototype.mouseUp = function (evt) {
            this.scaleX = 1;
            this.scaleY = 1;
        };
        SwfButton.prototype.mouseClick = function (evt) {
            this.dispatchEventWith(starlingswf.SwfButton.onClick);
        };
        SwfButton.prototype.dispose = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.mouseClick, this);
        };
        return SwfButton;
    }(starlingswf.SwfSprite));
    SwfButton.onClick = "SwfButton.onClick";
    starlingswf.SwfButton = SwfButton;
    __reflect(SwfButton.prototype, "starlingswf.SwfButton");
})(starlingswf || (starlingswf = {}));
//# sourceMappingURL=SwfButton.js.map