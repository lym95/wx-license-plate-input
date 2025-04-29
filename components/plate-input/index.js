Component({
  properties: {
    plate: {
      type: String,
      value: "",
    },
  },

  data: {
    type: 2, // 车牌类型
    inputType: 1,
    currenttIndex: 0, // 当前编辑的输入框
    currentInputValue: ["", "", "", "", "", "", "", ""],
    fillBlock: [
      { num: 11 },
      { num: 12 },
      { num: 13 },
      { num: 14 },
      { num: 15 },
      { num: 16 },
    ],
    keyboardHeightInit: false,
    keyboardHeight: "auto",
    provincesText: [
      "京",
      "冀",
      "沪",
      "津",
      "晋",
      "蒙",
      "辽",
      "吉",
      "黑",
      "苏",
      "浙",
      "皖",
      "闽",
      "赣",
      "鲁",
      "豫",
      "鄂",
      "湘",
      "桂",
      "琼",
      "渝",
      "川",
      "贵",
      "云",
      "粤",
      "藏",
      "陕",
      "甘",
      "青",
      "宁",
      "新",
    ],
    numberText: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    wordText: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "M",
      "N",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ],
    lastWordText: ["港", "澳", "军", "警", "学", "领"],
  },

  observers: {
    currenttIndex: function (newVal) {
      this.setData({
        inputType: this.inputType(),
      });
    },
  },

  lifetimes: {
    attached() {
      const plateKey = this.data.plate.split("");
      this.setData({
        currentInputValue: plateKey,
        currenttIndex: plateKey.length ? plateKey.length - 1 : 0,
      });
    },
  },

  methods: {
    inputType() {
      switch (this.data.currenttIndex) {
        case 0:
          return 1;
        case 1:
          return 2;
        case 2:
          return 3;
        case 3:
          return 3;
        case 4:
          return 3;
        case 5:
          return 3;
        case 6:
          return 3;
        case 7:
          return 4;
        default:
          return 1;
      }
    },

    inputSwitch(e) {
      const { index } = e.currentTarget.dataset;
      this.setData({
        currenttIndex: parseInt(index),
      });
    },

    chooseKey(e) {
      const { value } = e.currentTarget.dataset;
      const currentInputValue = [...this.data.currentInputValue];
      currentInputValue[this.data.currenttIndex] = value;

      this.setData({
        currentInputValue,
      });
      if (this.data.currenttIndex < 7)
        this.setData({
          currenttIndex: this.data.currenttIndex + 1,
        });
    },

    deleteKey() {
      const currentInputValue = [...this.data.currentInputValue];
      currentInputValue[this.data.currenttIndex] = "";
      this.setData({ currentInputValue });
      if (this.data.currenttIndex != 0) {
        this.setData({
          currenttIndex: this.data.currenttIndex - 1,
        });
      }
    },

    exportPlate() {
      const plate = this.data.currentInputValue.join("");
      console.log("当前车牌号:", plate);

      // 根据类型验证长度
      if (plate.length < 7) {
        wx.showToast({
          title: "车牌号码长度不正确",
          icon: "none",
        });
        return;
      }

      this.triggerEvent("export", { plate });
    },

    close() {
      this.triggerEvent("close");
    },
  },
});
