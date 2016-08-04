### エンドレスランナーゲーム　宇宙船を操作し、危険な小惑星を避けるゲーム —

###### 課題実施状況確認 
[01 荒川 commit](https://github.com/at313/05_EndressRannerGame_js/commits/master) [at313.github.io](https://at313.github.io/05_EndressRannerGame_js/)
[02 石田 commit](https://github.com/barian/05_EndressRannerGame_js/commits/master) [barian.github.io](https://barian.github.io/05_EndressRannerGame_js/)    
[03 磯野commit](https://github.com/E-tiru/05_EndressRannerGame_js/commits/master) [E-tiru.github.io]( https://E-tiru.github.io/05_EndressRannerGame_js/)    
[04 菅原 commit](https://github.com/sugaha/05_EndressRannerGame_js/commits/master) [sugaha.github.io]( https://sugaha.github.io/05_EndressRannerGame_js/) 
[05 高竣 commit](https://github.com/mocosyun/05_EndressRannerGame_js/commits/master)[mocosyun.github.io]( https://mocosyun.github.io/05_EndressRannerGame_js/)   
[06 高聖 commit](https://github.com/yui0722/05_EndressRannerGame_js/commits/master)[yui0722.github.io]( https://yui0722.github.io/05_EndressRannerGame_js/)
[07 高雄 commit](https://github.com/tayuhi/05_EndressRannerGame_js/commits/master)[tayuhi.github.io]( https://tayuhi.github.io/05_EndressRannerGame_js/)
[08 樋口 commit](https://github.com/hkamu/05_EndressRannerGame_js/commits/master)[hkamu.github.io]( https://hkamu.github.io/05_EndressRannerGame_js/)
[09 藤澤](https://github.com/toshikei/05_EndressRannerGame_js/commits/master)[toshikei.github.io](https://toshikei.github.io/05_EndressRannerGame_js/)
[10 細田](https://github.com/anirori/05_EndressRannerGame_js/commits/master)[anirori.github.io]( https://anirori.github.io/05_EndressRannerGame_js/)     
[11 堀井](https://github.com/Ryo779/05_EndressRannerGame_js/commits/master)[Ryo779.github.io]( https://Ryo779.github.io/05_EndressRannerGame_js/)   
[12 松澤](https://github.com/05_EndressRannerGame_js/commits/master)[MatuzawaGaku.github.io]( https://MatuzawaGaku.github.io/05_EndressRannerGame_js/)    

#### first commit　　横向きの解像度に変更  
- resouce.jsを編集  
- resに画像を追加  
- 横向きの解像度に変更  

## 1.ラベルを画面中央に表示
`　size = cc.director.getWinSize(); `  
`　mylabel = cc.LabelTTF.create("GO!", "Arial", "32");　　`  
`　mylabel.setPosition(size.width / 2, size.height / 2);　　`  
`　this.addChild(mylabel);  　　`  

## 2.ラベルを移動させる
` //scheduleUpdate関数は、描画の都度、update関数を呼び出す `  
` this.scheduleUpdate(); `  
` }, `
` update(dt){ `  
` //座標を更新する `  
`mylabel.setPosition(mylabel.getPosition().x-3,mylabel.getPos ition().y);   `  
` //画面の端に到達したら反対側の座標にする `  
`  if(mylabel.getPosition().x < 30){ `  
`      mylabel.setPosition(size.width - 30 , `
 ` mylabel.getPosition().y); `
`  } `  
` } `  
` }); `  

## 3.背景画像をスクロールさせる
  背景画像のサイズは　960ｘ320ピクセルです。  
  これは、このゲームの表示解像度480×320ピクセルの横2倍の大きさです  。  
  この背景画像を横方向にスクロール移動させることで、あたかもプレイプレイヤーが終わりのない街並みを飛び続けているように見せることができます。  

##### 新しく追加した部分　外部変数　6行目～  
  ---
  var gameLayer;　　//背景スプライト  
  var background; //ゲームのメインレイヤ  
  var scrollSpeed = 1; //スクロールスピード（フレーム毎のピクセル数）  
  ※スクロールスピードは、背景をフレーム毎に1ピクセル動かす  
---

##### コメントにした部分　  
 - グラデーション背景
 ```
//  var gradient = cc.LayerGradient.create(cc.color(0, 0, 0, 255), cc.color(0x46, 0x82, 0xB4, 255));
//  this.addChild(gradient);
```

 - ラベル
 ```
// mylabel = cc.LabelTTF.create("GO!", "Arial", "32");
// mylabel.setPosition(size.width / 2, size.height / 2);
// this.addChild(mylabel);
```
- ラベルの移動アニメーションのコード
```
//    //座標を更新する
//    mylabel.setPosition(mylabel.getPosition().x-3,mylabel.getPosition().y);
//    //画面の端に到達したら反対側の座標にする
//     if(mylabel.getPosition().x < 30){
//         mylabel.setPosition(size.width - 30 , mylabel.getPosition().y);
//     }
```
##### 新しく追加した部分　  Spriteクラスを継承したScrollingGBクラス　44行目～  

1.ctor(コンストラクタ)：背景画像を読み込み　　  
2.OnEnter（描画開始の初回）：画面の端に配置して　　  
3.scroll:背景画像の座標を更新する。また、画面の端に画像の中心が来たら、反対側に移動させる　　  

  //スクロール移動する背景クラス  
`  var ScrollingBG = cc.Sprite.extend({　`
`      //ctorはコンストラクタ　クラスがインスタンスされたときに必ず実行される　`
`      ctor:function() {　`
`          this._super();　`
`          this.initWithFile(res.background_png);　`
`      },　`
`      //onEnterメソッドはスプライト描画の際に必ず呼ばれる　`
`      onEnter:function() {　`
`        //背景画像の描画開始位置 横960の画像の中心が、画面の端に設置される　`
`        this.setPosition(size.width,size.height /2 );　`
`        //  this.setPosition(480,160);　`
`      },　`
`      scroll:function(){　`
`        //座標を更新する　`
`   this.setPosition(this.getPosition().x-scrollSpeed,this.getPosition().`y);　`
`          //画面の端に到達したら反対側の座標にする　`
`          if(this.getPosition().x<0){　`
`              this.setPosition(this.getPosition().x+480,this.getPosition().y);　`
`          }　`
`      }　`
`  });　`

##### 新しく追加した部分　  game　Layer定義内部　  10行目～
//スクロールする背景スプライトをインスタンス　スクロール速度:scrollSpeed  
```
background = new ScrollingBG();
 this.addChild(background);
//scheduleUpdate関数は、描画の都度、update関数を呼び出す
  this.scheduleUpdate();

},
update:function(dt){
//backgroundのscrollメソッドを呼び出す
 background.scroll();

},
```
- 注意点  　　
 - background = new ScrollingBG();　　
 ScrollingBGクラスをインスタンスしている　  　　　

 - background.scroll();  
  ScrollingBGクラスのscrollメソッドを実行してる  


## 4.宇宙船を追加する　　
  重力で落下しているように見せる宇宙船を追加する

##### 新しく追加した部分　  8行目以降
  ```
  var ship;
  var gameGravity = -0.05;
  ```
  shipは宇宙船そのもの  
  gameGravityは宇宙船を下方向に引き付ける力の強さ  

###### 宇宙船クラスは、今まで同じで、Spriteクラスを拡張して生成します。
```
  //重力（仮）で落下する　宇宙船　
  var Ship = cc.Sprite.extend({
      ctor:function() {
          this._super();
          this.initWithFile(res.ship_png);
          this.ySpeed = 0；//宇宙船の垂直速度
      },
      onEnter:function() {
          this.setPosition(60,160);
      },
      updateY:function() {
          this.setPosition(this.getPosition().x,this.getPosition().y+this.ySpeed);
          this.ySpeed += gameGravity;
      }
  });
```
 - ctorコンストラクタで、宇宙船の画像を読み込み、`ｙSpeed`というカスタム属性を0に初期化しています。  
 - この宇宙船オブジェクトをステージ追加すると`onEnter`関数によって初期座標(60,160)に配置されます。  
 - その後は、`update`関数から毎フレーム呼び出される`updateY`関数--> `setPosition`関数によって、宇宙船の垂直速度(ySpeed)に`gameGravity`値を加算し、現在の位置に速度を加算することで宇宙船のy座標を更新します。  



###### 宇宙船のインスタンスとupdate関数で `ship.updateY();`呼び出し
 ```
         ship = new Ship(); //★★★★★★
         this.addChild(ship);　//★★★★★★

         //scheduleUpdate関数は、描画の都度、update関数を呼び出す
         this.scheduleUpdate();

     },
     update:function(dt){
       //backgroundのscrollメソッドを呼び出す
         background.scroll();
         ship.updateY(); 　//★★★★★★
     },

 });
 ```

## 5.宇宙船を操作する
 プレイヤーが画面上をマウスで押さえることで、宇宙船に推進力（上昇）を与えるようにします。

 ##### 新しく追加した部分　  12行目以降

 //宇宙船を操作するで追加した部分
 `var gameThrust = 0.1;`

`gameThrust`変数はエンジンの推進力を表します。


マウスで操作するために以下のコードをgame　Layerに追加します。　36行目以降
````
    //宇宙船を操作するで追加した部分
    cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function(event){
                ship.engineOn = true;
            },
            onMouseUp: function(event){
                ship.engineOn = false;
            }
        },this)

````
 - 今までと異なり、リスナーを変数として宣言してから呼び出すのではなく、その場で直接リスナーを追加していますが、基本的に今までと違いはありません。  
 - 今回はマウスのイベントを取り扱うため `cc.EventListener.MOUSE`のイベントを定義します。  
 - マウスをクリック中には `onMouseDown` イベントが発生し、マウスボタンを離したときは、`onMouseUp`イベントが発生します。  
 - ここで、両方のイベントでshipオブジェクトのengineOn属性を制御することで宇宙船のエンジンのON/OFFを切り替えます。  

#### engineOn属性をどう扱うか

ctorコンストラクタで　`engineOn`　を　falseで初期化  
```
  this.engineOn = false; //カスタム属性追加　宇宙船のエンジンのON OFF
},
```
update時に、`engineOn`によって`gameThrust`を`ySpeed`に加算するかどうか判断する  
```
if(this.engineOn){
  this.ySpeed += gameThrust;
}
```

## 6.小惑星を追加する
背景がスクロールすることにより、宇宙船はが左から右に飛んでいるように見せているので、小惑星がゲームの画面の右から突入しているように画面に追加する。  
小惑星の突入アニメーションは、背景のスクロールと同じように、いくつかの小惑星の画像を画面の右に配置し、左に向かって動かすことで表現が可能ですが、今回は、「アクション」というスプライトの動きを制御する方法を習得します。  

#### その1　小惑星の生成

```
//小惑星クラス
var Asteroid = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile(res.asteroid_png);
  },
  onEnter: function() {
    this._super();
    this.setPosition(600, Math.random() * 320);
    // #####　ここに注目!!
    var moveAction = cc.MoveTo.create(2.5, new cc.Point(-100, Math.random() * 320));　
    this.runAction(moveAction);
    this.scheduleUpdate();
  },
  update: function(dt) {
    if (this.getPosition().x < -50) {
      gameLayer.removeAsteroid(this)
    }
  }
});
```
 - いままでと同じく、ctorコンストラクタでは、画像を読み込んでいます。  
 - `onEnter`関数では、まず、小惑星を画面の右端にランダムな高さで配置しています。`this.setPosition(600, Math.random() * 320);`  
 - 次の行　`var moveAction = cc.MoveTo.create(2.5, new cc.Point(-100, Math.random() * 320));　` は小惑星のアニメーションの移動アクションで、2.5秒後に、画面左方向のy座標ランダムな位置に移動するものです。  
 - アクションを作成したら、`this.runAction(moveAction);`で実行させます。
 - 最後にスケジュール呼び出しを行って、画面の左側から外に出た小惑星を削除しています。
 ```
 this.scheduleUpdate();
},
update: function(dt) {
  //画面の外に出たら
 if (this.getPosition().x < -50) {
   //gameLayerの関数で削除する
   gameLayer.removeAsteroid(this)
 }
}
});
```  

## 6.小惑星と宇宙船の衝突判定を行う
今回のようなシンプルなゲーム作成において、２つのスプライトが重なっているかどうかを判定するための最も簡単な方法は、矩形による判定です。矩形による判定とは、スプライトの矩形の境界線が交わっているかどうかをチェックするという方法です。  
この場合、画像ﾌｧｲﾙは対象の画像だけが含まれる最小の長方形となっていることが必要です。  
この衝突判定には、以下(isuues #1　で画像を掲載)の３つのケースでの判定がなされます。  
ケース1.矩形交わらないので、衝突していません。  
ケース2.矩形が交わっており、衝突しています。  
ケース3.矩形が交わっているが、透明部分が重なっているのみで、衝突していません。  

洗練された衝突判定では、ケース3.のように矩形が交差していてもピクセル単位で衝突判定を行うことがプログラミングによって可能ですが、ここではそのようなハイレベルな衝突判定はおこないません。  
矩形による衝突判定のみを使う場合にケース3.のような状況を避けたいときは、スプライトをできるだけ長方形に近い形にすることや、元の画像より小さい矩形で衝突判定を行うことが有効です。  また、プレイヤーも衝突を回避することを願っているので、そのまま矩形による衝突判定をするよりも、多少回避よりの判定にするほうが好ましいです。  

  小惑星のupdate関数での衝突判定のコード

```
update: function(dt) {
  //小惑星との衝突を判定する処理
  var shipBoundingBox = ship.getBoundingBox();
  var asteroidBoundingBox = this.getBoundingBox();
  //rectIntersectsRectは２つの矩形が交わっているかチェックする
  if (cc.rectIntersectsRect(shipBoundingBox, asteroidBoundingBox) ) {
    gameLayer.removeAsteroid(this);//小惑星を削除する
    restartGame();
  }
  //画面の外にでた小惑星を消去する処理
  if (this.getPosition().x < -50) {
    gameLayer.removeAsteroid(this)
  }
}
});

```  
- getBoundingBox 関数はそのスプライトの矩形を返却します。
- rectIntersectsRect　関数は２つの矩形が交わっているかどうかをチェックします。
- 衝突が判定されたら`gameLayer.removeAsteroid(this);`で、衝突した小惑星を消去します。
- そのあと、restartGame();関数を呼んで、宇宙船の変数を初期化します。

```
//宇宙船を元の位置に戻して、宇宙船の変数を初期化する
function restartGame(){
  ship.ySpeed = 0;
  ship.setPosition(ship.getPosition().x,160);
  ship.invulnerability=100;
}

```
この方法を実装すると、ゲームがリセットされて宇宙船が初期位置に戻ったときに運悪く小惑星が正面に飛んできていたら、ゲームが始まったとたんにまたゲームオバーです。これでは洗練されたゲームとはいえませんので、一般的なゲームリセット時によく使われる一定時間の無敵モードを実装しましょう。  

## 7.無敵モードの実装
まず、Shipクラスのctorコンストラクタに、無敵モードの時間属性（`invulnerability`）を追加します。  
  `this.invulnerability = 0;`  
`invulnerability`は、小惑星と衝突しないときは0ですが、衝突が発生すると
restartGame()で `ship.invulnerability=100;`と100に設定されます。
```
function restartGame(){
    ship.ySpeed = 0;
    ship.setPosition(ship.getPosition().x,160);
    ship.invulnerability=100;//無敵モード時間
}
  ```
また、衝突判定の処理にも、この`invulnerability`を利用して衝突が発生していないときのみ（`invulnerability`が0）に衝突判定を行うようにします。
```
  if(cc.rectIntersectsRect(shipBoundingBox,asteroidBoundingBox)&&ship.invulnerability==0){
```
これによって、`invulnerability`が０より大きな値になっている間は、宇宙船は小惑星と衝突して破壊されないことになります。  
一般的に無敵モード中の自機は半透明な表示や半透明で点滅表示がなされることが多いですね。これは、プレイヤーに無敵モード中であることをお知らせするためのゲームシステムからの視覚的なフィードバックです。  
shipクラスのupdate関数に次の2行を追加しましょう。  
```
    if(this.invulnerability>0){
          this.invulnerability ;
          this.setOpacity(255- this.getOpacity());
      }
```  

### 8.宇宙船が画面から飛び出すことを防止する
### 9.パーティクルを追加する
最後に、画面外に宇宙船が飛び出すことを防止します。マウスをずっと押していたり、ずっと離していたりしていると、宇宙船は画面の上や下からそのまま外に出てしまいます。  
この対処としては、画面外に出てしまった場合には、宇宙船が破壊されたことにします。  shipクラスに次のコードを追加します。

```　
this.ySpeed += gameGravity;

//宇宙船が画面外にでたら、リスタートさせる追加コード
if (this.getPosition().y < 0 || this.getPosition().y > 320) {
  restartGame();
}
```

## 9.パーティクルを追加する
パーティクルはゲームに臨場感を与える重要なエフェクトです。  　　
パーティクルを作るには、cocosと互換性がある　「particle2dx」やもちろん「Cocos　Studio」を利用するのがいいでしょう。  
まず、新しいグローバル変数を追加します。
 ```
var emitter;
```
パーティクルエミッタをgameのinit関数で作成して設定します。
```
        this.addChild(ship);
        //ここから
        emitter = cc.ParticleSun.create();
        this.addChild(emitter,1);
        var myTexture = cc.textureCache.addImage(res.particle_png);
        emitter.setTexture(myTexture);
        emitter.setStartSize(2);
        emitter.setEndSize(4);
```
これは、サン・エフェクトといって太陽のまぶしさのエフェクトです。  
画像の設定と、開始時、終了時のサイズを設定しています。  
このエフェクトをshipクラスのupdateY関数に設定し、宇宙船のエンジンが動作しているときのみエフェクトが見えるようにします。
```
if (this.engineOn) {
  this.ySpeed += gameThrust;
  //ここでパーティクルエフェクトを宇宙船のすぐ後ろに配置している
  emitter.setPosition(this.getPosition().x - 25, this.getPosition().y);
} else {
  //エンジンOffのときは画面外に配置
  emitter.setPosition(this.getPosition().x - 250, this.getPosition().y);
}
```
### 課題画像とBGMとSEを追加した
res2フォルダの中に　`res2.zip`があるのでダウンロードして解答
resフォルダでは`bgm_main.mp3`、`se_surprize.mp3`を追加したのでダウンロードすること

### BGMと効果音の再生
グローバル変数にオーディオエンジンオブジェクトを保管するための変数`audioEngine`を定義しましょう。   
```
var emitter;
//オーディオ再生エンジン
var　 audioEngine;
```
次に　gameScene　で　オーディオ再生エンジン`audioEngine`をインスタンスします  
```
//音楽再生エンジン
audioEngine = cc.audioEngine;
```
その次には、BGMを再生する関数　`playMusic(res.bgm_main, true);`を実行します。  
第2引数のtrueはループ再生をonにするという意味です。
```
//bgm再生されていないなら再生する
if (!audioEngine.isMusicPlaying()) {
  //audioEngine.playMusic("res/bgm_main.mp3", true);
  audioEngine.playMusic(res.bgm_main, true);
}
```
小惑星に衝突したときには、効果音を再生します。  
`audioEngine.playEffect(res.se_bang);`  

さらに、bgmの再生を一時ストップします。
```
if (audioEngine.isMusicPlaying()) {
  audioEngine.stopMusic();
}
```

```
if (cc.rectIntersectsRect(shipBoundingBox, asteroidBoundingBox) && ship.invulnerability == 0) {
  gameLayer.removeAsteroid(this); //小惑星を削除する

  //効果音を再生する
//  audioEngine.playEffect("res/se_bang.mp3");
  audioEngine.playEffect(res.se_bang);
  //bgmの再生をとめる
  if (audioEngine.isMusicPlaying()) {
    audioEngine.stopMusic();
  }
  restartGame();
}
```
その後　`restartGame()`関数でレジューム再生します。
```
function restartGame() {
  ship.ySpeed = 0;
  ship.setPosition(ship.getPosition().x, 160);
  ship.invulnerability = 100;
  //bgmリスタート
  if (!audioEngine.isMusicPlaying()) {
    audioEngine.resumeMusic();
  }
}
```
音楽を再生する関数はほかにも様々ありますので試してみましょう。

//BGMを鳴らす
```
if (audioEngine.isMusicPlaying()) {
  audioEngine.playMusic(URL, true);
}
```
//BGMを止める
```
if (audioEngine.isMusicPlaying()) {
  audioEngine.stopMusic();
}
```
//BGMを再生をリスタートする
```
if (!audioEngine.isMusicPlaying()) {
  audioEngine.resumeMusic();
}
```

//効果音を再生する
```
  audioEngine.playEffect(URL);
```
//効果音のボリュームを上げる
```
  audioEngine.setEffectsVolume(audioEngine.getEffectsVolume() + 0.3);
  audioEngine.setEffectsVolume(audioEngine.getEffectsVolume() - 0.3);
```
//bgmのボリュームを上げる・下げる
```
  audioEngine.setMusicVolume(audioEngine.getMusicVolume() + 0.1);
  audioEngine.setMusicVolume(audioEngine.getMusicVolume() - 0.1);
```



## 夏休みの課題
海底が名古屋湾で、前方から名古屋名物が流れてくるので、エビフライ操作して、キャッチするゲームを作成しなさい。  
時々出てくる　障害物（ピンクのサンゴ）に3回ぶつかったらゲームオーバー  
スコアを表示させて　名古屋名物をキャッチしたらポイントUPさせる
名古屋名物によっては、重くなる、ポイントがあがる、画面外に押し出されるなどのオプションも考えください。  
ゲームのオープニング画面、リザルト画面を実装してください。  
`title.png`はオープニングロゴの例です。  

背景のスクロールのルールは以下のとおり。  
- ゲーム背景のスプライト `background.png` が最も奥でゆっくりスクロールする  
- 背景用スプライトの前に岩山（`rock_above.png`と`rock_under.png`）を上と下に設置され、背景より多少早くスクロールする。  
- さらに、手前に天井と地面の小石（`ceiling.png`と`land.png`)が岩山より多少早いスピードでスクロールする。  

サンゴにぶつかったとき、地面にぶつかったときはエフェクトを出すとよい  
（option）特別な名古屋名物をgetしたときもエフェクト出すとよいね  

（option）エビちゃんが上下するときは、ときどき泡(`awa.png`)がでると視覚効果がある  

エフェクトは自分で作る  
Webサイトは [particle2dx](http://particle2dx.com/)  
使い方は、　[particle2dxで作成したエフェクトをcocos2d-JSで再生する](http://blog.bokuweb.me/entry/2015/05/01/214055)  
