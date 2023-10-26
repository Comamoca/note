Shougoさんがドッグフーディングを開始したそうなので、dpp.vimの導入を始めてみる。

この記事ではdein.vimからdpp.vimへと移行する事を想定して、どのように設定を構成していけば良いのか書いていく。
## 環境
自分の環境を列挙していく

- Manjaro Linux
- NVIM v0.10.0-dev-25cfe3f

#### ちょっとした宣伝
**現状fishでしか動かないので注意**

また、自分は今回お手製環境切り替えツール[neoenv](https://github.com/comamoca/neoenv)を使い`NVIM_APPNAME`を変更してインストール作業を行っている。
neoenvはざっとこんな事ができる。

- `neoenv add APP_NAME`で環境追加
- `neoenv remove`でファインダーが開くので絞り込んで指定すると削除される。ただしディレクトリ等は削除されない。
- `neoenv switch`で環境を切り替えるシェルスクリプトを出力する。パイプで`source`すると適用される。
例)`neoenv switch | source`
## ddp.vimの基本コンセプト
> デフォルトでは何もしない、ユーザーが全てをコントロール出来るパッケージマネージャー

- denops依存
- プラグインのインストール周りの設定はTypeScript(Deno)で記述する
- 必要な機能は拡張機能を使って実現する

詳しい説明は[Shougoさんの紹介記事](https://zenn.dev/shougo/articles/dpp-vim-beta#dpp.vim-%E3%81%AE%E7%89%B9%E5%BE%B4)が詳しい。
## 下準備
**dpp.vimは Neovim (0.10.0+)またはVim 9.0.1276+をサポートしているので、v0.9などを使っている人はNightlyなどをインストールする必要がある。**

dpp.vimにはまだインストールスクリプトが無く、作る予定も無いそうなので手作業で準備をする。

ここではプラグインのインストールディレクトリは`~/.cache/ddp/`であるという前提でインストールを行っていく。
まずddp.vimとdenopsを`git clone`する。
```sh
mkdir -p ~/.cache/dpp/repos/github.com/
cd ~/.cache/dpp/repos/github.com/

mkdir Shougo
mkdir vim-denops

cd ./Shougo
git clone https://github.com/Shougo/dpp.vim

git clone https://github.com/Shougo/dpp-ext-installer
git clone https://github.com/Shougo/dpp-protocol-git
git clone https://github.com/Shougo/dpp-ext-lazy
git clone https://github.com/Shougo/dpp-ext-toml

cd ../vim-denops
git clone https://github.com/vim-denops/denops.vim
```

```
├─── Shougo
│    ├── dpp-ext-installer
│    ├── dpp-ext-lazy
│    ├── dpp-ext-toml
│    ├── dpp-protocol-git
│    └── dpp.vim
└── vim-denops
    └── denops.vim
```

次に設定用のTSファイルを作成する。ここでは`~/.config/nvim/dpp.ts`配下に配置することにする。
`touch ~/.config/nvim/dpp.ts`
## init.lua
[READMEのConfig example](https://github.com/Shougo/dpp.vim#config-example)を参考に自分がLuaに書き直したものが以下。
```lua
local dpp_base = "~/.cache/dpp/"
local dpp_src = "$HOME/.cache/dpp/repos/github.com/Shougo/dpp.vim"

local ext_toml = "$HOME/.cache/dpp/repos/github.com/Shougo/dpp-ext-toml"
local ext_lazy = "$HOME/.cache/dpp/repos/github.com/Shougo/dpp-ext-lazy"
local ext_installer = "$HOME/.cache/dpp/repos/github.com/Shougo/dpp-ext-installer"
local ext_git = "$HOME/.cache/dpp/repos/github.com/Shougo/dpp-protocol-git"
local denops_src = "$HOME/.cache/dpp/repos/github.com/vim-denops/denops.vim"

local dpp_config = "~/.config/nvim-dpp/dpp.ts"

-- vim.opt.runtimepath:append(denops_src)
vim.opt.runtimepath:prepend(dpp_src)

vim.opt.runtimepath:append(ext_toml)
vim.opt.runtimepath:append(ext_git)
vim.opt.runtimepath:append(ext_lazy)
vim.opt.runtimepath:append(ext_installer)

if vim.fn["dpp#min#load_state"](dpp_base) then
	vim.opt.runtimepath:prepend(denops_src)

	vim.api.nvim_create_augroup("ddp", {})

	vim.cmd(string.format("autocmd User DenopsReady call dpp#make_state('%s', '%s')", dpp_base, dpp_config))
end

vim.cmd("filetype indent plugin on")

if vim.fn.has("syntax") then
	vim.cmd("syntax on")
end
```
autocmdを定義するところがかなり見苦しいけど、自分はとりあえずこの設定で動かしてる。いつか直したい。
## TypeScript

[こちらのGist](https://gist.github.com/raa0121/d8634a7971ec95fb5fcbcb6baad27f65)を参考に書いていきました。
<script src="https://gist.github.com/raa0121/d8634a7971ec95fb5fcbcb6baad27f65.js"></script>

出かける時間になっちゃったのでここまでで一旦上げときます...
夕方頃に追記してまた更新します
## 遅延ロード