import {_decorator, Color, Component, MeshRenderer, renderer } from "cc"
const { ccclass, property } = _decorator;
import { PixelData } from "../"
@ccclass('Pixel')
export class Pixel extends Component {
    @property(MeshRenderer)
    renderer:MeshRenderer = null
    data:PixelData
    setUp(data:PixelData):Pixel
    {
        this.data = data
        return this
    }
    setColor(color:Color){
        this.renderer.material.setProperty("albedo", color)
    }

}