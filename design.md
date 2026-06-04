# Ansible Vibe Design Document

## 1. Purpose

This document captures the high-level design for the `ansible-vibe` Angular application. It explains the architecture, application structure, styling strategy, and current integration status for PrimeNG.

## 2. Project Overview

`ansible-vibe` is a lightweight Angular 21 application scaffolded with Angular CLI. It is currently focused on a single root component and empty route configuration. The app is designed to be extended with feature routes and reusable UI components.

## 3. Architecture

### 3.1 Application Type

- Angular application using Angular 21.
- Standalone component architecture is implied by current app structure.
- Router is configured but no feature routes are defined yet.

### 3.2 Core Files

- `src/main.ts` — application bootstrap entry point.
- `src/app/app.ts` — root application component.
- `src/app/app.html` — root template.
- `src/app/app.scss` — root component styles.
- `src/app/app.routes.ts` — Angular routes configuration.
- `src/styles.scss` — global application styles.

### 3.3 Routing

- `src/app/app.routes.ts` currently exports an empty `Routes` array.
- The router outlet is already imported and available in `App`.
- Future development should add feature modules or standalone route-based components.

## 4. Styling and Theming

### 4.1 Global Styles

- Global application styling is handled in `src/styles.scss`.
- The current placeholder styles are minimal and scoped to the root layout.

### 4.2 PrimeNG Integration

PrimeNG has been installed with the following packages:

- `primeng`
- `primeicons`

The design includes the default PrimeNG theme and icon set as global style imports.

## 5. Dependency Strategy

### Existing runtime dependencies

- `@angular/common`
- `@angular/compiler`
- `@angular/core`
- `@angular/forms`
- `@angular/platform-browser`
- `@angular/router`
- `rxjs`
- `tslib`

### Added dependencies

- `primeng`
- `primeicons`

## 6. Component Design Guidelines

The application should follow modern Angular best practices:

- Prefer standalone components over NgModules.
- Use signals and `computed()` for local component state.
- Use `inject()` in services instead of constructor injection where appropriate.
- Keep components small and single-purpose.
- Use reactive patterns and modern control flow in templates.

## 7. Recommended Next Steps

1. Add feature routes to `src/app/app.routes.ts`.
2. Build reusable page and UI components.
3. Leverage PrimeNG components for forms, data tables, cards, and layout.
4. Keep `App` as a shell that loads feature routes and shared UI.
5. Add accessibility checks and validate against AXE.

## 8. Notes

- This design document is intentionally lightweight to match the current application state.
- As the app grows, update this file with a component map, service architecture, and feature modules.
