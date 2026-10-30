# IT Support Incident Demo

A Next.js browser application for the IT support incident-management demo.
Sample incidents and user changes are stored locally in the browser.

## Run locally

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Create a production build
with `npm run build` and serve it with `npm start`.

## Project structure

```text
app/
  layout.js
  page.js
assets/
  css/
    styles.css
public/
  assets/
    js/
      app.js
      data/
        reference-data.js
        seed-data.js
```

- `app/page.js` provides the Next.js page shell and loads the browser-only demo.
- `app/layout.js` contains the document metadata and shared stylesheet import.
- `public/assets/js/data/reference-data.js` contains shared demo lists.
- `public/assets/js/data/seed-data.js` contains the initial incident records.
- `public/assets/js/app.js` contains the existing incident workflows.
- `assets/css/styles.css` contains the page styles.

This is a demo without a backend, authentication, or access control. Changes
are saved only in the current browser.
