RubyにハマったのでRubyでNeovimプラグインを書いてみる。
バージョンはruby 3.0.6。

## 下準備
NeovimのRubyのサポートを追加するため、Neovimライブラリをインストールする。
`gem install neovim`

`checkhelth provider`を実行してRubyサポートが有効になっているか確認する。

この時、インストールディレクトリがPATHにないとエラーが発生するので注意。

## ディレクトリ構成
runtimepath上にある`rplugin/ruby/*rb*`を読み込む仕様なので、以下のように構成する。

ディレクトリを作成したあとは任意のプラグインマネージャかruntimepathを編集して読み込ませる。
LSPを使う場合は`bundle init`でGemfileを作成する。
```
.
├── Gemfile
└── rplugin
    └── ruby
        └── plugin.rb	
```

## プラグインを書いてみる

NeovimのAPIをラップしたライブラリがあるのでそれを使う。

基本はDSLを使うので[ここ](https://www.rubydoc.info/github/neovim/neovim-ruby/main/Neovim/Plugin/DSL)を参考に書いていく。書き終わったら`UpdateRemotePlugins`を忘れずに。

```ruby
require "neovim"

Neovim.plugin do |plug|
  plug.command("RubyHello") do |nvim|
    nvim.command(":echo 'Hi!'")
  end
end
```

Rubyエアプなので細かい説明は書かないけども、ざっくりこんな感じになってる。

- Neovim.pluginのスコープ内で使える`plug`オブジェクトでautocmdや実行するコマンドなどの定義をおこなう。
- `plug`のメソッドで作られるスコープ内で使える`nvim`オブジェクトからNeovimが持つ関数群を呼び出し処理を行う。

それぞれ使えそうなメソッドを上げてみる。

### plug

#### command
Neovimで呼び出せるExコマンドを定義する。~~先頭に`:`を付けるとエラーになるので注意。~~文字列にしなければ:を付けても良いらしい。ElixirのAtom的なやつ？

#### autocmd
autocmdを定義する。イベント名は`:h autocmd-events`で参照できる。

#### function
他のスクリプトから呼び出せる関数を定義する。

### nvim

#### command
NeovimのExコマンドを実行できる。困ったらこれを使えば良さそう。

## 余談

その他の関数は恐らく[Neovim API](https://neovim.io/doc/user/api.html)[^1]の名前を使えば呼び出せるっぽい。
Rubyでプラグイン作った人が[記事(英語)](https://alextaylor.ca/read/writing-neovim-plugins-with-ruby/)を書いているので色々参考になりそう。

Neovim API周りを漁ってたら[ElixirでNeovimプラグインを書ける代物](https://github.com/dm1try/nvim)を見つけてしまったのでこれも触ってみたくなってきた...Gleamで型付けしてパッケージにしてみたい。

[^1]: 由来は多分Lua APIの`vim.api`なのでLua APIをいじりながらコードを書くと捗りそう。型は不明なので色々理解ってきたらここにも書き足していきたい。