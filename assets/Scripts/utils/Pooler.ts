import { _decorator, Component, NodePool, instantiate, Node } from 'cc'
import { PoolConfig } from './PoolConfig'
import { PoolIdentity } from './PoolIdentity'
import { PoolType } from './PoolType'

const { ccclass, property } = _decorator

@ccclass('Pooler')
export class Pooler extends Component
{
    @property([PoolConfig])
    configs:PoolConfig[] = []

    static instance:Pooler

    private pools = new Map<PoolType, NodePool>()
    private prefabs = new Map<PoolType, any>()
    private maxSizes = new Map<PoolType, number>()

    onLoad()
    {
        Pooler.instance = this

        for(const config of this.configs)
        {
            const pool = new NodePool()

            this.pools.set(config.poolType, pool)
            this.prefabs.set(config.poolType, config.prefab)
            this.maxSizes.set(config.poolType, config.maxSize)

            this.prewarm(config)
        }
    }

    private prewarm(config:PoolConfig)
    {
        const pool = this.pools.get(config.poolType)

        for(let i=0;i<config.prewarm;i++)
        {
            const node = instantiate(config.prefab)

            this.setupIdentity(node, config.poolType)

            pool.put(node)
        }
    }

    private setupIdentity(node:Node,type:PoolType)
    {
        let identity = node.getComponent(PoolIdentity)

        if(!identity)
            identity = node.addComponent(PoolIdentity)

        identity.poolType = type
    }

    get(type:PoolType):Node
    {
        const pool = this.pools.get(type)
        const prefab = this.prefabs.get(type)

        if(!pool || !prefab)
            throw new Error("Pool not found: "+type)

        if(pool.size()>0)
            return pool.get()

        const node = instantiate(prefab)

        this.setupIdentity(node,type)

        return node
    }

    recycle(node:Node)
    {
        const identity = node.getComponent(PoolIdentity)

        if(!identity)
        {
            node.destroy()
            return
        }

        const type = identity.poolType
        const pool = this.pools.get(type)
        const max = this.maxSizes.get(type)

        node.removeFromParent()

        if(pool.size() >= max)
        {
            node.destroy()
            return
        }

        pool.put(node)
    }

}