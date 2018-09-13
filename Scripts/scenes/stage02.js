var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var Stage02 = /** @class */ (function (_super) {
        __extends(Stage02, _super);
        //Constructor
        function Stage02(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            //Enemy Health
            _this.enemy_health = 30;
            _this.stage_loop = 0;
            _this.bossDefeated = false;
            _this.Start();
            return _this;
        }
        //Private Methods
        //Public Methods
        Stage02.prototype.Start = function () {
            var _this = this;
            objects.Scene.music.stop();
            objects.Scene.music = createjs.Sound.play("stage02_music");
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
            this._boss = new objects.Boss(this.assetManager, "boss02");
            this._boss.addEventListener("tick", function (e) { _this.boss_attack(e); });
            this._explosion = new objects.Explosion();
            this._bullet = new objects.Bullet(this.assetManager, "bullet01");
            this._enemy_blt = new objects.Bullet(this.assetManager, "bullet02");
            this._background = new objects.Background(this.assetManager, "background02");
            this._player = new objects.Player(this.assetManager);
            // this._player.on('click', this.fire);
            this._player.on("click", function (e) { _this.fire(e, _this._bullet); });
            this.score = objects.Game.current_score;
            this._score_text = new objects.Label("SCORE: " + this.score, "bold 40px", "Orbitron", "#FFFFFF", 25, 25, false);
            this._health_text = new objects.Label("ENERGY: " + this._player.health, "bold 40px", "Orbitron", "#FFFFFF", 475, 25, false);
            this._lives_text = new objects.Label("LIVES: " + this._player.lives, "bold 40px", "Orbitron", "#FFFFFF", 25, 525, false);
            this._stage_text = new objects.Label("STAGE 02", "bold 40px", "Orbitron", "#FFFFFF", 400, 300, true);
            this._boss_text = new objects.Label("BOSS ENERGY: " + this._boss.health, "bold 30px", "Orbitron", "#FFFFFF", 425, 525, false);
            this.stage_time = 0;
            objects.Game.stage_time = this.stage_time;
            this.Main();
        };
        Stage02.prototype.Main = function () {
            this.addChild(this._background);
            this.addChild(this._score_text);
            this.addChild(this._health_text);
            this.addChild(this._lives_text);
            this.addChild(this._player);
            //this.addChild(this._boss);
            //this.addChild(this._enemy08);
            this.Update();
        };
        Stage02.prototype.Update = function () {
            this._background.Update();
            this._player.Update();
            this.spawn_waves();
            this.stage_time++;
            objects.Game.stage_time = this.stage_time;
            for (var i = 0; i < this.children.length; i++) {
                if (this.getChildAt(i).name == "enemy" ||
                    this.getChildAt(i).name == "enemy_blt" || this.getChildAt(i).name == "boss") {
                    // Enemies X Player
                    var intersection = ndgmr.checkRectCollision(this.getChildAt(i), this._player);
                    if (intersection != null) {
                        this.kaboon(this.getChildAt(i));
                        this.removeChild(this.getChildAt(i));
                        this._player.health -= 10;
                        this._health_text.text = "ENERGY: " + this._player.health;
                        if (this._player.health <= 0) {
                            this.kaboon(this._player);
                            this._player.lives--;
                            this._lives_text.text = "LIVES: " + this._player.lives;
                            this._player.health = 100;
                            if (this._player.lives == 0) {
                                objects.Game.current_score = this.score;
                                objects.Game.currentScene = config.Scene.OVER;
                            }
                        }
                        intersection = null;
                    }
                    intersection = null;
                }
            }
        };
        Stage02.prototype.boss_attack = function (e) {
            var _this = this;
            if (this.stage_time % 50 == 0) {
                var blt_1 = this._enemy_blt.clone();
                blt_1.x = e.currentTarget.x;
                blt_1.y = e.currentTarget.y;
                blt_1.name = "enemy_blt";
                this.addChild(blt_1);
                createjs.Tween.get(blt_1)
                    .to({ x: this._player.x, y: this._player.y }, 1500)
                    .addEventListener("complete", function (e) { _this.blt_tween(e, blt_1); });
            }
        };
        Stage02.prototype.enemy_attack = function (e) {
            var _this = this;
            if (this.stage_time % 60 == 0) {
                var rand = Math.floor((Math.random() * 100) + 1);
                if (rand <= 10) {
                    var blt_2 = this._enemy_blt.clone();
                    blt_2.x = e.currentTarget.x;
                    blt_2.y = e.currentTarget.y;
                    blt_2.name = "enemy_blt";
                    this.addChild(blt_2);
                    createjs.Tween.get(blt_2)
                        .to({ x: this._player.x, y: this._player.y }, 1500)
                        .addEventListener("complete", function (e) { _this.blt_tween(e, blt_2); });
                    //.call(blt_tween);
                }
            }
            if (e.currentTarget.y >= 600) {
                this.removeChild(e.currentTarget);
                console.log("Enemy removed");
            }
        };
        Stage02.prototype.blt_tween = function (e, blt) {
            this.kaboon(blt);
            this.removeChild(blt);
        };
        Stage02.prototype.kaboon = function (gameObject) {
            var _this = this;
            var kaboon = this._explosion.clone();
            kaboon.x = gameObject.x;
            kaboon.y = gameObject.y;
            kaboon.addEventListener("animationend", function () { _this.removeChild(kaboon); });
            createjs.Sound.play("explosion_sound", { volume: 0.4 });
            this.addChild(kaboon);
        };
        Stage02.prototype.fire = function (e, b) {
            var _this = this;
            var bullet = b.clone();
            bullet.x = this._player.x;
            bullet.y = this._player.y - 10;
            bullet.on("tick", function (e) { _this.bullet_collision(e); });
            createjs.Sound.play("bullet01_sound");
            this.addChild(bullet);
            var time = (bullet.y + 200) / 0.99;
            createjs.Tween.get(bullet).to({ y: -200 }, time);
        };
        Stage02.prototype.bullet_collision = function (e) {
            for (var i = 0; i < this.children.length; i++) {
                if (this.getChildAt(i).name == "enemy" || this.getChildAt(i).name == "boss") {
                    var intersection = ndgmr.checkRectCollision(this.getChildAt(i), e.currentTarget);
                    if (intersection != null) {
                        var enemy = this.getChildAt(i);
                        enemy.health -= 10;
                        if (enemy.health <= 0) {
                            this.kaboon(this.getChildAt(i));
                            if (this.getChildAt(i).name != "boss") {
                                this.removeChild(this.getChildAt(i));
                                this.score = this.score + 10;
                                this._score_text.text = "SCORE: " + this.score;
                            }
                        }
                        if (this.getChildAt(i).name == "boss") {
                            var enemy_1 = this.getChildAt(i);
                            this._boss_text.text = "BOSS ENERGY: " + enemy_1.health;
                            if (enemy_1.health <= 0) {
                                this.bossDefeated = true;
                                this.removeChild(this._boss_text);
                                this.removeChild(this.getChildAt(i));
                                console.log("Boss Defeated: " + this.bossDefeated);
                            }
                        }
                        this.removeChild(e.currentTarget);
                    }
                    intersection = null;
                }
            }
            if (e.currentTarget.y < -50) {
                this.removeChild(e.currentTarget);
                console.log("Bullet removed");
            }
        };
        Stage02.prototype.wave01 = function (enemyX, posX, posY, next) {
            var _this = this;
            var enemy = enemyX.clone();
            enemy.x = posX;
            enemy.y = posY;
            enemy.health = this.enemy_health;
            enemy.addEventListener("tick", function (e) { _this.enemy_attack(e); });
            this.addChild(enemy);
            createjs.Tween.get(enemy).wait(250 * next).to({ y: 800 }, 2000)
                .call(function () { _this.stage.removeChild(enemy); enemy.removeAllEventListeners(); });
        };
        //go Z
        Stage02.prototype.wave02 = function (enemyX, posX, posY, next) {
            var _this = this;
            var enemy = enemyX.clone();
            enemy.x = posX;
            enemy.y = posY;
            enemy.health = this.enemy_health;
            enemy.addEventListener("tick", function (e) { _this.enemy_attack(e); });
            this.addChild(enemy);
            createjs.Tween.get(enemy).wait(250 * next)
                .to({ y: 100 }, 500)
                .to({ y: 250, x: 750 }, 1000)
                .to({ y: 400, x: 50 }, 1000)
                .to({ y: 550, x: 750 }, 1000)
                .to({ y: 800 }, 500)
                .call(function () { _this.stage.removeChild(enemy); enemy.removeAllEventListeners(); });
        };
        //go Z mirror
        Stage02.prototype.wave03 = function (enemyX, posX, posY, next) {
            var _this = this;
            var enemy = enemyX.clone();
            enemy.x = posX;
            enemy.y = posY;
            enemy.health = this.enemy_health;
            enemy.addEventListener("tick", function (e) { _this.enemy_attack(e); });
            this.addChild(enemy);
            createjs.Tween.get(enemy).wait(250 * next)
                .to({ y: 100, x: 750 }, 500)
                .to({ y: 250, x: 50 }, 1000)
                .to({ y: 400, x: 750 }, 1000)
                .to({ y: 550, x: 50 }, 1000)
                .to({ y: 800 }, 500)
                .call(function () { _this.stage.removeChild(enemy); enemy.removeAllEventListeners(); });
        };
        //go O mirror
        Stage02.prototype.wave04 = function (enemyX, posX, posY, next) {
            var _this = this;
            var enemy = enemyX.clone();
            enemy.x = posX;
            enemy.y = posY;
            enemy.health = this.enemy_health;
            enemy.addEventListener("tick", function (e) { _this.enemy_attack(e); });
            this.addChild(enemy);
            createjs.Tween.get(enemy).wait(250 * next)
                .to({ y: 100, x: 400 }, 500)
                .to({ y: 350, x: 50 }, 500)
                .to({ y: 550, x: 400 }, 500)
                .to({ y: 350, x: 750 }, 500)
                .to({ y: 100, x: 400 }, 500)
                .to({ y: 800 }, 500)
                .call(function () { _this.stage.removeChild(enemy); enemy.removeAllEventListeners(); });
        };
        //go O
        Stage02.prototype.wave05 = function (enemyX, posX, posY, next) {
            var _this = this;
            var enemy = enemyX.clone();
            enemy.x = posX;
            enemy.y = posY;
            enemy.health = this.enemy_health;
            enemy.addEventListener("tick", function (e) { _this.enemy_attack(e); });
            this.addChild(enemy);
            createjs.Tween.get(enemy).wait(250 * next)
                .to({ y: 100, x: 400 }, 500)
                .to({ y: 350, x: 750 }, 500)
                .to({ y: 550, x: 400 }, 500)
                .to({ y: 350, x: 50 }, 500)
                .to({ y: 100, x: 400 }, 500)
                .to({ y: 801 }, 500)
                .call(function () { _this.stage.removeChild(enemy); enemy.removeAllEventListeners(); });
        };
        //go M
        Stage02.prototype.wave06 = function (enemyX, posX, posY, next) {
            var _this = this;
            var enemy = enemyX.clone();
            enemy.x = posX;
            enemy.y = posY;
            enemy.health = this.enemy_health;
            enemy.addEventListener("tick", function (e) { _this.enemy_attack(e); });
            this.addChild(enemy);
            createjs.Tween.get(enemy).wait(250 * next)
                .to({ x: 400, y: 100 }, 500)
                .to({ x: 400, y: 550 }, 500)
                .to({ x: 700, y: 100 }, 500)
                .to({ x: 700, y: 550 }, 500)
                .to({ x: 100, y: 100 }, 500)
                .to({ x: 100, y: 801 }, 500)
                .call(function () { _this.stage.removeChild(enemy); enemy.removeAllEventListeners(); });
        };
        //go M mirror
        Stage02.prototype.wave07 = function (enemyX, posX, posY, next) {
            var _this = this;
            var enemy = enemyX.clone();
            enemy.x = posX;
            enemy.y = posY;
            enemy.health = this.enemy_health;
            enemy.addEventListener("tick", function (e) { _this.enemy_attack(e); });
            this.addChild(enemy);
            createjs.Tween.get(enemy).wait(250 * next)
                .to({ x: 400, y: 100 }, 500)
                .to({ x: 400, y: 550 }, 500)
                .to({ x: 100, y: 100 }, 500)
                .to({ x: 100, y: 550 }, 500)
                .to({ x: 700, y: 100 }, 500)
                .to({ y: 801 }, 500)
                .call(function () { _this.stage.removeChild(enemy); enemy.removeAllEventListeners(); });
        };
        Stage02.prototype.spawn_waves = function () {
            if (this.stage_loop == 0) {
                this.addChild(this._stage_text);
            }
            else {
                this.removeChild(this._stage_text);
            }
            if (this.stage_loop < 3) {
                if (this.stage_time == 60 * 5) {
                    this.stage_loop++;
                }
                if (this.stage_time == 60 * 8) {
                    this.wave02(this._enemy03, 100, -100, 1);
                    this.wave03(this._enemy03, 100, -100, 1);
                    this.wave02(this._enemy03, 100, -100, 2);
                    this.wave03(this._enemy03, 100, -100, 2);
                    this.wave02(this._enemy03, 100, -100, 3);
                    this.wave03(this._enemy03, 100, -100, 3);
                    this.wave02(this._enemy03, 100, -100, 4);
                    this.wave03(this._enemy03, 100, -100, 4);
                    this.wave02(this._enemy03, 100, -100, 4);
                    this.wave03(this._enemy03, 100, -100, 4);
                }
                if (this.stage_time == 60 * 12) {
                    this.wave01(this._enemy01, 100, -100, 1);
                    this.wave01(this._enemy01, 200, -100, 2);
                    this.wave01(this._enemy01, 300, -100, 3);
                    this.wave01(this._enemy01, 400, -100, 4);
                    this.wave01(this._enemy01, 500, -100, 5);
                    this.wave01(this._enemy01, 600, -100, 6);
                    this.wave01(this._enemy01, 700, -100, 7);
                }
                if (this.stage_time == 60 * 15) {
                    this.wave01(this._enemy01, 700, -100, 1);
                    this.wave01(this._enemy01, 600, -100, 2);
                    this.wave01(this._enemy01, 500, -100, 3);
                    this.wave01(this._enemy01, 400, -100, 4);
                    this.wave01(this._enemy01, 300, -100, 5);
                    this.wave01(this._enemy01, 200, -100, 6);
                    this.wave01(this._enemy01, 100, -100, 7);
                }
                if (this.stage_time == 60 * 18) {
                    this.wave04(this._enemy08, 400, -100, 1);
                    this.wave05(this._enemy06, 400, -100, 2);
                    this.wave04(this._enemy08, 400, -100, 3);
                    this.wave05(this._enemy06, 400, -100, 4);
                    this.wave04(this._enemy08, 400, -100, 5);
                    this.wave05(this._enemy06, 400, -100, 6);
                    this.wave04(this._enemy08, 400, -100, 7);
                    this.wave05(this._enemy06, 400, -100, 8);
                    this.wave04(this._enemy08, 400, -100, 9);
                    this.wave05(this._enemy06, 400, -100, 10);
                    this.wave04(this._enemy08, 400, -100, 11);
                    this.wave05(this._enemy06, 400, -100, 12);
                }
                if (this.stage_time == 60 * 23) {
                    this.wave06(this._enemy07, 400, -100, 1);
                    this.wave07(this._enemy05, 400, -100, 1);
                    this.wave06(this._enemy07, 400, -100, 3);
                    this.wave07(this._enemy05, 400, -100, 4);
                    this.wave06(this._enemy07, 400, -100, 5);
                    this.wave07(this._enemy05, 400, -100, 6);
                    this.wave06(this._enemy07, 400, -100, 7);
                    this.wave07(this._enemy05, 400, -100, 8);
                    this.wave06(this._enemy07, 400, -100, 9);
                    this.wave07(this._enemy05, 400, -100, 10);
                    this.wave06(this._enemy07, 400, -100, 11);
                    this.wave07(this._enemy05, 400, -100, 12);
                }
                if (this.stage_loop == 3) {
                    objects.Scene.music.stop();
                    objects.Scene.music = createjs.Sound.play("boss_music");
                    objects.Scene.music.loop = -1;
                    objects.Scene.music.volume = 1;
                    this.addChild(this._boss_text);
                    this.addChild(this._boss);
                    this.bossDefeated = false;
                }
            }
            if (this._boss.health <= 0) {
                this._stage_text = new objects.Label("STAGE COMPLETE!", "bold 40px", "Orbitron", "#FFFFFF", 400, 300, true);
                this.addChild(this._stage_text);
            }
            if (this._boss.health <= 0 && this.stage_time % 240 == 0) {
                objects.Game.currentScene = config.Scene.STAGE03;
            }
            if (this.stage_time == 60 * 24) {
                this.stage_time = 0;
            }
        };
        return Stage02;
    }(objects.Scene));
    scenes.Stage02 = Stage02;
})(scenes || (scenes = {}));
//# sourceMappingURL=stage02.js.map