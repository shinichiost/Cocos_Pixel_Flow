import { _decorator, CCInteger, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GunData')
export class GunData  {
    @property(CCInteger)
    bullet = 20;
    @property(CCInteger)
    damage = 1;
}


@ccclass('LauncherAreaData')
export class LauncherAreaData  {
    @property([GunData])
    listGunData: GunData[] = [];
}

