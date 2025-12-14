# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Product & Order Dashboard (React Practical Assessment)

A lightweight admin-style dashboard built with **React + Vite + Material UI** to manage **Products** and **Orders**.  
Implements async data fetching, filtering, sorting, pagination, responsive layout (sidebar/topbar), and product updates with confirmation + snackbar feedback.

---

## Tech Stack

- **React (Vite)**
- **Redux Toolkit** (slices, async thunks, selectors)
- **React Router**
- **Material UI (MUI)** + **MUI X DataGrid**

---

## Features

### Products
- Fetch and display product list using **MUI DataGrid**
- Search by product name/title
- Filter by category
- Price range filter (slider)
- Pagination (DataGrid)
- Row click navigation to **Product Details**
- Defensive price formatting to avoid `$undefined` (renders `—` for missing/invalid values)

### Product Details
- Fetch product by ID
- Display product summary (card)
- Update:
  - Stock quantity
  - Active/Inactive status
- Confirmation dialog before saving
- PUT request to persist changes
- Snackbar feedback on success/failure

### Orders
- Fetch and display order list
- Filter by status
- Search by customer name or order ID
- Sorting by **Order ID** and **Total**
- Status displayed using a reusable badge component
- Responsive behavior:
  - On small screens, non-essential columns are hidden
  - Horizontal scrolling applies only inside the table container (not the whole page)

### UI/UX
- Responsive sidebar:
  - **Temporary drawer** on mobile
  - **Permanent drawer** on desktop
- Consistent loading, empty, and error states (with retry)
- Global snackbar notifications for API errors and actions
- Mobile-friendly filter bars and data views

---

## Screens / Routes

- `/products` — Product List (filters + pagination)
- `/products/:id` — Product Details (edit stock/status)
- `/orders` — Orders List (status filter + search + sorting)

---

## Project Structure (high level)

src/
  components/
    common/             
    layout/            
  features/
    products/            
    orders/              
    ui/                  
  app/                  
