# OctoFit Tracker frontend

The React presentation tier runs with Vite on port 5173 and reads API data from port 8000.

In Codespaces, define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` with the Codespace name, without a protocol or port. Vite exposes this variable to the client and constructs `https://<name>-8000.app.github.dev`. Restart Vite after changing `.env.local`.

When `VITE_CODESPACE_NAME` is unset, the frontend uses `http://localhost:8000` for local development.

Run the frontend with `npm run dev --prefix octofit-tracker/frontend`.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
