import { PixelView } from "../view/PixelView"
import { PixelData } from "../data/PixelData"

export class Pixel {

    data:PixelData
    view:PixelView

    constructor(data:PixelData, view:PixelView)
    {
        this.data = data
        this.view = view
    }

}