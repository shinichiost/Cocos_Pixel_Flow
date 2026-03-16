import { _decorator, Asset } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('LevelConfig')
export class LevelConfig extends Asset {

    @property
    moveSpeed = 10;

    @property
    gravity = 9.8;

}