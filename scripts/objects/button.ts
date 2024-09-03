module objects {
    export class Button extends createjs.Bitmap {

        //Private variables

        //public propreties

        // constructor
        constructor(assetManager: createjs.LoadQueue, imageString: string, x: number = 0, y: number = 0, isCentered = false) {
            super(assetManager.getResult(imageString));

            this.x = x;
            this.y = y;
            
            if (isCentered) {
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getBounds().height * 0.5;
            }

            this.on("mouseover", this._mouseOver);
            this.on("mouseout", this._mouseOut);
        }

        //private method
        private _mouseOver(): void {
            this.alpha = 0.7;
        }

        //private method
        private _mouseOut(): void {
            this.alpha = 1;
        }
    }
}