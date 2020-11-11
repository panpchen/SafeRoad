// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { UIManager } from "../UIManager";
import BaseUI from "./BaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class IntroUI extends BaseUI {
  @property(cc.Node)
  startBtn: cc.Node = null;

  init() {
    super.init();
    cc.tween(this.startBtn)
      .repeatForever(
        cc.tween()
          .to(0.2, { scale: 1.3 })
          .to(0.2, { scale: 1 })
      ).start();
  }

  clickGameStart() {
    UIManager.instance.hideAll();
    cc.director.emit("gameStart");
  }
}
