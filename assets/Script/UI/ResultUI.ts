// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Constants } from "../Config/Constants";
import Game from "../Game";
import { SendMsg } from "../Net/SendMsg";
import { UIManager, UIType } from "../UIManager";
import BaseUI from "./BaseUI";
import PopBaseUI from "./PopBaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ResultUI extends BaseUI {
  @property(cc.Label)
  timeLabel: cc.Label = null;
  @property(cc.Node)
  btnGroup: cc.Node = null;

  onDisable() {
    this.timeLabel.node.scale = 0;
    this.btnGroup.opacity = 0;
  }

  init() {
    this.timeLabel.string = `总用时: ${Game.instance.countDownFormat(Game.instance.getTotalGameTime())}`;
    cc.tween(this.timeLabel.node)
      .delay(0.7)
      .to(0.6, { scale: 1 }, { easing: "elasticOut" })
      .call(() => {
        cc.tween(this.btnGroup)
          .to(0.6, { opacity: 255 })
          .start();
      })
      .start();

    SendMsg.reqSaveAssessStatistics(Constants.AssessStatisticsJson);
  }

  clickBackGame() {
    UIManager.instance.hideAll();
    UIManager.instance.showUI(UIType.MenuUI);
  }

  clickAgainGame() {
    UIManager.instance.hideAll();
    cc.director.emit("gameStart");
  }
}
