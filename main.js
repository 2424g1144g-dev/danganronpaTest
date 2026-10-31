window.addEventListener("wheel", (e) => {
    if (e.ctrlKey) e.preventDefault();
  }, { passive: false });
window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && ["+", "-", "0"].includes(e.key)) {
    e.preventDefault();
  }
})



let currentState = "command";
let enemies = ["古市秀治"];
let currentEnemyIndex = 0;
window.addEventListener("keydown", (event) => {
  if (currentState != "command") return;
  if (event.key === "ArrowLeft") {
    // 左が押されたとき：0より大きければ（左にまだ敵がいれば）1減らす
    if (currentEnemyIndex > 0) {
      currentEnemyIndex--;
      updateSelectedEnemyCSS(); // CSSのクラスを付け替える関数
    } else {
      // 一番左（indexが0）のときは、これ以上左に行けない（制限）
      console.log("これ以上左には敵がいません");
    }
  }
  if (event.key === "ArrowRight") {
    // 右が押されたとき：配列の最大長さより小さければ（右にまだ敵がいれば）1増やす
    if (currentEnemyIndex < enemies.length - 1) {
      currentEnemyIndex++;
      updateSelectedEnemyCSS();
    } else {
      // 一番右のときは、これ以上右に行けない（制限）
      console.log("これ以上右には敵がいません");
    }
  }
});
function skill(data) {
  skillName.textContent = data;
  skillName.classList.add("show");
}
function updateSelectedEnemyCSS() {
  const enemyElements = document.querySelectorAll('.enemy');
  enemyElements.forEach((enemyElement, index) => {
    if (index === currentEnemyIndex) {
      enemyElement.classList.add('selected');
    } else {
      enemyElement.classList.remove('selected');
    }  
  });
  const nameDisplay = document.getElementById('enemy-name');
  if (nameDisplay && enemies[currentEnemyIndex]) {
    nameDisplay.textContent = enemies[currentEnemyIndex];
    nameDisplay.classList.add("show");
  }
}
updateSelectedEnemyCSS();




// メニュー全体と、中の全スキルを取得
const menu = document.getElementById('skillMenu');
const items = document.querySelectorAll('.skill-item');
let currentIndex = 0;

// ゲーム開始時（または画面表示時）に、自動でキーボード入力を受け付ける状態にする
window.addEventListener('DOMContentLoaded', () => {
  menu.focus(); 
});

// 選択状態の見た目（CSSクラス）を更新する関数
function updateSelection() {
  items.forEach((item, index) => {
    if (index === currentIndex) {
      item.classList.add('selected'); // 選択中にCSSを変化
    } else {
      item.classList.remove('selected');
    }
  });
}

// キーボードの入力を監視するイベント
menu.addEventListener('keydown', (e) => {
  // 矢印キーが押されたときに、画面が勝手に上下にスクロールするのを防ぐ
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Space') {
    e.preventDefault();
  }

  if (e.key === 'ArrowDown') {
    // 下キー：次の項目へ（一番下までいったら一番上に戻る）
    currentIndex = (currentIndex + 1) % items.length;
    updateSelection();
  } 
  else if (e.key === 'ArrowUp') {
    // 上キー：前の項目へ（一番上までいったら一番下に戻る）
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateSelection();
  } 
  else if (e.key === 'Enter' || e.key === ' ') {
    // Enterキー または スペースキーで決定
    console.log(`${items[currentIndex].textContent} を発動！`);
    alert(`${items[currentIndex].textContent} を選択しました！`);
  }
});
