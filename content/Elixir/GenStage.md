- フロー型の処理を`Stage`を用いて抽象化してより簡潔に記述することができる抽象型を提供する
- `Stage`には生産者(Producer)、消費者(Consumer)、生産者/消費者(Producer-Consumer)の３つの役職がある
- それぞれのプロセスをSupervisorに乗せることができる

- 強化版GenEvent

最もシンプルな形のデータ処理フロー
![](../imgs/Pasted%20image%2020230914091556.png)

この例だとそれぞれが一対一だけど一対多も可能
![](../imgs/Pasted%20image%2020230914092031.png)
プロセスがSupervisor上に乗っているので、**それぞれのプロセスが並列に動作する**

## バックプレッシャー
GenStageにはバックプレッシャーという概念がある。これは**Consumerがデータを要求した時のみProducerがデータを送信する**というもの。
この概念があることで、ProducerがConsumerの許容範囲を超えたデータを送信する事を避けることができる。
## 導入
[Hex.pm](https://hex.pm/packages/gen_stage)
## 使い方

まず始めに`--sup`オプションを付けて新しいプロジェクトを作成する。
### Producer

一定数のストリームを生成する

- `init()`で`:producer`を指定している
- handle_demandでConsumerから要求があった時の処理を行っている。この場合だと`state`に応じたリストを生成する
```elixir
defmodule Sample do
  use GenStage

  def start_link(_initial) do
    GenStage.start_link(__MODULE__, :state_doesnt_matter, name: __MODULE__)
  end

  def init(counter), do: {:producer, counter}

  def handle_demand(demand, state) do
    events = Enum.to_list(state..state + state - 1)
    {:noreply, events, state + demand}
  end
end
```

### Consumer-Prosucer

Prosucerからデータを受け取り、