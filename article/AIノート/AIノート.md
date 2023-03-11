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


## LoRAを試す

LoRAのtrain_scriptに入っている`train_lora_dreambooth.py`のオプション
```
usage: train_lora_dreambooth.py
       [-h]
       --pretrained_model_name_or_path
       PRETRAINED_MODEL_NAME_OR_PATH
       [--pretrained_vae_name_or_path PRETRAINED_VAE_NAME_OR_PATH]
       [--revision REVISION]
       [--tokenizer_name TOKENIZER_NAME]
       --instance_data_dir
       INSTANCE_DATA_DIR
       [--class_data_dir CLASS_DATA_DIR]
       --instance_prompt
       INSTANCE_PROMPT
       [--class_prompt CLASS_PROMPT]
       [--with_prior_preservation]
       [--prior_loss_weight PRIOR_LOSS_WEIGHT]
       [--num_class_images NUM_CLASS_IMAGES]
       [--output_dir OUTPUT_DIR]
       [--output_format {pt,safe,both}]
       [--seed SEED]
       [--resolution RESOLUTION]
       [--center_crop]
       [--color_jitter]
       [--train_text_encoder]
       [--train_batch_size TRAIN_BATCH_SIZE]
       [--sample_batch_size SAMPLE_BATCH_SIZE]
       [--num_train_epochs NUM_TRAIN_EPOCHS]
       [--max_train_steps MAX_TRAIN_STEPS]
       [--save_steps SAVE_STEPS]
       [--gradient_accumulation_steps GRADIENT_ACCUMULATION_STEPS]
       [--gradient_checkpointing]
       [--lora_rank LORA_RANK]
       [--learning_rate LEARNING_RATE]
       [--learning_rate_text LEARNING_RATE_TEXT]
       [--scale_lr]
       [--lr_scheduler LR_SCHEDULER]
       [--lr_warmup_steps LR_WARMUP_STEPS]
       [--use_8bit_adam]
       [--adam_beta1 ADAM_BETA1]
       [--adam_beta2 ADAM_BETA2]
       [--adam_weight_decay ADAM_WEIGHT_DECAY]
       [--adam_epsilon ADAM_EPSILON]
       [--max_grad_norm MAX_GRAD_NORM]
       [--push_to_hub]
       [--hub_token HUB_TOKEN]
       [--logging_dir LOGGING_DIR]
       [--mixed_precision {no,fp16,bf16}]
       [--local_rank LOCAL_RANK]
       [--resume_unet RESUME_UNET]
       [--resume_text_encoder RESUME_TEXT_ENCODER]
       [--resize RESIZE]
       [--use_xformers]
```

なかなかオプション指定がうまくいかないと思ったら、`accelerat`のオプションとスクリプトのオプションがまぜこぜになってたかららしい。あとGPUが有効になってなかった...

ちなみに[kohya-trainer](https://github.com/Linaqruf/kohya-trainer)の[kohya-LoRA-dreambooth](https://colab.research.google.com/github/Linaqruf/kohya-trainer/blob/main/kohya-LoRA-dreambooth.ipynb)ノートブックを使うと簡単にLoRAを使った学習が出来るので便利。
使い方はこの[動画](https://www.youtube.com/watch?v=OzDW0_sCwEw)が分かりやすい。

エポックとバッチ数は10x4で試したところうまく行った。実行時のメモリの消費量はバッチ、実行時間はエポック数に左右される。つまり学習時のメモリを増やさずステップ数を増やしたいならエポック数を増やすといい。

Anythingv3で学習用画像27枚、総エポック30、バッチ数4で学習したモデルで生成したところこの様になった。
![[../imgs/Pasted image 20230312074518.png]]
