実際にAIをチューニングする工程は[[もみじちゃんイラスト生成計画【Part1】]]に書いていく。
こちらにはAIに関する断片的な知識を書いていく。

Anythingv4 Google Colab

Github:
https://github.com/camenduru/stable-diffusion-webui-colab

Anythingはどの世代でも比較的淡い色が特徴。しかしネガティブプロンプトである程度抑えることができる。以下はイラストの歪み防止も兼ねたネガティブプロンプト
```
(((Blurry Eyes))), (((bad anatomy))), ((disabled body)), ((deformed body)), ((missing finger)), ((mutant hands)), ((more than five fingers)), badly drawn hands, lack of detail, (((Low resolution))), ((bad hands)), ((text)), error, cropped, low-quality image, normal quality, jpeg artifacts, signature, watermark, username, blurry, lack of details in the image, cut off
```

このネガティブプロンプトと`girl`というプロンプトを使って以下の様な画像を生成できた。
![[../imgs/Pasted image 20230307131436.png]]

# ファインチューニングとは

ファインチューニングとは、既存の学習済みモデルに出力との誤差をネットワークに逆向きにフィードバックする形で重みを更新する手法で、既存のモデルに特定の絵柄を出させるのにもってこいの技術だ。それをより容易にする技術が、**DreamBooth**だ。

## DreamBooth

DreamBoothとは**たった数枚の画像で**ファインチューニングが出来る技術だ。
これにより既存のモデルをより容易にカスタマイズ出来る。
DreamBoothのGUIが[Gituhub上](https://github.com/smy20011/dreambooth-gui)にあるので、それを使っていく。

DreamBoothについて調べてたら、たった**1枚の画像で**DreamBoothと同等の動作をするものを見つけてしまった。**その名もDreamArtist**これはぜひAnythingで使ってみたい。

## Diffusers
Stable Diffusionのモデルを使った画像生成などをしやすくしているライブラリ。
使えるモデルと使えないモデルがあって、使えるモデルは[ここ](https://huggingface.co/models?other=stable-diffusion)から確認できる。

## SukiyakiMix
Vすき焼きさんが作ったモデル。

## イラスト内での姿勢の指定
https://gamedev65535.com/entry/prompot_position/#i-4

## Automatic1111のモデル格納場所が違っている
`/content/stable-diffusion-webui/stable-diffusion-webui/stable-diffusion-webui/models/Stable-diffusion`

何故にこんなにネストしてるんだろう→同じディレクトリ内でcloneとcdを繰り返していたからだった

## 単色の背景
画像編集をする際には単色の背景が扱いやすい。それを実現するには、
```Prompt
white background, simple background
```
と入力する。

## 漫画風のイラスト
`megazine`で出てくる。おにまいモデルだけなのかもしれない。


