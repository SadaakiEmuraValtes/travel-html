# 🗾 JAPAN TRAVEL — 旅行予約シミュレーター

Vue 3 製の日本国内旅行予約デモサイトです。47都道府県の宿泊施設・移動手段をブラウザ上でシミュレーション予約できます。

**デモ:** https://sadaakiemuravaltes.github.io/travel-html/

---

## 機能一覧

| 機能 | 説明 |
|------|------|
| 宿泊検索 | 47都道府県から目的地を選択し宿泊施設を検索・予約 |
| 交通+宿泊セット | 出発地・目的地・交通手段・宿泊をまとめて予約 |
| 地図から選ぶ | 47都道府県タイルマップ（地域別カラー）からクリック選択 |
| 地域から選ぶ | 地域 → 県 → エリアの階層ドリルダウン選択 |
| 移動手段自動判定 | 新幹線（7路線）・飛行機・バスの利用可否を自動判定、料金・所要時間を算出 |
| 片道/往復 | 交通手段の片道・往復切り替え（往復は料金×2） |
| ホテル一覧 | タイプ・価格帯・星評価でフィルター＆ソート（県ごとに3〜141件） |
| 予約確認 | 宿泊料金・交通費・合計金額をまとめて確認してから確定 |
| ログイン認証 | 予約にはログインが必要。未ログインはログイン画面へリダイレクト |
| 予約履歴 | マイページで過去の全予約を一覧表示 |

---

## 技術スタック

- **Vue 3** — Composition API (`<script setup>`)
- **Vue Router 4** — `createWebHashHistory`（GitHub Pages 対応）
- **Vite 5** — ビルドツール
- **JavaScript** — TypeScript なし、外部UIライブラリなし

状態管理はライブラリ不使用（`reactive` ストア + sessionStorage 永続化）。

---

## セットアップ

```bash
npm install

# 開発サーバー (http://localhost:5173/travel-html/)
npm run dev

# プロダクションビルド
npm run build
```

---

## デプロイ (GitHub Pages)

```bash
npm run build

DEPLOY_DIR=/c/Users/sadaaki.emura/AppData/Local/Temp/travel-deploy
rm -rf $DEPLOY_DIR
git clone --branch gh-pages https://github.com/SadaakiEmuraValtes/travel-html.git $DEPLOY_DIR
cp -r dist/. $DEPLOY_DIR/
cd $DEPLOY_DIR && git add -A && git commit -m "Deploy: ..." && git push origin gh-pages
```

---

## プロジェクト構成

```
src/
├── App.vue                    # ルートコンポーネント（ナビ・フッター）
├── main.js
├── style.css                  # グローバルスタイル（水色+グリーンテーマ）
├── router/
│   └── index.js               # ルーティング・マイページ認証ガード
├── store/
│   └── index.js               # グローバルストア・予約管理（sessionStorage永続化）
├── data/
│   ├── prefectures.js         # 47都道府県（地図座標・地域・空港・新幹線）
│   ├── hotels.js              # 141ホテル（各県3件: 高級/中級/格安）
│   ├── transport.js           # 新幹線路線・空港リスト・移動手段計算
│   └── users.js               # テストアカウント5件
└── views/
    ├── HomeView.vue           # トップページ・検索入口
    ├── SearchView.vue         # 地図/地域リスト目的地選択
    ├── PackageView.vue        # 交通手段検索・選択
    ├── HotelListView.vue      # ホテル一覧（フィルター・ソート）
    ├── HotelDetailView.vue    # ホテル詳細・予約パネル
    ├── ConfirmView.vue        # 予約内容確認
    ├── CompleteView.vue       # 予約完了・予約番号表示
    ├── MyPageView.vue         # 予約履歴
    └── LoginView.vue          # ログインフォーム
```

---

## 予約フロー

### 宿泊のみ
```
トップ → 目的地選択（地図/リスト） → ホテル一覧 → ホテル詳細 → 予約確認 → 完了
```

### 交通+宿泊セット
```
トップ → 出発地・目的地選択 → 移動手段選択 → ホテル一覧 → ホテル詳細 → 予約確認 → 完了
```

---

## 移動手段仕様

### 新幹線路線

| 路線 | 主要停車都道府県 |
|------|----------------|
| 東海道・山陽 | 東京〜神奈川〜静岡〜愛知〜京都〜大阪〜兵庫〜岡山〜広島〜山口〜福岡 |
| 東北 | 東京〜埼玉〜栃木〜宮城〜岩手〜青森 |
| 上越 | 東京〜埼玉〜群馬〜新潟 |
| 北陸 | 東京〜埼玉〜群馬〜長野〜富山〜石川 |
| 北海道 | 青森〜北海道 |
| 九州 | 福岡〜熊本〜鹿児島 |
| 西九州 | 佐賀〜長崎 |

飛行機は空港のある30都道府県間で利用可能。新幹線・飛行機どちらもない場合はバス扱い。

---

## 開催地域・競馬場組み合わせ

### 8地域・47都道府県

| 地域 | 都道府県 |
|------|---------|
| 北海道 | 北海道 |
| 東北 | 青森・岩手・宮城・秋田・山形・福島 |
| 関東 | 茨城・栃木・群馬・埼玉・千葉・東京・神奈川 |
| 中部 | 新潟・富山・石川・福井・山梨・長野・岐阜・静岡・愛知 |
| 近畿 | 三重・滋賀・京都・大阪・兵庫・奈良・和歌山 |
| 中国 | 鳥取・島根・岡山・広島・山口 |
| 四国 | 徳島・香川・愛媛・高知 |
| 九州・沖縄 | 福岡・佐賀・長崎・熊本・大分・宮崎・鹿児島・沖縄 |

---

## テストアカウント

| 名前 | メールアドレス | パスワード | 出発拠点 |
|------|--------------|-----------|---------|
| 田中 太郎 | tanaka@example.com | Travel#2024 | 東京 |
| 山田 花子 | yamada@example.com | Journey@88 | 大阪 |
| 鈴木 一郎 | suzuki@example.com | Voyage99! | 宮城 |
| 佐藤 明日香 | sato@example.com | Wander2025 | 福岡 |
| 伊藤 健 | ito@example.com | Trip!456 | 北海道 |

---

## 免責

架空の旅行予約デモサービスです。実際の予約・決済・入金は一切発生しません。
登場するホテル名・施設情報はすべてフィクションです。
