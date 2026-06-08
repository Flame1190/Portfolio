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
    const activeCls = active ? ' nav-link-active' : ' text-slate-400 hover:text-blue-300';
    return `<a href="${href}" class="text-sm font-medium transition${activeCls}">${label}</a>`;
  };

  const navHtml = `
  
<nav id="navbar" class="fixed w-full z-50 py-5 glass border-b border-white/5">
  <div class="max-w-6xl mx-auto px-6 flex justify-between items-center">
    <a href="${logoHref}" class="text-lg font-semibold tracking-tight text-slate-200"><span class="accent-text">Sam</span> Thompson</a>
    <div class="hidden md:flex space-x-8 items-center">
      ${link(aboutHref, 'About', isIndex)}

      <div class="relative nav-group">
        <a href="projects.html" class="text-sm font-medium transition flex items-center gap-1.5${isProjects || isGitHubProjects ? ' nav-link-active' : ' text-slate-400 hover:text-blue-300'}">
          <span>Engineering</span>
          <i class="fas fa-chevron-down text-[10px] mt-[1px]"></i>
        </a>
        <div class="absolute left-1/2 -translate-x-1/2 top-full hidden z-40 nav-dropdown">
          <div class="mt-2 w-60 rounded-lg glass border border-white/10">
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
        <a href="research.html" class="text-sm font-medium transition flex items-center gap-1.5${isResearch || isScholarFeed ? ' nav-link-active' : ' text-slate-400 hover:text-blue-300'}">
          <span>Research</span>
          <i class="fas fa-chevron-down text-[10px] mt-[1px]"></i>
        </a>
        <div class="absolute left-1/2 -translate-x-1/2 top-full hidden z-40 nav-dropdown">
          <div class="mt-2 w-60 rounded-lg glass border border-white/10">
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
    <div class="flex flex-col gap-3 text-sm font-medium">
      <a href="${aboutHref}" class="mobile-nav-link text-slate-300 hover:text-blue-300 transition py-2">About</a>
      <span class="text-xs text-slate-500 pt-2">Engineering</span>
      <a href="projects.html" class="mobile-nav-link text-slate-400 hover:text-blue-300 transition py-1 pl-3 text-sm">Showcase projects</a>
      <a href="github-projects.html" class="mobile-nav-link text-slate-400 hover:text-blue-300 transition py-1 pl-3 text-sm">GitHub repositories</a>
      <span class="text-xs text-slate-500 pt-2">Research</span>
      <a href="research.html" class="mobile-nav-link text-slate-400 hover:text-blue-300 transition py-1 pl-3 text-sm">Selected papers & projects</a>
      <a href="scholar-publications.html" class="mobile-nav-link text-slate-400 hover:text-blue-300 transition py-1 pl-3 text-sm">All publications (Scholar)</a>
      <a href="${contactHref}" class="mobile-nav-link text-slate-300 hover:text-blue-300 transition py-2">Contact</a>
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
