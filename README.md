### エンドレスランナーゲーム　宇宙船を操作し、危険な小惑星を避けるゲーム —

#### first commit　　横向きの解像度に変更  
- resouce.jsを編集  
- resに画像を追加  
- 横向きの解像度に変更  

### ラベルを移動させる  

var mylabel;  

mylabel = cc.LabelTTF.create("Label", "Arial", "32");  
mylabel.setPosition(size.width / 2, size.height / 2);  
this.addChild(mylabel);  

//scheduleUpdate関数により、update関数がゲーム表示が更新されるたびに、実行される

**  this.scheduleUpdate(); **  
  },  

//update関数
  update: function(dt) {  

```
    //ラベルの位置を更新している  
```
    mylabel.setPosition(mylabel.getPosition().x - 5, mylabel.getPosition().y);

	```
//ラベルのｘ位置が０未満になったら、反対の位置に移動させる  
```

    if (mylabel.getPosition().x < 0) {  
      var size = cc.director.getWinSize();  
      mylabel.setPosition(size.width, mylabel.getPosition().y);  
    }  
  }  
});  
