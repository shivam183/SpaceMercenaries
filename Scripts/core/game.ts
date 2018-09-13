// IIFE - Immediaterly Invoked Function Expression
/// <reference path="_references.ts">

(function() {

    // Games Variables
    let canvas = document.getElementById("canvas");
    let stage: createjs.Stage;
    let assetManager: createjs.LoadQueue;
    let assetManifest: any[];
    let currentScene: objects.Scene;
    let currentState: number;
    let explosionAtlas: createjs.SpriteSheet;

    let explosion_data = {
            "images": [],
            "frames": {width:128, height:128, count: 16},
            "animations": {
                "explode":{
                    "frames":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
                    next: false,
                    "speed": 0.6
                }
            }
    }

    assetManifest = [
        {id:"background", src:"./assets/images/background.png"},
        {id:"background02", src:"./assets/images/background02.png"},
        {id:"background03", src:"./assets/images/background03.png"},
        {id:"background04", src:"./assets/images/background04.png"},
        {id:"start_button", src:"./assets/images/start_button.png"},
        {id:"createJS_logo", src:"./assets/images/createjs-badge-light.png"},
        {id:"player", src:"./assets/images/player.png"},
        {id:"bullet01", src:"./assets/images/bullet01.png"},
        {id:"bullet02", src:"./assets/images/bullet02.png"},
        {id:"enemy01", src:"./assets/images/spaceship01.png"},
        {id:"enemy02", src:"./assets/images/spaceship02.png"},
        {id:"enemy03", src:"./assets/images/spaceship03.png"},
        {id:"enemy04", src:"./assets/images/spaceship04.png"},
        {id:"enemy05", src:"./assets/images/spaceship05.png"},
        {id:"enemy06", src:"./assets/images/spaceship06.png"},
        {id:"enemy07", src:"./assets/images/spaceship07.png"},
        {id:"enemy08", src:"./assets/images/spaceship08.png"},
        {id:"boss01", src:"./assets/images/boss.png"},
        {id:"boss02", src:"./assets/images/boss02.png"},
        {id:"boss03", src:"./assets/images/boss03.png"},
        {id:"bullet01_sound", src:"./assets/sounds/bullet01.mp3"},
        {id:"explosion_sound", src:"./assets/sounds/explosion01.mp3"},
        {id:"explosion_sprite", src:"./assets/images/explosion_sprite.png"},
        {id:"stage01_music", src:"./assets/sounds/level1.mp3"},
        {id:"stage02_music", src:"./assets/sounds/level2.mp3"},
        {id:"stage03_music", src:"./assets/sounds/level3.mp3"},
        {id:"intro_music", src:"./assets/sounds/intro.mp3"},
        {id:"boss_music", src:"./assets/sounds/boss.mp3"},
        {id:"end_music", src:"./assets/sounds/death.mp3"},
    ];

    function Init(): void{
        console.log("Initialization Started");
        assetManager = new createjs.LoadQueue(); //createJS the assetManager object
        assetManager.installPlugin(createjs.Sound); // asset manager can also load sounds
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete", Start, this);

        objects.Game.assetManager = assetManager;
    }

    function Start(): void{
        console.log("Starting Application....");

        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20); //turn it on for buttons
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on("tick", Update);

        objects.Game.stage = stage;
        objects.Game.high_score = 0;
        objects.Game.current_score = 0;
        //Set the Start Scene
        objects.Game.currentScene = config.Scene.START;
        currentState = config.Scene.START;

        explosion_data.images = [assetManager.getResult("explosion_sprite")];
        explosionAtlas = new createjs.SpriteSheet(explosion_data);
        objects.Game.explosionAtlas = explosionAtlas;


        Main();
    }

    function Update(): void{

        //if the scene that is playing return another current scene
        //then call Main again and switch the scene
        
        if(currentState != objects.Game.currentScene){
            Main();
        }
        stage.update(); //redraws the stage
        currentScene.Update();

    }

    function Main(): void{
        
        stage.removeAllChildren();

        switch(objects.Game.currentScene){
            case config.Scene.START:
               currentScene = new scenes.StartScene(assetManager);
            break;
            case config.Scene.STAGE01:
                currentScene = new scenes.Stage01(assetManager);
                //currentScene = new scenes.OverScene(assetManager);
            break;
            case config.Scene.STAGE02:
                currentScene = new scenes.Stage02(assetManager);
                //currentScene = new scenes.OverScene(assetManager);
            break;
            case config.Scene.STAGE03:
                currentScene = new scenes.Stage03(assetManager);
                //currentScene = new scenes.OverScene(assetManager);
            break;
            case config.Scene.OVER:
                currentScene = new scenes.OverScene(assetManager);
            break;
        }

        currentState = objects.Game.currentScene;
        stage.addChild(currentScene);
        
    }

    window.onload = Init;

})();