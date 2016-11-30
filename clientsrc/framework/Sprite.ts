///<reference path="./Updatable.ts"/>
/**
 * Created by matthewjamieson on 11/30/16.
 */

class Sprite extends PIXI.Sprite implements updatable
{
    constructor(texture: PIXI.Texture)
    {
        super(texture)
    }

    update(elapsed):void {

    }
}