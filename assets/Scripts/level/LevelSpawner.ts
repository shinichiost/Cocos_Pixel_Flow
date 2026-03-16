import { _decorator, Component, Node } from 'cc';
import { LevelData } from '../data';
import { BoardSpawner } from './BoardSpawner';
const { ccclass, property } = _decorator;

@ccclass('LevelSpawner')
export class LevelSpawner {
    levelData: LevelData;
    constructor(levelData: LevelData) {
        this.levelData = levelData;
    }
    LoadLevel(levelData: LevelData) {
        const boardSpawner = new BoardSpawner();
        boardSpawner.create(levelData.boardData);
    }
}


