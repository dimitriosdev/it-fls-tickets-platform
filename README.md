# IT Support Incident Demo

A browser-only incident-management demo with sample data stored in the browser's
`localStorage`.

## Run

Open `index.html` in a browser. No build step or dependencies are required.

## Project structure

```text
index.html
assets/
  css/
    styles.css
  js/
    app.js
    data/
      reference-data.js
      seed-data.js
```

- `reference-data.js` contains shared catalog values such as categories,
  workplaces, users, and resolution suggestions.
- `seed-data.js` contains the initial incident records.
- `app.js` contains the application state, rendering, and interaction logic.
- `styles.css` contains the page styles.

The demo has no backend or access control. Changes are saved only in the
current browser.
