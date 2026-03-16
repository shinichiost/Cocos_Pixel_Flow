import { _decorator } from 'cc'
import { BoardData } from './BoardData'
import { GunGroupData } from './GunData'

const { ccclass, property } = _decorator
@ccclass('LevelData')
export class LevelData {
    @property
    queueCapacity:number = 5
    @property(GunGroupData)
    gunGroupData: GunGroupData = new GunGroupData()
    @property(BoardData)
    boardData:BoardData = new BoardData()

}