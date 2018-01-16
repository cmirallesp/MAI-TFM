// @flow

import { type Symbol, type SymbolType } from './symbol';

import { DB } from './db';
import { fail } from 'assert';
import { Instance } from './instance';

export type KlassType = "model" | "service"

export class Klass {
    //<attribute-name,Symbol>
    instances: Map<string, Instance>;

    type: KlassType;
    name: string;
    db: DB;

    constructor(name: string, type: KlassType) {
        this.instances = new Map()
        this.type = type;
        this.name = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();
        DB.instance().then((db: DB) => {
            this.db = db;
        })
    }

    new_instance(instance_name: string): Instance {
        let r: Instance= this.instances.get(instance_name) || new Instance(instance_name, this )
        if (!(this.instances.has(instance_name))) {
            this.instances.set(instance_name, r);
        }
        return r;
    }

    static async new_model(class_name: string): Promise<Klass> {
        let k = new Klass(class_name, "model");
        let _db = await DB.instance();
        _db.insertKlass(k)
        k.db = _db
        return k;
    }
}
