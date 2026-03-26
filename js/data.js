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
const MAPTILER_TILE_URL = `https://api.maptiler.com/maps/${MAPTILER_STYLE_ID}/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`;

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
   PNG 前提
========================= */
const dragonImageMap = {
  spot01: {
    locked: "images/1-A.png",
    unlocked: "images/1-B.png"
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
    images: { single: DRINK_WATER_URL },
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
      correctValue: "B"
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
      correctValue: "C"
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
      correctValue: "A"
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
      correctValue: "C"
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
      correctValue: "A"
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
      correctValue: "A"
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
      correctValue: "C"
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
      correctValue: "A"
    }
  }
];
