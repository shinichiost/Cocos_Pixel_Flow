import { _decorator } from 'cc'
import { BoardData } from './BoardData'

const { ccclass, property } = _decorator
@ccclass('LevelData')
export class LevelData {

    @property
    queueCapacity:number = 5

    @property(BoardData)
    boardData:BoardData = new BoardData()

}