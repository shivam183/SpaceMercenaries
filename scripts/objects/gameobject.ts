module objects {
    export class GameObject extends createjs.Bitmap {

        //public propreties
        public width: number;
        public height: number;
        public halfWidth: number;
        public halfHeight: number;

        // constructor
        constructor(assetManager: createjs.LoadQueue, imageString: string, default_: boolean = true) {
            super(assetManager.getResult(imageString));
            if(default_)
                this._initialize();
        }

        private _initialize(): void {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.halfWidth = this.getBounds().width * 0.5;
            this.halfHeight = this.getBounds().height * 0.5;
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
        }

        public Start(): void {

        }

        public Update(): void {

        }

        public Reset(): void {

        }

        public CheckBounds(): void {

        }

        public Move():void {

        }

    }
}