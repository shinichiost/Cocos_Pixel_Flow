import { _decorator, Component, ImageAsset, Prefab, instantiate, Node } from 'cc'
import { BoardData, LevelData } from '../data'
import { PixelColorManager } from '../managers'

const { ccclass, property, executeInEditMode } = _decorator

declare var Editor: any;

@ccclass('LevelDataGenerator')
@executeInEditMode(true)
export class LevelDataGenerator extends Component {

    @property(ImageAsset)
    sourceImage: ImageAsset = null

    @property(PixelColorManager)
    colorManager: PixelColorManager = null
    @property
    cellSize = 64

    @property
    generateTrigger = false

    @property
    clearTrigger = false
    @property(LevelData)
    levelData: LevelData = new LevelData()
    update() {

        if (this.generateTrigger) {
            this.generateTrigger = false
            this.generateLevel()
        }

        if (this.clearTrigger) {
            this.clearTrigger = false
            this.clear()
        }

    }

    generate(): BoardData {

    const img = this.sourceImage.data as HTMLImageElement

    const width = img.width
    const height = img.height

    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext("2d")!

    ctx.drawImage(img, 0, 0)

    const imageData = ctx.getImageData(0,0,width,height)
    const pixels = imageData.data   // Uint8ClampedArray

    const data:number[]=[]

    for (let y=0;y<height;y++){
        for (let x=0;x<width;x++){

            const index = (y * width + x) * 4

            const r = pixels[index]
            const g = pixels[index+1]
            const b = pixels[index+2]

            const id = this.colorManager.colorToID(r,g,b)
console.log(`Pixel at (${x},${y}): RGB(${r},${g},${b}) -> ID: ${id}`)
            data.push(id)
        }
    }

    const board = new BoardData()
    board.width = width
    board.height = height
    board.pixelData = data

    return board
}
    generateLevel() {

        const board = this.generate()
        this.levelData = new LevelData()
        this.levelData.boardData = board

        this.exportJSON(this.levelData, "level_1")

        console.log("Level generated")

    }
    exportJSON(data: any, name: string) {

        const jsonString = JSON.stringify(data, null, 2);
        const url = `db://assets/resources/levels/${name}.json`;

        console.log("Creating asset at:", url);

        Editor.Message.request(
            "asset-db",
            "create-asset",
            url,
            jsonString
        ).then(() => {
            console.log("Asset created successfully");
        }).catch((err) => {
            console.error("Error creating asset:", err);
        });

    }
    clear() {

        const children = this.node.children.slice()

        for (const c of children)
            c.destroy()

    }

}