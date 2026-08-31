const siteScriptUrl = document.currentScript?.src;

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const navLinks = nav?.querySelector('.nav-links');

  if (nav && navLinks) {
    const menuButton = document.createElement('button');
    const menuId = 'primary-navigation';

    nav.classList.add('nav-enhanced');
    navLinks.id = menuId;
    menuButton.className = 'nav-toggle';
    menuButton.type = 'button';
    menuButton.setAttribute('aria-controls', menuId);
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.innerHTML = '<span aria-hidden="true">☰</span><span>Menu</span>';
    nav.insertBefore(menuButton, navLinks);

    const closeMenu = (returnFocus = false) => {
      menuButton.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('is-open');
      if (returnFocus) menuButton.focus();
    };

    menuButton.addEventListener('click', () => {
      const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(willOpen));
      navLinks.classList.toggle('is-open', willOpen);
    });

    navLinks.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navLinks.classList.contains('is-open')) closeMenu(true);
    });
  }

  const footerHost = document.querySelector('[data-site-footer]');
  if (footerHost && siteScriptUrl) {
    const privacyUrl = new URL('privacy-policy.html', siteScriptUrl).href;
    const termsUrl = new URL('terms-conditions.html', siteScriptUrl).href;
    const refundsUrl = new URL('refund-cancellations.html', siteScriptUrl).href;
    const cpaLogoUrl = new URL('Footer%20Images/CPA%20logo%20250%20copy.jpg', siteScriptUrl).href;
    const efileLogoUrl = new URL('Footer%20Images/IRS%20efile%20image.png', siteScriptUrl).href;
    const quickbooksLogoUrl = new URL('Footer%20Images/QuickBooks-Certified-ProAdvisor-Logo.jpg', siteScriptUrl).href;

    footerHost.innerHTML = `
      <footer class="footer">
        <div class="container footer-content">
          <div class="footer-links">
            <a href="${privacyUrl}" class="my-link">Privacy Policy</a>
            <a href="${termsUrl}" class="my-link">Terms &amp; Conditions</a>
            <a href="${refundsUrl}" class="my-link">Refund / Cancellations</a>
          </div>
          <div class="footer-logos" aria-label="Professional certification logos">
            <img src="${cpaLogoUrl}" alt="CPA logo" class="footer-logo">
            <img src="${efileLogoUrl}" alt="IRS e-file logo" class="footer-logo">
            <img src="${quickbooksLogoUrl}" alt="QuickBooks Certified ProAdvisor Logo" class="footer-logo">
          </div>
          <p>© 2026 Shikha Gupta CPA LLC. All rights reserved.</p>
        </div>
      </footer>`;
  }
});
