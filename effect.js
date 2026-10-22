window.playSlashEffect =async function() {
    const slash = document.getElementById("slash-effect");
    if (!slash) return;
    // 前回のアニメーションをリセット
    slash.classList.remove("slash-down", "slash-up");
    // CSSアニメーションを再スタートさせる
    void slash.offsetWidth;
    // 1太刀目：斬り下ろし
    slash.classList.add("slash-down");
    // 2太刀目：少し遅れて斬り上げ
    await sleep(350);
    slash.classList.remove("slash-down");
    void slash.offsetWidth;
    slash.classList.add("slash-up");
}