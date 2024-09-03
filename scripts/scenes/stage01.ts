module scenes {
    export class Stage01 extends objects.Scene {

        //Private Instance Variables
        private _background: objects.Background;

		private _player: objects.Player;
		
		//Enemies
        private _enemy01: objects.Enemy;
        private _enemy02: objects.Enemy;
        private _enemy03: objects.Enemy;
		private _enemy04: objects.Enemy;
		private _enemy05: objects.Enemy;
		private _enemy06: objects.Enemy;
		private _enemy07: objects.Enemy;
		private _enemy08: objects.Enemy;

		private _boss: objects.Boss;

		private _explosion: objects.Explosion;

		private _bullet: objects.Bullet;
		private _enemy_blt: objects.Bullet;

		//Labels
		private _lives_text: objects.Label;
        private _score_text: objects.Label;
		private _health_text: objects.Label;
		private _stage_text: objects.Label;
		private _boss_text: objects.Label;

        //Player Stats
		private score: number;
		
		//Enemy Health
        private enemy_health: number = 30;


		private stage_time: number;
        private stage_loop: number = 0;
        private bossDefeated: boolean = false;

        //Constructor
        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager);

            this.Start();
        }

        //Private Methods

        //Public Methods

        public Start(): void {

            objects.Scene.music.stop();
            objects.Scene.music = createjs.Sound.play("stage01_music");
            objects.Scene.music.loop = -1;
            objects.Scene.music.volume = 1;

            this._enemy01 = new objects.Enemy(this.assetManager, "enemy01", 0.1, 0.1);
            this._enemy02 = new objects.Enemy(this.assetManager, "enemy02", 0.2, 0.2);
            this._enemy03 = new objects.Enemy(this.assetManager, "enemy03", 0.2, 0.2);
			this._enemy04 = new objects.Enemy(this.assetManager, "enemy04", 0.2, 0.2);
			this._enemy05 = new objects.Enemy(this.assetManager, "enemy05", 0.2, 0.2);
			this._enemy06 = new objects.Enemy(this.assetManager, "enemy06", 0.05, 0.05);
			this._enemy07 = new objects.Enemy(this.assetManager, "enemy07", 0.05, 0.05);
			this._enemy08 = new objects.Enemy(this.assetManager, "enemy08", 0.08, 0.08);

			this._boss = new objects.Boss(this.assetManager, "boss01");
			this._boss.addEventListener("tick",  (e: createjs.Event) => { this.boss_attack(e) });

			this._explosion = new objects.Explosion();

			this._bullet =  new objects.Bullet(this.assetManager, "bullet01");
			this._enemy_blt = new objects.Bullet(this.assetManager, "bullet02");

            this._background = new objects.Background(this.assetManager,"background");
			this._player = new objects.Player(this.assetManager);
			
           // this._player.on('click', this.fire);
            this._player.on("click",  (e: createjs.MouseEvent) => { this.fire(e, this._bullet) });

            this.score = 0;

            this._score_text = new objects.Label("SCORE: "+this.score, "bold 40px", "Orbitron", "#FFFFFF", 25, 25, false);
			this._health_text = new objects.Label("ENERGY: "+this._player.health, "bold 40px", "Orbitron", "#FFFFFF", 475, 25, false);
			this._lives_text = new objects.Label("LIVES: "+this._player.lives, "bold 40px", "Orbitron", "#FFFFFF", 25, 525, false);
			this._stage_text = new objects.Label("STAGE 01", "bold 40px", "Orbitron", "#FFFFFF", 400, 300, true);
			this._boss_text = new objects.Label("BOSS ENERGY: "+ this._boss.health, "bold 30px", "Orbitron", "#FFFFFF", 425, 525, false);

			this.stage_time = 0;
			objects.Game.stage_time = this.stage_time;

            this.Main();
		}

		public Main(): void {
            this.addChild(this._background);
            this.addChild(this._score_text);
			this.addChild(this._health_text);
			this.addChild(this._lives_text);
			this.addChild(this._player);
			//this.addChild(this._boss);

			//this.addChild(this._enemy08);
			
            this.Update();
        }

        public Update(): void {
            this._background.Update();
            this._player.Update();

            this.spawn_waves();
			this.stage_time++;
			objects.Game.stage_time = this.stage_time;

            for(let i=0; i< this.children.length; i++){
				if( this.getChildAt(i).name == "enemy" || 
				this.getChildAt(i).name == "enemy_blt" || this.getChildAt(i).name == "boss"){

					// Enemies X Player
                    let intersection = ndgmr.checkRectCollision(this.getChildAt(i), this._player);
                    if(intersection != null){
						this.kaboon(this.getChildAt(i));
						this.removeChild(this.getChildAt(i));
                        this._player.health -= 10;
                        this._health_text.text="ENERGY: "+ this._player.health;
                        if(this._player.health <= 0){
							this.kaboon(this._player);
							this._player.lives--;
							this._lives_text.text = "LIVES: "+ this._player.lives;
							this._player.health = 100;
							if(this._player.lives == 0){
								objects.Game.current_score = this.score;
								objects.Game.currentScene = config.Scene.OVER;
							}
						}
						intersection = null;
					}

                    intersection = null;
				}

            }
		}

		private boss_attack(e: createjs.Event){
			if(this.stage_time % 30 == 0 ){
				let blt:any = this._enemy_blt.clone();
				blt.x = e.currentTarget.x;
				blt.y = e.currentTarget.y;
				blt.name = "enemy_blt";						
				this.addChild(blt);
				createjs.Tween.get(blt)
				.to({x: this._player.x, y: this._player.y}, 1500)
				.addEventListener("complete", (e: createjs.Event) => { this.blt_tween(e, blt) });
				
			}
		}
        
        private enemy_attack(e: createjs.Event){
			/*
			if(this.stage_time % 60 == 0 ){
				let rand = Math.floor((Math.random() * 100) + 1);
				if(rand <= 10){
					let blt:any = this._enemy_blt.clone();
					blt.x = e.currentTarget.x;
					blt.y = e.currentTarget.y;
					blt.name = "enemy_blt";						
					this.addChild(blt);
					createjs.Tween.get(blt)
					.to({x: this._player.x, y: this._player.y}, 1500)
					.addEventListener("complete", (e: createjs.Event) => { this.blt_tween(e, blt) });					
					//.call(blt_tween);
				}		
			}*/
			if(e.currentTarget.y <= 500){
				this.removeChild(e.currentTarget);
				console.log("Enemy removed");
            }
		}
		
		private blt_tween(e: createjs.Event, blt: createjs.DisplayObject):void {
			this.kaboon(blt);
			this.removeChild(blt);
		}

		private kaboon(gameObject: createjs.DisplayObject): void {
			
			let kaboon = this._explosion.clone(); 
			kaboon.x = gameObject.x;
			kaboon.y = gameObject.y;
			kaboon.addEventListener("animationend", () => {this.removeChild(kaboon)});
			createjs.Sound.play("explosion_sound",{volume: 0.4});
			this.addChild(kaboon);
		}

		private fire(e: createjs.MouseEvent, b: objects.Bullet):void {
            let bullet:any = b.clone();
            bullet.x = this._player.x;
            bullet.y = this._player.y-10;
            bullet.on("tick", (e: createjs.Event) => { this.bullet_collision(e) } );
            createjs.Sound.play("bullet01_sound");
            this.addChild(bullet);
            let time  = (bullet.y + 200 ) / 0.99;
			createjs.Tween.get(bullet).to({y:-200}, time);
        }

        private bullet_collision(e: createjs.Event): void {
            
            for(let i=0; i< this.children.length; i++){
                if(this.getChildAt(i).name == "enemy" || this.getChildAt(i).name == "boss"){                   
                    let intersection = ndgmr.checkRectCollision(this.getChildAt(i), e.currentTarget);
                    if(intersection != null){
						let enemy:any = this.getChildAt(i);
						enemy.health -= 10;
						if(enemy.health <= 0){
							this.kaboon(this.getChildAt(i));
							if(this.getChildAt(i).name != "boss"){
								this.removeChild(this.getChildAt(i));
								this.score = this.score + 10;
                        		this._score_text.text = "SCORE: "+this.score;
							}							
						}   
						if(this.getChildAt(i).name == "boss"){
							let enemy:any = this.getChildAt(i);
							this._boss_text.text = "BOSS ENERGY: "+enemy.health;
							if(enemy.health <= 0){
								this.bossDefeated = true;
								this.removeChild(this._boss_text);
								this.removeChild(this.getChildAt(i));
								console.log("Boss Defeated: "+this.bossDefeated);
							}
						}
                        this.removeChild( e.currentTarget);                        
                    }
                    intersection = null;
				}

			} 
			
			if(e.currentTarget.y < -50){
				this.removeChild(e.currentTarget)
				console.log("Bullet removed");
			}
        }
        

        private wave01(enemyX: objects.Enemy, posX: number, posY:number, next:number): void{
		    var enemy:any = enemyX.clone();
			enemy.x = posX;
			enemy.y = posY;
            enemy.health = this.enemy_health;
            //enemy.addEventListener("tick",  (e: createjs.Event) => { this.enemy_attack(e) });
            this.addChild(enemy);
			createjs.Tween.get(enemy).wait(250*next).to({y:800}, 2000)
			.call(() => {this.stage.removeChild(enemy); enemy.removeAllEventListeners();});
			
        }

        //go Z
		private wave02(enemyX: objects.Enemy, posX: number, posY:number, next:number): void {
			var enemy:any = enemyX.clone();
			enemy.x = posX;
			enemy.y = posY;
            enemy.health = this.enemy_health;
            
			this.addChild(enemy);
			createjs.Tween.get(enemy).wait(250*next)
			.to({y:100}, 500)
			.to({y:250, x:750}, 1000)
			.to({y:400, x:50}, 1000)
			.to({y:550, x:750}, 1000)
			.to({y:800}, 500)
			.call(() => {this.stage.removeChild(enemy); enemy.removeAllEventListeners();});
		}
		
		//go Z mirror
		private wave03(enemyX: objects.Enemy, posX: number, posY:number, next:number){
			var enemy:any = enemyX.clone();
			enemy.x = posX;
			enemy.y = posY;
			enemy.health = this.enemy_health;

			this.addChild(enemy);
			createjs.Tween.get(enemy).wait(250*next)
			.to({y:100, x: 750}, 500)
			.to({y:250, x:50}, 1000)
			.to({y:400, x:750}, 1000)
			.to({y:550, x:50}, 1000)
			.to({y:800}, 500)
			.call(() => {this.stage.removeChild(enemy); enemy.removeAllEventListeners();}) ;
		}
		
		//go O mirror
		private wave04(enemyX: objects.Enemy, posX: number, posY:number, next:number){
			var enemy:any = enemyX.clone();
			enemy.x = posX;
			enemy.y = posY;
			enemy.health = this.enemy_health;

			this.addChild(enemy);
			createjs.Tween.get(enemy).wait(250*next)
			.to({y:100, x: 400}, 500)
			.to({y:350, x:50}, 500)
			.to({y:550, x:400}, 500)
			.to({y:350, x:750}, 500)
			.to({y:100, x:400}, 500)
			.to({y:800}, 500)
			.call(() => {this.stage.removeChild(enemy); enemy.removeAllEventListeners();});
		}
		
		//go O
		private wave05(enemyX: objects.Enemy, posX: number, posY:number, next:number){
			var enemy:any = enemyX.clone();
			enemy.x = posX;
			enemy.y = posY;
			enemy.health = this.enemy_health;

			this.addChild(enemy);
			createjs.Tween.get(enemy).wait(250*next)
			.to({y:100, x: 400}, 500)
			.to({y:350, x:750}, 500)
			.to({y:550, x:400}, 500)
			.to({y:350, x:50}, 500)
			.to({y:100, x:400}, 500)
			.to({y:801}, 500)
			.call(() => {this.stage.removeChild(enemy); enemy.removeAllEventListeners();});
		}
		
		//go M
		private wave06(enemyX: objects.Enemy, posX: number, posY:number, next:number){
			var enemy:any = enemyX.clone();
			enemy.x = posX;
			enemy.y = posY;
			enemy.health = this.enemy_health;

			this.addChild(enemy);
			createjs.Tween.get(enemy).wait(250*next)
			.to({x:400, y: 100},500)
			.to({x:400, y: 550},500)
			.to({x:700, y: 100},500)
			.to({x:700, y: 550},500)
			.to({x:100, y: 100},500)
			.to({x:100, y: 801},500)
			.call(() => {this.stage.removeChild(enemy); enemy.removeAllEventListeners();});
			
		}
		
		//go M mirror
		private wave07(enemyX: objects.Enemy, posX: number, posY:number, next:number){
			var enemy:any = enemyX.clone();
			enemy.x = posX;
			enemy.y = posY;
			enemy.health = this.enemy_health;

			this.addChild(enemy);
			createjs.Tween.get(enemy).wait(250*next)
			.to({x:400, y: 100},500)
			.to({x:400, y: 550},500)
			.to({x:100, y:100}, 500)
			.to({x:100, y:550}, 500)
			.to({x:700, y:100}, 500)
			.to({y:801}, 500)
			.call(() => {this.stage.removeChild(enemy); enemy.removeAllEventListeners();});
		}

        private spawn_waves(){

			
			if(this.stage_loop == 0){
                this.addChild(this._stage_text);
			}else{
				this.removeChild(this._stage_text);
			}
            
            if(this.stage_loop < 3){
                if(this.stage_time  == 60*5){
                    this.stage_loop++;
                }
                
    
                if(this.stage_time  == 60*8){
                    this.wave02(this._enemy01, 100, -100, 1);
                    this.wave03(this._enemy02, 100, -100, 1);	
                    this.wave02(this._enemy01, 100, -100, 2);
                    this.wave03(this._enemy02, 100, -100, 2);
                    this.wave02(this._enemy01, 100, -100, 3);
                    this.wave03(this._enemy02, 100, -100, 3);
                    this.wave02(this._enemy01, 100, -100, 4);
                    this.wave03(this._enemy02, 100, -100, 4);
                    this.wave02(this._enemy01, 100, -100, 4);
                    this.wave03(this._enemy02, 100, -100, 4);
                }
                
                if(this.stage_time == 60*12 ){
                    this.wave01(this._enemy03, 100, -100, 1);
                    this.wave01(this._enemy03, 200, -100, 2);
                    this.wave01(this._enemy03, 300, -100, 3);
                    this.wave01(this._enemy03, 400, -100, 4);
                    this.wave01(this._enemy03, 500, -100, 5);
                    this.wave01(this._enemy03, 600, -100, 6);
                    this.wave01(this._enemy03, 700, -100, 7);
                }
                
                if(this.stage_time == 60*15 ){
                    this.wave01(this._enemy04, 700, -100, 1);
                    this.wave01(this._enemy04, 600, -100, 2);
                    this.wave01(this._enemy04, 500, -100, 3);
                    this.wave01(this._enemy04, 400, -100, 4);
                    this.wave01(this._enemy04, 300, -100, 5);
                    this.wave01(this._enemy04, 200, -100, 6);
                    this.wave01(this._enemy04, 100, -100, 7);
                }
                
                
                if(this.stage_time == 60*18 ){
                    this.wave04(this._enemy05, 400, -100, 1);
                    this.wave05(this._enemy06, 400, -100, 2);
                    this.wave04(this._enemy05, 400, -100, 3);
                    this.wave05(this._enemy06, 400, -100, 4);
                    this.wave04(this._enemy05, 400, -100, 5);
                    this.wave05(this._enemy06, 400, -100, 6);
                    this.wave04(this._enemy05, 400, -100, 7);
                    this.wave05(this._enemy06, 400, -100, 8);
                    this.wave04(this._enemy05, 400, -100, 9);
                    this.wave05(this._enemy06, 400, -100, 10);
                    this.wave04(this._enemy05, 400, -100, 11);
                    this.wave05(this._enemy06, 400, -100, 12);
                    
                }
                
                if(this.stage_time == 60*23 ){
                    this.wave06(this._enemy07, 400, -100, 1);
                    this.wave07(this._enemy08, 400, -100, 1);
                    this.wave06(this._enemy07, 400, -100, 3);
                    this.wave07(this._enemy08, 400, -100, 4);
                    this.wave06(this._enemy07, 400, -100, 5);
                    this.wave07(this._enemy08, 400, -100, 6);
                    this.wave06(this._enemy07, 400, -100, 7);
                    this.wave07(this._enemy08, 400, -100, 8);
                    this.wave06(this._enemy07, 400, -100, 9);
                    this.wave07(this._enemy08, 400, -100, 10);
                    this.wave06(this._enemy07, 400, -100, 11);
                    this.wave07(this._enemy08, 400, -100, 12);
				}

				if(this.stage_loop == 3 ){
					objects.Scene.music.stop();
					objects.Scene.music = createjs.Sound.play("boss_music");
					objects.Scene.music.loop = -1;
					objects.Scene.music.volume = 1;
					this.addChild(this._boss_text);
					this.addChild(this._boss);
					this.bossDefeated = false;
				}				
			}

			if(this._boss.health <= 0){
				this._stage_text = new objects.Label("STAGE COMPLETE!", "bold 40px", "Orbitron", "#FFFFFF", 400, 300, true); 	
                this.addChild(this._stage_text);
			}
			
			
            if(this._boss.health <= 0 && this.stage_time % 240 == 0){
                objects.Game.currentScene = config.Scene.STAGE02;
            }
            
            if(this.stage_time == 60*24 ){
                    this.stage_time = 0;
			}
        }

    }

}