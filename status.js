let mitHp = 327, mitMaxHp = 327, mitSp = 115, mitMaxSp = 115, mitAtk = 122, mitDef = 99, mitSpd = 34, mitDodge = 7, mitLuck = 10, mitResist = 50, mitSucceed = 50;
let ryuHp = 269, ryuMaxHp = 269, ryuSp = 147, ryuMaxSp = 147, ryuAtk = 106, ryuDef = 113,ryuSpd = 30, ryuDodge = 5, ryuLuck = 12, ryuResist = 50, ryuSucceed = 50;
let keiHp = 308, keiMaxHp = 308, keiSp = 124, keiMaxSp = 124, keiAtk = 130, keiDef = 102,keiSpd = 39, keiDodge = 6, keiLuck = 9,  keiResist = 50, keiSucceed = 50;

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

    // 各桁の要素を取得
    const el100 = charIcon.querySelector('.hp-100');
    const el10 = charIcon.querySelector('.hp-10');
    const el1 = charIcon.querySelector('.hp-1');

    // それぞれの桁に数値を代入
    if (el100) el100.textContent = hpString[0];
    if (el10)  el10.textContent  = hpString[1];
    if (el1)   el1.textContent   = hpString[2];

    // --- ここが本題の処理 ---
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

// === 使い方（テスト用） ===
// ダメージを食らって「mitsuhiro」のHPが 45 になった場合、以下のように呼び出します。
// 自動的に百の位が「0」になり、灰色（is-gray）になります。
window.updateCharacterHp('mitsuhiro-icon', 45); 
