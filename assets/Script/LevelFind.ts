// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import LevelBase from "./LevelBase";

const { ccclass, property } = cc._decorator;
const TOTALTIME: number = 20;

@ccclass
export default class LevelFind extends LevelBase {
  @property
  levelId: number = 0;
  @property(cc.Node)
  tipBtn: cc.Node = null;
  @property(cc.Node)
  itemParent: cc.Node = null;
  @property(cc.Node)
  idsParent: cc.Node = null;
  @property(cc.Label)
  timeLabal: cc.Label = null;

  private _allItemList: cc.Node[] = [];
  private _clickItemList: cc.Node[] = [];
  private _idList: cc.Node[] = [];
  private _curClickId: number = 0;
  private _gameTime: number = 0;
  private get gameTime() {
    return this._gameTime;
  }
  private set gameTime(value) {
    this._gameTime = value;
    this._updateTimeLabel(value);
  }

  init() {
    this._clickItemList = [];
    this._curClickId = 0;
    this.tipBtn.active = false;
    this._idList = this.idsParent.children;
    this._allItemList = this.itemParent.children;
    this._allItemList.forEach(item => {
      item.on("click", this._callback, this);
      item.getComponent(cc.Button).interactable = true;
    });
    this._idList.forEach(node => {
      node.active = false;
    })

    this.unscheduleAllCallbacks();
    this.gameTime = 0;
    this.schedule(() => {
      this.gameTime++;
      if (this._gameTime == TOTALTIME) {
        this.tipBtn.active = true;
      }
    }, 1, cc.macro.REPEAT_FOREVER, 1);
  }

  _updateTimeLabel(time) {
    this.timeLabal.string = `${time}秒`;
  }

  getGameTime() {
    return this._gameTime;
  }

  _callback(button: cc.Button) {
    this._clickItemList.push(button.node);
    cc.tween(button.node)
      .to(0.2, { scaleX: 1.5 * button.node.scale })
      .to(0.2, { scaleX: 1 * button.node.scale })
      .start()

    button.interactable = false;

    const node = this._idList[this._curClickId];
    node.active = true;
    node.position = button.node.position;
    this._curClickId++;

    if (this._clickItemList.length == this._allItemList.length) {
      cc.director.getScheduler().pauseTarget(this);
      cc.director.emit("gameOver", { gameTime: this._gameTime });
    }
  }

  onClickEvent(event, parm) {
    switch (parm) {
      case "showTip":
        const unClickItemList = this._allItemList.filter(
          (v) => { return this._clickItemList.indexOf(v) == -1; }
        );
        cc.Tween.stopAll();
        unClickItemList.forEach(node => {
          node.scaleX = 1;
          cc.tween(node)
            .to(0.2, { scaleX: 1.5 })
            .to(0.2, { scaleX: 1 })
            .start()
        });
        break;
    }
  }
}
