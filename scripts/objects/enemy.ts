module objects {
    export class Enemy extends objects.GameObject{
        
        //private instance variables
        public health:number;

        // constructor
        constructor(assetManager: createjs.LoadQueue, assetName:string, _scaleX: number = 1, _scaleY: number = 1) {
            super(assetManager, assetName);

            this.scaleX =_scaleX;
            this.scaleY = _scaleY;

            this.Start();
        }

        public Start(): void {
            this.rotation = 180;
            this.health = 5;
            this.name = "enemy"
        }

        public Update(): void {
        }


        public CheckBounds(): void{

            
            
        }
    }
}