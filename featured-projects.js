(() => {
    const feature = document.querySelector('#featured-project');
    const projects = Array.from(document.querySelectorAll('#dev article')).map(article => ({
        image: article.querySelector('img'),
        title: article.querySelector('h3')?.textContent.trim(),
        summary: article.querySelector('p')?.textContent.trim(),
        link: article.querySelector('a[href]')
    })).filter(project => project.image && project.title && project.summary && project.link);

    if (!projects.length) {
        feature.hidden = true;
        return;
    }

    const image = feature.querySelector('img');
    const title = feature.querySelector('.feature-title');
    const summary = feature.querySelector('.feature-summary');
    const position = feature.querySelector('.feature-position');
    const status = feature.querySelector('[role="status"]');
    const rotation = feature.querySelector('[data-rotation]');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const interval = 8000;
    let index = 0;
    let playing = !motion.matches;
    let hovered = false;
    let timer;

    function show(step, announce = false) {
        index = (index + step + projects.length) % projects.length;
        const project = projects[index];
        image.src = project.image.dataset.featureImage || project.image.src;
        image.alt = project.image.alt;
        title.href = project.link.href;
        title.textContent = project.title + ' ↗';
        summary.textContent = project.summary;
        position.textContent = (index + 1) + ' / ' + projects.length;
        if (announce) status.textContent = project.title + ', ' + position.textContent;
    }

    function updateRotation() {
        window.clearInterval(timer);
        rotation.textContent = playing ? 'Pause' : 'Play';
        rotation.setAttribute('aria-label', (playing ? 'Pause' : 'Start') + ' project rotation');
        if (playing && !hovered && !document.hidden) {
            timer = window.setInterval(() => show(1), interval);
        }
    }

    show(0);
    if (projects.length === 1) return;
    feature.querySelector('.feature-controls').hidden = false;
    feature.querySelector('[data-previous]').addEventListener('click', () => {
        playing = false;
        show(-1, true);
        updateRotation();
    });
    feature.querySelector('[data-next]').addEventListener('click', () => {
        playing = false;
        show(1, true);
        updateRotation();
    });
    rotation.addEventListener('click', () => {
        playing = !playing;
        updateRotation();
    });
    feature.addEventListener('pointerenter', event => {
        hovered = event.pointerType === 'mouse';
        updateRotation();
    });
    feature.addEventListener('pointerleave', () => {
        hovered = false;
        updateRotation();
    });
    feature.addEventListener('focusin', event => {
        if (event.target.matches(':focus-visible')) {
            playing = false;
            updateRotation();
        }
    });
    motion.addEventListener('change', () => {
        if (motion.matches) playing = false;
        updateRotation();
    });
    document.addEventListener('visibilitychange', updateRotation);
    updateRotation();
})();
