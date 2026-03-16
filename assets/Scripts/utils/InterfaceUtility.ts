import { _decorator, Component, Node,Color,Material,Prefab } from 'cc';
const { ccclass, property } = _decorator;

export interface PixelType {

    id:number

    color:Color

    material:Material

    score:number

    particle:Prefab

}