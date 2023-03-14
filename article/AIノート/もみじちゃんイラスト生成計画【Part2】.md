[[もみじちゃんイラスト生成計画【Part1】]]に引き続き、AIイラスト(Stable Diffusion)について探索していく。
今回は、
- 従来のモデルで生成可能な解像度(512x512)より大きな画像を生成する。
- 背景付きのハイクオリティな画像を生成する
この２つを目標にして行きたい。

## クオリティーの高い背景イラストを生成する
前回、もみじちゃんのイラストを生成した際に発見したので、([[もみじちゃんイラスト生成計画【Part1】#モデルがあった]])それをベースに背景の生成が得意なモデルをmergeすれば達成できそうだと思っている。

## LoRAを試す
既にもみじちゃんのイラストを生成できてるので~~あんまり意義を感じない~~ものの、最近よく聞くので試してみる。

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

もっと精度を上げるために総エポック数80で生成してみる。


![[../imgs/00038-4158102242.png]]
きたー！Weight0.6くらいで良い感じのイラストが生成できた
もうちょっと調整してみたい