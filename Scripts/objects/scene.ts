module objects {
    export class Scene extends createjs.Container {

        //Instance Variables

        //Public Properties
        public assetManager;

        public static music: createjs.AbstractSoundInstance;

        //Constructor
        constructor(assetManager: createjs.LoadQueue) {
            super();

            this.assetManager = assetManager;
        }

        //Private Methods

        //Public Methods

        public Start(): void {

        }

        public Update(): void {
            
        }

        public Main(): void {

        }
    }
}