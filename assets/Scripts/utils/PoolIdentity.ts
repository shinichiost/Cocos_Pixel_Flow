import { _decorator, Component } from 'cc'
import { PoolType } from './PoolType'

const { ccclass, property } = _decorator

@ccclass('PoolIdentity')
export class PoolIdentity extends Component
{
    @property
    poolType:PoolType = PoolType.Pixel
}