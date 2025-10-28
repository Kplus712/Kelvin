async function loadTip() {
  const res = await fetch('tips.json');
  const tips = await res.json();
  const today = new Date();
  const index = today.getDate() % tips.length;
  document.getElementById('tip-text').textContent = tips[index];
}
loadTip();
