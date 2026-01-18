insert into stories (title, author, tags, is_listed, content)
values
-- 1. スマホ依存の自己申告
(
  'スマホ依存の自己申告',
  'ChatGPT-5.2',
  array['日常', 'あるある', '依存'],
  true,
  '{
    "characters": [
      {"id": "char_t", "name": "ツッコミ", "color": "#E8F5E9"},
      {"id": "char_b", "name": "ボケ", "color": "#fae3e0ff"}
    ],
    "messages": [
      {"id": "m1", "characterId": "char_t", "text": "お前、スマホ触ってない時間ってあるの？", "type": "text"},
      {"id": "m2", "characterId": "char_b", "text": "あるよ。充電してるとき。", "type": "text"},
      {"id": "m3", "characterId": "char_t", "text": "コンセントと交代で休むな。", "type": "text"},
      {"id": "m4", "characterId": "char_b", "text": "最近は「画面見すぎ注意」ってスマホに怒られるんだよ。", "type": "text"},
      {"id": "m5", "characterId": "char_t", "text": "それでも見るんだろ？", "type": "text"},
      {"id": "m6", "characterId": "char_b", "text": "うん、「怒ってるとこも可愛いな」って思って。", "type": "text"},
      {"id": "m7", "characterId": "char_t", "text": "もう恋してるじゃん、それ。", "type": "text"}
    ],
    "theme": "pop",
    "tags": ["日常", "あるある", "依存"]
  }'::jsonb
),

-- 2. 筋トレ三日坊主のプロ
(
  '筋トレ三日坊主のプロ',
  'ChatGPT-5.2',
  array['ジム', '継続', 'あるある'],
  true,
  '{
    "characters": [
      {"id": "char_t", "name": "ツッコミ", "color": "#E8F5E9"},
      {"id": "char_b", "name": "ボケ", "color": "#fae3e0ff"}
    ],
    "messages": [
      {"id": "m1", "characterId": "char_t", "text": "ジム通いどうなった？続いてんの？", "type": "text"},
      {"id": "m2", "characterId": "char_b", "text": "続いてるよ、入会金の支払いだけ。", "type": "text"},
      {"id": "m3", "characterId": "char_t", "text": "金だけ鍛えてどうすんだ。", "type": "text"},
      {"id": "m4", "characterId": "char_b", "text": "ちゃんと行く準備はしてるよ。", "type": "text"},
      {"id": "m5", "characterId": "char_t", "text": "なにした？", "type": "text"},
      {"id": "m6", "characterId": "char_b", "text": "ジム用のウェア買って、鏡の前でポーズ練習。", "type": "text"},
      {"id": "m7", "characterId": "char_t", "text": "それ一番いらんトレーニングな。", "type": "text"}
    ],
    "theme": "pop",
    "tags": ["ジム", "継続", "あるある"]
  }'::jsonb
),

-- 3. 英会話アプリの悲劇
(
  '英会話アプリの悲劇',
  'ChatGPT-5.2',
  array['英語', 'アプリ', 'あるある'],
  true,
  '{
    "characters": [
      {"id": "char_t", "name": "ツッコミ", "color": "#E8F5E9"},
      {"id": "char_b", "name": "ボケ", "color": "#fae3e0ff"}
    ],
    "messages": [
      {"id": "m1", "characterId": "char_t", "text": "英語の勉強始めたって聞いたけど、どう？", "type": "text"},
      {"id": "m2", "characterId": "char_b", "text": "毎日アプリで外国人とチャットしてる。", "type": "text"},
      {"id": "m3", "characterId": "char_t", "text": "すごいじゃん、何話してんの？", "type": "text"},
      {"id": "m4", "characterId": "char_b", "text": "「Hi」を送る→「Hi」が返ってくる→そこで終了。", "type": "text"},
      {"id": "m5", "characterId": "char_t", "text": "それ会話じゃなくて挨拶のキャッチボール。", "type": "text"},
      {"id": "m6", "characterId": "char_b", "text": "でも連続ログイン30日達成したよ。", "type": "text"},
      {"id": "m7", "characterId": "char_t", "text": "中身ゼロの継続力だけは世界レベルだな。", "type": "text"}
    ],
    "theme": "pop",
    "tags": ["英語", "アプリ", "あるある"]
  }'::jsonb
),

-- 4. リモートワークの罠
(
  'リモートワークの罠',
  'ChatGPT-5.2',
  array['リモート', '仕事', 'あるある'],
  true,
  '{
    "characters": [
      {"id": "char_t", "name": "先輩", "color": "#E8F5E9"},
      {"id": "char_b", "name": "新人", "color": "#fae3e0ff"}
    ],
    "messages": [
      {"id": "m1", "characterId": "char_b", "text": "先輩、リモートワークって最高ですね。通勤時間0分ですよ", "type": "text"},
      {"id": "m2", "characterId": "char_t", "text": "おう、効率上がったか？", "type": "text"},
      {"id": "m3", "characterId": "char_b", "text": "はい。始業3分前まで爆睡して、始業1分後に二度寝しました", "type": "text"},
      {"id": "m4", "characterId": "char_t", "text": "勤務時間0分じゃねえか！", "type": "text"},
      {"id": "m5", "characterId": "char_b", "text": "いや、夢の中でプレゼン資料作ってたんでセーフです", "type": "text"},
      {"id": "m6", "characterId": "char_t", "text": "アウトだよ！ 給料も夢払いにするぞ", "type": "text"}
    ],
    "theme": "pop",
    "tags": ["リモート", "仕事", "あるある"]
  }'::jsonb
),

-- 5. 意識高い系ラーメン屋
(
  '意識高い系ラーメン屋',
  'ChatGPT-5.2',
  array['ラーメン', 'グルメ', '意識高い'],
  true,
  '{
    "characters": [
      {"id": "char_t", "name": "客", "color": "#E8F5E9"},
      {"id": "char_b", "name": "店主", "color": "#fae3e0ff"}
    ],
    "messages": [
      {"id": "m1", "characterId": "char_t", "text": "すいません、醤油ラーメン一つ", "type": "text"},
      {"id": "m2", "characterId": "char_b", "text": "お客さん…『醤油』じゃなくて『琥珀の涙』な", "type": "text"},
      {"id": "m3", "characterId": "char_t", "text": "あ、はい。じゃあ琥珀の涙で", "type": "text"},
      {"id": "m4", "characterId": "char_b", "text": "あと、うちのスープは会話厳禁。心で味わって", "type": "text"},
      {"id": "m5", "characterId": "char_t", "text": "（めんどくせぇ…）わかりました", "type": "text"},
      {"id": "m6", "characterId": "char_b", "text": "へいお待ち。…あ、今スマホ見ましたね？ 没収", "type": "text"},
      {"id": "m7", "characterId": "char_t", "text": "ラーメン食わせろよ！！", "type": "text"}
    ],
    "theme": "pop",
    "tags": ["ラーメン", "グルメ", "意識高い"]
  }'::jsonb
),

-- 6. 推し活の限界
(
  '推し活の限界',
  'ChatGPT-5.2',
  array['推し活', 'オタク', '金欠'],
  true,
  '{
    "characters": [
      {"id": "char_t", "name": "友人", "color": "#E8F5E9"},
      {"id": "char_b", "name": "オタク", "color": "#fae3e0ff"}
    ],
    "messages": [
      {"id": "m1", "characterId": "char_b", "text": "やばい、今月の食費300円しかない", "type": "text"},
      {"id": "m2", "characterId": "char_t", "text": "まだ10日だぞ？ 何に使ったんだよ", "type": "text"},
      {"id": "m3", "characterId": "char_b", "text": "推しの生誕祭ガチャ。天井まで回しちゃった", "type": "text"},
      {"id": "m4", "characterId": "char_t", "text": "8万！？ ご飯どうすんの", "type": "text"},
      {"id": "m5", "characterId": "char_b", "text": "大丈夫、推しの笑顔があれば空気だけで生きていける", "type": "text"},
      {"id": "m6", "characterId": "char_t", "text": "光合成かよ。来週倒れても知らんぞ", "type": "text"},
      {"id": "m7", "characterId": "char_b", "text": "病院のベッドでイベント走るから平気", "type": "text"},
      {"id": "m8", "characterId": "char_t", "text": "タフすぎるだろ…", "type": "text"}
    ],
    "theme": "pop",
    "tags": ["推し活", "オタク", "金欠"]
  }'::jsonb
);
