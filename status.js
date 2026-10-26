let mitHp = 327, mitMaxHp = 327, mitSp = 115, mitMaxSp = 115, mitAtk = 122, mitDef = 99, mitSpd = 34, mitDodge = 7, mitLuck = 10, mitResist = 50, mitSucceed = 50;
let ryuHp = 269, ryuMaxHp = 269, ryuSp = 147, ryuMaxSp = 147, ryuAtk = 106, ryuDef = 113,ryuSpd = 30, ryuDodge = 5, ryuLuck = 12, ryuResist = 50, ryuSucceed = 50;
let keiHp = 308, keiMaxHp = 308, keiSp = 124, keiMaxSp = 124, keiAtk = 130, keiDef = 102,keiSpd = 39, keiDodge = 6, keiLuck = 9,  keiResist = 50, keiSucceed = 50;
let furHp = 10000, furDef = 37;

/**
 * キャラクターのHP表示を更新する関数
 * @param {string} characterId - キャラクターのID (例: 'mitsuhiro-icon')
 * @param {number} currentHp - 現在のHPの数値 (例: 75)
 */
window.updateCharacterHp = function(characterId, currentHp) {
    // 0未満にならないように調整
    const hp = Math.max(0, currentHp);
    // 数値を3桁の文字列に分解（例: 75 -> "075"）
    const hpString = String(hp).padStart(3, '0');
    // 対象のキャラクターのアイコン要素を取得
    const charIcon = document.getElementById(characterId);
    if (!charIcon) return;
    const el100 = charIcon.querySelector('.hp-100');
    const el10 = charIcon.querySelector('.hp-10');
    const el1 = charIcon.querySelector('.hp-1');
    // それぞれの桁に数値を代入
    if (el100) el100.textContent = hpString[0];
    if (el10)  el10.textContent  = hpString[1];
    if (el1)   el1.textContent   = hpString[2];
    // 百の位が "0" の場合は灰色クラスを付与、それ以外は削除
    if (hp < 100) {
        el100.classList.add('is-gray');
        if (hp < 10) {
            el10.classList.add('is-gray');
        } else {
            el10.classList.remove('is-gray');
        }
    } else {
        el100.classList.remove('is-gray');
        el10.classList.remove('is-gray');
    }
}
window.updateCharacterSp = function(characterId, currentSp) {
    // 0未満にならないように調整
    const sp = Math.max(0, currentSp);
    // 数値を3桁の文字列に分解（例: 75 -> "075"）
    const spString = String(sp).padStart(3, '0');
    // 対象のキャラクターのアイコン要素を取得
    const charIcon = document.getElementById(characterId);
    if (!charIcon) return;
    const el100 = charIcon.querySelector('.sp-100');
    const el10 = charIcon.querySelector('.sp-10');
    const el1 = charIcon.querySelector('.sp-1');
    // それぞれの桁に数値を代入
    if (el100) el100.textContent = spString[0];
    if (el10)  el10.textContent  = spString[1];
    if (el1)   el1.textContent   = spString[2];
    // 百の位が "0" の場合は灰色クラスを付与、それ以外は削除
    if (sp < 100) {
        el100.classList.add('is-gray');
        if (sp < 10) {
            el10.classList.add('is-gray');
        } else {
            el10.classList.remove('is-gray');
        }
    } else {
        el100.classList.remove('is-gray');
        el10.classList.remove('is-gray');
    }
}

window.damageEnemy = function(damage) {
    // 選択されている敵のデータを取得
    let targetEnemy = enemies[currentEnemyIndex];
    if (!targetEnemy) {
        console.error("攻撃対象の敵データが見つかりません。Index:", currentEnemyIndex);
        return;
    }
    targetEnemy.hp -= damage;
    if (targetEnemy.hp < 0) {
        targetEnemy.hp = 0;
    }
    // --- ここからHTML（HPバー）の更新処理 ---
    // 現在のHPの割合（%）を計算する
    let hpPercentage = (targetEnemy.hp / targetEnemy.maxHp) * 100;
    // ※将来的に画面に敵が複数並ぶ場合は、document.querySelectorAll('.enemy-hp-fill')[currentEnemyIndex] などの形に変更
    let hpBarFill = document.getElementById("enemy-hp-fill");
    if (hpBarFill) {
        // styleのwidthを計算したパーセンテージに書き換える (例: "75%")
        hpBarFill.style.width = hpPercentage + "%";
    }
    // コンソールで確認用
    console.log(`${targetEnemy.name}に ${damage} ダメージ！ 残りHP: ${targetEnemy.hp} / ${targetEnemy.maxHp} (${hpPercentage.toFixed(1)}%)`);
}


// === 使い方（テスト用） ===
// ダメージを食らって「mitsuhiro」のHPが 45 になった場合、以下のように呼び出します。
// 自動的に百の位が「0」になり、灰色（is-gray）になります。
window.updateCharacterHp('mitsuhiro-icon', mitHp);
window.updateCharacterSp('mitsuhiro-icon', mitSp);

//ダメージ
window.damageValue = function(yourAtk, enemyDef) {
    let baseDamage = yourAtk - enemyDef;

    // 防御力が高すぎてダメージが0以下になるのを防ぐ (最低1ダメージにする場合)
    if (baseDamage <= 0) {
        baseDamage = 1; 
    }
    // 2. -3% から +3% のランダムな倍率を生成
    // Math.random() は 0以上1未満 なので、
    // (Math.random() * 0.06) で 0〜0.06 の範囲になり、
    // そこから + 0.97 することで 0.97〜1.03 (つまり -3% 〜 +3%) になります。
    const randomMultiplier = (Math.random() * 0.06) + 0.97;
    // 3. ベースダメージに倍率を掛け、端数を四捨五入（または切り捨て）
    let finalDamage = Math.round(baseDamage * randomMultiplier);
    return finalDamage;
}
window.showDamage = function(value) {
    const output = document.getElementById("damage-number");
    if (!output) return;
    // 前回のダメージ表示を消す
    output.innerHTML = "";
    // 数字を1桁ずつに分解
    String(value).split("").forEach((digit, i) => {
        const span = document.createElement("span");
        span.className = "damage-digit";
        span.textContent = digit;
        // 左の桁から順番にアニメーション
        span.style.animationDelay = `${i * 0.09}s`;
        output.appendChild(span);
        // 表示アニメーション開始
        requestAnimationFrame(() => {
            span.classList.add("show");
        });
    });
    // 最後の桁が出現してから少し待って消す
    const delay = String(value).length * 90 + 1000;
    setTimeout(() => {
        output.querySelectorAll(".damage-digit").forEach(digit => {
            digit.classList.remove("show");
            digit.classList.add("fade");
        });
    }, delay);
}
