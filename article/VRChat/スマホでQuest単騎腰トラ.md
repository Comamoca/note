準備するもの
- パソコン
- Wifi
- スマホ(iPhoneでも出来るけどAndroidしか持ってないので検証してない)
- Quest

## PC側の準備
- [SlimeVR](https://docs.slimevr.dev/quick-setup.html#install-the-latest-slimevr-installer)をダウンロード・インストール

## スマホ側の準備
- [owotrack](https://play.google.com/store/apps/details?id=org.ovrgyrotrackersync&hl=ja&gl=US)をインストール
- owotrackを起動
- 起動したらConnectタブに移動
- 上のIPアドレス記入欄にPCのIPアドレスを入力
IPアドレスはcmd.exe->ipconfigで調べられる(詳しくはググって)

## トラッキングの準備

- SlimeVRを起動
- この時owotrackを起動・接続してるとHomeで端末を確認できる。端末を動かして枠が緑に光るのを確認する

### VRChat OSCの有効化
- Settings->VRChat OSC Trackersをクリック
- Ebableスイッチをクリックして有効化
- Network AddressにQuestのIPアドレスを入力

### トラッキング部位の設定
- Tracker Assignmentをクリック
- 右の図のHipをクリック
- トラッカー一覧が出るのでスマホのトラッカーをクリック

### キャリブレーション
- Mounting Calibrationをクリック
- Automatic mountingをする
- Body Proportionsをクリック
- 残念ながらQuest単騎だと自動キャリブレーション出来ないので、Manual proportionsをする
- 体の部位を測って入力する。計測部位の説明は[ドキュメント](https://docs.slimevr.dev/server/body-config.html#measurements)がわかりやすい

### VRChatでのキャリブレーション
普通にキャリブレーションする
- OSCが有効になっているのを確認する
- LaunchPadのStand/Sitを切り替えるところがキャリブレーションボタンになっているので選択
- アバターがTポーズに切り替わるのでコントローラーを合わせる