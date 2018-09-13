module objects {
    export class Game {
        public static stage: createjs.Stage;
        public static assetManager: createjs.LoadQueue;
        public static currentScene: number;
        public static explosionAtlas: createjs.SpriteSheet;
        public static high_score: number;
        public static current_score: number;
        public static stage_time: number;

    }
}