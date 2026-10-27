function getActionOrder() {
    const characters = [
        { name: "Mitsuhiro", id: "mitsuhiro-icon", spd: mitSpd, hp: mitHp },
        { name: "Ryuji", id: "ryuji-icon", spd: ryuSpd, hp: ryuHp },
        { name: "Keizo", id: "keizo-icon", spd: keiSpd, hp: keiHp }
        // ここに敵（Enemy）のデータも同じように追加できます
    ];
    const aliveCharacters = characters.filter(char => char.hp > 0);
    aliveCharacters.sort((a, b) => {
        // 素早さに 0〜9 のランダム値を足して比較する
        const aSpd = a.spd + Math.floor(Math.random() * 10);
        const bSpd = b.spd + Math.floor(Math.random() * 10);
        return bSpd - aSpd;
    });
    return aliveCharacters; 
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
    if (attacker.id === "mitsuhiro-icon" || attacker.id === "ryuji-icon" || attacker.id === "keizo-icon") {
        const img = document.getElementById("command-img");
        if (attacker.id === "mitsuhiro-icon") img.src = "assets/characters/mitsuhiro/Mitsuhiro_behind.png";
        if (attacker.id === "ryuji-icon") img.src = "assets/characters/ryuji/Ryuji_behind.png";
        if (attacker.id === "keizo-icon") img.src = "assets/characters/keizo/Keizo_behind.png";
        showCommandMenu();
        updateSelectedEnemyCSS();
    } else {
        console.log("敵の行動");
        setTimeout(() => {
            currentActionIndex++;
            executeNextAction();
        }, 1500);
    }
}


const moon = document.getElementById("moon-joint");
const command = document.getElementById("command-parent");
const img = document.getElementById("command-img");
const enemyName = document.getElementById("enemy-name");
const skillName = document.getElementById("skill-name");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function showCommandMenu(attacker) {
    moon.classList.add("show");
    command.classList.add("show");
    img.classList.add("show");
    currentState = "command";
    //ここからキー入力
}

// 補助：IDから現在の最新HPを返す関数（簡易版）
function checkHpById(id) {
    if (id === "mitsuhiro-icon") return mitHp;
    if (id === "ryuji-icon") return ryuHp;
    if (id === "keizo-icon") return keiHp;
    return 0;
}

//キー入力
addEventListener("keydown", async (event) => {
    if(currentState != "command") return;
    const attacker = turnOrder[currentActionIndex];
    const slashEffect = document.getElementById("slash-effect");
    if (event.key === "s") {
      if (event.repeat) return;
      currentState = "attack";
      moon.classList.remove("show");
      command.classList.remove("show");
      img.classList.remove("show");
      enemyName.classList.remove("show");
      skillName.classList.add("show");
      const enemyReticle = document.querySelector(".enemy.selected");
      enemyReticle.classList.remove("selected");
      if (attacker.id === "mitsuhiro-icon") {
        window.playStampEffect();
        await sleep(200);
        damage = window.damageValue(mitAtk*2.2, furDef);
        showDamage(damage);
        window.damageEnemy(damage);
      } else if (attacker.id === "ryuji-icon") {
        window.volleyballEffect();
        await sleep(200);
        damage = window.damageValue(ryuAtk*2, furDef)
        showDamage(damage);
        window.damageEnemy(damage);
      } else if (attacker.id === "keizo-icon") {
        window.playSlashEffect();
        damage = window.damageValue(keiAtk*0.8, furDef);
        showDamage(damage);
        await sleep(350);
        damagePlus = window.damageValue(keiAtk*1.2, furDef) + damage;
        showDamage(damagePlus);
        window.damageEnemy(damagePlus);
      }
      await sleep(1300);
      skillName.classList.remove("show");
      currentActionIndex++;
      executeNextAction();
    }

    if (event.key === "w") {
        if(event.repeat) return;
    }
})

startTurn();