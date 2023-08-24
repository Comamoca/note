WebカメラとQuest単体でフルトラッキングを実現する方法を考えてみる。

## 前例
### MocapForAll

[リンク](https://vrlab.akiya-souken.co.jp/products/mocapforall/)
約一万円。カメラ2台でそれなりに高精度なモーショントラッキングを行うことが出来る。
ただしそれなりに処理が重いらしい。またトラッキングデータのQuestへの直接送信も可能らしい。

幸い開発者の方が技術的な解説を記事にしてくださっている。[SpeakerDeck](https://speakerdeck.com/kenjiasaba/mocapforalltokong-kijia-zong-yan-falsemu-zhi-sutokoro?slide=10)

その内容をここでちょっとまとめてみる。

### 使用技術

#### OpenCV
画像処理の定番。ChArUcoという技術でトラッキングを行っているらしい。
その他にも三角測量などを活用してトラッキングデータを算出している。

#### ChArUco?
ChArUcoとは
- 角の位置を画像内から精密に決定するのに便利なChessboard
- パターンを検出するのに便利なArUco
の2つを組み合わせたもの。(**Ch**essboard X **ArUco**)

### カメラ校正

カメラには
- 内部パラメータ
焦点距離や光軸の中心などのカメラそのものの特性を持つパラメータ。
カメラ画像中の座標 X カメラ座標系での座標の関係を記述する行列で表現される。

- 外部パラメータ
カメラと世界の関係を持つパラメータ。
	カメラ座標系での座標と世界座標系での座標の関係を記述する行列で表現される。

の2つのパラメータがある。(ピンホールカメラモデル)

これらの行列を決定し、その積である射影行列Pを求めるのがカメラ校正。

#### 実装方法

##### ChAruco
OpenCVに関数がある。

- `cv::aruco::detectMarkers`
インプット画像からArUcoマーカー座標を見つける
- `cv::aruco::interpolateCornersCharuco`
ArUcoマーカー座標からチェスボードの角の座標を見つける
- `cv::aruco::calibrateCameraCharuco`
チェスボードの角の座標から**カメラ内部パラメータ行列**を求める。n枚の画像が必要。
- `cv::aruco::estimatePoseCharucoBoard`
チェスボードの角の座標からカメラ外部座標パラメータ行列を求める。

カメラ内部パラメータ行列とカメラ外部パラメータの行列の積を求めれば、**射影行列(Projection Matrix)が求められる。**

##### 三角測量
OpenCVに関数がある。

- `cv::sfm::triangulatePoints`
入力(points2d, 射影行列) -> 出力(point3d)

信頼度も使って評価したい場合は独自実装をする必要がある。
[参考リポジトリ](https://github.com/karfly/learnable-triangulation-pytorch)

