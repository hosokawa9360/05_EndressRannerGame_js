### エンドレスランナーゲーム　宇宙船を操作し、危険な小惑星を避けるゲーム —

#### first commit　　横向きの解像度に変更  
- resouce.jsを編集  
- resに画像を追加  
- 横向きの解像度に変更  

### ラベルを画面中央に表示
`　size = cc.director.getWinSize();　　`
`　mylabel = cc.LabelTTF.create("GO!", "Arial", "32");　　`
`　mylabel.setPosition(size.width / 2, size.height / 2);　　`
`　this.addChild(mylabel);  　　`
