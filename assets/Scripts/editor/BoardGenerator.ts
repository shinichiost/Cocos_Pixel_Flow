import { _decorator, Component, ImageAsset } from 'cc'
import { BoardData } from '../data/BoardData'

const { ccclass, property } = _decorator

@ccclass('BoardGenerator')
export class BoardGenerator extends Component {

    @property(ImageAsset)
    sourceImage: ImageAsset = null

    generate(): BoardData {
        const imgElement = this.sourceImage.data as HTMLImageElement

        const width  = imgElement.width
        const height = imgElement.height

        // Draw image onto an offscreen canvas to read pixel data from CPU
        const canvas  = document.createElement('canvas')
        canvas.width  = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(imgElement, 0, 0)

        const imageData = ctx.getImageData(0, 0, width, height)
        const pixels    = imageData.data  // Uint8ClampedArray, RGBA

        const data: number[] = []

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4

                const r = pixels[index]
                const g = pixels[index + 1]
                const b = pixels[index + 2]

                data.push(this.colorToID(r, g, b))
            }
        }

        const board = new BoardData()
        board.width     = width
        board.height    = height
        board.pixelData = data

        return board
    }

    colorToID(r: number, g: number, b: number): number {
        if (r === 255 && g === 0   && b === 0  ) return 1
        if (r === 0   && g === 255 && b === 0  ) return 2
        if (r === 0   && g === 0   && b === 255) return 3
        if (r === 255 && g === 255 && b === 0  ) return 4

        return 0
    }

}