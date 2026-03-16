import { _decorator, Component, Color } from 'cc'
const { ccclass, property } = _decorator

@ccclass('PixelColorManager')
export class PixelColorManager extends Component {

    @property([Color])
    colors:Color[] = []
static instance:PixelColorManager

    onLoad()
    {
        PixelColorManager.instance = this
    }
    colorToID(r:number,g:number,b:number){

        let best = 0
        let bestDist = 999999

        for(let i=0;i<this.colors.length;i++){

            const c = this.colors[i]

            const dr = r-c.r
            const dg = g-c.g
            const db = b-c.b

            const dist = dr*dr + dg*dg + db*db

            if(dist<bestDist){
                bestDist = dist
                best = i
            }

        }

        return best
    }
    getColor(id:number):Color
    {
        return this.colors[id]
    }

}