///<reference path="framework/Sprite.ts"/>
///<reference path="Textures.ts"/>

class Ball extends Sprite
{
    private speed;
    private angle;

    constructor(x,y,angle, speed)
    {
        super(Textures.ball);
        this.speed = speed;
        this.angle = angle;
        this.x = x;
        this.y = y;
    }

    update(elapsed)
    {
        this.x += Math.cos(this.angle) * this.speed * elapsed;
        this.y += Math.sin(this.angle) * this.speed * elapsed;
        this.handleEdgeCollisions()
    }

    handleEdgeCollisions()
    {
        if (this.x < 0)
        {
            this.bounce((0 / 180) * Math.PI)
        }
        if(this.y < 0)
        {
            this.bounce(90 / 180 * Math.PI)
        }
        if(this.y + this.height > ScreenConstants.HEIGHT)
        {
            this.bounce(270 / 180 * Math.PI)
        }
        if(this.x + this.width > ScreenConstants.WIDTH)
        {
            this.bounce(180 / 180 * Math.PI)
        }
    }

    /**
     * Bounce
     * @param planeNormal
     */
    bounce(planeNormal)
    {
        if (Math.sin(planeNormal - this.angle - Math.PI/2) > 0)
        {
            this.angle = (planeNormal - Math.PI) + (planeNormal - this.angle)
        }

    }
}