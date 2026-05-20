(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const priceMinInput = $('#priceRangeMin');
  const priceMaxInput = $('#priceRangeMax');
  const priceMinLabel = $('#price-min');
  const priceMaxLabel = $('#price-max');

  const sizeMinInput = $('#sizeRangeMin');
  const sizeMaxInput = $('#sizeRangeMax');
  const sizeMinLabel = $('#size-min');
  const sizeMaxLabel = $('#size-max');

  const form = document.querySelector('.filters form');
  const productCards = $$('.product-card');

  // Size mapping must match the UI values.
  // Your HTML uses SMALL/LARGE for min/max. We support MEDIUM too.
  const sizeOrder = ['SMALL', 'MEDIUM', 'LARGE'];
  const sizeIndex = (val) => {
    const idx = sizeOrder.indexOf(String(val).toUpperCase());
    return idx === -1 ? 0 : idx;
  };

  function clampPriceMinMax() {
    if (!priceMinInput || !priceMaxInput) return;

    let min = Number(priceMinInput.value);
    let max = Number(priceMaxInput.value);

    if (min > max) {
      // Move the opposite thumb to keep the range valid.
      if (document.activeElement === priceMinInput) {
        priceMaxInput.value = String(min);
        max = min;
      } else {
        priceMinInput.value = String(max);
        min = max;
      }
    }

    if (priceMinLabel) priceMinLabel.textContent = `$${min}`;
    if (priceMaxLabel) priceMaxLabel.textContent = `$${max}`;
  }

  function clampSizeMinMax() {
    if (!sizeMinInput || !sizeMaxInput) return;

    const minVal = String(sizeMinInput.value).toUpperCase();
    const maxVal = String(sizeMaxInput.value).toUpperCase();

    const minIdx = sizeIndex(minVal);
    const maxIdx = sizeIndex(maxVal);

    if (minIdx > maxIdx) {
      if (document.activeElement === sizeMinInput) {
        // set max to min
        sizeMaxInput.value = sizeMinInput.value;
      } else {
        // set min to max
        sizeMinInput.value = sizeMaxInput.value;
      }
    }

    if (sizeMinLabel) sizeMinLabel.textContent = String(sizeMinInput.value).toUpperCase();
    if (sizeMaxLabel) sizeMaxLabel.textContent = String(sizeMaxInput.value).toUpperCase();
  }

  function applyFilters() {
    if (!productCards.length) return;

    const minPrice = priceMinInput ? Number(priceMinInput.value) : 0;
    const maxPrice = priceMaxInput ? Number(priceMaxInput.value) : 200;

    productCards.forEach((card) => {
      const cardPrice = Number(card.getAttribute('data-price'));

      // Price filtering only (size is decorative).
      const priceOk = !Number.isNaN(cardPrice)
        ? cardPrice >= minPrice && cardPrice <= maxPrice
        : true;

      card.style.display = priceOk ? '' : 'none';
    });
  }



  // Init labels + ensure operable ranges.

  clampPriceMinMax();
  clampSizeMinMax();

  // Operable sliders: clamp on interaction.
  if (priceMinInput) priceMinInput.addEventListener('input', clampPriceMinMax);
  if (priceMaxInput) priceMaxInput.addEventListener('input', clampPriceMinMax);

  if (sizeMinInput) sizeMinInput.addEventListener('input', clampSizeMinMax);
  if (sizeMaxInput) sizeMaxInput.addEventListener('input', clampSizeMinMax);

  // Apply filters.
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      applyFilters();
    });
  }
})();

