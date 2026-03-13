import { _decorator, Component, ImageAsset, Texture2D } from 'cc'
import { BoardData } from '../data/BoardData'

const { ccclass, property } = _decorator

@ccclass('BoardGenerator')
export class BoardGenerator extends Component {

    @property(ImageAsset)
    sourceImage:ImageAsset = null

    generate():BoardData
    {
        const tex = new Texture2D()
        tex.image = this.sourceImage

        const width = tex.width
        const height = tex.height

        const pixels = tex.readPixels()

        const data:number[] = []

        for(let y=0;y<height;y++)
        {
            for(let x=0;x<width;x++)
            {
                const index = (y * width + x) * 4

                const r = pixels[index]
                const g = pixels[index+1]
                const b = pixels[index+2]

                const id = this.colorToID(r,g,b)

                data.push(id)
            }
        }

        const board = new BoardData()
        board.width = width
        board.height = height
        board.pixelData = data

        return board
    }

    colorToID(r:number,g:number,b:number):number
    {
        if(r==255 && g==0 && b==0) return 1
        if(r==0 && g==255 && b==0) return 2
        if(r==0 && g==0 && b==255) return 3
        if(r==255 && g==255 && b==0) return 4

        return 0
    }

}