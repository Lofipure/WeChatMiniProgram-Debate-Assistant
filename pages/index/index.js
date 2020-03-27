Page({
  leftMove:0,
  rightMove:0,
  data:{
    // text:"This is a Page"
    actionSheetHidden: true,
    actionSheetItems: [],
    title:"",
    desc:"",
    voice:0,
    leftTime:0,
    rightTime:0,
    src: '/assets/sound/countdown.mp3',
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    var configs = wx.getStorageSync('configs');
    var actionSheetItems=[];
    var first=true;
    for(var i in configs){
        var config = configs[i];
        if(config.state){
          if(first){
            var desc = config.desc.replace(/@/g,config.time+"秒");
            this.setData({title:config.name,desc:desc,leftTime:config.time,rightTime:config.time,voice:config.voice});
            first=false;
          }
          actionSheetItems.push({name:config.name,id:config.id});
        }
    }
    this.setData({actionSheetItems:actionSheetItems});

    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})