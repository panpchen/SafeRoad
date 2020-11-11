// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import LevelBase from "./LevelBase";
import LevelFind from "./LevelFind";
import { UIManager, UIType } from "./UIManager";

const { ccclass, property } = cc._decorator;
const TOTAL_LEVELNUM = 3;

@ccclass
export default class Game extends cc.Component {
  @property(cc.Prefab)
  levelPrefabs: cc.Prefab[] = [];
  @property(cc.Node)
  levelParent: cc.Node = null;

  public static instance: Game = null;
  public _curLevelNum: number = 0;
  private _createdLevelList: cc.Node[] = [];

  onLoad() {
    Game.instance = this;
    cc.director.on("gameStart", this._startGame.bind(this));
    cc.director.on("gameOver", this._overGame.bind(this));
    cc.director.on("gameNextLevel", this._goNextLevel.bind(this));
  }

  _startGame() {
    this._curLevelNum = 0;
    this._createdLevelList.forEach(levelScene => {
      levelScene.active = false;
    });
    this._loadLevel();
  }

  _goNextLevel() {
    this._createdLevelList[this._curLevelNum].active = false;
    this._curLevelNum++;
    this._loadLevel();
  }

  _loadLevel() {
    let level = this._createdLevelList[this._curLevelNum];
    if (!level) {
      level = cc.instantiate(this.levelPrefabs[this._curLevelNum]);
      this._createdLevelList.push(level);
    } else {
      level.active = true;
    }
    level.parent = this.levelParent;
    const levelBase = level.getComponent(LevelBase);
    levelBase.init();
  }

  getRangeRandom(min, max) {
    return Math.random() * (max - min + 1) + min;
  }

  countDownFormat(sec: number) {
    let nowM = Math.floor(sec % 3600 / 60);
    let nowS = Math.floor(sec % 60);
    let nowMStr = nowM.toString();
    let nowSStr = nowS.toString();
    if (nowM < 10) {
      nowMStr = `0${nowM}`;
    }
    if (nowS < 10) {
      nowSStr = `0${nowS}`;
    }
    return nowMStr + ":" + nowSStr;
  }

  _overGame(data) {
    if (this._curLevelNum + 1 == TOTAL_LEVELNUM) {
      this.scheduleOnce(() => {
        UIManager.instance.showUI(UIType.ResultUI);
      }, 0.7);
    } else {
      this.scheduleOnce(() => {
        UIManager.instance.showUI(UIType.PassUI, data);
      }, 0.7);
    }
  }

  getTotalGameTime() {
    let totalTime = 0;
    this._createdLevelList.forEach(level => {
      totalTime += level.getComponent(LevelFind).getGameTime();
    });
    return totalTime;
  }
}
