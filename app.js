//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var configs = wx.getStorageSync('configs');
    if(!configs){
       configs = this.initConfigs();
    }
    wx.setStorageSync('configs',configs);
  },
  initConfigs:function(){
    var configs = new Object();
    
    configs.title = "";

    var config1=new Object();
    config1.id="config1";
    config1.name="立论阶段";
    config1.state=true;
    config1.time=180;
    config1.voice=15;
    config1.desc="一辩开篇立论\n时间:@";
    configs.config1=config1;

    var config2=new Object();
    config2.id="config2";
    config2.name="驳立论阶段";
    config2.state=true;
    config2.time=120;
    config2.voice=15;
    config2.desc ="二辩驳对方立论\n时间:@";
    configs.config2=config2;

    var config3=new Object();
    config3.id="config3";
    config3.name="质辩环节";
    config3.state=true;
    config3.time=90;
    config3.voice=15;
    config3.desc="本方三辩提问对方一、二、四辩各一个问题，对方辩手分别应答。\n三个问题累计回答时间为@。";
    configs.config3=config3;

    var config4=new Object();
    config4.id="config4";
    config4.name="自由辩论";
    config4.state=true;
    config4.time=240;
    config4.voice=15;
    config4.desc ="自由辩论\n时间:@";
    configs.config4=config4;

    var config5=new Object();
    config5.id="config5";
    config5.name="总结陈词";
    config5.state=true;
    config5.time=180;
    config5.voice=15;
    config5.desc ="四辩总结陈词\n时间:@";
    configs.config5=config5;

    return configs;
  }
})