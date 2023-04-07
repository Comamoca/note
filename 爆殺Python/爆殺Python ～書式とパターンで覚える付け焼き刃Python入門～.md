## まえがき
この記事は理論は後でも良いからとにかく速くPythonの構文を覚え、プログラムを書きたい人に捧げる入門記事です。構文の詳細な説明の一切を省き、最短距離でPythonの構文を覚えることをサポートします。

## コメント
文頭に`#`を付けた文はプログラムとして実行されない。
またコード例の行頭に`>>>`と書かれているものはPythonのインタプリタでの実行を表している。

## 変数

名前 = 値
```python
#数字
x = 10

#文字列
message = "Hello!"
text = 'World!'
```

## 型

- int型 整数
- float型 浮動小数点
- str型 文字列
- bool型 真偽値
- list型 リスト・配列
- tuple型 タプル
- dict型 辞書
- set型 集合

## 演算子(数値)
値を用いた計算を行うことができる。
```python
# 足し算
a + b

# 引き算
a – b

掛け算
a*b

# 割り算
a/b

# aをbで割った商の整数値(切り捨て)
a//b

# 割った時の余り
a%b

# aをn回掛けた数（べき乗）
a**n
```

## 演算子(論理)
値同士の比較を行うことができる。後に説明する`if`文で使う。
```python
>>> 3 < 5
True
>>> 1 < -9
False
>>> 
```

## 繰り返し
forとwhileの2つがある。`for`が使えれば困ることは無い。

10回繰り返す。
```python
for i in range(10):
    print(i)
```

リストや辞書など、**並べられるデータ**は繰り返し処理を行うことが可能。
```python
msg_list = ["Hello", "World"]

for msg in msg_list:
    print(msg)

# Hello
# Python

# と表示される
```

## 条件分岐
「〇〇の場合は△△を行う。」のような処理は`if`文を使って行う。
`if`で条件、`elif`で「〇〇でなく✕✕だった場合は□□を行う。」という処理を行える。
```python
x = 10

if x > 5:
    print("xは5より大きい")

elif x > 3:
    print("xは5よりは小さいが3よりは大きい")

else:
    print("xは5より小さい")
```

## 関数
処理をまとめられる。入力として値を受け取ることができ、また結果を返すことが出来る。
```python
def myfunc(num):
    return num * 2
```

もちろん数字以外も扱える。
```python
def greet(name):
    msg = "Hello " + name + " !" 
    return msg
```

## ライブラリを扱う
外部のライブラリを扱うにはパッケージマネージャを使ってパッケージをインストールする必要がある。しかし、Pythonはパッケージの扱いがやや難しい事で有名なので、[Poetry](https://python-poetry.org)を使って環境を構築する事をオススメする。

### import文
パッケージをプログラムで読み込むには、その事をプログラムで宣言しなければならない。そのための構文が`import`だ。

`import`文には2つの使い方がある。1つは`import ライブラリ名`というやり方、もう1つは`from ライブラリ名 import オブジェクト名`というやり方だ。頻繁に使うオブジェクトはこの方法で読み込むと楽になる場合がある。

importで読み込んだライブラリは固有の処理を持っている。それを呼び出すためには`.`を使って呼び出さなければならない。
```python
import time

time.sleep(1)
```

しかしfrom ライブラリ名 import オブジェクト名`と言う方法で読み込んだ場合は以下のようになる。
```python
from time import sleep

sleep(1)
```
`sleep`関数を呼び出す箇所がシンプルになった。沢山呼び出すことが想定される関数などはこの方法で呼び出すのが好ましい。

付け焼き刃の知識でプログラムを書くにはライブラリに縋るのが手っ取り早い。ここでは著名なHTTPライブラリ`requests`でWeb上のページを取得してみる。
```python
# 1
from requests import get

# 2
url = "http://google.com"

# 3
def fetch(url):
    content = get(url)
    return content.text

# 4
print(fetch(url))
```

- `#1`では[import文](#import文)を使ってライブラリを呼び出している。
- `#2`ではurl変数にURLを代入している。
- `#3`では`fetch`という関数を定義し、処理を簡略化している。
- `#4`では`fetch`関数に`url`変数の値を渡し、返された結果を`print`関数で表示している。

このプログラムは[GitHub上でサンプルとして公開しているので](https://github.com/Comamoca/sandbox/blob/main/bombing_python/bombing_python/main.py)実際に動かして動作を確認してみてほしい。正常に動いたのならばコンソールに大量の文字列が表示されるはずだ。これは[Google](https://google.com)のトップページが返したHTMLの内容だ。このHTMLを解析することでWebページ上から任意の箇所の情報を取得すること————所謂スクレイピングをする事ができる。

## まとめ
以上でPythonの極々基本的な構文を説明した。もっと細かいところなどは他の記事などを参考にどんどん調べていって欲しい。この記事がPython初学者の学習の足がかりになる事を祈っている。