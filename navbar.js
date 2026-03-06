/**
 * Shared navbar: injects HTML and attaches scroll, mobile menu, and smooth-scroll behavior.
 * Place <div id="navbar-container"></div> at the top of <body> and include this script before </body>.
 */
(function () {
  const path = window.location.pathname || '';
  const file = path.split('/').pop() || 'index.html';
  const isIndex = file === 'index.html' || file === '';
  const isProjects = file === 'projects.html';
  const isGitHubProjects = file === 'github-projects.html';
  const isResearch = file === 'research.html';
  const isScholarFeed = file === 'scholar-publications.html';

  const logoHref = isIndex ? '#about' : 'index.html';
  const aboutHref = isIndex ? '#about' : 'index.html#about';
  const contactHref = isIndex ? '#contact' : 'index.html#contact';

  const link = (href, label, active) => {
    const activeCls = active ? ' text-blue-400' : ' hover:text-blue-400';
    const spanCls = active
      ? 'absolute bottom-0 left-0 w-full h-0.5 bg-blue-400'
      : 'absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full';
    return `<a href="${href}" class="transition relative group${activeCls}">
      ${label}
      <span class="${spanCls}"></span>
    </a>`;
  };

  const navHtml = `
<nav id="navbar" class="fixed w-full z-50 py-6 glass border-b border-white/5">
  <div class="max-w-6xl mx-auto px-6 flex justify-between items-center">
    <a href="${logoHref}" class="text-xl font-extrabold tracking-tighter hover:scale-105 transition-transform"><span class="accent-text">Sam</span> Thompson</a>
    <div class="hidden md:flex space-x-10 text-xs font-medium tracking-widest uppercase items-center">
      ${link(aboutHref, 'About', isIndex)}

      <div class="relative nav-group">
        <a href="projects.html" class="transition flex items-center gap-2${isProjects || isGitHubProjects ? ' text-blue-400' : ' hover:text-blue-400'}">
          <span>Engineering</span>
          <i class="fas fa-chevron-down text-[10px] mt-[1px]"></i>
        </a>
        <div class="absolute left-1/2 -translate-x-1/2 top-full hidden z-40 nav-dropdown">
          <div class="mt-2 w-60 rounded-2xl glass border border-white/10 shadow-xl">
            <div class="py-2">
              <a href="projects.html" class="block px-4 py-2 text-[11px] text-slate-300 hover:text-white hover:bg-white/5">
                Showcase projects
              </a>
              <a href="github-projects.html" class="block px-4 py-2 text-[11px] text-slate-300 hover:text-white hover:bg-white/5">
                GitHub repositories
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="relative nav-group">
        <a href="research.html" class="transition flex items-center gap-2${isResearch || isScholarFeed ? ' text-blue-400' : ' hover:text-blue-400'}">
          <span>Research</span>
          <i class="fas fa-chevron-down text-[10px] mt-[1px]"></i>
        </a>
        <div class="absolute left-1/2 -translate-x-1/2 top-full hidden z-40 nav-dropdown">
          <div class="mt-2 w-60 rounded-2xl glass border border-white/10 shadow-xl">
            <div class="py-2">
              <a href="research.html" class="block px-4 py-2 text-[11px] text-slate-300 hover:text-white hover:bg-white/5">
                Selected papers & projects
              </a>
              <a href="scholar-publications.html" class="block px-4 py-2 text-[11px] text-slate-300 hover:text-white hover:bg-white/5">
                All publications (Scholar)
              </a>
            </div>
          </div>
        </div>
      </div>

      ${link(contactHref, 'Contact', false)}
    </div>
    <button id="mobile-menu-btn" class="md:hidden text-xl p-2 text-slate-400 hover:text-white transition" aria-label="Toggle menu" aria-expanded="false">
      <i id="mobile-menu-icon" class="fas fa-bars"></i>
    </button>
  </div>
  <div id="mobile-menu" class="hidden md:hidden px-6 pb-6 pt-2 border-t border-white/5">
    <div class="flex flex-col gap-4 text-sm font-medium tracking-widest uppercase">
      <a href="${aboutHref}" class="mobile-nav-link hover:text-blue-400 transition py-2">About</a>
      <span class="text-[11px] text-slate-500 pt-2">Engineering</span>
      <a href="projects.html" class="mobile-nav-link hover:text-blue-400 transition py-1 pl-3 text-[11px]">Showcase projects</a>
      <a href="github-projects.html" class="mobile-nav-link hover:text-blue-400 transition py-1 pl-3 text-[11px]">GitHub repositories</a>
      <span class="text-[11px] text-slate-500 pt-2">Research</span>
      <a href="research.html" class="mobile-nav-link hover:text-blue-400 transition py-1 pl-3 text-[11px]">Selected papers & projects</a>
      <a href="scholar-publications.html" class="mobile-nav-link hover:text-blue-400 transition py-1 pl-3 text-[11px]">All publications (Scholar)</a>
      <a href="${contactHref}" class="mobile-nav-link hover:text-blue-400 transition py-2">Contact</a>
    </div>
  </div>
</nav>`;

  const container = document.getElementById('navbar-container');
  if (container) {
    container.innerHTML = navHtml;
  }

  // Navbar scroll effect
  window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (window.scrollY > 50) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  var mobileMenuBtn = document.getElementById('mobile-menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  var mobileMenuIcon = document.getElementById('mobile-menu-icon');
  if (mobileMenuBtn && mobileMenu && mobileMenuIcon) {
    mobileMenuBtn.addEventListener('click', function () {
      var isOpen = !mobileMenu.classList.toggle('hidden');
      mobileMenuIcon.classList.toggle('fa-bars', !isOpen);
      mobileMenuIcon.classList.toggle('fa-times', isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });
    document.querySelectorAll('.mobile-nav-link').forEach(function (lnk) {
      lnk.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        mobileMenuIcon.classList.add('fa-bars');
        mobileMenuIcon.classList.remove('fa-times');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth scroll for same-page anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var h = this.getAttribute('href');
      if (h === '#') return;
      var target = document.querySelector(h);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
