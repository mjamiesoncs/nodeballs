var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by matthewjamieson on 11/30/16.
 */
///<reference path="./Updatable.ts"/>
/**
 * Created by matthewjamieson on 11/30/16.
 */
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite(texture) {
        _super.call(this, texture);
    }
    Sprite.prototype.update = function (elapsed) {
    };
    return Sprite;
}(PIXI.Sprite));
var Textures = (function () {
    function Textures() {
    }
    Textures.ball = PIXI.Texture.fromImage('ball.png');
    return Textures;
}());
///<reference path="framework/Sprite.ts"/>
///<reference path="Textures.ts"/>
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball(x, y, angle, speed) {
        _super.call(this, Textures.ball);
        this.speed = speed;
        this.angle = angle;
        this.x = x;
        this.y = y;
    }
    Ball.prototype.update = function (elapsed) {
        this.x += Math.cos(this.angle) * this.speed * elapsed;
        this.y += Math.sin(this.angle) * this.speed * elapsed;
        this.handleEdgeCollisions();
    };
    Ball.prototype.handleEdgeCollisions = function () {
        if (this.x < 0) {
            this.bounce((0 / 180) * Math.PI);
        }
        if (this.y < 0) {
            this.bounce(90 / 180 * Math.PI);
        }
        if (this.y + this.height > ScreenConstants.HEIGHT) {
            this.bounce(270 / 180 * Math.PI);
        }
        if (this.x + this.width > ScreenConstants.WIDTH) {
            this.bounce(180 / 180 * Math.PI);
        }
    };
    /**
     * Bounce
     * @param planeNormal
     */
    Ball.prototype.bounce = function (planeNormal) {
        if (Math.sin(planeNormal - this.angle - Math.PI / 2) > 0) {
            this.angle = (planeNormal - Math.PI) + (planeNormal - this.angle);
        }
    };
    return Ball;
}(Sprite));
/**
 * Created by matthewjamieson on 11/30/16.
 */
var ScreenConstants = (function () {
    function ScreenConstants() {
    }
    ScreenConstants.HEIGHT = 604;
    ScreenConstants.WIDTH = 412;
    return ScreenConstants;
}());
var API = (function () {
    function API() {
        this.socket = window.io('192.168.1.160:3000');
    }
    API.prototype.addEventListener = function (key, callback) {
        this.socket.on(key, callback);
    };
    API.prototype.send = function (key, object) {
        this.socket.emit(key, object);
    };
    return API;
}());
///<reference path="Ball.ts"/>
///<reference path="framework/Screen.ts"/>
///<reference path="data/API.ts"/>
/**
 * Created by matthewjamieson on 11/29/16.
 */
var Game = (function () {
    /**
     * Setup rendered and stage
     */
    function Game() {
        this.renderer = PIXI.autoDetectRenderer(ScreenConstants.WIDTH, ScreenConstants.HEIGHT, { transparent: false });
        this.renderer.backgroundColor = 0xEEEEEE;
        document.body.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();
        this.balls = [];
        this.init();
    }
    Game.prototype.init = function () {
        var _this = this;
        this.api = new API();
        this.lastUpdateTime = Date.now();
        this.stage.interactive = true;
        this.renderer.view.addEventListener('click', function (touchdata) {
            _this.api.send('ball', {
                x: touchdata.offsetX,
                y: touchdata.offsetY,
                angle: Math.random() * Math.PI,
                speed: 100 + Math.random() * 200
            });
        });
        /**
         * Listen for api balls
         */
        this.api.addEventListener('ball', function (ball) {
            console.log('ball', ball);
            _this.addBall(ball.x, ball.y, ball.angle, ball.speed);
        });
        window.requestAnimationFrame(this.render.bind(this));
    };
    /**
     * Adds a ball to the screen
     * @param x
     * @param y
     * @param angle
     * @param speed
     */
    Game.prototype.addBall = function (x, y, angle, speed) {
        var ball = new Ball(x, y, angle, speed);
        this.stage.addChild(ball);
        this.balls.push(ball);
    };
    /**
     * Render
     */
    Game.prototype.render = function () {
        //Update game
        var timeNow = Date.now();
        var elapsedTime = (timeNow - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = timeNow;
        this.update(elapsedTime);
        //Render scene
        this.renderer.render(this.stage);
        window.requestAnimationFrame(this.render.bind(this));
    };
    Game.prototype.update = function (elapsed) {
        this.balls.forEach(function (ball) {
            ball.update(elapsed);
        });
    };
    return Game;
}());
///<reference path="Game.ts"/>
/**
 * Created by matthewjamieson on 11/29/16.
 */
var App = (function () {
    function App() {
        new Game();
    }
    return App;
}());
new App();
//# sourceMappingURL=app.js.map