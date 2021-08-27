document.querySelectorAll('.accordion').forEach(function (accordion) {
  const { allowMultiple, allowToggle } = accordion.dataset;

  const triggers = Array.from(accordion.querySelectorAll('.accordion__trigger'));

  accordion.addEventListener('click', function (event) {
    const { target } = event;

    if (!target.classList.contains('accordion__trigger')) return;
  
    const isExpanded = target.getAttribute('aria-expanded') === 'true';
    const active = accordion.querySelector('[aria-expanded="true"]');

    if (!allowMultiple && active && active !== target) {
      const activePanel = document.getElementById(active.getAttribute('aria-controls'));
      active.setAttribute('aria-expanded', 'false');
      activePanel.setAttribute('hidden', '');

      if (!allowToggle) {
        active.removeAttribute('aria-disabled');
      }
    }

    const targetPanel = document.getElementById(target.getAttribute('aria-controls'));
    if (!isExpanded) {
      target.setAttribute('aria-expanded', 'true');
      targetPanel.removeAttribute('hidden');
    } else if (allowToggle) {
      target.setAttribute('aria-expanded', 'false');
      targetPanel.setAttribute('hidden', '');
    }
    event.preventDefault();
  });


  accordion.addEventListener('keydown', function (event) {
    const { target, key } = event;

    if (!target.classList.contains('accordion__trigger')) return;

    if (key.match(/(ArrowUp)|(ArrowDown)/)) {
      const index = triggers.indexOf(target);
      const direction = key === 'ArrowDown' ? 1 : -1;
      const length = triggers.length;
      const newIndex = (index + length + direction) % length;
      triggers[newIndex].focus();
      event.preventDefault();
    } else if (key === 'End') {
      triggers[triggers.length - 1].focus();
      event.preventDefault();
    } else if (key === 'Home') {
      triggers[0].focus();
      event.preventDefault();
    }
  });
});
