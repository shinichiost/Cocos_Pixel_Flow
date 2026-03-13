import { _decorator, Component, Color } from 'cc'
import { PixelColorConfig } from '../data/PixelColorConfig'

const { ccclass, property } = _decorator

@ccclass('PixelColorManager')
export class PixelColorManager extends Component {

    @property([PixelColorConfig])
    colors:PixelColorConfig[] = []

    private colorMap:Map<number,Color> = new Map()

    static instance:PixelColorManager

    onLoad()
    {
        PixelColorManager.instance = this

        for(const c of this.colors)
        {
            this.colorMap.set(c.id, c.color)
        }
    }

    getColor(id:number):Color
    {
        return this.colorMap.get(id)
    }

}