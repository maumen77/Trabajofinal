document.addEventListener('DOMContentLoaded', () => {
  loadNews();
  buildGallery();
  initModal();
});

function loadNews(){
  const c = document.getElementById('news-list');
  if (!c) return;
  fetch('js/news.json')
    .then(r => { if(!r.ok) throw new Error('No JSON'); return r.json(); })
    .then(data => {
      c.innerHTML = '';
      data.forEach(n => {
        const a = document.createElement('article');
        a.innerHTML = `<h3>${escapeHtml(n.title)}</h3><small>${escapeHtml(n.date)}</small><p>${escapeHtml(n.summary)}</p>`;
        c.appendChild(a);
      });
    }).catch(e => { c.innerHTML = '<p>Error cargando noticias.</p>'; console.error(e); });
}

function buildGallery(){
  const gallery = document.getElementById('gallery');
  if (!gallery) return;
  const images = ['../images/img1.jpg','../images/img2.jpg','../images/img3.jpg'];
  images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Galería';
    img.addEventListener('click', () => openModal(src));
    gallery.appendChild(img);
  });
}

function initModal(){
  const modal = document.getElementById('modal');
  const btnClose = document.getElementById('modal-close');
  if(!modal) return;
  btnClose.addEventListener('click', () => { modal.classList.add('hidden'); modal.setAttribute('aria-hidden','true'); });
  modal.addEventListener('click', e => { if (e.target === modal) { modal.classList.add('hidden'); modal.setAttribute('aria-hidden','true'); }});
}
function openModal(src){
  const modal = document.getElementById('modal');
  const img = document.getElementById('modal-img');
  if(!modal || !img) return;
  img.src = src;
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden','false');
}

function escapeHtml(str){ if(!str) return ''; return str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[m])); }