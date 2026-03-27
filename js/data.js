const API_URL = "https://script.google.com/macros/s/AKfycbx3AGuRyNJe0mDxP5jb-JkkjE1npzYkRYSD2eHZlqceMaR2pvQiESmnxfUGV9kVyBBH/exec";

const OLD_URL = "https://miyasy0525.github.io/gps-test/images/old.jpg?v=6";
const NEW_URL = "https://miyasy0525.github.io/gps-test/images/new.jpg?v=6";

const DRINK_WATER_URL = NEW_URL;

/*
  動作確認用:
  ここが空文字だと「封印を解く」ボタンは表示されません。
  実運用時は本物の報酬URLに差し替えてください。
*/
const SEAL_LINK = "#";

/* =========================
   MapTiler
========================= */
const MAPTILER_KEY = "6bM0wJwEREYxPUpDEK46";
const MAPTILER_STYLE_ID = "jp-mierune-streets";
const MAPTILER_TILE_URL = `https://api.maptiler.com/maps/${MAPTILER_STYLE_ID}/{z}/{x}/{y}.jpg?key=${MAPTILER_KEY}`;

/* =========================
   GPS安定判定設定
========================= */
const GPS_SETTINGS = {
  requiredAccuracy: 35,
  stableDistance: 25,
  requiredStableCount: 2,
  watchTimeout: 15000,
  maximumAge: 0,
  defaultZoom: 17,
  stableZoom: 17
};

/* =========================
   管理用PIN
========================= */
const ADMIN_PIN = "2525";
const HOTSPOT_HOLD_MS = 5000;

/* =========================
   竜画像対応
   未クリア = A（シルエット）
   クリア後 = B（カラー）
========================= */
const dragonImageMap = {
  spot01: {
    locked: "images/1-A.png",
    unlocked: "images/1-B.png"
  },
  spot02: {
    locked: "images/2-A.png",
    unlocked: "images/2-B.png"
  },
  spot03: {
    locked: "images/3-A.png",
    unlocked: "images/3-B.png"
  },
  spot04: {
    locked: "images/4-A.png",
    unlocked: "images/4-B.png"
  },
  spot05: {
    locked: "images/5-A.png",
    unlocked: "images/5-B.png"
  },
  spot06: {
    locked: "images/6-A.png",
    unlocked: "images/6-B.png"
  },
  spot07: {
    locked: "images/7-A.png",
    unlocked: "images/7-B.png"
  },
  spot08: {
    locked: "images/8-A.png",
    unlocked: "images/8-B.png"
  }
};

/* =========================
   地図ピース対応
========================= */
const pieceMap = {
  spot01: 1,
  spot02: 2,
  spot03: 3,
  spot04: 4,
  spot05: 5,
  spot06: 6,
  spot07: 7,
  spot08: 8
};

/* 右上アイコン用 */
const iconMap = {
  spot01: "map/mapicon1.png",
  spot02: "map/mapicon2.png",
  spot03: "map/mapicon3.png",
  spot04: "map/mapicon4.png",
  spot05: "map/mapicon5.png",
  spot06: "map/mapicon6.png",
  spot07: "map/mapicon7.png",
  spot08: "map/mapicon8.png"
};

/* 飛行エフェクト用 */
const pieceEffectMap = {
  spot01: "map/mappiece1.png",
  spot02: "map/mappiece2.png",
  spot03: "map/mappiece3.png",
  spot04: "map/mappiece4.png",
  spot05: "map/mappiece5.png",
  spot06: "map/mappiece6.png",
  spot07: "map/mappiece7.png",
  spot08: "map/mappiece8.png"
};

const spots = [
  {
    spot_id: "spot01",
    spot_name: "第1問　富士山の水",
    latitude: 35.506855,
    longitude: 138.744967,
    radius_m: 100,
    mediaMode: "single",
    images: { single: "Q1-A.jpg" },
    content: {
      description: "この場所では、富士山から流れてきた湧き水を飲むことができます。",
      question: "この水は、どれくらいの時間をかけてここに湧き出しているでしょうか？",
      hint: "ヒント：オリンピックが6回くらい開催される時間がかかります。",
      tip: "",
      choices: [
        { value: "A", label: "10年～20年" },
        { value: "B", label: "20年～30年" },
        { value: "C", label: "30年～50年" }
      ],
      correctValue: "B",
      reviewTitle: "第1問　富士山の水　正解解説",
      reviewLead: "この場所では、富士山から流れてきた湧き水を飲むことができます。",
      reviewAnswer: "正解は「B：20年～30年」です。",
      reviewComment: "富士山にしみこんだ雨や雪は、地下の地層をゆっくり通りながら、長い時間をかけてこの地域へ流れてきます。今飲んでいる水は、20年から30年も前に富士山へ降った水かもしれません。高いワインみたいに、長い時間をかけてできたありがたい水なんですね。"
    }
  },
  {
    spot_id: "spot02",
    spot_name: "第2問　富士講",
    latitude: 35.50693,
    longitude: 138.74504,
    radius_m: 100,
    mediaMode: "single",
    images: { single: NEW_URL },
    content: {
      description: "富士山を対象にした信仰について考えてみましょう。",
      question: "富士山を対象にし、江戸時代に流行した信仰とその開祖で正しい組み合わせは？",
      hint: "ヒント：講とは現代のサークルやクラブのような意味です。",
      tip: "",
      choices: [
        { value: "A", label: "神道と神武天皇" },
        { value: "B", label: "修験道と役小角" },
        { value: "C", label: "富士講と長谷川角行" }
      ],
      correctValue: "C",
      reviewTitle: "第2問　富士講　正解解説",
      reviewLead: "江戸時代には、富士山を信仰する人たちがたくさんいました。",
      reviewAnswer: "正解は「C：富士講と長谷川角行」です。",
      reviewComment: "富士講は、富士山を特別な山として信仰し、仲間どうしでお参りや修行を行う集まりでした。その始まりに関わった人物として知られているのが長谷川角行です。忍野八海も、こうした富士山信仰と深くつながっています。"
    }
  },
  {
    spot_id: "spot03",
    spot_name: "第3問　誰が整備した？",
    latitude: 35.50701,
    longitude: 138.74512,
    radius_m: 100,
    mediaMode: "single",
    images: { single: NEW_URL },
    content: {
      description: "東圓寺を中心として、忍野八海の整備に関わった人物と講中について考えましょう。",
      question: "（a）は、東圓寺を中心として（b）を立ち上げ、忍野八海を整備しました。",
      hint: "ヒント：ドラえもんに発音が似てるよ。",
      tip: "",
      choices: [
        { value: "A", label: "（a）大寄友右衛門　（b）大我講" },
        { value: "B", label: "（a）大塩平八郎　（b）丸吉講" },
        { value: "C", label: "（a）伊能忠敬　（b）町火消" }
      ],
      correctValue: "A",
      reviewTitle: "第3問　誰が整備した？　正解解説",
      reviewLead: "忍野八海の整備には、地域の人々と講中の力が関わっていました。",
      reviewAnswer: "正解は「A：（a）大寄友右衛門　（b）大我講」です。",
      reviewComment: "東圓寺を中心として活動した大寄友右衛門たちは、大我講を立ち上げ、忍野八海の整備に取り組みました。今きれいに見ることができる景観は、こうした地域の努力によって形づくられてきたのです。"
    }
  },
  {
    spot_id: "spot04",
    spot_name: "第4問　なぜ整備された？",
    latitude: 35.50709,
    longitude: 138.7452,
    radius_m: 100,
    mediaMode: "single",
    images: { single: NEW_URL },
    content: {
      description: "村の人々が困っていた時代を想像しながら考えてみましょう。",
      question: "忍野八海は、（a）で困窮した忍草村を（b）するために整備された。",
      hint: "",
      tip: "動画の中にヒントがあります。",
      choices: [
        { value: "A", label: "（a）享保の飢饉　（b）維持・管理" },
        { value: "B", label: "（a）天明の飢饉　（b）縮小・整理" },
        { value: "C", label: "（a）天保の飢饉　（b）復興・救済" }
      ],
      correctValue: "C",
      reviewTitle: "第4問　なぜ整備された？　正解解説",
      reviewLead: "忍野八海の整備には、村を立て直したいという思いがありました。",
      reviewAnswer: "正解は「C：（a）天保の飢饉　（b）復興・救済」です。",
      reviewComment: "天保の飢饉で苦しくなった忍草村を、もう一度元気にしたいという願いから、忍野八海の整備は進められました。ただ景色を整えたのではなく、地域を助けるための大切な取り組みでもあったのです。"
    }
  },
  {
    spot_id: "spot05",
    spot_name: "第5問　誰が管理した？",
    latitude: 35.50717,
    longitude: 138.74528,
    radius_m: 100,
    mediaMode: "single",
    images: { single: NEW_URL },
    content: {
      description: "富士講と忍野八海の違いを考えてみましょう。",
      question: "大我講は（a）ではなく、（b）に管理されていました。",
      hint: "ヒント：たまにお香の香りがします。",
      tip: "",
      choices: [
        { value: "A", label: "（a）神社　（b）上野寛永寺" },
        { value: "B", label: "（a）幕府　（b）伊勢神宮" },
        { value: "C", label: "（a）藩　（b）奉行所" }
      ],
      correctValue: "A",
      reviewTitle: "第5問　誰が管理した？　正解解説",
      reviewLead: "忍野八海に関わる講中は、どこに属していたのかも大切なポイントです。",
      reviewAnswer: "正解は「A：（a）神社　（b）上野寛永寺」です。",
      reviewComment: "大我講は神社の管理ではなく、上野寛永寺に関わる形で管理されていました。富士山信仰には神道だけでなく仏教とも結びついた歴史があり、そのことが忍野八海の成り立ちにも表れています。"
    }
  },
  {
    spot_id: "spot06",
    spot_name: "第6問　星と池",
    latitude: 35.50725,
    longitude: 138.74536,
    radius_m: 100,
    mediaMode: "single",
    images: { single: NEW_URL },
    content: {
      description: "忍野八海は、星の並びになぞらえて造られたともいわれています。",
      question: "忍野八海はある星座に基づいて造られています。ひしゃくの形の星座と、夜空でほとんど動かない明るい星の組み合わせとして正しいものはどれでしょうか？",
      hint: "",
      tip: "チップス：実験用の純粋な水としてNASAが宇宙に持って行ったことも！",
      choices: [
        { value: "A", label: "北斗七星と北極星" },
        { value: "B", label: "オリオン座とシリウス" },
        { value: "C", label: "カシオペア座と北極星" }
      ],
      correctValue: "A",
      reviewTitle: "第6問　星と池　正解解説",
      reviewLead: "忍野八海は、星の並びと結びつけて考えられることがあります。",
      reviewAnswer: "正解は「A：北斗七星と北極星」です。",
      reviewComment: "ひしゃくのような形で知られる北斗七星と、その先に見つけられる北極星。この組み合わせは昔から特別な意味を持っていました。忍野八海の池の配置も、こうした星の世界と重ねて見られてきたのです。"
    }
  },
  {
    spot_id: "spot07",
    spot_name: "第7問　村おこしのしくみ",
    latitude: 35.50733,
    longitude: 138.74544,
    radius_m: 100,
    mediaMode: "single",
    images: { single: NEW_URL },
    content: {
      description: "昔の取り組みが、今の観光につながっていることを考えてみましょう。",
      question: "忍草村にある、水が湧き出す池を（a）、現代の（b）の仕組みを作り、（c）を目指す村おこし事業だった。",
      hint: "ヒント：今、あなたの周りにどんな人がたくさんいるか考えてみましょう。",
      tip: "",
      choices: [
        { value: "A", label: "（a）選んで　（b）投資　（c）移住と拡大" },
        { value: "B", label: "（a）埋め立て　（b）M＆A　（c）人口増と景観保全" },
        { value: "C", label: "（a）繋げて　（b）クラウドファンディング　（c）観光誘致と地域の向上" }
      ],
      correctValue: "C",
      reviewTitle: "第7問　村おこしのしくみ　正解解説",
      reviewLead: "忍野八海の整備は、昔の村おこしのような役割も持っていました。",
      reviewAnswer: "正解は「C：（a）繋げて　（b）クラウドファンディング　（c）観光誘致と地域の向上」です。",
      reviewComment: "池をひとつひとつ結びつけて魅力ある場所にし、多くの人に来てもらうことで地域を元気にする。その考え方は、今でいうクラウドファンディングや観光による地域活性化にも通じるものがあります。昔の人たちの工夫が、今の観光にもつながっているのです。"
    }
  },
  {
    spot_id: "spot08",
    spot_name: "第8問　石碑のことば",
    latitude: 35.50741,
    longitude: 138.74552,
    radius_m: 100,
    mediaMode: "single",
    images: { single: NEW_URL },
    content: {
      description: "あなたの近くにある石碑を見つけてください。",
      question: "この石碑は、（A）という意味を伝えていて、このような石碑は忍野八海に（B）あります。",
      hint: "ヒント：昔の人は「ふ」と書いて「う」と読みました。",
      tip: "",
      choices: [
        { value: "A", label: "（A）昔から変わらない水の尊さ　（B）8" },
        { value: "B", label: "（A）風と音の美しさ　（B）6" },
        { value: "C", label: "（A）川の流れの速さ　（B）9" }
      ],
      correctValue: "A",
      reviewTitle: "第8問　石碑のことば　正解解説",
      reviewLead: "石碑には、この場所にこめられた大切な思いが刻まれています。",
      reviewAnswer: "正解は「A：（A）昔から変わらない水の尊さ　（B）8」です。",
      reviewComment: "忍野八海には、それぞれの場所に意味を持つ石碑があり、水のありがたさや歴史を今に伝えています。昔の人が大切にしてきた水の価値を、石に刻んで後の人へ残そうとしたのです。"
    }
  }
];
