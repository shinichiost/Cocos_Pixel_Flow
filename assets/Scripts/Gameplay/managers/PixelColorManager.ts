import { _decorator, Component, Color } from 'cc'
import { PixelColorConfig } from '../data/PixelColorConfig'

const { ccclass, property } = _decorator

@ccclass('PixelColorManager')
export class PixelColorManager extends Component {

    @property([PixelColorConfig])
    colors: PixelColorConfig[] = []

    private colorMap: Map<number, Color> = new Map()

    static instance: PixelColorManager

    onLoad() {
        PixelColorManager.instance = this

        for (const c of this.colors) {
            this.colorMap.set(c.id, c.color)
        }
    }

    getColor(id: number): Color {
        return this.colorMap.get(id)
    }
   getNearestColorID(r:number,g:number,b:number):number
{
    let min = Number.MAX_VALUE
    let result = 0

    for(const c of this.colors)
    {
        const cr = c.color.r
        const cg = c.color.g
        const cb = c.color.b

        if(r===cr && g===cg && b===cb)
            return c.id

        const dr = r-cr
        const dg = g-cg
        const db = b-cb

        const dist = dr*dr + dg*dg + db*db

        if(dist < min)
        {
            min = dist
            result = c.id
        }
    }

    return result
}
}