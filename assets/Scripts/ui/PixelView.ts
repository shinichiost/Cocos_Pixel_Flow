import { _decorator, Component, MeshRenderer } from 'cc'
import { PixelColorManager } from '../managers/PixelColorManager'

const { ccclass, property } = _decorator

@ccclass('PixelView')
export class PixelView extends Component {

    @property(MeshRenderer)
    renderer:MeshRenderer = null

    setColor(colorID:number)
    {
        const color = PixelColorManager.instance.getColor(colorID)

        const mat = this.renderer.material

        mat.setProperty("albedo", color)
    }

}