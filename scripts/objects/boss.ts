module objects {
    export class Boss extends objects.GameObject{
        

        //private instance variables
        private _enemy_blt: objects.Bullet;

        //public instance variables
        public health:number;

        // constructor
        constructor(assetManager: createjs.LoadQueue, assetName:string, _scaleX: number = 1, _scaleY: number = 1) {
            super(assetManager, assetName, true);

            this.scaleX =_scaleX;
            this.scaleY = _scaleY;

            this.Start();
        }

        public Start(): void {
            this.x = 0 + this.regX ;
			this.y = 0  + this.regY;
            this.rotation = 180;
            this.health = 400;
            this.name = "boss";

            this._enemy_blt = new objects.Bullet(objects.Game.assetManager, "bullet02");

            this.Update();
        }

        public Update(): void {
            createjs.Tween.get(this).to({x: 800-this.regX}, 1500).to({x:0+this.regX}, 1500).loop= -1;
            this.CheckCollision();
        }


        public CheckCollision(): void{
            
         
        }
    }
}