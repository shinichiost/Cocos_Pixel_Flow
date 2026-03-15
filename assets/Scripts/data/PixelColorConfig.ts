import { _decorator, Color } from 'cc'
const { ccclass, property } = _decorator

@ccclass('PixelColorConfig')
export class PixelColorConfig {

    @property
    id:number = 0

    @property(Color)
    color:Color = new Color()

}