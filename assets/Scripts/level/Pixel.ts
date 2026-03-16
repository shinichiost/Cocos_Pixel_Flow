import {_decorator, Color, Component, MeshRenderer, renderer } from "cc"
const { ccclass, property } = _decorator;
import { PixelData } from "../"
@ccclass('Pixel')
export class Pixel extends Component {
    @property(MeshRenderer)
    renderer:MeshRenderer = null
    id:Number = 0
    setUp(id: Number):Pixel
    {
        this.id = id
        return this
    }
    setColor(color:Color){
        this.renderer.material.setProperty("albedo", color)
    }

}