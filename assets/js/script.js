document.addEventListener('DOMContentLoaded', () => {
  // Modal-Elemente
  const modal = document.getElementById('hourInfoModal');
  const modalBody = document.getElementById('infoModalBody');
  const modalTitle = document.getElementById('infoModalTitle');
  const closeButton = modal.querySelector('.info-modal__close');

  const subjectInfo = {
    Mathematik: {
      raum: 'K203',
      lehrer: 'Dr Schäfer',
    },
    Wirtschaft: {
      raum: 'K203',
      lehrer: 'Frau Corbe',
    },
    Deutsch: {
      raum: 'K203',
      lehrer: 'Frau Fischer',
    },
    Englisch: {
      raum: 'K203',
      lehrer: 'Frau Seitel',
    },
    Physik: {
      raum: 'KE07',
      lehrer: 'Frau Heim',
    },
    Chemie: {
      raum: 'KE04',
      lehrer: 'Fraum Pfitzer',
    },
    GGK: {
      raum: 'K203',
      lehrer: 'Herr Mohr',
    },
    INFT1: { // mittwochnachmittag gruppe b
      raum: 'KE12',
      lehrer: 'Frau Jansen-Tapken',
      week: 'even',
      group: 'B',
    },
    INFT2: { // donnerstag zweite stunde ?????????
      raum: '',
      lehrer: 'Frau Jansen-Tapken',
      week: 'even',
      group: 'B',
    },
    INFT3: { // donnerstag erste stunde gruppe b
      raum: 'BU13',
      lehrer: 'Herr Maucher',
      week: 'odd',
      group: 'B',
    },
    INFT4: { // donnerstag erste stunde gruppe a
      raum: 'BU13',
      lehrer: 'Herr Maucher',
      week: 'even',
      group: 'A',
    },
    INFT5: { // donnerstag zweite stunde beide gruppen
      raum: 'BU13',
      lehrer: 'Herr Maucher',
    },
    INFT6: { // donnerstag dritte stunde beide gruppen
      raum: 'K203',
      lehrer: 'Frau Jansen-Tapken',
      week: 'even',
    },
    INFT9: { // donnerstag dritte stunde gruppe a
      raum: 'BU11',
      lehrer: 'Frau Jansen-Tapken',
      week: 'odd',
      group: 'A',
    },
    INF7: { // freitag dritte stunde gruppe a
      raum: 'BU13',
      lehrer: 'Frau Brandt',
      week: 'odd',
      group: 'A',
    },
    INF8: { // freitag dritte stunde gruppe b
      raum: 'BU13',
      lehrer: 'Frau Brandt',
      week: 'even',
      group: 'B',
    },
    INFT10: { // freitag dritte stunde gruppe b
      raum: 'BU11',
      lehrer: 'Frau Jansen-Tapken',
      week: 'odd',
      group: 'B',
    },
    INFT11: { // freitag dritte stunde gruppe a
      raum: 'BU11',
      lehrer: 'Frau Jansen-Tapken',
      week: 'even',
      group: 'A',
    },
    Sport1: {
      raum: 'RT01',
      lehrer: 'Herr Fueller',
      week: 'even',
      group: 'B',
    },
    Sport2: {
      raum: 'RT01',
      lehrer: 'Herr Fueller',
      week: 'odd',
      group: 'A',
    },
    Ethik: {
      raum: '109',
      lehrer: 'Herr Salewski',
    },
    Astronomie: {
      raum: 'K203',
      lehrer: 'Herr Manz',
    },
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
      // Preferiere den Zeitslot der Zeile als Lookup-Key, dann expliziten data-Key, dann sichtbaren Text
      const slot = button.closest('tr')?.querySelector('.time-buttons')?.textContent.trim();
      const key = slot || button.dataset.subjectKey || button.textContent.trim() || 'Fach';
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

  // Dark/Light Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const updateThemeLabel = () => {
    const isDark = document.body.classList.contains('theme-dark');
    themeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  };

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('theme-dark');
    updateThemeLabel();
  });

  updateThemeLabel();


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
