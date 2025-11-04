/* Load tips and set today's tip */
document.addEventListener('DOMContentLoaded', function(){
  // load tips from tips.json
  fetch('tips.json').then(r=>r.json()).then(tips=>{
      const today = new Date();
      const idx = (today.getFullYear() + today.getMonth() + today.getDate()) % tips.length;
      const t = tips[idx];
      document.getElementById('tip-title').textContent = t.title || 'Daily Tip';
      document.getElementById('tip-text').textContent = t.text || '';
      document.getElementById('tip-date').textContent = 'Tip date: ' + (t.date || '');

      // populate archive list
      const list = document.getElementById('tipsList');
      if(list) list.innerHTML = tips.map(p=>`<li class="card"><strong>${p.title}</strong><p>${p.text}</p><small class="muted">${p.date}</small></li>`).join('');
  }).catch(()=>{});

  // fade-in on scroll
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const appearOnScroll = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(f => appearOnScroll.observe(f));

  // mobile menu toggle
  const btn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  btn && btn.addEventListener('click', function(){
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    if(nav.style.display === 'flex') nav.style.display = '';
    else { nav.style.display = 'flex'; nav.style.flexDirection = 'column'; }
  });

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      const tgt = document.querySelector(this.getAttribute('href'));
      if(tgt) tgt.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
});