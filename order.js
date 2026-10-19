function getActionOrder() {
    const characters = [
        { name: "Mitsuhiro", id: "mitsuhiro-icon", spd: mitSpd, hp: mitHp },
        { name: "Ryuji", id: "ryuji-icon", spd: ryuSpd, hp: ryuHp },
        { name: "Keizo", id: "keizo-icon", spd: keiSpd, hp: keiHp }
        // ここに敵（Enemy）のデータも同じように追加できます
    ];
    aliveCharacters.sort((a, b) => {
        // 素早さに 0〜9 のランダム値を足して比較する
        const aSpd = a.spd + Math.floor(Math.random() * 10);
        const bSpd = b.spd + Math.floor(Math.random() * 10);
        return bSpd - aSpd;
    });
}

let turnOrder = []; // 今のターンの行動順リスト
let currentActionIndex = 0; // 現在行動しているキャラクターのインデックス

// ターンを開始する関数
function startTurn() {
    // 全滅チェック（全員のHPが0以下なら終了）
    if (mitHp <= 0 && ryuHp <= 0 && keiHp <= 0) {
        console.log("全滅しました…ゲームオーバー");
        return;
    }
    // ※ここに敵が全滅したかのチェックも入れると良いです

    console.log("--- 新しいターン開始 ---");
    
    // 素早さ順に並んだ行動リストを取得
    turnOrder = getActionOrder(); 
    currentActionIndex = 0;

    // 最初のキャラクターの行動を開始
    executeNextAction();
}

// 1人ずつの行動を順番に処理していく関数
function executeNextAction() {
    // ターンの全員が行動を終えたら、次のターンへ
    if (currentActionIndex >= turnOrder.length) {
        startTurn(); 
        return;
    }

    // 現在の行動者を取得
    const attacker = turnOrder[currentActionIndex];

    // 行動中に死んでしまっていたらスキップして次の人へ
    // （直前の人の攻撃で倒される可能性があるため）
    if (checkHpById(attacker.id) <= 0) {
        currentActionIndex++;
        executeNextAction();
        return;
    }

    console.log(`${attacker.name} の行動です！（素早さ: ${attacker.spd}）`);

    // ここで実際の「たたかう」「スキル」などの行動処理を行います
    // 例: プレイヤーならコマンドボタンを表示して入力を待つ、敵なら自動で攻撃など
    
    // 【重要】行動やアニメーションが終わったタイミングで、
    // 次の人に進めるために以下の2行を実行します。
    // (今回はテスト用にすぐ次の人に回します)
    setTimeout(() => {
        currentActionIndex++;
        executeNextAction();
    }, 1500);
}

// 補助：IDから現在の最新HPを返す関数（簡易版）
function checkHpById(id) {
    if (id === "mitsuhiro-icon") return mitHp;
    if (id === "ryuji-icon") return ryuHp;
    if (id === "keizo-icon") return ryuHp;
    return 0;
}
startTurn();