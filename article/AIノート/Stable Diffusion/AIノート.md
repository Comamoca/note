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
![[../../imgs/Pasted image 20230307131436.png]]

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
```
white background, simple background
```
と入力する。

## 漫画風のイラスト
`megazine`で出てくる。おにまいモデルだけなのかもしれない。

## ポートレート風
`depth of field`を指定すると、背景がぼやけるようなイラストが生成できる。Counterfrltv2で確認

((masterpiece,best quality)),1girl, solo, animal ears, fox, barefoot, knees up, school uniform, sitting, fox ears, short sleeves, looking at viewer, bed, short hair, smile, golden brown hair, puffy sleeves, bedroom, puffy short sleeves, bangs, on bed, full body, animal, white dress, sunlight, brown eyes, dappled sunlight, day, depth of field

EasyNegative, extra fingers,fewer fingers,  extra legs,fewer legs,fewer fingers,  extra arms, fewer arms,

```
accelerate launch --num_cpu_threads_per_process 1 train_network.py \
    --pretrained_model_name_or_path=/notebooks/Counterfeit-V2.5_fp16.safetensors \
    --dataset_config=/notebooks/LoRA/config.toml \
    --output_dir=/notebooks/LoRA/output  \
    --output_name=HozukiMomiji-Counterfeit-V2.5 \
    --save_model_as=safetensors \
    --prior_loss_weight=1.0 \
    --max_train_steps=400 \
    --learning_rate=1e-4 \
    --optimizer_type="AdamW8bit" \
    --xformers \
    --mixed_precision="fp16" \
    --cache_latents \
    --gradient_checkpointing \
    --save_every_n_epochs=1 \
    --network_module=networks.lora
```

```
[general]
enable_bucket = true                        # Aspect Ratio Bucketingを使うか否か

[[datasets]]
resolution = 512                            # 学習解像度
batch_size = 4                              # バッチサイズ

  [[datasets.subsets]]
  image_dir = '/notebooks/LoRA/train_HozukiMomiji/'                     # 学習用画像を入れたフォルダを指定
  class_tokens = 'HozukiMomiji girl'                # identifier class を指定
  num_repeats = 10                          # 学習用画像の繰り返し回数
```

```
accelerate launch --num_cpu_threads_per_process 12 train_network.py --pretrained_model_name_or_path=/notebooks/Counterfeit-V2.5_fp16.safetensors --train_data_dir=/notebooks/LoRA/train_HozukiMomiji --output_dir=/notebooks/LoRA/output --resolution=320,960 --train_batch_size=4 --learning_rate=8e-5 --max_train_epochs=10 --save_every_n_epochs=1 --save_model_as=safetensors --clip_skip=2 --seed=42 --color_aug --network_module=networks.lora --keep_tokens=7 --enable_bucket
```

```


```

```python
```
