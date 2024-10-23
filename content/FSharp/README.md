# FSharp

3行でまとめると

- Microsortが作った
- .NETで動く
- すごい関数型言語


コンパイラ/インタプリタがdotnetコマンドに組み込まれてるので、nugetを取ってきたりREPL/ビルド/実行へのアクセスがめちゃくちゃやりやすい。
さすがMS。


言語の機能的な側面でいうと、一般的な関数型言語が備えてるものをだいたい備えていて、.NET言語らしくC#との連携もやりやすくなっていたりとMS色が強い。
ただ、MS自体はサポートはしているものの、言語の発展などはコミュニティ任せになっているところが課題らしい。ちょっと残念だけど、言語の機能は良いのにケツモチが弱いせいで普及していない言語は幾度も見たことがあるのでまだマシな扱いかもしれない。


## 開発環境の準備

`dotnet`コマンドを用意する。AURなら[`dotnet-sdk`](https://archlinux.org/packages/?name=dotnet-sdk)がある。

エディタの設定についても軽く書いていく。
自分はVimmer(!=Neovim)なのでVimで整備する方法を紹介していく。

- LSP
vim-lspを導入していると思うので、`LspManageServers`とかからfsharpのLSPサーバーを適当にインストールしていく。
F#ファイルを開くとLSPサーバーをインストールするかダイアログが出てくるので、そこからインストールしてもいい。

- ハイライト
これ周りで検索すると公式のプラグインが出てくるのだけど実はこれ地雷で、ハイライト機能とセットで補完機能が付いてくる(うまく動かない)ので別のを使う。
自分は[DrTom/fsharp-vim](https://github.com/DrTom/fsharp-vim)を使わせて頂いている。若干不安なハイライティングをしてくるけど致し方ない。

Neovimの場合はMasonが対応していると思う(未確認)ので、それをインストールして`TSInstall`すれば行けると思う。(未確認)
Emacsは[emacs-fsharp-mode](https://github.com/fsharp/emacs-fsharp-mode)があるので、Elgotとか使ってれば良い感じの環境が整いそう。


VSCodeの人は自分で頑張ってください。


## プロジェクトの作成

まずHello worldするためにコンソールアプリケーション用のプロジェクトを作成する。

`dotnet new`という`Cargo init`みたいなコマンドがあるので、それを使ってプロジェクトを作成する。
ただし、デフォルトではC#のプロジェクトが作成されてしまうため、オプションで言語を指定する。
具体的には以下のようなコマンドを実行する。

`new`という名前がついているくせに**カレントディレクトリにファイルを展開する**ので、予めプロジェクト用のディレクトリを作って、その中で実行することをオススメする。うっかり実行してしまうとカレントにテンプレートファイルを撒き散らされて汚染されるので要注意。

`dotnet new console -lang "F#"`


実行が成功するとこんな感じのファイル達が生成される。

```
.
├── Program.fs
├── obj
│   ├── project.assets.json
│   ├── project.nuget.cache
│   ├── sample_project.fsproj.nuget.dgspec.json
│   ├── sample_project.fsproj.nuget.g.props
│   └── sample_project.fsproj.nuget.g.targets
└── sample_project.fsproj
```

この状態で`dotnet run`すると`Hello from F#`と表示される。
なんと一行もコードを書かずにHello worldしてしまった...最近の言語は需要を分かっていて良い。

## REPL

`dotnet fsi`コマンドを実行するとF#のインタプリタが起動する。
`printfn "Hello!";;`と打ってみると、こんな感じに表示されるはず。

```
> printfn "Hello!";;
Hello!
val it: unit = ()
```

型名も合わせて表示されたりと親切に作られているので、REPL回しながら小さいコード片をコピペしてプログラムを組んでいく、みたいな開発方法がやりやすい。

また、`.fsx`という拡張子はF#スクリプトとして扱われて、`dotnet fsi`で直接打ち込んだ扱いで実行される。
なのでビルドが走る`dotnet run`よりも実行されるまでが速い。

ただし、fsxは従来のF#と若干構文が違う。例えば、外部のパッケージを扱う際には`#r "nuget: ~`みたいな記述が必要になる。
事前にNugetの情報が与えられる`.fs`プログラムと違い、fsxがプロジェクトに依存しないため。
なので、外部パッケージに依存していても`.fsx`ならパッケージマネージャの操作が必要ない。いわば[Deno](https://deno.com/)的な使い方が可能になる。

例えば、`curl -s https://gist.githubusercontent.com/Comamoca/aa9a12a9bcb76365f01cd3094fd43cf2/raw/edda0b6ae816cd39f989c805a1a6aaf3794dbf52/precure.fsx | dotnet fsi --quiet`というコマンドを実行すると、カラフルな文字で**わんだふるぷりきゅあ！**と表示されるはず。

## Nugetパッケージをインストールする

F#は.NET上で実行されるため、他の.NET言語であるC#などと相互運用性がある。
つまり、C#で書かれたパッケージを普通に使うことができる。自分は始めてっきり特別な記法が必要なのだと思っていたのでこれには結構びっくりした。

それでは早速試してみる。まずNugetを検索できるサイトである。[nuget.org](https://www.nuget.org/)にアクセスする。

次に任意のパッケージを検索する。「TUI」とか漠然としたキーワードでも出てくるちゃ出てくる。

とは言いつつも、正直これで出てくるパッケージは動くかどうか信頼性がアレなので[awesome-fsharp](https://github.com/fsprojects/awesome-fsharp)から探した方がハズレがない。


次に、こんな画面になると思うので一番左側の`.NET CLI`というタブをクリックする。
すると画像みたいに`dotnet add package ~`と表示されるので、その右側にあるクリップボタンを押す。
これで`dotnet add package ~`の文言がクリップボードにコピーされた。

それをそのまま貼り付けて実行することでプロジェクトに該当のパッケージがインストールされる。

![](../../imgs/nuget_page.png)


カレントディレクトリにある`.fsproj`ファイルを開いて、

`<PackageReference Include="Spectre.Console.ImageSharp" Version="0.48.1-preview.0.28" />`

みたいな文言が新たに書き込まれていたらそのプロジェクトでパッケージを使う準備が整っている。
自分の環境ではインストール時に勝手に書き込まれているけども、
もし書き込まれていない場合はさっきのNugetsのページで`PackageReference`というタブを選択して`ItemGroup`タグの間に貼り付ける。これは新たに作っちゃっても大丈夫そう。

ちなみに、インストールしたパッケージは`dotnet list package`でも確認できる。ItemGroupまわりを書き換えたあとはこれで確認したほうが良さそう。

パッケージの削除は`dotnet remove パッケージ名`で行う。


## Paket

nugetの代わりにPaketというパッケージマネージャーを使うこともできる。
自分もこれを使っているけど、正直組み込みパッケージマネージャとそんなに変わらない。
ただ、依存管理を外部ツールに回せるのでそのあたりを弄りたいときに取り回しは良さそうではある。

まず始めにpaketをインストールする。

`dotnet tool install --global Paket`

次に初期化する。

`paket init`

次にインストール。例のNugetにPaketのタブがあるのでそこからクリックしてコピペして実行する。
こんな感じのコマンドになるはず。

`paket add Spectre.Console.ImageSharp --version 0.48.1-preview.0.28`

インストールが終わったら`paket show-installed-packages`コマンドでインストールされているパッケージを確認する。

パッケージの削除は`paket remove パッケージ名`で行う。


## 外部パッケージの読み込み方

ここからは実際に外部パッケージを読み込んで呼び出してみる。


他の言語の`import`に当たるものはF#では`open`キーワードになる。
> F#ではC#の関数などをシームレスに呼び出せる(わんだふる！)ので、結構いい感じにコードが書けるはず。
> ただ自分もそこまでC#との相互運用を試せてないので、これはまた後日別の記事でまとめていきたい。


参考までに、先ほど紹介したカラフルに**わんだふるぷりきゅあ！**と表示するプログラムの中身を貼ってみる。
これはf#スクリプトなので先頭に#rが付いている。普通のF#(.fs)ならこれは必要ない。

```fsharp
#r "nuget: Spectre.Console, 0.48.1-preview.0.28"
#r "nuget: FsSpectre, 0.4.6"

open Spectre.Console
open FsSpectre

let wa = "[#eb6ea6]わ[/]"
let nn = "[#c86fab]ん[/]"
let da = "[#5fbfb7]だ[/]"
let fu = "[#fdd000]ふ[/]"
let ru = "[#b1d155]る[/]"
let pu = "[#f5aa00]ぷ[/]"
let ri = "[#5fbfb7]り[/]"
let ki = "[#b1d155]き[/]"
let lyu = "[#b1d155]ゅ[/]"
let a = "[#eb6ea6]あ[/]"
let ex = "[#e39b78]！[/]"
let ret = "\n"

AnsiConsole.Markup([wa; nn; da; fu; ru; pu; ri; ki; lyu; a; ex; ret] |> String.concat "")
```
