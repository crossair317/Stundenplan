const detailPanel = document.querySelector('.detail-panel');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-btn');
const detailFach = document.getElementById('detail-fach');
const detailRaum = document.getElementById('detail-raum');
const detailLehrer = document.getElementById('detail-lehrer');
const lessonButtons = document.querySelectorAll('.lesson-btn');

function openPanel({ fach, raum, lehrer }) {
    detailFach.textContent = fach || '—';
    detailRaum.textContent = raum || '—';
    detailLehrer.textContent = lehrer || '—';
    detailPanel.setAttribute('aria-hidden', 'false');
    overlay.hidden = false;
}

function closePanel() {
    detailPanel.setAttribute('aria-hidden', 'true');
    overlay.hidden = true;
}

lessonButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const { fach, raum, lehrer } = button.dataset;
        openPanel({ fach, raum, lehrer });
    });
});

closeBtn.addEventListener('click', closePanel);
overlay.addEventListener('click', closePanel);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closePanel();
    }
});
