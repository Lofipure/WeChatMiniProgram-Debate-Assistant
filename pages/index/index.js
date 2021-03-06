Page({
  leftMove: 0,
  rightMove: 0,
  data: {
    // text:"这是一个页面"
    actionSheetHidden: true,
    actionSheetItems: [],
    title: "",
    desc: "",
    voice: 0,
    leftTime: 0,
    rightTime: 0,
    src: '/assets/sound/countdown.mp3',
    mainTitle: "",
    left: ">>    ",
    right: "    <<",
    sum: 0,
    lp: 100,
    rp: 100,
    thatThat: undefined
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
    var that = this;
    that.canvasRing = that.selectComponent("#canvasRing");
    that.canvasRing.showCanvasRing();
    that.canvasRing = that.selectComponent("#canvasRingRight");
    that.canvasRing.showCanvasRing();
  },
  onShow: function () {
    var configs = wx.getStorageSync('configs');
    var actionSheetItems = [];
    var first = true;
    for (var i in configs) {
      var config = configs[i];
      if (config.state) {
        if (first) {
          var desc = config.desc.replace(/@/g, config.time + "秒");
          this.setData({
            title: config.name,
            desc: desc,
            leftTime: config.time,
            rightTime: config.time,
            voice: config.voice,
            sum: config.time
          });
          first = false;
        }
        actionSheetItems.push({
          name: config.name,
          id: config.id
        });
      }
    }
    this.setData({
      mainTitle: configs.title
    });
    this.setData({
      actionSheetItems: actionSheetItems
    });

    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  actionSheetTap: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetChange: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindItemTap: function (e) {
    this.leftStop();
    this.rightStop();
    var id = e.target.id;
    var configs = wx.getStorageSync('configs');
    var config = configs[id];
    var desc = config.desc.replace(/@/g, config.time + "秒");
    this.setData({
      title: config.name,
      desc: desc,
      actionSheetHidden: true,
      leftTime: config.time,
      rightTime: config.time,
      voice: config.voice,
      sum: config.time,
      lp: 100,
      rg: 100
    });
    page.canvasRing = page.selectComponent("#canvasRingRight");
    page.canvasRing.showCanvasRing();
    page.canvasRing = page.selectComponent("#canvasRing");
    page.canvasRing.showCanvasRing();
  },
  leftStop: function () {
    clearInterval(this.leftInterval);
    this.leftInterval = 0;
    this.audioPause();
  },
  rightStop: function () {
    clearInterval(this.rightInterval);
    this.rightInterval = 0;
    this.audioPause();
  },
  leftStart: function () {
    this.rightStop();
    if (this.leftInterval && this.leftInterval != 0) {
      this.leftStop();
      return;
    }

    var page = this;
    page.canvasRing = page.selectComponent("#canvasRing");
    var leftInterval = setInterval(function () {
      if (page.data.leftTime <= 0) {
        page.leftStop();
        return;
      }
      if (page.data.leftTime <= page.data.voice) {
        page.audioPlay();
      }
      page.setData({
        leftTime: page.data.leftTime - 1,
        lp: (page.data.leftTime / page.data.sum).toFixed(2) * 100
      });
      page.canvasRing.showCanvasRing();
    }, 1000);
    this.leftInterval = leftInterval;
  },
  rightStart: function () {
    this.leftStop();
    if (this.rightInterval && this.rightInterval != 0) {
      this.rightStop();
      return;
    }
    var page = this;
    page.canvasRing = page.selectComponent("#canvasRingRight");
    var rightInterval = setInterval(function () {
      if (page.data.rightTime <= 0) {
        page.rightStop();
        return;
      }
      if (page.data.rightTime <= page.data.voice) {
        page.audioPlay();
      }
      page.setData({
        rightTime: page.data.rightTime - 1,
        rp: (page.data.rightTime / page.data.sum).toFixed(2) * 100
      });
      page.canvasRing.showCanvasRing();
    }, 1000);
    this.rightInterval = rightInterval;
  },
  audioPlay: function () {
    this.setData({
      action: {
        method: 'play'
      }
    })
  },
  audioPause: function () {
    this.setData({
      action: {
        method: 'pause'
      }
    })
  }
})