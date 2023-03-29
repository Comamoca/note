## 実行コマンド

rem ----LoRA学習起動バッチ------------------------------------------------------
rem 学習対象のフォルダ内に置いて使用する
rem 10_AAA, 5_BBBフォルダがある場所の一つ上
rem 動作確認環境はメモリ48GB、VRAM12GBのPCを使用しているため
rem パフォーマンスモニターでメモリの使用状況をみながら
rem 各設定を少なめの数値から初めて動作確認してください
rem 以下のデフォルト設定は使用メモリ22GB、VRAM7.8GBで動作しました
rem SD-Scripts 2023/2/22版対応 rem 2023/02/23更新
rem オプティマイザー変更について追記
rem 2023/02/01更新
rem ファインチューン対応
rem 2023/01/31更新
rem --lr_scheduler_num_cyclesオプション対応
rem --lr_warmup_stepオプション対応
rem 2023/01/25更新
rem --network_alphaオプション対応
rem 2023/01/18更新
rem 個別学習レート対応
rem 2023/01/17更新
rem sd-scripts23/01/15版の新オプション使用(必要ならgit pullしてください)
rem 正則化対応 setlocal enabledelayedexpansion

rem ----ここから自分の環境に合わせて書き換える----------------------------------
rem sd-scriptsの場所 set sd_path="X:\stable-diffusion\sd-scripts"
rem 学習のベースモデルファイル
rem fp32よりもfp16の方が消費VRAMを抑えられるので推奨
set ckpt_file="X:\stable-diffusion\stable-diffusion-webui\models\Stable-diffusion\xxxx.ckpt"
rem 学習のベースVAE(必須ではないので使用しない場合は--vae=...の行を削除)
set vae_file="X:\stable-diffusion\stable-diffusion-webui\models\VAE\[http://xxxx.vae.pt](https://t.co/P0HRRgjIIx)"
rem 学習画像フォルダ このフォルダ内に10_AAAなどのフォルダが入っていること set image_path="X:\data\traning"
rem 正則化画像フォルダ(必須ではないので使用しない場合は reg_path="" とすること)
set reg_path=""
rem set reg_path="X:\data\reg"
rem メタデータjsonファイル(このファイルを指定するとファインチューン動作になり、json_file="" で従来のDBになる)
set json_file=""
rem set json_file="X:\data\marge_clean.json"
rem ファインチューンでのリピート数を指定 DBでのフォルダ名の数字は無視される set ft_repeats=1 rem 学習結果の出力先
set output_path="X:\stable-diffusion\stable-diffusion-webui\extensions\sd-webui-additional-networks\models\lora"
rem 学習結果のファイル名
set file_prefix="last"
rem 学習パラメータ
set learning_rate=1e-3
rem 学習開始時にlearning_rateが指定値に到達するまでのステップ数 デフォルトは0
set lr_warmup=0
rem 個別の学習パラメータ デフォルトにしたい場合は全て上のlearning_rateと同じ値にする set text_encoder_lr=1.5e-4
set unet_lr=1.5e-3
rem epoch数と何epochごとに保存するかの設定 1epoch=全フォルダの(画像数xループ数)の合計 set num_epochs=2
set save_every_n_epochs=1
rem スケジューラー 以下の文字列から選択: linear, cosine, cosine_with_restarts, polynomial, constant, constant_with_warmup
rem どれがベストかは要検証
set scheduler="cosine_with_restarts"
rem cosine_with_restartsのリスタート回数 デフォルトは1
set scheduler_option=1
rem 次元数 デフォルトは1 大きくすると学習能力が上がるが出力ファイルサイズが大きくなる set network_dim=8
rem アンダーフローを防ぐための値 デフォルトは1
rem これによって計算結果がnetwork_alpha/network_dimとなって学習量が小さくなるため
rem learning_rateの方を大きくすることでバランスを取るといい
set network_alpha=1
set clip_skip=2
set seed=23

rem =========================================================================

rem VRAMなど環境に影響されるパラメーター 余裕があれば増やすと速度や精度が改善
rem CPUスレッド数 CPUのコア数がいいらしい
rem 増やすと生成速度が上がる代わりにメインメモリの消費が増えるので
rem メモリ32GBの人はCPUのコア数よりも減らした方が安定するかも
set cpu_thread=4 rem データローダーのワーカー数
rem デフォルトは8、減らすとメインメモリの使用量が減り、学習時間が増加
set workers=4 rem バッチサイズ: 増やすと計算が早く終わるがVRAM消費が増える
set train_batch_size=1 rem 学習素材の解像度: 大きくすると細部まで学習するが消費VRAMが増える
rem VRAM12GBなら768くらいまで増やせる
set resolution=512,512
rem 最小、最大バケットサイズ: 画像が正方形でなくてもresolutionの面積を超えない範囲で rem 縦長、横長の画像も扱えるのでresolutionを増やしたらmax_bucketも合わせて増やすといい set min_bucket=320 set max_bucket=960

rem =========================================================================

rem ----書き換えここまで--------------------------------------------------------
set train_mode="" if %json_file%=="" (
rem DBモード if %reg_path%=="" (
set train_mode=--train_data_dir=%image_path% ) else ( set train_mode=--train_data_dir=%image_path% --reg_data_dir=%reg_path% ) ) else ( rem ファインチューンモード set train_mode=--train_data_dir=%image_path% --in_json=%json_file% --dataset_repeats=%ft_repeats% )

rem 学習実行 cd /d
%sd_path% call venv\Scripts\activate.bat & call :main & pause & exit :main 

accelerate launch --num_cpu_threads_per_process %cpu_thread% train_network.py
--network_module=networks.lora
--pretrained_model_name_or_path=%ckpt_file%
%train_mode%
--output_dir=%output_path%
--caption_extension=".txt"
--shuffle_caption
--prior_loss_weight=1
--resolution=%resolution%
--enable_bucket
--bucket_no_upscale
--min_bucket_reso=%min_bucket%
--max_bucket_reso=%max_bucket%
--train_batch_size=%train_batch_size%
--learning_rate=%learning_rate%
--lr_warmup_steps=%lr_warmup%
--text_encoder_lr=%text_encoder_lr%
--unet_lr=%unet_lr%
--max_train_epochs=%num_epochs%
--mixed_precision="fp16"
--save_precision="fp16"
--xformers
--max_data_loader_n_workers=%workers%
--save_every_n_epochs=%save_every_n_epochs%
--save_model_as=safetensors
--output_name=%file_prefix%
--clip_skip=%clip_skip%
--seed=%seed%
--network_dim=%network_dim%
--network_alpha=%network_alpha%
--max_token_length=150
--cache_latents
--lr_scheduler=%scheduler%
--lr_scheduler_num_cycles=%scheduler_option%
--vae=%vae_file%
--use_8bit_adam exit

rem ※オプションの追加、削除時は^記号に注意
rem 最後の行には^は付けずにそれ以外は ^(半角スペースと^)を付ける rem オプティマイザーを変更する方法
rem --use_8bit_adamの行を--optimizer_type="AdaFactor"に置き換える
rem ただし、消費VRAMが増えるためギリギリの環境では動かなくなる可能性があります
rem オプティマイザーに対する設定の--optimizer_argsは必須ではないので興味のある人は公式gのReadme参照
rem その他よく使いそうな追加オプション
rem --keep_tokens=数値
rem トークンのシャッフルを有効にした際にシャッフルから除外するトークン
rem 公式によればトークン数はカンマで区切られた１ワード単位(usada,hikaruなら2トークン) rem webuiのトークンの概念とは異なるようなので注意(webuiではusadaはusa daと分けられて2トークン)
rem --no_metadata
rem メタデータを記録しない
rem --training_comment=""
rem コメントを埋め込む

load this model, couldn't find it in the cached files and it looks like is not the path to a directory containing a file named diffusion_pytorch_model.bin or Checkout your internet connection or see how to run the library in offline mode at '[https://huggingface.co/docs/diffusers/installation#offline-mode](https://t.co/KHAvrYAdCu)'. raise subprocess.CalledProcessError(returncode=process.returncode, cmd=cmd) subprocess.CalledProcessError: Command '['D:\\sd-scripts\\venv\\Scripts\\python.exe', 'train_network.py',
'--network_module=networks.lora',
'--pretrained_model_name_or_path=D:\\stable-diffusion-webui\\models\\Stable-diffusion\\AbyssOrangeMix2_hard (2).safetensors',
'--train_data_dir=D:\\stable-diffusion-webui\\LoRA_Easy_Training_Scripts\\Data\\traning',
'--output_dir=D:\\stable-diffusion-webui\\extensions\\sd-webui-additional-networks\\models\\lora',
'--caption_extension=.txt',
'--shuffle_caption',
'--prior_loss_weight=1',
'--resolution=512,512',
'--enable_bucket',
'--bucket_no_upscale',
'--min_bucket_reso=320',
'--max_bucket_reso=960',
'--train_batch_size=1',
'--learning_rate=1e-3',
'--lr_warmup_steps=0',
'--text_encoder_lr=1.5e-4',
'--unet_lr=1.5e-3',
'--max_train_epochs=1',
'--mixed_precision=fp16',
'--save_precision=fp16',
'--xformers',
'--max_data_loader_n_workers=4',
'--save_every_n_epochs=1',
'--save_model_as=safetensors',
'--output_name=RyuLion',
'--clip_skip=2',
'--seed=23',
'--network_dim=32',
'--network_alpha=32',
'--max_token_length=150',
'--cache_latents',
'--lr_scheduler=cosine_with_restarts',
'--lr_scheduler_num_cycles=1',
'--vae=',
'--use_8bit_adam']' returned non-zero exit status 1. 続行するには何かキーを押してください . . .

返信遅れて申し訳ありません。

調べてみたところ、

・エラーメッセージの内容としてはStable Diffusionで使われるTransformers(テキストエンコーダ)のモデル？がダウンロードできないというものらしいです。
エラーメッセージにもあるように、Transformersをオフラインモードで動かせば改善するかもしれません。

以下引用)
環境変数`TRANSFORMERS_OFFLINE`に`1`を設定するとTransformersはオフラインモードとなり、インターネットを通してのモデルのダウンロードを行わなくなります。

引用元: https://qiita.com/suzuki_sh/items/0b43ca942b7294fac16a#transformers%E3%81%AE%E3%82%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89

・issueを検索してみたところ同様の問題が見つからなかった(あるいはまだ報告されていない)ので、LoRA_Easy_Training_Scriptsの問題では無い、と考えています。

・もしraise EnvironmentError～のくだりの前にエラー出力されていたのなら、それが原因のヒントになりそうな気がします。

自分の方でもLoRA_Easy_Training_Scriptsを使っていますが、その手の問題は発生していないので、環境依存のトラブルな可能性があります。もしまだ解決してないようなのならAI絵作り研究会(https://discord.com/invite/ai-art)など、人数が多いコミュニティで質問してみるのも良いかもしれません。

時間がかかった割にあまり参考になりそうな答えを返せずすみません...