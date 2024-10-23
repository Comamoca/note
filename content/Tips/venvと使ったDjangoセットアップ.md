## 仮想環境の作成
初めにディレクトリを作成して、その中に移動しておく。

```sh
mkdir ./app_name
cd ./app_name

#仮想環境の作成
python -m venv .venv

.venv/bin/activate.* # 読み込むファイルの拡張子はOSによって違う(Win: .bat, Linux: .sh/.fish)

which python # もしここで.venv/bin/pythonのように表示されなかった場合は以降のpythonコマンドを以下のように実行する
.bin/bin/python

# Djangoのインストール
python -m pip install django

# 配下にディレクトリが作成される。必要に応じて中身をカレントに展開する
python -m django startproject ./app_name

# サーバーの起動
python manage.py runserver
```

[http://localhost:8000](http://localhost:8000)にアクセスして以下のようなページが表示されたら成功。
![](../imgs/Pasted%20image%2020231010100208.png)