module objects {
    export class Bullet extends objects.GameObject{

        // constructor
        constructor(assetManager: createjs.LoadQueue, assetName:string) {
            super(assetManager, assetName);

            this.Start();
        }

        public Start(): void {
            this.name = "bullet"
            this.scaleX = 1.3;
            this.scaleY = 1.3;
        }

        public Update(): void {
            this.CheckBounds();
        }


        public CheckBounds(): void{
            if(this.y <= -100){
                objects.Game.stage.removeChild(this);
                console.log("Enemy removed")
            }
        }
    }
}