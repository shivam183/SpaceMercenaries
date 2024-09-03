module objects{
    export class Explosion extends createjs.Sprite{

        //public propreties
        public width: number;
        public height: number;
        public halfWidth: number;
        public halfHeight: number;

        // constructor
        constructor() {
            super(objects.Game.explosionAtlas,"explode");
            this._initialize();
        }
        

        private _initialize(): void {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.halfWidth = this.getBounds().width * 0.5;
            this.halfHeight = this.getBounds().height * 0.5;
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
            this.name = "explosion"
        }


    }
}