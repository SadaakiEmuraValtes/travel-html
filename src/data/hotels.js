export const HOTELS = [
  // 北海道 (prefId: 1)
  { id: 1,   prefId: 1,  area: '札幌・近郊',    name: 'グランドホテル北星',       type: 'hotel',   stars: 5, pricePerNight: 65000, amenities: ['レストラン','バー','フィットネス','スパ','WiFi','朝食付き'], description: '札幌の中心地に位置する最高級ホテル。洗練されたデザインと極上のサービスをご提供。', emoji: '🏔️', rating: 4.8 },
  { id: 2,   prefId: 1,  area: '函館',          name: '函館ベイリゾートホテル',   type: 'hotel',   stars: 3, pricePerNight: 18000, amenities: ['レストラン','大浴場','WiFi','駐車場','朝食付き'], description: '函館湾を望む絶景ホテル。新鮮な海の幸を楽しめるレストランが自慢。', emoji: '🦀', rating: 4.2 },
  { id: 3,   prefId: 1,  area: '富良野・美瑛',  name: 'ペンション花畑',           type: 'ryokan',  stars: 2, pricePerNight: 9000,  amenities: ['朝食付き','WiFi','駐車場'], description: '富良野の丘に佇む小さなペンション。ラベンダー畑が眼前に広がる絶景。', emoji: '💐', rating: 4.0 },

  // 青森 (prefId: 2)
  { id: 4,   prefId: 2,  area: '青森市内',      name: 'アップルグランドホテル青森', type: 'hotel', stars: 4, pricePerNight: 35000, amenities: ['レストラン','バー','フィットネス','WiFi','朝食付き','駐車場'], description: 'りんごで有名な青森を象徴する高級ホテル。ねぶた祭の季節は特に賑わう。', emoji: '🍎', rating: 4.5 },
  { id: 5,   prefId: 2,  area: '弘前・津軽',    name: '弘前城下温泉旅館',         type: 'ryokan', stars: 3, pricePerNight: 20000, amenities: ['温泉','大浴場','レストラン','WiFi','朝食付き'], description: '弘前城を望む老舗温泉旅館。津軽三味線の演奏も楽しめる。', emoji: '🏯', rating: 4.3 },
  { id: 6,   prefId: 2,  area: '十和田・奥入瀬', name: '奥入瀬渓流の宿',          type: 'ryokan', stars: 2, pricePerNight: 11000, amenities: ['温泉','大浴場','朝食付き','駐車場'], description: '奥入瀬渓流のほとりに立つ静かな宿。四季折々の自然を間近で楽しめる。', emoji: '🌿', rating: 4.1 },

  // 岩手 (prefId: 3)
  { id: 7,   prefId: 3,  area: '盛岡・周辺',    name: '盛岡グランドパレス',       type: 'hotel',  stars: 4, pricePerNight: 32000, amenities: ['レストラン','フィットネス','WiFi','朝食付き','会議室'], description: '岩手の県庁所在地に建つ格調高い都市型ホテル。わんこそばも近くで楽しめる。', emoji: '🍜', rating: 4.4 },
  { id: 8,   prefId: 3,  area: '平泉・一関',    name: '平泉文化の宿 金色庵',      type: 'ryokan', stars: 3, pricePerNight: 22000, amenities: ['温泉','大浴場','レストラン','WiFi','朝食付き'], description: '世界遺産・平泉に隣接する風雅な旅館。中尊寺の夕暮れが美しい。', emoji: '⛩️', rating: 4.5 },
  { id: 9,   prefId: 3,  area: '三陸海岸',      name: '三陸漁師の宿',             type: 'ryokan', stars: 2, pricePerNight: 8500,  amenities: ['朝食付き','駐車場','WiFi'], description: '三陸の海の幸が自慢の素朴な民宿。新鮮な魚介料理を堪能できる。', emoji: '🐟', rating: 3.9 },

  // 宮城 (prefId: 4)
  { id: 10,  prefId: 4,  area: '仙台・近郊',    name: 'ホテルメトロポリタン仙台', type: 'hotel',  stars: 5, pricePerNight: 55000, amenities: ['レストラン','バー','スパ','フィットネス','WiFi','朝食付き'], description: '仙台駅直結の最高級ホテル。杜の都・仙台を満喫するなら最適な拠点。', emoji: '🌲', rating: 4.7 },
  { id: 11,  prefId: 4,  area: '松島・塩竈',    name: '松島パークホテル',         type: 'hotel',  stars: 3, pricePerNight: 19000, amenities: ['レストラン','大浴場','WiFi','駐車場','朝食付き'], description: '日本三景の松島を眼下に望む絶景ホテル。牡蠣料理が絶品。', emoji: '🦪', rating: 4.3 },
  { id: 12,  prefId: 4,  area: '気仙沼・南三陸', name: '気仙沼リアス荘',          type: 'ryokan', stars: 2, pricePerNight: 9500,  amenities: ['大浴場','朝食付き','駐車場'], description: '三陸リアス海岸を望む宿。震災復興の地で地元の食文化に触れる旅。', emoji: '🌊', rating: 4.0 },

  // 秋田 (prefId: 5)
  { id: 13,  prefId: 5,  area: '角館・田沢湖',  name: '田沢湖ラビスタ',          type: 'resort', stars: 5, pricePerNight: 70000, amenities: ['温泉','大浴場','スパ','レストラン','プール','WiFi','朝食付き'], description: '日本一深い湖・田沢湖を望むリゾートホテル。秋田の自然と美食を堪能。', emoji: '🏔️', rating: 4.9 },
  { id: 14,  prefId: 5,  area: '秋田市内',      name: 'ホテルニューキャッスル秋田', type: 'hotel', stars: 3, pricePerNight: 16000, amenities: ['レストラン','WiFi','駐車場','朝食付き'], description: '秋田市の中心部にある使い勝手のよいホテル。きりたんぽ鍋を近くで楽しめる。', emoji: '🍲', rating: 4.1 },
  { id: 15,  prefId: 5,  area: '男鹿半島',      name: '男鹿温泉 なまはげの宿',   type: 'ryokan', stars: 2, pricePerNight: 10000, amenities: ['温泉','大浴場','朝食付き','駐車場'], description: 'なまはげで有名な男鹿半島の温泉宿。海と温泉を一緒に楽しめる。', emoji: '👺', rating: 4.0 },

  // 山形 (prefId: 6)
  { id: 16,  prefId: 6,  area: '蔵王・上山',    name: '蔵王温泉グランドホテル',  type: 'hotel',  stars: 4, pricePerNight: 40000, amenities: ['温泉','大浴場','レストラン','スキー場隣接','WiFi','朝食付き'], description: '蔵王温泉スキー場に隣接するリゾートホテル。スノーモンスターも楽しめる。', emoji: '⛷️', rating: 4.6 },
  { id: 17,  prefId: 6,  area: '庄内・鶴岡',    name: '出羽三山参籠宿坊',        type: 'ryokan', stars: 3, pricePerNight: 21000, amenities: ['精進料理','温泉','WiFi','朝食付き'], description: '山岳信仰の聖地・出羽三山での精進料理体験ができる宿坊。', emoji: '⛩️', rating: 4.4 },
  { id: 18,  prefId: 6,  area: '山形市内',      name: 'ビジネスホテル山形プラザ', type: 'hotel',  stars: 2, pricePerNight: 7500,  amenities: ['WiFi','駐車場','朝食付き'], description: '山形市内の中心部に位置するリーズナブルなビジネスホテル。', emoji: '🏨', rating: 3.8 },

  // 福島 (prefId: 7)
  { id: 19,  prefId: 7,  area: '会津若松',      name: '鶴ヶ城温泉 御宿東山',     type: 'ryokan', stars: 4, pricePerNight: 38000, amenities: ['温泉','大浴場','レストラン','WiFi','朝食付き'], description: '会津若松の歴史情緒あふれる旅館。鶴ヶ城を一望できる温泉が自慢。', emoji: '🏯', rating: 4.6 },
  { id: 20,  prefId: 7,  area: '磐梯山・裏磐梯', name: '裏磐梯高原ホテル',        type: 'hotel',  stars: 3, pricePerNight: 20000, amenities: ['レストラン','大浴場','WiFi','駐車場','朝食付き'], description: '磐梯山の麓に広がる湖沼地帯に建つリゾートホテル。', emoji: '🌋', rating: 4.2 },
  { id: 21,  prefId: 7,  area: 'いわき',        name: 'いわきシーサイドイン',     type: 'hotel',  stars: 2, pricePerNight: 9000,  amenities: ['WiFi','駐車場','朝食付き'], description: 'いわきの太平洋を望む海辺のホテル。ハワイアンズも近く。', emoji: '🌊', rating: 3.8 },

  // 茨城 (prefId: 8)
  { id: 22,  prefId: 8,  area: 'つくば・土浦',  name: 'つくばグランドホテル',     type: 'hotel',  stars: 4, pricePerNight: 33000, amenities: ['レストラン','フィットネス','WiFi','朝食付き','会議室'], description: '学術研究都市・つくばの中心部にある格調高いホテル。', emoji: '🔬', rating: 4.3 },
  { id: 23,  prefId: 8,  area: '水戸・周辺',    name: '偕楽園温泉ホテル',        type: 'hotel',  stars: 3, pricePerNight: 17000, amenities: ['温泉','大浴場','レストラン','WiFi','朝食付き'], description: '偕楽園に隣接する梅が香る温泉ホテル。水戸黄門ゆかりの地。', emoji: '🌸', rating: 4.1 },
  { id: 24,  prefId: 8,  area: '大洗・鹿島',    name: '大洗シーサイドステイ',     type: 'ryokan', stars: 2, pricePerNight: 8000,  amenities: ['大浴場','朝食付き','駐車場'], description: '太平洋を一望する大洗の海辺の宿。新鮮な海の幸を満喫。', emoji: '🌊', rating: 3.9 },

  // 栃木 (prefId: 9)
  { id: 25,  prefId: 9,  area: '日光',          name: '日光金谷ホテル',          type: 'hotel',  stars: 5, pricePerNight: 60000, amenities: ['レストラン','バー','フィットネス','WiFi','朝食付き'], description: '日本最古のリゾートホテル。世界遺産・日光東照宮へのアクセス抜群。', emoji: '⛩️', rating: 4.8 },
  { id: 26,  prefId: 9,  area: '鬼怒川温泉',    name: '鬼怒川温泉あさや',        type: 'ryokan', stars: 3, pricePerNight: 25000, amenities: ['温泉','大浴場','レストラン','WiFi','朝食付き'], description: '鬼怒川渓谷を望む老舗温泉旅館。日光杉並木を散策後の一湯が格別。', emoji: '♨️', rating: 4.4 },
  { id: 27,  prefId: 9,  area: '那須高原',       name: '那須高原ロッジ',           type: 'resort', stars: 2, pricePerNight: 10000, amenities: ['大浴場','朝食付き','駐車場','WiFi'], description: '那須高原の自然に囲まれた素朴なロッジ。牧場散策が楽しめる。', emoji: '🐄', rating: 4.0 },

  // 群馬 (prefId: 10)
  { id: 28,  prefId: 10, area: '草津温泉',       name: '草津温泉 湯畑旅館',       type: 'ryokan', stars: 4, pricePerNight: 42000, amenities: ['温泉','大浴場','レストラン','WiFi','朝食付き'], description: '日本三名泉の草津温泉・湯畑のすぐそばに建つ最高の温泉旅館。', emoji: '♨️', rating: 4.7 },
  { id: 29,  prefId: 10, area: '伊香保温泉',     name: '伊香保石段の宿 清風苑',   type: 'ryokan', stars: 3, pricePerNight: 20000, amenities: ['温泉','大浴場','レストラン','朝食付き'], description: '石段街で有名な伊香保温泉の情緒ある旅館。黄金の湯に浸かれる。', emoji: '🏮', rating: 4.3 },
  { id: 30,  prefId: 10, area: '前橋・高崎',     name: '高崎ビジネスホテル',      type: 'hotel',  stars: 2, pricePerNight: 7000,  amenities: ['WiFi','駐車場','朝食付き'], description: '群馬の中心都市・高崎の便利な立地のビジネスホテル。', emoji: '🏨', rating: 3.7 },

  // 埼玉 (prefId: 11)
  { id: 31,  prefId: 11, area: 'さいたま市',     name: 'グランドプリンスホテル大宮', type: 'hotel', stars: 5, pricePerNight: 50000, amenities: ['レストラン','バー','スパ','フィットネス','WiFi','プール','朝食付き'], description: '大宮駅直結の最高級ホテル。会議・宴会施設も充実。', emoji: '🏟️', rating: 4.6 },
  { id: 32,  prefId: 11, area: '川越',           name: '小江戸川越の宿',          type: 'ryokan', stars: 3, pricePerNight: 18000, amenities: ['温泉','大浴場','レストラン','WiFi','朝食付き'], description: '小江戸と呼ばれる川越の古い町並みに溶け込む情緒ある旅館。', emoji: '🏮', rating: 4.2 },
  { id: 33,  prefId: 11, area: '秩父・長瀞',     name: '長瀞ラインくだりの宿',    type: 'ryokan', stars: 2, pricePerNight: 9500,  amenities: ['大浴場','朝食付き','駐車場'], description: '荒川のライン下りで有名な長瀞のほとりに立つ素朴な宿。', emoji: '🛶', rating: 4.0 },

  // 千葉 (prefId: 12)
  { id: 34,  prefId: 12, area: '浦安',           name: 'ホテルオリエンタル浦安', type: 'hotel',   stars: 5, pricePerNight: 75000, amenities: ['プール','スパ','レストラン','バー','フィットネス','WiFi','朝食付き'], description: '東京ディズニーリゾートに隣接する最高級ホテル。夢の国への入口。', emoji: '🏰', rating: 4.9 },
  { id: 35,  prefId: 12, area: '房総半島',        name: '南房総シーリゾート',      type: 'resort', stars: 3, pricePerNight: 22000, amenities: ['プール','レストラン','大浴場','WiFi','駐車場','朝食付き'], description: '房総半島の温暖な気候を活かしたリゾートホテル。海と山を満喫。', emoji: '🌴', rating: 4.2 },
  { id: 36,  prefId: 12, area: '成田・佐倉',     name: '成田エアポートイン',      type: 'hotel',  stars: 2, pricePerNight: 8500,  amenities: ['WiFi','駐車場','朝食付き'], description: '成田空港から無料シャトルバスでアクセスできる利便性の高いホテル。', emoji: '✈️', rating: 3.8 },

  // 東京 (prefId: 13)
  { id: 37,  prefId: 13, area: '都心・新宿',     name: 'パークハイアット東京',    type: 'hotel',  stars: 5, pricePerNight: 80000, amenities: ['プール','スパ','レストラン','バー','フィットネス','WiFi','朝食付き'], description: '新宿副都心の高層ビルに君臨するラグジュアリーホテル。東京の絶景を独占。', emoji: '🗼', rating: 4.9 },
  { id: 38,  prefId: 13, area: '浅草・上野',     name: '浅草ビューホテル',        type: 'hotel',  stars: 3, pricePerNight: 23000, amenities: ['レストラン','WiFi','朝食付き'], description: '浅草の老舗ホテル。スカイツリーと浅草寺が見渡せる客室が人気。', emoji: '⛩️', rating: 4.3 },
  { id: 39,  prefId: 13, area: 'お台場',         name: 'ヴィラ東京ベイ',          type: 'hotel',  stars: 2, pricePerNight: 11000, amenities: ['WiFi','駐車場','朝食付き'], description: 'お台場の夜景を楽しめるリーズナブルなホテル。アクセスも便利。', emoji: '🌃', rating: 3.9 },

  // 神奈川 (prefId: 14)
  { id: 40,  prefId: 14, area: '箱根',           name: '箱根強羅花壇',            type: 'ryokan', stars: 5, pricePerNight: 75000, amenities: ['温泉','大浴場','スパ','レストラン','WiFi','朝食付き'], description: '富士山を望む絶景温泉旅館。日本の美と食の極致を体験。', emoji: '🗻', rating: 4.9 },
  { id: 41,  prefId: 14, area: '横浜',           name: 'ヨコハマグランドインターコンチネンタル', type: 'hotel', stars: 4, pricePerNight: 45000, amenities: ['レストラン','バー','フィットネス','スパ','WiFi','朝食付き'], description: '横浜港に面したランドマーク的ホテル。みなとみらいの夜景が美しい。', emoji: '⚓', rating: 4.6 },
  { id: 42,  prefId: 14, area: '鎌倉・江ノ島',  name: '鎌倉プリンスホテル',      type: 'hotel',  stars: 3, pricePerNight: 20000, amenities: ['レストラン','WiFi','駐車場','朝食付き'], description: '海を望む高台に立つシティリゾートホテル。鎌倉大仏へも徒歩圏内。', emoji: '🪷', rating: 4.2 },

  // 新潟 (prefId: 15)
  { id: 43,  prefId: 15, area: '越後湯沢',       name: '越後湯沢温泉 旅館雪国',   type: 'ryokan', stars: 4, pricePerNight: 38000, amenities: ['温泉','大浴場','スキー場隣接','レストラン','WiFi','朝食付き'], description: '川端康成「雪国」の舞台・越後湯沢の老舗旅館。湯沢の雪と温泉を満喫。', emoji: '❄️', rating: 4.6 },
  { id: 44,  prefId: 15, area: '新潟市内',       name: 'ホテルオークラ新潟',      type: 'hotel',  stars: 3, pricePerNight: 19000, amenities: ['レストラン','フィットネス','WiFi','朝食付き'], description: '日本海に面する新潟の都市型高級ホテル。越後の食材を活かした料理が自慢。', emoji: '🍚', rating: 4.2 },
  { id: 45,  prefId: 15, area: '佐渡島',         name: '佐渡ジャービレッジ',      type: 'resort', stars: 2, pricePerNight: 9000,  amenities: ['大浴場','朝食付き','駐車場','WiFi'], description: 'トキと金山で有名な佐渡島の海辺リゾート。島ならではのゆったり時間を。', emoji: '🦅', rating: 4.0 },

  // 富山 (prefId: 16)
  { id: 46,  prefId: 16, area: '立山・黒部',     name: '立山高原ホテル',          type: 'hotel',  stars: 4, pricePerNight: 40000, amenities: ['温泉','大浴場','レストラン','WiFi','朝食付き','駐車場'], description: '3000m級の峰々が連なる立山連峰のふもとに建つ山岳リゾート。', emoji: '⛰️', rating: 4.7 },
  { id: 47,  prefId: 16, area: '氷見・高岡',     name: '雨晴温泉旅館',            type: 'ryokan', stars: 3, pricePerNight: 21000, amenities: ['温泉','大浴場','レストラン','朝食付き','WiFi'], description: '立山連峰と能登半島を望む絶景の温泉旅館。寒鰤が絶品。', emoji: '🐟', rating: 4.3 },
  { id: 48,  prefId: 16, area: '富山市内',       name: 'ANAクラウンプラザ富山',   type: 'hotel',  stars: 2, pricePerNight: 10000, amenities: ['WiFi','駐車場','朝食付き','レストラン'], description: '富山市の中心部に位置するビジネス・観光兼用のホテル。', emoji: '🏨', rating: 3.9 },

  // 石川 (prefId: 17)
  { id: 49,  prefId: 17, area: '金沢',           name: '金沢クラウンホテル',      type: 'hotel',  stars: 5, pricePerNight: 65000, amenities: ['レストラン','バー','スパ','フィットネス','WiFi','朝食付き'], description: '加賀百万石の文化都市・金沢の最高峰ホテル。近江町市場へも徒歩圏。', emoji: '🌸', rating: 4.8 },
  { id: 50,  prefId: 17, area: '加賀温泉郷',     name: '山代温泉 べにや無何有',   type: 'ryokan', stars: 4, pricePerNight: 45000, amenities: ['温泉','大浴場','スパ','レストラン','WiFi','朝食付き'], description: '加賀温泉郷の中でも随一の名旅館。日本庭園と源泉かけ流しが自慢。', emoji: '♨️', rating: 4.8 },
  { id: 51,  prefId: 17, area: '能登半島',        name: '能登の里山里海の宿',      type: 'ryokan', stars: 2, pricePerNight: 11000, amenities: ['大浴場','朝食付き','駐車場','WiFi'], description: '世界農業遺産・能登の里山里海を体感できる素朴な宿。能登の幸が豊富。', emoji: '🌾', rating: 4.1 },

  // 福井 (prefId: 18)
  { id: 52,  prefId: 18, area: '越前・敦賀',     name: '敦賀若狭ベイホテル',      type: 'hotel',  stars: 4, pricePerNight: 35000, amenities: ['温泉','大浴場','レストラン','WiFi','朝食付き','駐車場'], description: '若狭湾を望む絶景ホテル。日本海の新鮮な海の幸と温泉が自慢。', emoji: '🦀', rating: 4.5 },
  { id: 53,  prefId: 18, area: '東尋坊・永平寺', name: '永平寺温泉 萬松閣',       type: 'ryokan', stars: 3, pricePerNight: 22000, amenities: ['温泉','大浴場','レストラン','WiFi','朝食付き'], description: '曹洞宗大本山・永平寺の参道に面した老舗旅館。精進料理も体験できる。', emoji: '⛩️', rating: 4.4 },
  { id: 54,  prefId: 18, area: '福井市内',       name: 'ホテルフクシアン',        type: 'hotel',  stars: 2, pricePerNight: 8000,  amenities: ['WiFi','駐車場','朝食付き'], description: '福井市内の便利な立地のリーズナブルなビジネスホテル。恐竜博物館への拠点に。', emoji: '🦕', rating: 3.8 },

  // 山梨 (prefId: 19)
  { id: 55,  prefId: 19, area: '富士五湖',       name: '富士レイクサイドホテル',  type: 'resort', stars: 5, pricePerNight: 68000, amenities: ['温泉','大浴場','スパ','レストラン','プール','WiFi','朝食付き'], description: '富士山を目の前に望む最高のリゾートホテル。富士五湖の絶景を独占。', emoji: '🗻', rating: 4.9 },
  { id: 56,  prefId: 19, area: '甲府・周辺',     name: '甲府湯村温泉ホテル',      type: 'hotel',  stars: 3, pricePerNight: 19000, amenities: ['温泉','大浴場','レストラン','WiFi','朝食付き'], description: '山梨の県庁所在地・甲府の温泉ホテル。ほうとう鍋と天然温泉が評判。', emoji: '🍄', rating: 4.2 },
  { id: 57,  prefId: 19, area: '清里・八ヶ岳',  name: '清里高原ユースホステル',  type: 'ryokan', stars: 2, pricePerNight: 7500,  amenities: ['朝食付き','駐車場','WiFi'], description: '八ヶ岳の麓・清里高原のリーズナブルな宿。牧場や自然散策が楽しめる。', emoji: '🐮', rating: 3.9 },

  // 長野 (prefId: 20)
  { id: 58,  prefId: 20, area: '軽井沢',         name: '万平ホテル軽井沢',        type: 'hotel',  stars: 5, pricePerNight: 72000, amenities: ['レストラン','バー','テニスコート','フィットネス','WiFi','朝食付き'], description: '避暑地の代名詞・軽井沢の老舗リゾートホテル。ジョン・レノンも愛した名宿。', emoji: '🌲', rating: 4.8 },
  { id: 59,  prefId: 20, area: '松本・上高地',  name: '上高地帝国ホテル',        type: 'hotel',  stars: 4, pricePerNight: 50000, amenities: ['レストラン','バー','WiFi','朝食付き'], description: '日本の自然の宝庫・上高地に建つ歴史的ホテル。アルプスの絶景が広がる。', emoji: '⛰️', rating: 4.8 },
  { id: 60,  prefId: 20, area: '白馬',           name: '白馬スノーリゾートイン',  type: 'resort', stars: 2, pricePerNight: 10000, amenities: ['スキー場隣接','大浴場','朝食付き','駐車場','WiFi'], description: '白馬スキー場のゲレンデ直結型リゾート。スキー・スノーボードに最高の立地。', emoji: '⛷️', rating: 4.1 },

  // 岐阜 (prefId: 21)
  { id: 61,  prefId: 21, area: '高山・飛騨',     name: '飛騨高山 料亭旅館 本陣平野屋', type: 'ryokan', stars: 5, pricePerNight: 62000, amenities: ['温泉','大浴場','レストラン','WiFi','朝食付き'], description: '江戸時代の情緒が残る飛騨高山の老舗旅館。飛騨牛と温泉が自慢。', emoji: '🥩', rating: 4.8 },
  { id: 62,  prefId: 21, area: '下呂温泉',       name: '下呂温泉 湯の島館',       type: 'ryokan', stars: 3, pricePerNight: 25000, amenities: ['温泉','大浴場','レストラン','WiFi','朝食付き'], description: '日本三名泉の下呂温泉の絶景旅館。飛騨川沿いの露天風呂が格別。', emoji: '♨️', rating: 4.5 },
  { id: 63,  prefId: 21, area: '白川郷',         name: '白川郷合掌の宿',          type: 'ryokan', stars: 2, pricePerNight: 11000, amenities: ['朝食付き','駐車場'], description: '世界遺産・白川郷の合掌造り民宿。雪景色の合掌集落の中で一夜を過ごす。', emoji: '🏠', rating: 4.3 },

  // 静岡 (prefId: 22)
  { id: 64,  prefId: 22, area: '熱海・伊豆',     name: '熱海ホテルミクラス',      type: 'ryokan', stars: 5, pricePerNight: 68000, amenities: ['温泉','大浴場','スパ','レストラン','プール','WiFi','朝食付き'], description: '熱海の山上に君臨する絶景温泉リゾート。相模湾を望む露天風呂が絶品。', emoji: '♨️', rating: 4.8 },
  { id: 65,  prefId: 22, area: '富士山周辺',     name: '富士山ビュー特急の宿',    type: 'hotel',  stars: 3, pricePerNight: 21000, amenities: ['温泉','大浴場','レストラン','WiFi','朝食付き'], description: '富士山を正面に望む好立地のホテル。世界遺産への観光拠点として最適。', emoji: '🗻', rating: 4.4 },
  { id: 66,  prefId: 22, area: '浜松',           name: 'アクトシティ浜松ホテル',  type: 'hotel',  stars: 2, pricePerNight: 9500,  amenities: ['WiFi','駐車場','朝食付き','レストラン'], description: '音楽の街・浜松の市街地に位置する便利なホテル。うなぎも近くで食べられる。', emoji: '🎵', rating: 3.9 },

  // 愛知 (prefId: 23)
  { id: 67,  prefId: 23, area: '名古屋',         name: 'ザ・リッツ・カールトン名古屋', type: 'hotel', stars: 5, pricePerNight: 78000, amenities: ['レストラン','バー','スパ','フィットネス','プール','WiFi','朝食付き'], description: '名古屋の中心・栄に佇く5つ星ホテル。名古屋めしも近くで堪能できる。', emoji: '🏙️', rating: 4.9 },
  { id: 68,  prefId: 23, area: '名古屋',         name: 'ホテルナゴヤキャッスル',   type: 'hotel',  stars: 3, pricePerNight: 20000, amenities: ['レストラン','WiFi','朝食付き','駐車場'], description: '名古屋城を望む老舗シティホテル。名古屋コーチンをはじめ地元料理が充実。', emoji: '🏯', rating: 4.3 },
  { id: 69,  prefId: 23, area: '知多半島',        name: 'セントレア空港隣接ホテル', type: 'hotel',  stars: 2, pricePerNight: 10000, amenities: ['WiFi','駐車場','朝食付き'], description: '中部国際空港・セントレアに隣接する利便性抜群のホテル。', emoji: '✈️', rating: 3.8 },

  // 三重 (prefId: 24)
  { id: 70,  prefId: 24, area: '伊勢・志摩',     name: '志摩観光ホテル ザ クラシック', type: 'hotel', stars: 5, pricePerNight: 70000, amenities: ['レストラン','バー','スパ','フィットネス','WiFi','朝食付き'], description: 'G7伊勢志摩サミットの会場となった伊勢志摩の最高峰ホテル。英虞湾の絶景。', emoji: '🦞', rating: 4.9 },
  { id: 71,  prefId: 24, area: '鳥羽',           name: '鳥羽国際ホテル',          type: 'hotel',  stars: 3, pricePerNight: 24000, amenities: ['温泉','大浴場','レストラン','WiFi','朝食付き'], description: '鳥羽湾を望む海の眺望が自慢のホテル。海女による新鮮な魚介料理が名物。', emoji: '🦪', rating: 4.4 },
  { id: 72,  prefId: 24, area: '津・松阪',       name: '松阪牛の宿',              type: 'ryokan', stars: 2, pricePerNight: 10500, amenities: ['レストラン','朝食付き','駐車場','WiFi'], description: '松阪牛の本場で最高の和牛を堪能できる旅館。肉好きにはたまらない宿。', emoji: '🥩', rating: 4.2 },

  // 滋賀 (prefId: 25)
  { id: 73,  prefId: 25, area: '大津・琵琶湖',  name: 'びわ湖大津プリンスホテル', type: 'hotel',  stars: 5, pricePerNight: 55000, amenities: ['レストラン','バー','スパ','フィットネス','プール','WiFi','朝食付き'], description: '琵琶湖畔に立つ38階建ての優雅なホテル。日本最大の湖の絶景を独占。', emoji: '🌊', rating: 4.7 },
  { id: 74,  prefId: 25, area: '彦根・長浜',    name: '彦根グランドホテル',       type: 'hotel',  stars: 3, pricePerNight: 18000, amenities: ['レストラン','WiFi','駐車場','朝食付き'], description: '重要文化財・彦根城の近くに立つシティホテル。近江牛料理が人気。', emoji: '🏯', rating: 4.1 },
  { id: 75,  prefId: 25, area: '信楽',          name: '信楽焼の宿',              type: 'ryokan', stars: 2, pricePerNight: 9000,  amenities: ['温泉','朝食付き','駐車場'], description: '信楽焼で有名な陶芸の里の宿。たぬきのお腹のような温かい雰囲気。', emoji: '🦝', rating: 3.9 },

  // 京都 (prefId: 26)
  { id: 76,  prefId: 26, area: '京都市内',      name: 'ザ・リッツ・カールトン京都', type: 'hotel', stars: 5, pricePerNight: 80000, amenities: ['レストラン','バー','スパ','フィットネス','プール','WiFi','朝食付き'], description: '鴨川のほとりに佇む京都最高峰のラグジュアリーホテル。日本の美の粋を体験。', emoji: '🌸', rating: 4.9 },
  { id: 77,  prefId: 26, area: '嵐山・嵯峨野', name: '翠嵐 ラグジュアリーコレクション', type: 'ryokan', stars: 4, pricePerNight: 55000, amenities: ['温泉','大浴場','スパ','レストラン','WiFi','朝食付き'], description: '嵐山の竹林と保津川に囲まれた絶景温泉旅館。非日常の京都体験を。', emoji: '🎋', rating: 4.8 },
  { id: 78,  prefId: 26, area: '京都市内',      name: '祇園四条 旅館 梅もと',    type: 'ryokan', stars: 2, pricePerNight: 11000, amenities: ['朝食付き','WiFi'], description: '祇園の路地に佇む小さな旅館。京都らしい風情のある宿で非日常体験を。', emoji: '🏮', rating: 4.1 },

  // 大阪 (prefId: 27)
  { id: 79,  prefId: 27, area: '大阪市内',      name: 'コンラッド大阪',          type: 'hotel',  stars: 5, pricePerNight: 75000, amenities: ['レストラン','バー','スパ','フィットネス','プール','WiFi','朝食付き'], description: '中之島の高層ビルに位置する大阪最高峰のラグジュアリーホテル。', emoji: '🏙️', rating: 4.8 },
  { id: 80,  prefId: 27, area: 'なんば・心斎橋', name: 'クロスホテル大阪',       type: 'hotel',  stars: 3, pricePerNight: 19000, amenities: ['レストラン','WiFi','朝食付き'], description: 'なんばの繁華街に位置するデザインホテル。道頓堀グルメが目の前。', emoji: '🍜', rating: 4.3 },
  { id: 81,  prefId: 27, area: 'ユニバ',        name: 'ホテルユニバーサルポートヴィータ', type: 'hotel', stars: 2, pricePerNight: 10500, amenities: ['WiFi','駐車場','朝食付き','レストラン'], description: 'ユニバーサル・スタジオ・ジャパンへ徒歩すぐの好立地ホテル。', emoji: '🎢', rating: 4.0 },

  // 兵庫 (prefId: 28)
  { id: 82,  prefId: 28, area: '神戸',          name: 'オリエンタルホテル神戸',  type: 'hotel',  stars: 5, pricePerNight: 62000, amenities: ['レストラン','バー','スパ','フィットネス','WiFi','朝食付き'], description: '神戸の旧居留地に位置する格調ある老舗ホテル。神戸ビーフと夜景が自慢。', emoji: '⚓', rating: 4.7 },
  { id: 83,  prefId: 28, area: '有馬温泉',      name: '有馬温泉 ねぎや陵楓閣',   type: 'ryokan', stars: 4, pricePerNight: 48000, amenities: ['温泉','大浴場','レストラン','スパ','WiFi','朝食付き'], description: '日本最古の温泉・有馬温泉の最高峰旅館。金泉・銀泉の両方が楽しめる。', emoji: '♨️', rating: 4.8 },
  { id: 84,  prefId: 28, area: '姫路',          name: '姫路キャッスルホテル',    type: 'hotel',  stars: 2, pricePerNight: 9500,  amenities: ['WiFi','駐車場','朝食付き','レストラン'], description: '世界遺産・姫路城を望む絶景ホテル。白鷺城の美しい姿が窓から。', emoji: '🏯', rating: 4.1 },

  // 奈良 (prefId: 29)
  { id: 85,  prefId: 29, area: '奈良市内',      name: '奈良ホテル',              type: 'hotel',  stars: 5, pricePerNight: 58000, amenities: ['レストラン','バー','フィットネス','WiFi','朝食付き'], description: '「関西の迎賓館」と呼ばれる明治41年創業の老舗ホテル。世界遺産の古都に佇む。', emoji: '🦌', rating: 4.8 },
  { id: 86,  prefId: 29, area: '吉野',          name: '吉野の花の宿 さこや',     type: 'ryokan', stars: 3, pricePerNight: 22000, amenities: ['温泉','大浴場','レストラン','WiFi','朝食付き'], description: '日本一の桜の名所・吉野山の旅館。春の桜シーズンは予約必須の名宿。', emoji: '🌸', rating: 4.5 },
  { id: 87,  prefId: 29, area: '橿原・飛鳥',   name: '飛鳥路の宿',              type: 'ryokan', stars: 2, pricePerNight: 8500,  amenities: ['朝食付き','駐車場','WiFi'], description: '飛鳥時代の遺跡が点在する橿原の宿。古代日本の歴史を感じる旅に。', emoji: '⛩️', rating: 3.9 },

  // 和歌山 (prefId: 30)
  { id: 88,  prefId: 30, area: '白浜',          name: '浜千鳥の湯 海舟',        type: 'resort', stars: 4, pricePerNight: 42000, amenities: ['温泉','大浴場','スパ','レストラン','プール','WiFi','朝食付き'], description: '白浜の白砂の海岸に隣接する温泉リゾート。太平洋を望む露天風呂が最高。', emoji: '🏖️', rating: 4.6 },
  { id: 89,  prefId: 30, area: '高野山',        name: '高野山 宿坊 蓮花定院',    type: 'ryokan', stars: 3, pricePerNight: 20000, amenities: ['精進料理','朝食付き'], description: '弘法大師空海ゆかりの高野山の宿坊。朝の勤行体験と精進料理が魅力。', emoji: '⛩️', rating: 4.5 },
  { id: 90,  prefId: 30, area: '熊野古道',      name: '熊野古道 旅籠',           type: 'ryokan', stars: 2, pricePerNight: 9000,  amenities: ['朝食付き','駐車場'], description: '世界遺産・熊野古道のウォーキングに最適な素朴な旅籠。', emoji: '🌲', rating: 4.0 },

  // 鳥取 (prefId: 31)
  { id: 91,  prefId: 31, area: '鳥取砂丘・周辺', name: '鳥取砂丘コナン空港ホテル', type: 'hotel', stars: 4, pricePerNight: 36000, amenities: ['温泉','大浴場','レストラン','WiFi','朝食付き','駐車場'], description: '日本最大の砂丘・鳥取砂丘のすぐそばのリゾートホテル。境港のカニが絶品。', emoji: '🏜️', rating: 4.5 },
  { id: 92,  prefId: 31, area: '倉吉・三朝',    name: '三朝温泉 旅館万翠楼',     type: 'ryokan', stars: 3, pricePerNight: 22000, amenities: ['温泉','大浴場','レストラン','WiFi','朝食付き'], description: 'ラジウム温泉で有名な三朝温泉の老舗旅館。世界屈指の放射線泉を体験。', emoji: '♨️', rating: 4.3 },
  { id: 93,  prefId: 31, area: '境港・米子',    name: '境港ゲゲゲの宿',          type: 'hotel',  stars: 2, pricePerNight: 8000,  amenities: ['朝食付き','駐車場','WiFi'], description: '水木しげるロードが目の前。ゲゲゲの鬼太郎ゆかりの地でユニークな体験を。', emoji: '👻', rating: 3.9 },

  // 島根 (prefId: 32)
  { id: 94,  prefId: 32, area: '松江・出雲',    name: '出雲ロイヤルホテル',      type: 'hotel',  stars: 4, pricePerNight: 38000, amenities: ['レストラン','温泉','大浴場','WiFi','朝食付き','駐車場'], description: '縁結びの神様・出雲大社に近い温泉ホテル。島根の食文化と縁起物で溢れる宿。', emoji: '⛩️', rating: 4.6 },
  { id: 95,  prefId: 32, area: '石見銀山',      name: '石見銀山 群言堂',         type: 'ryokan', stars: 3, pricePerNight: 24000, amenities: ['レストラン','WiFi','朝食付き'], description: '世界遺産・石見銀山に佇む古民家を改修した宿。地元産の食材にこだわった料理。', emoji: '⛏️', rating: 4.5 },
  { id: 96,  prefId: 32, area: '隠岐',          name: '隠岐の島 旅館あずまや',   type: 'ryokan', stars: 2, pricePerNight: 10000, amenities: ['大浴場','朝食付き','駐車場'], description: '世界ジオパーク・隠岐諸島の海辺の宿。島の豊かな自然と新鮮な魚介を楽しむ。', emoji: '🏝️', rating: 4.0 },

  // 岡山 (prefId: 33)
  { id: 97,  prefId: 33, area: '岡山市内',      name: '岡山国際ホテル',          type: 'hotel',  stars: 4, pricePerNight: 37000, amenities: ['レストラン','バー','フィットネス','WiFi','朝食付き','会議室'], description: '後楽園・岡山城に近い岡山の高級ホテル。桃太郎伝説の里でくつろぐ。', emoji: '🍑', rating: 4.5 },
  { id: 98,  prefId: 33, area: '倉敷・美観地区', name: '倉敷アイビースクエア',    type: 'hotel',  stars: 3, pricePerNight: 21000, amenities: ['レストラン','WiFi','朝食付き'], description: '倉敷美観地区の中心に位置するノスタルジックなホテル。蔦に覆われた建物が印象的。', emoji: '🏘️', rating: 4.4 },
  { id: 99,  prefId: 33, area: '湯郷・奥津温泉', name: '湯郷温泉 旅館奥の宿',    type: 'ryokan', stars: 2, pricePerNight: 9500,  amenities: ['温泉','大浴場','朝食付き','駐車場'], description: '美作三湯の一つ・湯郷温泉の素朴な旅館。疲れを癒す温泉が自慢。', emoji: '♨️', rating: 4.0 },

  // 広島 (prefId: 34)
  { id: 100, prefId: 34, area: '宮島・廿日市',  name: 'グランドプリンス広島',    type: 'hotel',  stars: 5, pricePerNight: 65000, amenities: ['レストラン','バー','スパ','フィットネス','WiFi','朝食付き'], description: '世界遺産・宮島を望む絶景の5つ星ホテル。瀬戸内の美食と絶景を堪能。', emoji: '⛩️', rating: 4.8 },
  { id: 101, prefId: 34, area: '広島市内',      name: 'リーガロイヤルホテル広島', type: 'hotel', stars: 4, pricePerNight: 38000, amenities: ['レストラン','バー','フィットネス','WiFi','朝食付き'], description: '平和の街・広島のシンボル的ホテル。原爆ドーム・平和記念公園へも徒歩圏。', emoji: '🕊️', rating: 4.5 },
  { id: 102, prefId: 34, area: '尾道・福山',    name: '尾道温泉ロープウェイ旅館', type: 'ryokan', stars: 2, pricePerNight: 9000,  amenities: ['温泉','大浴場','朝食付き','駐車場'], description: '映画の舞台として有名な尾道の坂道に佇む風情ある旅館。瀬戸内海の絶景。', emoji: '🌊', rating: 4.1 },

  // 山口 (prefId: 35)
  { id: 103, prefId: 35, area: '下関',          name: '下関グランドホテル',      type: 'hotel',  stars: 4, pricePerNight: 36000, amenities: ['レストラン','温泉','大浴場','WiFi','朝食付き','駐車場'], description: '関門海峡を望む下関の高級ホテル。ふぐ料理と絶景が自慢の名宿。', emoji: '🐡', rating: 4.5 },
  { id: 104, prefId: 35, area: '萩',            name: '萩温泉郷 千春楽',         type: 'ryokan', stars: 3, pricePerNight: 22000, amenities: ['温泉','大浴場','レストラン','WiFi','朝食付き'], description: '幕末の志士たちが歩いた城下町・萩の老舗旅館。萩焼の器で料理を楽しむ。', emoji: '🏯', rating: 4.3 },
  { id: 105, prefId: 35, area: '錦帯橋',        name: '岩国国際観光ホテル',       type: 'hotel',  stars: 2, pricePerNight: 9500,  amenities: ['レストラン','WiFi','駐車場','朝食付き'], description: '日本三名橋の錦帯橋のそばに立つホテル。岩国の自然と歴史を満喫。', emoji: '🌉', rating: 3.9 },

  // 徳島 (prefId: 36)
  { id: 106, prefId: 36, area: '鳴門',          name: '鳴門渦潮の宿',            type: 'hotel',  stars: 4, pricePerNight: 35000, amenities: ['温泉','大浴場','レストラン','WiFi','朝食付き','駐車場'], description: '世界最大の渦潮・鳴門海峡を望む絶景ホテル。鳴門鯛の料理が絶品。', emoji: '🌀', rating: 4.5 },
  { id: 107, prefId: 36, area: '徳島市内',      name: 'アワーズイン阿波おどり', type: 'hotel',  stars: 3, pricePerNight: 18000, amenities: ['レストラン','WiFi','朝食付き'], description: '阿波おどり発祥の地・徳島市内の便利なホテル。8月の阿波おどり祭に最適。', emoji: '💃', rating: 4.2 },
  { id: 108, prefId: 36, area: '祖谷・かずら橋', name: '秘境の宿 ひの字渓谷',    type: 'ryokan', stars: 2, pricePerNight: 9000,  amenities: ['大浴場','朝食付き','駐車場'], description: '日本三大秘境・祖谷の秘湯に佇む宿。かずら橋のスリルも体験できる。', emoji: '🌉', rating: 4.2 },

  // 香川 (prefId: 37)
  { id: 109, prefId: 37, area: '直島',          name: '直島ベネッセアートサイト', type: 'resort', stars: 5, pricePerNight: 72000, amenities: ['レストラン','プール','スパ','WiFi','朝食付き'], description: '現代アートの聖地・直島の超高級アートホテル。草間彌生のカボチャが有名。', emoji: '🎨', rating: 4.9 },
  { id: 110, prefId: 37, area: '高松',          name: 'JRホテルクレメント高松',  type: 'hotel',  stars: 3, pricePerNight: 20000, amenities: ['レストラン','フィットネス','WiFi','朝食付き'], description: '高松駅直結の便利なホテル。うどん県・香川のさぬきうどんを毎朝楽しめる。', emoji: '🍜', rating: 4.2 },
  { id: 111, prefId: 37, area: 'こんぴらさん',  name: '琴平温泉 旅館桝家',       type: 'ryokan', stars: 2, pricePerNight: 9500,  amenities: ['温泉','大浴場','朝食付き','駐車場'], description: 'こんぴらさんの長い石段の近くに建つ情緒ある温泉旅館。', emoji: '⛩️', rating: 4.0 },

  // 愛媛 (prefId: 38)
  { id: 112, prefId: 38, area: '松山・道後温泉', name: '道後温泉ホテル椿館',      type: 'ryokan', stars: 5, pricePerNight: 68000, amenities: ['温泉','大浴場','スパ','レストラン','WiFi','朝食付き'], description: '日本最古の温泉・道後温泉の最高峰旅館。「千と千尋」のモデルとも言われる。', emoji: '♨️', rating: 4.9 },
  { id: 113, prefId: 38, area: '今治',          name: '今治国際ホテル',          type: 'hotel',  stars: 3, pricePerNight: 19000, amenities: ['レストラン','WiFi','朝食付き','駐車場'], description: 'しまなみ海道の起点・今治のシティホテル。今治タオルと絶景の海峡が自慢。', emoji: '🌉', rating: 4.2 },
  { id: 114, prefId: 38, area: '宇和島',        name: '宇和島闘牛の宿',          type: 'ryokan', stars: 2, pricePerNight: 8500,  amenities: ['大浴場','朝食付き','駐車場'], description: '四国最南端・宇和島の海辺の宿。宇和島のじゃこ天と真鯛料理が名物。', emoji: '🐟', rating: 3.9 },

  // 高知 (prefId: 39)
  { id: 115, prefId: 39, area: '桂浜',          name: '高知桂浜温泉ホテル',      type: 'hotel',  stars: 4, pricePerNight: 38000, amenities: ['温泉','大浴場','レストラン','WiFi','朝食付き','プール'], description: '坂本龍馬像が立つ桂浜を望む温泉ホテル。高知の豪快な食文化を体験。', emoji: '🌊', rating: 4.5 },
  { id: 116, prefId: 39, area: '高知市内',      name: 'ザ・クラウンパレス新阪急高知', type: 'hotel', stars: 3, pricePerNight: 18000, amenities: ['レストラン','WiFi','朝食付き'], description: 'よさこい祭りの街・高知市内のシティホテル。かつおのたたきが自慢の夕食。', emoji: '🐟', rating: 4.2 },
  { id: 117, prefId: 39, area: '四万十川',      name: '四万十川源流の宿',         type: 'ryokan', stars: 2, pricePerNight: 8500,  amenities: ['大浴場','朝食付き','駐車場'], description: '日本最後の清流・四万十川のほとりに立つ素朴な宿。沈下橋観光の拠点に。', emoji: '🌿', rating: 4.1 },

  // 福岡 (prefId: 40)
  { id: 118, prefId: 40, area: '福岡市内',      name: 'グランドハイアット福岡',  type: 'hotel',  stars: 5, pricePerNight: 65000, amenities: ['レストラン','バー','スパ','フィットネス','プール','WiFi','朝食付き'], description: 'アジアの玄関口・福岡の中心・博多に位置する5つ星ホテル。', emoji: '🍜', rating: 4.8 },
  { id: 119, prefId: 40, area: '博多',          name: 'ホテルオークラ福岡',       type: 'hotel',  stars: 3, pricePerNight: 22000, amenities: ['レストラン','フィットネス','WiFi','朝食付き'], description: '博多駅から徒歩圏内の格式あるホテル。博多ラーメン・もつ鍋の名店が近く。', emoji: '🍲', rating: 4.3 },
  { id: 120, prefId: 40, area: '太宰府',        name: '太宰府参道の宿',          type: 'ryokan', stars: 2, pricePerNight: 9000,  amenities: ['朝食付き','駐車場','WiFi'], description: '学問の神様・菅原道真公をまつる太宰府天満宮の参道に立つ宿。梅が枝餅が名物。', emoji: '⛩️', rating: 4.0 },

  // 佐賀 (prefId: 41)
  { id: 121, prefId: 41, area: '嬉野・武雄温泉', name: '嬉野温泉 和多屋別荘',    type: 'ryokan', stars: 5, pricePerNight: 58000, amenities: ['温泉','大浴場','スパ','レストラン','WiFi','朝食付き'], description: '日本三大美肌の湯・嬉野温泉の最高峰旅館。シルクのような泉質が有名。', emoji: '♨️', rating: 4.8 },
  { id: 122, prefId: 41, area: '唐津・呼子',    name: '唐津城温泉ホテル',        type: 'hotel',  stars: 3, pricePerNight: 21000, amenities: ['温泉','大浴場','レストラン','WiFi','朝食付き'], description: '唐津城を望む温泉ホテル。呼子のイカの活き造りを堪能できる。', emoji: '🦑', rating: 4.3 },
  { id: 123, prefId: 41, area: '佐賀市内',      name: 'ガーデンホテル佐賀',       type: 'hotel',  stars: 2, pricePerNight: 8000,  amenities: ['WiFi','駐車場','朝食付き'], description: '有田焼・伊万里焼で有名な佐賀の便利なビジネスホテル。', emoji: '🏺', rating: 3.8 },

  // 長崎 (prefId: 42)
  { id: 124, prefId: 42, area: '長崎市内',      name: 'ANAホリデイイン長崎グラバーヒル', type: 'hotel', stars: 4, pricePerNight: 38000, amenities: ['レストラン','バー','フィットネス','WiFi','朝食付き'], description: '長崎グラバー園を望む丘の上のホテル。長崎の夜景と異国情緒を楽しむ。', emoji: '🏙️', rating: 4.5 },
  { id: 125, prefId: 42, area: 'ハウステンボス', name: 'ホテルヨーロッパ',        type: 'resort', stars: 5, pricePerNight: 70000, amenities: ['レストラン','バー','スパ','フィットネス','プール','WiFi','朝食付き'], description: 'ハウステンボスの中にある欧州貴族の邸宅をイメージした5つ星ホテル。', emoji: '🌷', rating: 4.7 },
  { id: 126, prefId: 42, area: '雲仙',          name: '雲仙温泉 山田屋旅館',     type: 'ryokan', stars: 2, pricePerNight: 9500,  amenities: ['温泉','大浴場','朝食付き','駐車場'], description: '地獄地帯で有名な雲仙温泉の素朴な旅館。白い硫黄の煙が立ち込める温泉街。', emoji: '♨️', rating: 4.0 },

  // 熊本 (prefId: 43)
  { id: 127, prefId: 43, area: '阿蘇',          name: '阿蘇リゾートグランヴィリオホテル', type: 'resort', stars: 4, pricePerNight: 42000, amenities: ['温泉','大浴場','レストラン','フィットネス','WiFi','朝食付き','プール'], description: '世界最大のカルデラ・阿蘇山の大自然を満喫できるリゾートホテル。', emoji: '🌋', rating: 4.6 },
  { id: 128, prefId: 43, area: '熊本市内',      name: '熊本城ホテルキャッスル',  type: 'hotel',  stars: 3, pricePerNight: 20000, amenities: ['レストラン','WiFi','朝食付き','駐車場'], description: '熊本城を目の前に望む老舗シティホテル。熊本ラーメンと馬刺しが名物。', emoji: '🏯', rating: 4.3 },
  { id: 129, prefId: 43, area: '黒川温泉',      name: '黒川温泉 旅館たかの',     type: 'ryokan', stars: 2, pricePerNight: 10000, amenities: ['温泉','大浴場','朝食付き','駐車場'], description: '秘境の温泉地・黒川温泉の入湯手形で多くの露天風呂をはしごできる宿。', emoji: '♨️', rating: 4.2 },

  // 大分 (prefId: 44)
  { id: 130, prefId: 44, area: '由布院',        name: '由布院玉の湯',            type: 'ryokan', stars: 5, pricePerNight: 72000, amenities: ['温泉','大浴場','スパ','レストラン','WiFi','朝食付き'], description: '温泉天国・由布院の最高峰旅館。由布岳を望む静謐な空間でのんびりと。', emoji: '♨️', rating: 5.0 },
  { id: 131, prefId: 44, area: '別府',          name: '別府温泉 双葉荘',         type: 'ryokan', stars: 3, pricePerNight: 22000, amenities: ['温泉','大浴場','レストラン','WiFi','朝食付き'], description: '地獄めぐりで有名な別府温泉の老舗旅館。8つの泉質を楽しめる温泉天国。', emoji: '🌋', rating: 4.4 },
  { id: 132, prefId: 44, area: '大分市内',      name: 'ホテルサンルート大分',     type: 'hotel',  stars: 2, pricePerNight: 8500,  amenities: ['WiFi','駐車場','朝食付き'], description: '大分市内の中心部にある便利なビジネスホテル。かぼすの産地で食文化も豊か。', emoji: '🍋', rating: 3.8 },

  // 宮崎 (prefId: 45)
  { id: 133, prefId: 45, area: '日南海岸',      name: 'フェニックス・シーガイア・リゾート', type: 'resort', stars: 5, pricePerNight: 68000, amenities: ['プール','スパ','フィットネス','ゴルフ','レストラン','WiFi','朝食付き'], description: '日本最大級のリゾートホテル。太平洋の青い海と長い砂浜が広がる。', emoji: '🌴', rating: 4.7 },
  { id: 134, prefId: 45, area: '高千穂',        name: '高千穂温泉旅館 角屋',     type: 'ryokan', stars: 3, pricePerNight: 20000, amenities: ['温泉','大浴場','レストラン','WiFi','朝食付き'], description: '神話の里・高千穂峡のそばに立つ旅館。高千穂夜神楽の鑑賞も楽しめる。', emoji: '⛩️', rating: 4.4 },
  { id: 135, prefId: 45, area: '宮崎市内',      name: 'ANA ホリデイイン宮崎',    type: 'hotel',  stars: 2, pricePerNight: 9000,  amenities: ['WiFi','駐車場','朝食付き','レストラン'], description: 'プロ野球のキャンプ地・宮崎市内のスポーツの街ホテル。宮崎地鶏が名物。', emoji: '⚾', rating: 3.9 },

  // 鹿児島 (prefId: 46)
  { id: 136, prefId: 46, area: '屋久島',        name: '屋久島環境文化村センター宿', type: 'resort', stars: 5, pricePerNight: 68000, amenities: ['温泉','大浴場','スパ','レストラン','WiFi','朝食付き'], description: '縄文杉で有名な世界遺産・屋久島の自然の中の高級リゾート宿。', emoji: '🌲', rating: 4.8 },
  { id: 137, prefId: 46, area: '鹿児島市内',    name: 'ザ・センチュリーホテル鹿児島', type: 'hotel', stars: 4, pricePerNight: 40000, amenities: ['レストラン','バー','フィットネス','WiFi','朝食付き'], description: '桜島を望む鹿児島市内の高級ホテル。黒豚・黒牛・薩摩地鶏の料理が充実。', emoji: '🌋', rating: 4.5 },
  { id: 138, prefId: 46, area: '指宿・知覧',    name: '指宿温泉 砂むし会館 砂楽',type: 'ryokan', stars: 2, pricePerNight: 9500,  amenities: ['砂むし温泉','大浴場','朝食付き','駐車場'], description: '天然砂むし温泉で有名な指宿の宿。全身を砂で覆われる珍しい体験を。', emoji: '🏖️', rating: 4.2 },

  // 沖縄 (prefId: 47)
  { id: 139, prefId: 47, area: '北部・恩納村',  name: 'ザ・リッツ・カールトン沖縄', type: 'resort', stars: 5, pricePerNight: 80000, amenities: ['プール','スパ','フィットネス','レストラン','バー','WiFi','朝食付き'], description: 'エメラルドグリーンの海を独占する沖縄最高峰のリゾートホテル。', emoji: '🌺', rating: 5.0 },
  { id: 140, prefId: 47, area: '那覇・首里',    name: 'ダブルツリーbyヒルトン那覇', type: 'hotel', stars: 3, pricePerNight: 23000, amenities: ['プール','レストラン','WiFi','朝食付き'], description: '首里城に近い那覇市内の便利なホテル。国際通りのショッピングへも好アクセス。', emoji: '🏯', rating: 4.3 },
  { id: 141, prefId: 47, area: '石垣島',        name: '石垣リゾート ふさき',     type: 'resort', stars: 4, pricePerNight: 45000, amenities: ['プール','スパ','レストラン','WiFi','朝食付き','ペット可'], description: '石垣島の白砂のビーチに面したリゾートホテル。マングローブクルーズも楽しめる。', emoji: '🏝️', rating: 4.7 },
]

export function getHotelsByPref(prefId) { return HOTELS.filter(h => h.prefId === prefId) }
export function getHotelById(id) { return HOTELS.find(h => h.id === id) }
