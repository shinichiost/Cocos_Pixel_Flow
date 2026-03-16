import { BoardData } from '../data';
import { Pooler } from '../utils';
import { PoolType } from '../utils/PoolType';

export class BoardSpawner {
    boardData: BoardData = new BoardData();
    create(boardData:BoardData) {
        var pixelNode = Pooler.instance.get(PoolType.Pixel);
    }
}


