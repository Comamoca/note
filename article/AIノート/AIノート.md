実際にAIをチューニングする工程は[[もみじちゃん専用モデル育成計画]]に書いていく。

Anythingv4 Google Colab

Github:
https://github.com/camenduru/stable-diffusion-webui-colab

Anythingはどの世代でも比較的淡い色が特徴。しかしネガティブプロンプトである程度抑えることができる。以下はイラストの歪み防止も兼ねたネガティブプロンプト
```
(((Blurry Eyes))), (((bad anatomy))), ((disabled body)), ((deformed body)), ((missing finger)), ((mutant hands)), ((more than five fingers)), badly drawn hands, lack of detail, (((Low resolution))), ((bad hands)), ((text)), error, cropped, low-quality image, normal quality, jpeg artifacts, signature, watermark, username, blurry, lack of details in the image, cut off
```
このネガティブプロンプトと`girl`というプロンプトを使って以下の様な画像を生成できた。
![[Pasted image 20230307131436.png]]

# ファインチューニングとは

ファインチューニングとは、既存の学習済みモデルに出力との誤差をネットワークに逆向きにフィードバックする形で重みを更新する手法で、既存のモデルに特定の絵柄を出させるのにもってこいの技術だ。それをより容易にする技術が、**DreamBooth**だ。

## DreamBooth

DreamBoothとは**たった数枚の画像で**ファインチューニングが出来る技術だ。
これにより既存のモデルをより容易にカスタマイズ出来る。
DreamBoothのGUIが[Gituhub上](https://github.com/smy20011/dreambooth-gui)にあるので、それを使っていく。

DreamBoothについて調べてたら、たった**1枚の画像で**DreamBoothと同等の動作をするものを見つけてしまった。**その名もDreamArtist**これはぜひAnythingで使ってみたい。