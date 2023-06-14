# トラスちゃんカスタムメモ

Boothで販売されている[3Dモデル『トラスとウェッジ』](https://booth.pm/ja/items/3472207)のカスタムについてまとめたメモ。
トラスちゃん固有の設定を主に書いていきます。

## カスタムAFKアニメーション

Avatar3.0ではAFKアニメーションと呼ばれる、AFK状態のときに再生されるアニメーションが設定できます。
デフォルトでは座禅の結跏趺坐に似ているアニメーションが設定されています。[^1]

しかしトラスちゃんのAFKアニメーションは口に指を当て考えているようなアニメーションが再生されます。
これはモデル側で既存のモーションではなくアバター側で用意したモーションを割り当てているからです。



[^1]: AFKモードはデスクトップモードの場合`End`キーで起動できます。ただし、これで起動できない場合は`R`キーから`Options`->`Config`->`AFK Detection`をONにする必要があります。