<template>
  <div class="help-page">
    <div class="container">

      <!-- 免責バナー -->
      <div class="disclaimer-hero">
        <div class="disclaimer-icon">⚠️</div>
        <h1>免責事項・ヘルプ</h1>
        <p>このサイトはブラウザ自動化・テスト技術の練習を目的とした<strong>架空のデモサイト</strong>です。</p>
      </div>

      <!-- 免責事項 -->
      <section class="section card">
        <h2 class="section-title"><span class="icon">📋</span> 免責事項</h2>
        <div class="disclaimer-grid">
          <div class="disc-item">
            <div class="disc-icon">🚫</div>
            <div>
              <strong>実際の予約・決済は行いません</strong>
              <p>本サイトで行う予約はすべて架空のシミュレーションです。実際のホテル・航空会社・鉄道会社への予約は発生しません。</p>
            </div>
          </div>
          <div class="disc-item">
            <div class="disc-icon">💳</div>
            <div>
              <strong>金銭のやり取りは一切ありません</strong>
              <p>クレジットカード・銀行振込などの決済機能は存在しません。表示される料金はすべて架空の数値です。</p>
            </div>
          </div>
          <div class="disc-item">
            <div class="disc-icon">🏨</div>
            <div>
              <strong>掲載ホテル・施設はフィクションです</strong>
              <p>掲載しているホテル名・施設情報・写真・料金はすべて架空のデータです。実在する施設とは一切関係ありません。</p>
            </div>
          </div>
          <div class="disc-item">
            <div class="disc-icon">📊</div>
            <div>
              <strong>自動化テスト練習用サイトです</strong>
              <p>本サイトはPlaywright・Selenium・Robot Framework等のブラウザ自動化ツールの操作練習・テスト技術習得を目的として作成されています。</p>
            </div>
          </div>
          <div class="disc-item">
            <div class="disc-icon">🔒</div>
            <div>
              <strong>個人情報は収集しません</strong>
              <p>ログイン情報・予約データはすべてブラウザのsessionStorageにのみ保存され、外部サーバーへの送信は行いません。タブを閉じるとデータは消去されます。</p>
            </div>
          </div>
          <div class="disc-item">
            <div class="disc-icon">⚖️</div>
            <div>
              <strong>免責</strong>
              <p>本サイトの利用によって生じた損害について、作者は一切の責任を負いません。テスト・学習目的の範囲内でご利用ください。</p>
            </div>
          </div>
        </div>
      </section>

      <!-- テスト用アカウント -->
      <section class="section card">
        <h2 class="section-title"><span class="icon">👤</span> テストアカウント</h2>
        <p class="section-desc">以下のアカウントをご利用ください。パスワードはすべて異なります。</p>
        <div class="table-wrap">
          <table class="account-table">
            <thead>
              <tr>
                <th>名前</th>
                <th>メールアドレス</th>
                <th>パスワード</th>
                <th>出発拠点</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="u in testUsers" :key="u.email">
                <td><strong>{{ u.name }}</strong></td>
                <td><code>{{ u.email }}</code></td>
                <td><code>{{ u.password }}</code></td>
                <td>{{ u.base }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="hint">💡 ログイン画面でもアカウント一覧から1クリックで入力できます。</p>
      </section>

      <!-- 操作ガイド -->
      <section class="section card">
        <h2 class="section-title"><span class="icon">📖</span> 操作ガイド</h2>

        <div class="flow-section">
          <h3>🏨 宿泊のみ予約</h3>
          <ol class="flow-steps">
            <li>トップページの「宿泊のみ」タブで目的地・日程・人数を入力</li>
            <li>「目的地を選ぶ」から<strong>Canvasマップ</strong>または<strong>地域リスト</strong>で都道府県を選択</li>
            <li>エリアを選んで「この目的地に決める」をクリック</li>
            <li>ホテル一覧でタイプ・価格スライダー・星評価・設備でフィルター。10件/ページでページング</li>
            <li>ホテル詳細ページで大人/子供人数・代表者情報・支払い方法を入力し「予約する」をクリック</li>
            <li>予約内容・合計金額を確認して「予約を確定する」</li>
            <li>予約番号が発行されて完了（マイページで確認可）</li>
          </ol>
        </div>

        <div class="flow-section">
          <h3>✈️🚄 交通+宿泊セット予約</h3>
          <ol class="flow-steps">
            <li>トップページの「交通+宿泊」タブで出発地・目的地・日程・人数を入力</li>
            <li>片道 / 往復を選択して「検索」クリック（2〜5秒ローディング）</li>
            <li>移動手段カード（新幹線・飛行機・バス）を選択</li>
            <li>往路の時刻を選択（○空席あり / △残りわずか / ✕満席）</li>
            <li>往復の場合は復路の時刻も選択して「次へ（宿泊先を選ぶ）」</li>
            <li>以降は宿泊のみと同様（ホテル一覧 → 詳細 → 確認 → 完了）</li>
          </ol>
        </div>

        <div class="flow-section">
          <h3>⭐ レビュー投稿・確認</h3>
          <ol class="flow-steps">
            <li>宿泊済みのホテル詳細ページを開く（マイページの予約からリンク可）</li>
            <li>ページ下部の「宿泊レビュー」セクションで5項目（清潔さ/接客/立地/設備/コスパ）を評価</li>
            <li>コメントを任意入力して「レビューを投稿」</li>
            <li>レーダーチャートで評価が可視化される</li>
            <li>マイページの予約履歴から「レビューを見る」ボタンでもチャートを確認できる</li>
          </ol>
        </div>

        <div class="flow-section">
          <h3>🗺️ 目的地の選び方</h3>
          <div class="tip-grid">
            <div class="tip-card">
              <div class="tip-icon">🗾</div>
              <strong>Canvasマップから選ぶ</strong>
              <p>HTML5 Canvas描画の47都道府県インタラクティブマップ。ホバーでツールチップ表示。クリックで選択。</p>
            </div>
            <div class="tip-card">
              <div class="tip-icon">📂</div>
              <strong>地域から選ぶ</strong>
              <p>北海道〜九州・沖縄の8地域をアコーディオンで展開し、県→エリアの順に絞り込む。</p>
            </div>
          </div>
        </div>

        <div class="flow-section">
          <h3>📍 移動手段の対応状況</h3>
          <div class="table-wrap">
            <table class="info-table">
              <thead><tr><th>移動手段</th><th>条件</th><th>例</th></tr></thead>
              <tbody>
                <tr>
                  <td>🚄 新幹線</td>
                  <td>出発・目的地が同じ新幹線路線上にある</td>
                  <td>東京 → 大阪（東海道）</td>
                </tr>
                <tr>
                  <td>✈️ 飛行機</td>
                  <td>出発・目的地の両方に空港がある</td>
                  <td>東京 → 沖縄</td>
                </tr>
                <tr>
                  <td>🚌 バス</td>
                  <td>新幹線・飛行機どちらも利用不可の場合</td>
                  <td>山梨 → 鳥取</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="hint">💡 新幹線と飛行機の両方が利用可能な場合は両方が表示されます。</p>
        </div>
      </section>

      <!-- FAQ -->
      <section class="section card">
        <h2 class="section-title"><span class="icon">❓</span> よくある質問</h2>
        <div class="faq-list">
          <div v-for="qa in faqs" :key="qa.q" class="faq-item">
            <button class="faq-q" @click="qa.open = !qa.open">
              <span>Q. {{ qa.q }}</span>
              <span class="faq-arrow" :class="{ open: qa.open }">▼</span>
            </button>
            <div class="faq-a" :class="{ open: qa.open }">
              <p>{{ qa.a }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 新幹線路線一覧 -->
      <section class="section card">
        <h2 class="section-title"><span class="icon">🚄</span> 新幹線路線一覧</h2>
        <div class="table-wrap">
          <table class="info-table">
            <thead><tr><th>路線</th><th>主な停車都道府県</th></tr></thead>
            <tbody>
              <tr v-for="line in shinkansenLines" :key="line.name">
                <td><strong>{{ line.name }}</strong></td>
                <td>{{ line.prefs }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const testUsers = [
  { name: '田中 太郎',   email: 'tanaka@example.com', password: 'Travel#2024', base: '東京' },
  { name: '山田 花子',   email: 'yamada@example.com', password: 'Journey@88',  base: '大阪' },
  { name: '鈴木 一郎',   email: 'suzuki@example.com', password: 'Voyage99!',   base: '宮城' },
  { name: '佐藤 明日香', email: 'sato@example.com',   password: 'Wander2025',  base: '福岡' },
  { name: '伊藤 健',     email: 'ito@example.com',    password: 'Trip!456',    base: '北海道' },
]

const faqs = reactive([
  { q: '予約した内容はどこで確認できますか？', a: 'ログイン後、ナビメニューの「マイページ」から予約履歴を確認できます。スケルトンUI（約1.5秒）の後に履歴が表示されます。', open: false },
  { q: '予約のキャンセルはできますか？', a: '本サイトは架空のデモサービスのため、キャンセル機能はありません。sessionStorageに保存されているため、タブを閉じるとデータは消去されます。', open: false },
  { q: 'ログインしないと何ができますか？', a: '目的地の検索・ホテルの閲覧・移動手段の確認は未ログインでも可能です。予約の確定・レビュー投稿にはログインが必要です。', open: false },
  { q: '予約データはいつ消えますか？', a: 'sessionStorageを使用しているため、ブラウザタブを閉じるとデータは消去されます。ただし、各テストアカウントには初期プリセット予約履歴が登録されています。', open: false },
  { q: 'ホテルに「広告」と表示されることがあります', a: '一部のホテルは広告設定されており、検索結果にヒットした場合に先頭に[PR]として表示されます。通常の検索結果にも重複表示されます。広告表示されるのはランダムで1件のみです。', open: false },
  { q: 'レビューを投稿できません', a: 'レビューは宿泊済みのホテル（予約履歴に存在するホテル）にのみ投稿できます。テストアカウントにはプリセット予約履歴があるので、そのホテルで試してみてください。', open: false },
  { q: '地図が見づらいです', a: 'スマートフォンでは地図（Canvas）が小さく表示される場合があります。「地域から選ぶ」タブ（アコーディオンリスト）のご利用をおすすめします。', open: false },
  { q: '移動手段が表示されません', a: '出発地と目的地の間に新幹線路線・空港がない場合、バスのみ表示されます。また、出発地と目的地が同じ県の場合は移動手段が表示されません。', open: false },
  { q: 'このサイトは何に使えますか？', a: 'Playwright・Selenium・Robot Framework等のブラウザ自動化ツールや、テスト設計・テスト実行の練習にご活用いただけます。ログイン・地図操作・フィルター・ページング・予約フォーム・レビュー投稿・レーダーチャートなど多様な操作要素が含まれています。', open: false },
])

const shinkansenLines = [
  { name: '東海道・山陽新幹線', prefs: '東京 → 神奈川 → 静岡 → 愛知 → 京都 → 大阪 → 兵庫 → 岡山 → 広島 → 山口 → 福岡' },
  { name: '東北新幹線',         prefs: '東京 → 埼玉 → 栃木 → 宮城 → 岩手 → 青森' },
  { name: '上越新幹線',         prefs: '東京 → 埼玉 → 群馬 → 新潟' },
  { name: '北陸新幹線',         prefs: '東京 → 埼玉 → 群馬 → 長野 → 富山 → 石川' },
  { name: '北海道新幹線',       prefs: '青森 → 北海道' },
  { name: '九州新幹線',         prefs: '福岡 → 熊本 → 鹿児島' },
  { name: '西九州新幹線',       prefs: '佐賀 → 長崎' },
]
</script>

<style scoped>
.help-page {
  padding: 32px 0 60px;
}

.disclaimer-hero {
  text-align: center;
  padding: 40px 24px;
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border: 2px solid #f59e0b;
  border-radius: var(--radius);
  margin-bottom: 32px;
}
.disclaimer-hero .disclaimer-icon { font-size: 48px; margin-bottom: 12px; }
.disclaimer-hero h1 { font-size: 24px; font-weight: 800; color: #92400e; margin-bottom: 10px; }
.disclaimer-hero p { font-size: 15px; color: #78350f; max-width: 600px; margin: 0 auto; line-height: 1.7; }
.disclaimer-hero strong { color: #b45309; }

.section { margin-bottom: 28px; padding: 28px; }

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--border);
  display: flex;
  align-items: center;
  gap: 8px;
}
.section-title .icon { font-size: 20px; }

.section-desc { color: var(--text-sub); margin-bottom: 16px; font-size: 14px; }

.disclaimer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
.disc-item {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid var(--border);
}
.disc-icon { font-size: 24px; flex-shrink: 0; }
.disc-item strong { display: block; font-size: 14px; margin-bottom: 6px; color: var(--text); }
.disc-item p { font-size: 13px; color: var(--text-sub); line-height: 1.6; margin: 0; }

.table-wrap { overflow-x: auto; }
.account-table, .info-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.account-table th, .info-table th {
  background: #f1f5f9;
  padding: 10px 14px;
  text-align: left;
  font-weight: 600;
  color: var(--text-sub);
  border-bottom: 2px solid var(--border);
  white-space: nowrap;
}
.account-table td, .info-table td {
  padding: 10px 14px;
  border-bottom: 1px solid var(--border);
  color: var(--text);
}
.account-table tr:last-child td, .info-table tr:last-child td { border-bottom: none; }
code {
  background: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
  color: #0f172a;
}

.hint {
  margin-top: 12px;
  font-size: 13px;
  color: var(--text-sub);
}

.flow-section { margin-bottom: 28px; }
.flow-section:last-child { margin-bottom: 0; }
.flow-section h3 {
  font-size: 15px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 12px;
}
.flow-steps {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.flow-steps li {
  font-size: 14px;
  color: var(--text);
  line-height: 1.6;
}
.flow-steps strong { color: var(--primary-dark); }

.tip-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 14px;
  margin-top: 8px;
}
.tip-card {
  padding: 16px;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 8px;
  font-size: 14px;
}
.tip-icon { font-size: 24px; margin-bottom: 8px; }
.tip-card strong { display: block; margin-bottom: 6px; color: var(--primary-dark); }
.tip-card p { color: var(--text-sub); line-height: 1.6; margin: 0; font-size: 13px; }

.faq-list { display: flex; flex-direction: column; gap: 8px; }
.faq-item { border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
.faq-q {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  background: #f8fafc;
  border: none;
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  text-align: left;
  cursor: pointer;
  transition: background var(--transition);
  gap: 12px;
}
.faq-q:hover { background: #e0f2fe; }
.faq-arrow { font-size: 12px; color: var(--text-sub); transition: transform var(--transition); flex-shrink: 0; }
.faq-arrow.open { transform: rotate(180deg); }
.faq-a {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}
.faq-a.open { max-height: 200px; }
.faq-a p {
  padding: 12px 16px 14px;
  font-size: 14px;
  color: var(--text-sub);
  line-height: 1.7;
  margin: 0;
  border-top: 1px solid var(--border);
}

@media (max-width: 600px) {
  .disclaimer-grid { grid-template-columns: 1fr; }
  .tip-grid { grid-template-columns: 1fr; }
  .section { padding: 20px 16px; }
}
</style>
