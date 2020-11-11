// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const TopicConfigs = [
    {
        id: 0,
        title: "勤清理窗边和阳台的杂物",
        scale: 1.5,
        answer: "right",
    },
    {
        id: 1,
        title: "加装防护网",
        scale: 1.6,
        answer: "right",
    },
    {
        id: 2,
        title: "宣传高空抛物的危害",
        scale: 1.6,
        answer: "right",
    },
    {
        id: 3,
        title: "向外扔花盆",
        scale: 1.5,
        answer: "wrong",
    },
    {
        id: 4,
        title: "小孩爬窗户看妈妈回来没",
        scale: 1.4,
        answer: "wrong",
    },
    {
        id: 5,
        title: "向外扔垃圾",
        scale: 1.5,
        answer: "wrong",
    },
    {
        id: 6,
        title: "小孩爬窗户上玩耍",
        scale: 2,
        answer: "wrong",
    }
]

export class PicTopicConfig {
    static getConfigById(id) {
        return TopicConfigs[id];
    }
}

