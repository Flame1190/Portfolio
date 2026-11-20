# Editing the portfolio

The site is static HTML. Open it through a local HTTP server for the JSON publication feed.

- Edit the introduction and featured work in index.html.
- Add project sections in projects.html by copying an existing section.
- Add selected publications in research.html.
- Change colours and typography in the variables and heading rules in styles.css.
- Edit navigation once in navbar.js for all five pages.
- Replace assets/resume.pdf to update the resume.
- Keep images under images/fulls and include descriptive alt text.
- The homepage slideshow reads the articles in Selected engineering work, in order. Add an optional `data-feature-image="images/fulls/example.jpg"` to an article’s image to use a different, full-size image in the slideshow. Without it, the slideshow uses the thumbnail. Slideshow images fit inside a consistent frame with their full contents visible.

github-projects.html requests public GitHub repositories and supports search and language filtering. It caches successful responses in the browser for six hours.

scholar-publications.html loads publications.json. The scheduled update-scholar workflow uses the repository secret SERPAPI_API_KEY. Set this secret in GitHub Actions to enable updates. The script keeps the previous file if fetching fails or returns no publications.

The Scholar workflow runs daily and calls the reusable Pages workflow after a successful fetch and commit. Updates to the fetch script or its workflow on main also trigger a sync. The repository secret SERPAPI_API_KEY must hold a working SerpAPI key. Fetch failures leave the previous feed intact and fail the workflow. The browser revalidates publications.json on each page load.

External font, icon and Tailwind CDN access is required by the current implementation.

The Pages workflow runs scripts/prepare_site.py and deploys its _site output. This adds content hashes to local asset URLs so browsers load matching HTML, styles, scripts and images after each deployment. The generated _site folder is ignored by Git.
