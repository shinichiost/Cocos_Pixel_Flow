import { _decorator, Component, Node,Color,Material,Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('InterfaceUltility')
export class InterfaceUltility extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }
}


export interface PixelType {

    id:number

    color:Color

    material:Material

    score:number

    particle:Prefab

}