PaperSpaceとは、月額定額制でGPUが使えるクラウドサービスです。
安価に構成なGPUが使えるのでイラストAIを使っている人に人気があります。

## pyenvのインストール

xformersを使用する際にPythonのバージョンを変更する必要があるのでインストールします。
以下のコマンドを実行してpyenvをインストールします。
`curl https://pyenv.run | bash`

出力の最後に以下のようなメッセージが出力されるはずです。
```
WARNING: seems you still have not added 'pyenv' to the load path.

# Load pyenv automatically by appending
# the following to 
~/.bash_profile if it exists, otherwise ~/.profile (for login shells)
and ~/.bashrc (for interactive shells) :

export PYENV_ROOT="$HOME/.pyenv"
command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"

# Restart your shell for the changes to take effect.

# Load pyenv-virtualenv automatically by adding
# the following to ~/.bashrc:

eval "$(pyenv virtualenv-init -)"
```

その後に次のコマンドを実行します。
このコマンドで上のメッセージに書いてある事を行えました。
```
cat << 'EOF' >> ~/.bashrc

export PYENV_ROOT="$HOME/.pyenv"
command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
EOF
```

設定を適用させるために、下のコマンドを実行してください。
`source ~/.bashrc`

このコマンドを実行して、pyenvがインストールされているか確認してください。
`pyenv --version`

pyenvがインストールされているのを確認したら、以下のコマンドでPython3.10をインストールして使えるようにします。
```
pyenv install 3.10
pyenv global 3.10.10
```

## jupyter kernelのインストール
Python3.10がターミナルで使えるようになってもJupyter側では使えるようになっていないので、Python3.10環境にJupyterのカーネルをインストールします。

```
# Python3.10
pip install ipykernel
```

LoRAの導入からやり直したい人向けのスニペット
```
cd /notebooks/
rm -r LoRA
```

LoRAの学習環境のセットアップ
```
mkdir LoRA
cd LoRA
apt update -y && sudo apt upgrade -y
git clone https://github.com/kohya-ss/sd-scripts.git
git clone https://github.com/derrian-distro/LoRA_Easy_Training_Scripts.git

cd sd-scripts
apt -y install python3.10
pip install torch==1.12.1+cu116 torchvision==0.13.1+cu116 torchaudio==0.12.1 --extra-index-url https://download.pytorch.org/whl/cu116
pip install torch==1.12.1+cu116 torchvision==0.13.1+cu116 --extra-index-url https://download.pytorch.org/whl/cu116
pip install -U -r requirements.txt
pip install -U --pre triton
pip install https://github.com/C43H66N12O12S2/stable-diffusion-webui/releases/download/linux/xformers-0.0.14.dev0-cp310-cp310-linux_x86_64.whl
```

## accelerateの設定
一旦`/LoRA`ディレクトリに戻ります。

対話的に設定を行うため、ターミナルでの実行が必要です。
`accelerate config`

コマンドを実行すると質問が始まるので、以下のように答えてください。
```
This machine (enter)
No distributed training (enter)
NO (入力)
NO
NO
all
fp16(enter)
```
