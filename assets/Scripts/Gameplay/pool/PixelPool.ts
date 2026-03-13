import { _decorator, Component, NodePool, Prefab, instantiate, Node } from 'cc'

const { ccclass, property } = _decorator

@ccclass('PixelPool')
export class PixelPool extends Component {

    @property(Prefab)
    pixelPrefab:Prefab = null

    private pool:NodePool = new NodePool()

    static instance:PixelPool

    onLoad()
    {
        PixelPool.instance = this
    }

    get():Node
    {
        if(this.pool.size() > 0)
        {
            return this.pool.get()
        }

        return instantiate(this.pixelPrefab)
    }

    recycle(node:Node)
    {
        node.removeFromParent()

        this.pool.put(node)
    }

}