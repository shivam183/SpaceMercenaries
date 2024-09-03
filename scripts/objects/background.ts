module objects {
    export class Background extends createjs.Bitmap {

        //private instance variables
        private _dy: number;

        // constructor
        constructor(assetManager: createjs.LoadQueue, assetName: string) {
            super(assetManager.getResult(assetName));
            this.x = 0;

            this.Start();
        }

        private _reset():void{
            this.y = -1200;
        }

        private _move():void{
            this.y += this._dy;
        }

        private _checkBounds():void{
            if(this.y >= 0){
                this._reset();
            }
        }

        public Start():void {
            this._dy = 2;
            this._reset();
        }

        public Update():void {
            this._move();
            this._checkBounds();
        }
    }
}