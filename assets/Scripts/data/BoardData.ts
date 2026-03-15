import { _decorator } from 'cc'
const { ccclass, property } = _decorator

@ccclass('BoardData')
export class BoardData {

    @property
    width:number = 0

    @property
    height:number = 0

    @property([Number])
    pixelData:number[] = []

}