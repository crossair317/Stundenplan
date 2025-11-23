document.addEventListener('DOMContentLoaded', () => {
  // Referenzen auf die Modal-Elemente
  const modal = document.getElementById('hourInfoModal');
  const modalBody = document.getElementById('infoModalBody');
  const modalTitle = document.getElementById('infoModalTitle');
  const closeButton = modal.querySelector('.info-modal__close');

  // Öffnet das Modal und setzt Titel + Inhalt
  const openModal = (titleText) => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    modalTitle.textContent = titleText || 'Stundeninfo';
    modalBody.innerHTML = 'test'; // Platzhalter: hier später individuelle Infos einfügen
  };

  // Schließt das Modal (versteckt Overlay)
  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  };

  // Klick auf ein Fach öffnet das Modal mit dem Fachnamen als Titel
  document.querySelectorAll('.subject').forEach((button) => {
    button.addEventListener('click', () => {
      const label = 'Fach';
      openModal(label);
    });
  });

  // X-Button schließt das Modal
  closeButton.addEventListener('click', closeModal);

  // Klick außerhalb des Panels schließt das Modal
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Escape-Taste schließt das Modal, falls es offen ist
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});
