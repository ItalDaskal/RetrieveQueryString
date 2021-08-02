import Entity from './store.interface';

const data: Entity[] = [];

const storeData = (entity: Entity[]) => {
    entity.forEach((e: Entity) => {
        data.push(e);
    });
    return {};
}

export default {storeData, data};