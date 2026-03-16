import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GunData')
export class GunData  {
    @property(Number)
    bullet: number = 20;
    @property(Number)
    damage: number = 1;
}


@ccclass('GunGroupData')
export class GunGroupData  {
    @property([GunData])
    listGunData: GunData[] = [];
}

