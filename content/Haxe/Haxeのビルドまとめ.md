Haxeはビルドターゲットが多い分ビルドが複雑なのでここでざっくりまとめる。

## build.hxml
まずはじめに以下のディレクトリ構造を前提とする。(関係ないファイルは省略している)
なおプロジェクト名は`haxe`にしている。

```
.
├── bin
│   ├── cpp
│   │   └── haxe
│   │       ├── Build.xml
│   │       ├── HxcppConfig.h
│   │       ├── include
│   │       │   ├── Main.h
│   │       │   ├── Std.h
│   │       │   └── Sys.h
│   │       ├── Main <-エントリポイント
│   │       ├── Main.hash
│   │       └── src
│   │           ├── __boot__.cpp
|   |           ~
│   │           └── Sys.cpp
│   └── python
│       └── main.py <-エントリポイント
├── build.hxml
└── src
    └── Main.hx
```

Haxeのビルドを指定するファイル
以下のようなフォーマットで書く
Python
```
-cp src
-main Main
-cpp bin/python/main.py
```
`python ./bin/python/main.py`で実行

C++
```
-cp src
-main Main
-cpp bin/cpp/haxe
```
`./bin/cpp/プロジェクト名/Main`で実行