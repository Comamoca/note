# Nostr

**Notes and Other Stuff Transmitted by Relays**(リレーで送信されるメモおよびその他のもの)

リレーサーバーの集合で構成される分散型SNS。強い検閲耐性、冗長性を兼ね備えている。

その他のものと書かれているように、SNSとしての利用のみならずある種のプラットフォームとしての利用が可能。

主な例として、

- [Habla](https://habla.news/)
[NIP-23](https://github.com/nostr-protocol/nips/blob/master/23.md)(長文投稿に関する仕様)を元に構築されているWebサービス

- [Nosli](https://nosli.vercel.app/)
先述したNIP-23を用いてTogetterのような投稿をまとめたページを作成できる。

※ この仕様は以前はNIP-33だったらしく、古い記事ではそのように表記されている。


また、Nostrの機能の大半はクライアントによって提供されている。
どのリレーに接続するかはユーザーに一任されているため、接続するリレーを変更するとTLも変わってくるという従来のSNSとはまた違った特徴がある。


## 仕様

有志による日本語版も存在する。

[nostr-jp/nips-ja](https://github.com/nostr-jp/nips-ja)

[NIP](https://github.com/nostr-protocol/nips)と呼ばれる仕様書に基づいている。
以下に代表的な仕様を挙げる。


- [NIP-01](https://github.com/nostr-protocol/nips/blob/master/01.md)
Nostrのもっとも基本的な仕様。これさえ実装すれば晴れてNostrネットワークに参加できる。

- [NIP-05](https://github.com/nostr-protocol/nips/blob/master/05.md)
ドメイン認証に関する仕様。
対応しているクライアントではユーザーのアイコンにバッジが付いたりプロフィールに認証したドメインが表示される。

- [NIP-07](https://github.com/nostr-protocol/nips/blob/master/07.md)
拡張機能からNostrの認証情報を利用する仕様。これに対応しているサービスではわざわざ秘密鍵をコピーしなくてもダイアログで許可を出せば認証が完了する。
