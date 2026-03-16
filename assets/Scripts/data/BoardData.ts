import { _decorator, CCInteger } from 'cc'
const { ccclass, property } = _decorator

@ccclass('BoardData')
export class BoardData {

    @property(CCInteger)
    width = 0

    @property(CCInteger)
    height = 0

    @property([CCInteger])
    pixelData = []

}