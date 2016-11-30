///<reference path="Ball.ts"/>
///<reference path="framework/Screen.ts"/>
///<reference path="data/API.ts"/>
/**
 * Created by matthewjamieson on 11/29/16.
 */

class Game
{
    private renderer;
    private stage: PIXI.Container;
    private lastUpdateTime: number;
    private balls: Array<Ball>;
    private api: API;

    /**
     * Setup rendered and stage
     */
    constructor()
    {
        this.renderer = PIXI.autoDetectRenderer(
            ScreenConstants.WIDTH,
            ScreenConstants.HEIGHT,
            {transparent: false}
        );
        this.renderer.backgroundColor = 0xEEEEEE;
        document.body.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();
        this.balls = []
        this.init();
    }

    private init(): void
    {
        this.api = new API();
        this.lastUpdateTime = Date.now();
        this.stage.interactive = true;
        this.renderer.view.addEventListener('click', (touchdata) =>
        {

            this.api.send('ball', {
                x: touchdata.offsetX,
                y: touchdata.offsetY,
                angle: Math.random() * Math.PI,
                speed: 100 + Math.random() * 200
            });

        });

        /**
         * Listen for api balls
         */
        this.api.addEventListener('ball', (ball) =>
        {
            console.log('ball', ball)
            this.addBall(
                ball.x,
                ball.y,
                ball.angle,
                ball.speed,
            )
        });
        window.requestAnimationFrame(this.render.bind(this));
    }

    /**
     * Adds a ball to the screen
     * @param x
     * @param y
     * @param angle
     * @param speed
     */
    private addBall(x, y, angle, speed)
    {
        let ball = new Ball(x, y, angle, speed);
        this.stage.addChild(ball);
        this.balls.push(ball);
    }

    /**
     * Render
     */
    render(): void
    {
        //Update game
        let timeNow = Date.now();
        let elapsedTime = (timeNow - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = timeNow;
        this.update(elapsedTime);

        //Render scene
        this.renderer.render(this.stage);
        window.requestAnimationFrame(this.render.bind(this));
    }

    update(elapsed): void
    {
        this.balls.forEach((ball) =>
        {
            ball.update(elapsed)
        })
    }
}