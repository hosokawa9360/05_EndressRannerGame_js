### エンドレスランナーゲーム　宇宙船を操作し、危険な小惑星を避けるゲーム —

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
