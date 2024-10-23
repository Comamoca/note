## You should probably TRAIN this model on a down-stream task to be able to use it for predictions and inference.

HuggingFaceのライブラリのコメントで、内部では正しい方法で学習が行われているらしい。
https://github.com/lavis-nlp/jerex/issues/2

## masking were not used when initializing BertForSequenceClassification:

そのまま学習しても概ね問題ないらしい。
なお学習には1epoch7分かかるらしい。これはGPUに依存する数値なのであまり参考にはなりそうにないけども参考までに。
https://jupyterbook.hnishi.com/language-models/fine_tune_jp_bert_part02.html

Stable Diffusionで、草原に立っている少女のイラストを生成するプロンプトとネガティブプロンプトを記述してください。

プロンプトは、イラストを生成するためのものです。ネガティブプロンプトは生成する画像にふさわしくない物事を記述してください。それは一般に完成度の低い画像に関する単語、プロンプトと逆の内容に対する物事が記述されます。

プロンプトとネガティブプロンプトは以下のようなフォーマットで記述してください。

Prompt: プロンプトの内容
NegativePrompt: ネガティブプロンプトの内容

プロンプトとネガティブプロンプトは

・英語
・小文字で記され、大文字を含みません
・カンマ区切り

で記述されます。

プロンプトは画像の内容をより詳細に説明するものです。例えば、

・具体的な場所、時間、状況
・登場する人物の具体的な服装、表情、姿勢など

これらを盛り込むことでよりクオリティーの高いイラストを生成できます。

また、プロンプトは Generate a detailed illustrationなどの文字列を含みません。
