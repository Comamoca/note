RubyにハマったのでRubyでNeovimプラグインを書いてみる

## 下準備
NeovimのRubyのサポートを追加するため、Neovimライブラリをインストールする。
`gem install neovim`

`checkhelth provider`を実行してRubyサポートが有効になっているか確認する。

この時、インストールディレクトリがPATHにないとエラーが発生するので注意。

## ディレクトリ構成
runtimepath上にある`rplugin/ruby/*rb*`を読み込む仕様なので、以下のように構成する。

ディレクトリを作成したあとは任意のプラグインマネージャかruntimepathを編集して読み込ませる。

```
ruby-plugin
 └─rplugin
     └─ruby
        └─plugin.rb
```

## プラグインを書いてみる

NeovimのAPIをラップしたライブラリがあるのでそれを使う。

基本はDSLを使うので[ここ](https://www.rubydoc.info/github/neovim/neovim-ruby/main/Neovim/Plugin/DSL)を参考に書いていく。書き終わったら`UpdateRemotePlugin`を忘れずに。
