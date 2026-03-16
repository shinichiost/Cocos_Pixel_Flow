import { _decorator, Component } from 'cc'
import { SpawnSystem,QueueSystem,LevelData } from '../'

const { ccclass } = _decorator

@ccclass('GameManager')
export class GameManager extends Component {

    spawnSystem:SpawnSystem
    queueSystem:QueueSystem

    init(level:LevelData)
    {
        // this.spawnSystem = new SpawnSystem(level.spawnMatrix)

        this.queueSystem = new QueueSystem(level.queueCapacity)
    }

}