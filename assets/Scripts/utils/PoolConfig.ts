import { _decorator, Prefab } from 'cc'
import { PoolType } from './PoolType'

const { ccclass, property } = _decorator

@ccclass('PoolConfig')
export class PoolConfig
{
    @property({type:Prefab})
    prefab:Prefab = null

    @property
    poolType:PoolType = PoolType.Pixel

    @property
    prewarm:number = 10

    @property
    maxSize:number = 100
}