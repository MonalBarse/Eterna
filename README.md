# Eterna Assignment — High-Frequency Token Discovery UI

A high-performance replica of the **Axiom Trade Pulse** interface. This project was built to demonstrate proficiency in handling high-velocity data updates, complex state management, and responsive design within a strict performance budget.

[](https://eterna-opal.vercel.app/)

<img width="1666" height="1055" alt="image" src="https://github.com/user-attachments/assets/baceb28f-de07-4ce4-af13-e15ed70b23e6" />


## Project Overview

The goal was to replicate the Axiom Pulse table, a tool used by traders to spot new token pairs in real-time. The challenge wasn't just visual accuracy, but engineering a system capable of handling rapid state changes (price, volume, transactions) without compromising UI fluidity or the 90+ Lighthouse score requirement.

**Core Deliverables:**

  * **Columns:** New Pairs, Final Stretch, and Migrated.
  * **Interactions:** Sorting, Tooltips, Modals, and Hover states.
  * **Responsiveness:** Full grid layout on desktop, tabbed navigation on mobile (down to 320px).
  * **Simulation:** A realistic "WebSocket-like" data feed.

-----

## Technical Architecture & Decisions

### 1\. Hybrid State Management (React Query + Redux)

Handling high-frequency data in a pure React Context or standard state often leads to unnecessary re-renders. I adopted a **hybrid approach**:

  * **React Query (@tanstack/react-query):** Handles the initial data fetching (`/api/tokens`) and server state hydration. It provides robust loading, error, and refetching states out of the box.
  * **Redux Toolkit:** Once hydrated, the data is handed over to Redux. Redux is optimized for frequent, granular updates. The table components subscribe to specific slices of the store, ensuring that a price update in one token doesn't cause the entire application to re-render.

### 2\. The "Virtual" WebSocket Implementation

To meet the requirement of *Real-time price updates (WebSocket mock)* without a real backend, I architected a custom hook `useTokenSocket.ts`.

  * **Design:** Instead of simple random intervals, the hook acts as an event emitter. It dispatches batch updates to the Redux store every **150ms** (configurable).
  * **Logic:** It simulates "ticks" for price changes, volume increments, and transaction counts.
  * **Result:** This mimics the exact behavior of a `socket.on('message')` handler, allowing the UI to react to data velocity exactly as it would in a production trading environment.

### 3\. Performance Optimization

Achieving `<100ms` interactions and a high Lighthouse score required specific optimizations:

  * **Memoization:** The `TokenCard` component is wrapped in `React.memo`. It uses a custom comparison function to ensure re-renders *only* occur when visible metrics (price, volume, time) actually change.
  * **Deterministic Gradients:** Instead of fetching external images for every token (which hurts LCP and network threads), I implemented a deterministic color generator based on the Token ID. This provides a rich visual experience with **zero network overhead**.
  * **Virtualization Strategy:** Implemented a custom progressive loading/virtualization strategy in `TokenColumn.tsx` to handle long lists efficiently while maintaining smooth scrolling.

-----

## ⚡ Lighthouse Performance

The application was optimized to meet the strict `>= 90` score requirement.

<img width="1666" height="1055" alt="image" src="https://github.com/user-attachments/assets/2741e401-2058-4783-a1ce-fac7feeec1d6" />

| Category | Score | Notes |
| :--- | :--- | :--- |
| **Performance** | **99** | 🟢 Optimized LCP via skeleton screens & CSS gradients |
| **Accessibility** | **79** | ARIA labels |
| **Best Practices** | **100** | 🟢 Modern image formats & strict mode compliance |
| **SEO** | **100** | 🟢 Semantic HTML structure |

*(See `lighthouse-report` in repository for raw data)*

-----

## Visuals & Responsiveness

The UI is built with **Tailwind CSS** and designed to be pixel-perfect against the reference.

### Desktop View

A 3-column grid layout mirroring the Axiom interface.

### Mobile View (\< 768px)

Adapts to a tabbed interface to maintain information density without clutter.

-----

## 🛠️ Tech Stack

  * **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) - *Leveraging server components for initial layout.*
  * **Language:** TypeScript - *Strict mode enabled for robust typing.*
  * **Styling:** Tailwind CSS + `tailwindcss-animate`.
  * **State:** Redux Toolkit & React Query.
  * **Components:** Radix UI Primitives (Dialog, Popover, Tooltip) via shadcn/ui patterns.
  * **Icons:** Lucide React.
  * **Testing:** Playwright (Setup included).

-----

## 🧪 Getting Started

1.  **Clone the repository:**

    ```bash
    git clone [your-repo-link]
    cd [your-repo-name]
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

4.  **Open the app:**
    Visit [http://localhost:3000](http://localhost:3000) to view the application.
-----

*Submitted by [Your Nam
