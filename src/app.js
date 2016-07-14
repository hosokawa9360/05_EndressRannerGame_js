
var size;
var gameLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        size = cc.winSize;
        this.scheduleUpdate();
        return true;
    },
    update: function( _dt ) {
        var particle = new cc.ParticleSystem.create(100);
        //重力をシミュレーションしたパーティクル
        particle.setEmitterMode(cc.ParticleSystem.MODE_GRAVITY);
        //パーティクルの出現場所の分散度（ばらつき具合）。（X方向の幅、ｙ方向の幅））
        particle.setPosVar({x:50,y:100});
        //１秒間に放出するパーティクルの数
        particle.setEmissionRate(120);
        //パーティクルを出力する期間 -1は無限
        particle.setDuration(0.2);
        //パーティクルが消えるまでの時間
        particle.setLife(0.2);
        particle.setLifeVar(0.2);
        //パーティクル出現時の大きさ
        particle.setStartSize(0);
        //パーティクル出現時の大きさの分散度
        particle.setStartSizeVar(50);
        //パーティクル寿命終了時の大きさ
        particle.setEndSize(0);
        //パーティクル寿命終了時の大きさ
        particle.setEndSizeVar(0);
        //パーティクルの出力方向
        particle.setAngle(90);
        //パーティクルの出力方向の分散度
        particle.setAngleVar(10);
        //パーティクル出現時の色
        particle.setStartColor(cc.color(255, 255, 128, 255));
        //パーティクル出現時の色の分散度
        particle.setStartColorVar(cc.color(5, 5, 5, 0));
        //パーティクル寿命終了時の色
        particle.setEndColor(cc.color(0, 0, 0, 255));
        //パーティクル寿命終了時の色の分散度
        particle.setEndColorVar(cc.color(0, 0, 0, 0));
        //パーティクルの生成位置
        particle.setPosition(150,size.height/2);
        //パーティクルの寿命終了時にはレイヤーから削除
        particle.setAutoRemoveOnFinish(true);
        //パーティクルの形と基本の色
        particle.setTexture(cc.Sprite.create(res.HealTexture_png).getTexture() );
        this.addChild(particle,10);
    }

});

var gameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new gameLayer();
        this.addChild(layer);
    }
});
