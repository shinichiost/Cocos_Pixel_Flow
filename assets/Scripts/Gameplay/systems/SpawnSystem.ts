export class SpawnSystem {

    private matrix:number[][]

    private row:number
    private col:number

    private width:number
    private height:number

    constructor(matrix:number[][])
    {
        this.matrix = matrix

        this.height = matrix.length
        this.width = matrix[0].length

        this.row = this.height - 1
        this.col = 0
    }

    popColor():number|null
    {
        if(this.row < 0)
            return null

        const color = this.matrix[this.row][this.col]

        this.col++

        if(this.col >= this.width)
        {
            this.col = 0
            this.row--
        }

        return color
    }

}