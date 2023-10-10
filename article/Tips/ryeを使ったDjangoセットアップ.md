## ryeのインストール
公式ドキュメント通りにコマンドを実行。シングルバイナリなので大抵の環境へ簡単にインストール出来るはず。

## Pythonのバージョンを最新にする
`rye pin cpython@3.11`
ryeのデフォルトのPythonのバージョンは何故かpython3.10なので、現行の最新版であるPython3.11にする。

## Pythonプロジェクトを作成
`rye init`
これで`pyproject.toml`や`src`ディレクトリなどが作られる。

## Djangoのツールをインストールする
`rye install Django`
`django-admin`コマンドが使えるようになったらOK

## PythonプロジェクトにDjangoを追加する
`rye add Django`
今回はStableをインストールする。

## Djangoプロジェクトを作成する
`django-admin startproject プロジェクト名`
これで新たに`プロジェクト名`という名前のディレクトリが作成される。

## Djangoサーバーを起動する
`rye run cpython@3.11 ./src/プロジェクト名 runserver`

LocalHostの`8000`ポートにアクセスして、以下のようなページが表示されたら成功
![](../imgs/Pasted%20image%2020231010100011.png)