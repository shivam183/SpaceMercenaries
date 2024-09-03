module objects {
    export class Player extends objects.GameObject{

        public isAlive: boolean = true;
        public health:number = 100;
        public lives:number = 5;

        // constructor
        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager, "player");

            this.Start();
        }

        public Start(): void {
            this.y = 550;
            this.x = 400;       
        }

        public Update(): void {
            this.Move();
            this.CheckBounds();
        }

        public Reset(): void{
        }

        public Move(): void{
           this.x = objects.Game.stage.mouseX;
           this.y = objects.Game.stage.mouseY;
        }

        public CheckBounds(): void{
            
            if(this.x >= 800 - this.halfWidth){
                this.x = 800 - this.halfWidth;
            }

            if(this.x <= this.halfWidth){
                this.x = this.halfWidth;
            }

            if(this.y >= 600 - this.halfHeight){
                this.y = 600 - this.halfHeight;
            }

            if(this.y <= this.halfHeight){
                this.y = this.halfHeight;
            }
        }


    }
}