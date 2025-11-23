document.addEventListener('DOMContentLoaded', () => {
  // Modal-Elemente
  const modal = document.getElementById('hourInfoModal');
  const modalBody = document.getElementById('infoModalBody');
  const modalTitle = document.getElementById('infoModalTitle');
  const closeButton = modal.querySelector('.info-modal__close');

  const subjectInfo = {
    montag1: { raum: "K203", lehrer: "Frau Corbe" },             // Wirtschaft
    montag2: { raum: "K203", lehrer: "Dr Schaefer" },            // Mathematik
    montag3: { raum: "",    lehrer: "" },                        // Deutsch/Englisch
    montag4: { raum: "",    lehrer: "" },                        // NExt/PH-Lab

    dienstag1: { raum: "KE07", lehrer: "Frau Heim" },            // Physik
    dienstag2: { raum: "KE04", lehrer: "Frau Pfitzer" },         // Chemie
    dienstag3: { raum: "",    lehrer: "" },                      // Spanisch/Italienisch
    dienstag4: { raum: "K203", lehrer: "Herr Mohr" },            // GGK

    mittwoch1: { raum: "K203", lehrer: "Dr Schaefer" },          // Mathematik
    mittwoch2: { raum: "",    lehrer: "" },                      // Deutsch/Englisch
    mittwoch3: { raum: "",    lehrer: "" },                      // Spanisch/Italienisch
    mittwoch4: { raum: "K203", lehrer: "Frau Jansen-Tapken" },   // Infomationstechnik

    donnerstag1: { raum: "BU13", lehrer: "Herr Maucher" },       // Infomationstechnik
    donnerstag2: { raum: "BU13", lehrer: "Herr Maucher" },       // Infomationstechnik
    donnerstag3: { raum: "K203", lehrer: "Frau Jansen-Tapken" }, // Infomationstechnik
    donnerstag4: { raum: "RT01", lehrer: "Herr Fueller" },       // Sport

    freitag1: { raum: "K203", lehrer: "Frau Fischer" },          // Deutsch
    freitag2: { raum: "109",  lehrer: "Herr Salewski" },         // Ethik
    freitag3: { raum: "BU13", lehrer: "Frau Brandt" },           // Infomationstechnik
    freitag4: { raum: "K203", lehrer: "Herr Manz" },             // Astronomie/BK
  };

  // Oeffnet das Modal und setzt den Titel
  const openModal = (titleText) => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    modalTitle.textContent = titleText || 'Stundeninfo';
  };

  // Schliesst das Modal (versteckt Overlay)
  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  };

  const renderInfo = (key) => {
    const info = subjectInfo[key];
    if (!info) {
      modalBody.textContent = "Keine zusaetzlichen Infos hinterlegt.";
      return;
    }

    // Wenn zweiwöchig (even/odd) hinterlegt, beide Varianten zeigen
    if (info.even || info.odd) {
      const even = info.even || {};
      const odd = info.odd || {};
      modalBody.innerHTML = `
        <div class="week-block">
          <h3>Gerade Woche</h3>
          <p><strong>Raum:</strong> ${even.raum || "--"}</p>
          <p><strong>Lehrer:</strong> ${even.lehrer || "--"}</p>
        </div>
        <hr>
        <div class="week-block">
          <h3>Ungerade Woche</h3>
          <p><strong>Raum:</strong> ${odd.raum || "--"}</p>
          <p><strong>Lehrer:</strong> ${odd.lehrer || "--"}</p>
        </div>
      `;
      return;
    }

    // Standard: eine Variante
    const raum = info.raum || "--";
    const lehrer = info.lehrer || "--";
    modalBody.innerHTML = `
      <p><strong>Raum:</strong> ${raum}</p>
      <p><strong>Lehrer:</strong> ${lehrer}</p>
    `;
  };

  // Klick auf ein Fach oeffnet das Modal mit dem Fachnamen als Titel und zeigt Infos aus subjectInfo
  document.querySelectorAll('.subject').forEach((button) => {
    button.addEventListener('click', () => {
      // Preferiere den data-Key
      const slot = button.closest('tr')?.querySelector('.time-buttons')?.textContent.trim();
      const key = button.dataset.subjectKey
      const label = button.textContent.trim() || key;
      renderInfo(key);
      openModal(label);
    });
  });

  // X-Button schliesst das Modal
  closeButton.addEventListener('click', closeModal);

  // Klick ausserhalb des Panels schliesst das Modal
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Escape-Taste schliesst das Modal, falls es offen ist
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });


  // Sprachumschaltung (EN/DE)
  const langButtons = document.querySelectorAll('.lang');
  const translatables = document.querySelectorAll('[data-i18n-de][data-i18n-en]');

  const setLanguage = (lang) => {
    translatables.forEach((el) => {
      const text = lang === 'de' ? el.dataset.i18nDe : el.dataset.i18nEn;
      if (text) {
        el.textContent = text;
      }
    });

    langButtons.forEach((btn) => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('active', isActive);
    });
  };

  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang) {
        setLanguage(lang);
      }
    });
  });

  // Standardmaessig EN aktivieren, weil der EN-Button vorselektiert ist
  setLanguage('en');
});
