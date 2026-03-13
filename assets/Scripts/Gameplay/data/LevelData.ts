import { _decorator, Component, TextAsset } from 'cc'
const { ccclass, property } = _decorator

export enum LevelDataSource
{
    INSPECTOR,
    JSON
}

@ccclass('LevelData')
export class LevelData extends Component {

    @property({type:LevelDataSource})
    source:LevelDataSource = LevelDataSource.INSPECTOR

    @property
    queueCapacity:number = 5

    // inspector data
    @property
    width:number = 3

    @property
    height:number = 3

    @property([Number])
    spawnMatrix:number[] = []

    // json file
    @property(TextAsset)
    jsonFile:TextAsset = null

    private matrix:number[][] = []

    onLoad()
    {
        if(this.source === LevelDataSource.JSON)
        {
            this.loadFromJson()
        }
        else
        {
            this.loadFromInspector()
        }
    }

    private loadFromInspector()
    {
        this.matrix = []

        for(let y=0;y<this.height;y++)
        {
            const row:number[] = []

            for(let x=0;x<this.width;x++)
            {
                const index = y * this.width + x
                row.push(this.spawnMatrix[index])
            }

            this.matrix.push(row)
        }
    }

    private loadFromJson()
    {
        if(!this.jsonFile) return

        const data = JSON.parse(this.jsonFile.text)

        this.queueCapacity = data.queueCapacity
        this.matrix = data.spawnMatrix
    }

    getMatrix():number[][]
    {
        return this.matrix
    }

}