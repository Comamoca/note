公開鍵基盤のKeybaseというサービスがある。何ができるか一言で言うと、「別々のサービスが同一人物のものか証明出来る」サービスになっている。
このKeybase、TwitterやGitHubの他にPGP鍵も登録できる。なんとPGP鍵をKeybaseで作って登録まで出来るため、これさえあればお手軽にコミットに署名できる。

Keybaseを使ったPGP鍵の生成とGitHubへの登録はこのサイトを見れば出来るため割愛。
https://qiita.com/HelloRusk/items/bcb0246b42d12195c6d0

手順通りにやればコミットに**Verified**というバッジが付く。さて、ここまでやってきた方は気付いたかもしれないけど、**PGP鍵を使った認証を行う場合commitをするたびにパスフレーズを入力する必要がある**。もしかしたら入力機能をサポートするpinentryの種類によっては画面下に保存してくれるチェックボタンがあるかもしれない。そういう人はラッキーなのでこっから先を読む必要は無さそう。

ここからはpinetryが良い感じのUIを用意してくれなかった人向けの話になる。環境によって挙動が違う可能性があるので一応自分の環境を書いてみる。

- gpg (GnuPG) 2.2.41
- Manjaro(on WSL)
- Neovim
- コミットにはlazygitとcommitizenを使っている(恐らく内部でgitを使っているため挙動に影響は無さそう)

一言でいうとこの記事の`署名処理の自動化`の項目の設定を行う。
https://hayashier.com/article/gpg-introduction/

記事を読めば分かるけど、

- 以前はpinetryにパスフレーズを流し込んでいた(`-passphrase-fd`)
- しかしgpgがv2になりその手法が使えなくなった(設定で有効化することは可能)

なので

- 従来の方法を行うために設定で有効化する
- または`gpg-preset-passphrase`というコマンドでパスフレーズを保存する

という事をする。この記事では後者の方をやってみる

- まずgpgのバージョンがv2であることを確認する
`gpg --version`

- `/usr/lib/gnupg/gpg-preset-passphrase -h`を実行する。
PATHが通ってないみたいなので絶対パスで呼び出す。

- `keygrip`という値を使うため、まずそれを用意する。この記事が詳しい
https://qiita.com/kazssym/items/f7f27414cc5d2058ce7a#%E3%83%91%E3%82%B9%E3%83%95%E3%83%AC%E3%83%BC%E3%82%BA%E5%85%A5%E5%8A%9B%E3%81%AE%E8%87%AA%E5%8B%95%E5%8C%96

- gpgの設定を変更した場合は、gpg-agentを再起動する必要がある。以下の方法で再起動出来る。
  - `gpg-connect-agent killagent /bye`
  - `gpgconf --kill gpg-agent`