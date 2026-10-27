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