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
  }
});
