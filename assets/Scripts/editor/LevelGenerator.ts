import { _decorator, Component, ImageAsset, Prefab, instantiate, Node } from 'cc'
import { BoardData } from '../data/BoardData'
import { PixelColorManager } from '../managers/PixelColorManager'

const { ccclass, property, executeInEditMode } = _decorator

@ccclass('LevelGenerator')
@executeInEditMode(true)
export class LevelGenerator extends Component {

    @property(ImageAsset)
    sourceImage:ImageAsset = null

    @property(PixelColorManager)
    colorManager:PixelColorManager = null

    @property(Prefab)
    tilePrefab:Prefab = null

    @property
    cellSize = 64

    @property
    generateTrigger = false

    @property
    clearTrigger = false

    update(){

        if(this.generateTrigger){
            this.generateTrigger=false
            this.generateLevel()
        }

        if(this.clearTrigger){
            this.clearTrigger=false
            this.clear()
        }

    }

    generate():BoardData{

        const img = this.sourceImage

        const width = img.width
        const height = img.height

        const pixels = img.data as Uint8Array

        const data:number[]=[]

        for(let y=0;y<height;y++){
            for(let x=0;x<width;x++){

                const index=(y*width+x)*4

                const r=pixels[index]
                const g=pixels[index+1]
                const b=pixels[index+2]

                const id=this.colorManager.colorToID(r,g,b)

                data.push(id)

            }
        }

        const board=new BoardData()

        board.width=width
        board.height=height
        board.pixelData=data

        return board

    }

    generateLevel(){

        const board=this.generate()

        for(let y=0;y<board.height;y++){
            for(let x=0;x<board.width;x++){

                const id=board.pixelData[y*board.width+x]

                if(id==0) continue

                const tile=instantiate(this.tilePrefab)

                tile.setParent(this.node)

                tile.setPosition(
                    x*this.cellSize,
                    -y*this.cellSize,
                    0
                )

            }
        }

        console.log("Level generated")

    }

    clear(){

        const children=this.node.children.slice()

        for(const c of children)
            c.destroy()

    }

}