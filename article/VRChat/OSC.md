[VRCで外部通信](VRCで外部通信.md)にも出てきたUDPによる通信方法。
Webでの通信には向いてないけど、**PCからの情報を受信する**という用途においてはかなり使えそう。
e.g.)アバターの時計ギミック、VRCから身の回りのアイテムの操作

## OSCの概要
- Open Sound Controlの略
- UDP通信(確実にパケットが届くとは限らない)

## 開発する際に使うツール
ref: [VRChat SDK 入門 (5) - OSCの概要](https://note.com/npaka/n/n74ab6edc65eb)

**・**[**TouchOSC**](https://hexler.net/touchosc) : OSCによるデータ送信。  
**・**[**Protokol**](https://hexler.net/protokol) : OSCによるデータ受信。

VRChatのExpressionからOSC -> DebugでOSCのデバッグをすることが可能。

受信は9000ポート、送信は9001ポート

アバターの時計ギミックを考えてみる。
- UDPサーバー
Goで適当に組む
[go-osc]()というライブラリがあるので簡単に書くことが出来そう。
- 文字表示用アセット
Boothでよしなに