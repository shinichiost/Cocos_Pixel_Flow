import { Pixel } from "../entities/Pixel"

export class QueueSystem {

    private slots:Pixel[] = []

    private capacity:number

    constructor(capacity:number)
    {
        this.capacity = capacity
    }

    isFull():boolean
    {
        return this.slots.length >= this.capacity
    }

    isEmpty():boolean
    {
        return this.slots.length == 0
    }

    enqueue(pixel:Pixel):boolean
    {
        if(this.isFull())
            return false

        this.slots.push(pixel)

        return true
    }

    dequeue():Pixel|null
    {
        if(this.isEmpty())
            return null

        return this.slots.shift()
    }

    getSlots():Pixel[]
    {
        return this.slots
    }

}