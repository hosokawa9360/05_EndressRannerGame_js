//app.js
var gameScene = cc.Scene.extend({
  onEnter: function() {

    var backgroundLayer = new cc.LayerColor(new cc.Color(140, 200, 140, 128));
    this.addChild(backgroundLayer);

    this._super();
    gameLayer = new game();
    gameLayer.init();
    this.addChild(gameLayer);
  }
});

var game = cc.Layer.extend({
  init: function() {
    this._super();
    var gradient = cc.LayerGradient.create(cc.color(0, 0, 0, 255), cc.color(0x46, 0x82, 0xB4, 255));
    this.addChild(gradient);

  }
});
