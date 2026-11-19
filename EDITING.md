# Editing the portfolio

The site is static HTML. Open it through a local HTTP server for the JSON publication feed.

- Edit the introduction and featured work in index.html.
- Add project sections in projects.html by copying an existing section.
- Add selected publications in research.html.
- Change colours and typography in the variables and heading rules in styles.css.
- Edit navigation once in navbar.js for all five pages.
- Replace assets/resume.pdf to update the resume.
- Keep images under images/fulls and include descriptive alt text.

github-projects.html requests public GitHub repositories and supports search and language filtering. It caches successful responses in the browser for six hours.

scholar-publications.html loads publications.json. The scheduled update-scholar workflow uses the repository secret SERPAPI_API_KEY. Set this secret in GitHub Actions to enable updates. The script keeps the previous file if fetching fails or returns no publications.

The Pages workflow deploys pushes to main. A commit made by the default Actions token does not trigger another push workflow. After a scheduled Scholar update, manually run the Pages workflow to publish the updated JSON until these workflows are connected.

External font, icon and Tailwind CDN access is required by the current implementation.
