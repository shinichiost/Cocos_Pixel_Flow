import { _decorator, Component, Node, resources, JsonAsset } from 'cc';
import { LevelSpawner } from '../';
import { BoardData, LevelData } from '../';
import { GunData } from '../data/GunData';
const { ccclass, property } = _decorator;
enum DataType {
    Editor,
    File,
} 
@ccclass('LevelController')
export class LevelController extends Component {
    @property({ type: DataType })
    dataType: DataType = DataType.Editor;

    @property(Node)
    levelNode: Node = null;

    // Editor data setup
    @property({ type: LevelData })
    levelData: LevelData = null;

    // File path for JSON resource
    @property({ type: String })
    jsonFilePath: string = '';

    levelSpawner: LevelSpawner = null;

    start() {
        this.loadLevelData();
        this.levelSpawner = new LevelSpawner(this.levelData)
        if (!this.levelSpawner) {
            console.error("LevelSpawner component not found on levelNode");
        }
    }

    loadLevelData() {
        if (this.dataType === DataType.Editor) {
            if (this.levelData ) {
                this.levelSpawner.LoadLevel(this.levelData);
            } else {
                console.warn('No editor data assigned');
            }
        } else if (this.dataType === DataType.File) {
            if (this.jsonFilePath) {
                resources.load(this.jsonFilePath, JsonAsset, (err, asset) => {
                    if (err) {
                        console.error('Failed to load JSON file:', err);
                        return;
                    }
                    this.levelData = LevelParser.parse(asset.json);
                });
            } else {
                console.warn('No JSON file path specified');
            }
        }
    }
}
export class LevelParser {

    static parse(json:any):LevelData
    {
        const level = new LevelData()
        level.queueCapacity = json.queueCapacity

        const board = new BoardData()
        board.width = json.board.width
        board.height = json.board.height
        board.pixelData = json.board.pixelData
        level.boardData = board
        const gunGroupData = json.gunGroupData
        gunGroupData.listGunData = gunGroupData.listGunData.map((gun:any)=>{
            const g = new GunData()
            g.bullet = gun.bullet
            g.damage = gun.damage
            return g
        })
        level.gunGroupData = gunGroupData
        return level
    }

}

