document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('hourInfoModal');
  const modalBody = document.getElementById('infoModalBody');
  const modalTitle = document.getElementById('infoModalTitle');
  const closeButton = modal.querySelector('.info-modal__close');

  const openModal = (titleText) => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    modalTitle.textContent = titleText || 'Stundeninfo';
    modalBody.innerHTML = ''; // bleibt leer, damit Inhalte später ergänzt werden können
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  };

  document.querySelectorAll('.time-buttons').forEach((button) => {
    button.addEventListener('click', () => {
      const period = button.previousElementSibling?.textContent?.trim();
      const timeRange = button.textContent.trim();
      const label = period ? `${period} (${timeRange})` : timeRange;
      openModal(label);
    });
  });

  closeButton.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});
