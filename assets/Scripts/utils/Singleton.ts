import { Component } from 'cc'

export abstract class Singleton extends Component {

    private static instances = new Map<Function, any>()

    public static getInstance<T>(this: new () => T): T | null {
        return Singleton.instances.get(this) ?? null
    }

    protected onLoad() {
        const cls = this.constructor as any

        if (!Singleton.instances.has(cls)) {
            Singleton.instances.set(cls, this)
        } else {
            this.destroy()
        }
    }

    protected onDestroy() {
        const cls = this.constructor as any
        if (Singleton.instances.get(cls) === this) {
            Singleton.instances.delete(cls)
        }
    }

}