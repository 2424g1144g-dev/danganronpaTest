// グローバル変数の宣言
let turnOrder = [];
let currentActionIndex = 0;
let currentState = "";

// DOM要素の取得
const moon = document.getElementById("moon-joint");
const command = document.getElementById("command-parent");
const img = document.getElementById("command-img");

function getActionOrder() {
    const characters = [
        { name: "Mitsuhiro", id: "mitsuhiro-icon", spd: mitSpd, hp: mitHp },
        { name: "Ryuji", id: "ryuji-icon", spd: ryuSpd, hp: ryuHp },
        { name: "Keizo", id: "keizo-icon", spd: keiSpd, hp: keiHp }
    ];
    const aliveCharacters = characters.filter(char => char.hp > 0);
    aliveCharacters.sort((a, b) => {
        const aSpd = a.spd + Math.floor(Math.random() * 10);
        const bSpd = b.spd + Math.floor(Math.random() * 10);
        return bSpd - aSpd;
    });
    return aliveCharacters; 
}

function startTurn() {
    if (mitHp <= 0 && ryuHp <= 0 && keiHp <= 0) {
        console.log("全滅しました…ゲームオーバー");
        return;
    }

    console.log("--- 新しいターン開始 ---");
    turnOrder = getActionOrder(); 
    currentActionIndex = 0;

    executeNextAction();
}

function executeNextAction() {
    if (currentActionIndex >= turnOrder.length) {
        startTurn(); 
        return;
    }

    const attacker = turnOrder[currentActionIndex];

    if (checkHpById(attacker.id) <= 0) {
        currentActionIndex++;
        executeNextAction();
        return;
    }

    console.log(`${attacker.name} の行動です！（素早さ: ${attacker.spd}）`);

    if (attacker.id === "mitsuhiro-icon" || attacker.id === "ryuji-icon" || attacker.id === "keizo-icon") {
        if (attacker.id === "mitsuhiro-icon") img.src = "assets/characters/mitsuhiro/Mitsuhiro_behind.png";
        if (attacker.id === "ryuji-icon") img.src = "assets/characters/ryuji/Ryuji_behind.png";
        if (attacker.id === "keizo-icon") img.src = "assets/characters/keizo/Keizo_behind.png";
        showCommandMenu();
    } else {
        console.log("敵の行動");
        setTimeout(() => {
            currentActionIndex++;
            executeNextAction();
        }, 1500);
    }
}

function showCommandMenu() {
    moon.classList.add("show");
    command.classList.add("show");
    img.classList.add("show");
    currentState = "command";
    console.log("コマンドメニュー表示: currentState =", currentState);
}

function checkHpById(id) {
    if (id === "mitsuhiro-icon") return mitHp;
    if (id === "ryuji-icon") return ryuHp;
    if (id === "keizo-icon") return keiHp;
    return 0;
}

// ⭕️ イベントリスナー設定とゲーム開始タイミングの共通化
window.addEventListener("DOMContentLoaded", () => {
    // 画面のどこかを一回クリックした際にもフォーカスが当たるように設定
    document.body.focus();

    // キー入力監視
    window.addEventListener("keydown", (event) => {
        console.log(`[Key Pressed] key: "${event.key}", currentState: "${currentState}"`);

        if (currentState !== "command") return;

        // 大文字小文字両対応
        if (event.key.toLowerCase() === "s") {
            console.log("Sキー押下を検知。UIを非表示にします。");
            currentState = "attack";
            moon.classList.remove("show");
            command.classList.remove("show");
            img.classList.remove("show");
        }
    });

    // 準備が整ってからターンを開始
    startTurn();
});