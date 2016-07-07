//app.js
var gameScene = cc.Scene.extend({
  onEnter: function() {

    var gradient = cc.LayerGradient.create(cc.color(0, 0, 0, 255), cc.color(0x46, 0x82, 0xB4, 255));
    this.addChild(gradient);

    this._super();
    gameLayer = new game();
    gameLayer.init();
    this.addChild(gameLayer);
  }
});

var size;
var mylabel;
var game = cc.Layer.extend({
  init: function() {
    this._super();
    size = cc.director.getWinSize();
    mylabel = cc.LabelTTF.create("GO!", "Arial", "32");
    mylabel.setPosition(size.width / 2, size.height / 2);
    this.addChild(mylabel);
    //scheduleUpdate関数は、描画の都度、update関数を呼び出す
    this.scheduleUpdate();
  },
  update(dt){
    //座標を更新する
    mylabel.setPosition(mylabel.getPosition().x-3,mylabel.getPosition().y);
    //画面の端に到達したら反対側の座標にする
     if(mylabel.getPosition().x < 30){
         mylabel.setPosition(size.width - 30 , mylabel.getPosition().y);
     }
  }
});
