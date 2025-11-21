Here is a professional `README.md` written from your perspective, detailing exactly what you accomplished in this assignment. You can copy-paste this directly into your repository.

-----

# Axiom Trade - Pulse Replica

This is a pixel-perfect, high-performance replica of the Axiom Trade token discovery table ("Pulse"). It features real-time simulated data updates, smooth UI transitions, and a fully responsive layout, built with **Next.js 14**, **Redux Toolkit**, and **Tailwind CSS**.

## 🚀 Deployed Demo

https://eterna-opal.vercel.app/


## 🛠 Tech Stack

  * **Framework:** Next.js 14 (App Router)
  * **Language:** TypeScript (Strict Mode)
  * **Styling:** Tailwind CSS
  * **State Management:** Redux Toolkit (for high-frequency data) & React Query
  * **UI Components:** Radix UI / shadcn/ui (Dialog, Tooltip, etc.)
  * **Icons:** Lucide React

## ✨ What I Did (Key Features)

For this assignment, I focused heavily on **performance optimization** and **architectural scalability** to handle the requirements of a high-frequency trading interface.

### 1\. Real-Time Data Simulation

  * Implemented a simulated WebSocket hook (`useTokenSocket`) that updates prices, volume, and transactions every **150ms**.
  * Used **Redux Toolkit** to manage this high-velocity state globally, ensuring data flows efficiently to the three main columns (New Pairs, Final Stretch, Migrated).

### 2\. Performance Optimization (90+ Lighthouse Score)

  * **Memoization:** Heavily used `React.memo` on the `TokenCard` component to prevent unnecessary re-renders. The card only updates if specific props (price, volume, time) change.
  * **Zero-Load Assets:** Instead of fetching external images (which hurts LCP), I implemented a deterministic **CSS Gradient Generator** based on the token ID. This ensures instant loading and zero network overhead for avatars.
  * **Layout Stability:** Pre-defined heights and skeleton states (`PulseSkeleton`) to ensure **0 layout shift (CLS)** during loading.

### 3\. Pixel-Perfect UI & Interaction

  * **Visuals:** Replicated the dark/slate aesthetic of Axiom Trade, including the specific green/red flash effects on price changes.
  * **Interactive Elements:**
      * **Tooltips:** Hover over addresses to see full details.
      * **Modals:** Click any card to open a detailed token view (using Radix Dialog).
      * **Sorting:** Fully functional sorting by Market Cap and Volume.
  * **Responsiveness:** The layout adapts gracefully from desktop grids to a scrollable stacked layout on mobile devices (down to 320px).

### 4\. Code Quality

  * **Atomic Design:** Components are split into small, reusable parts (`TokenCard`, `TokenColumn`, `MetricPill`).
  * **Strict TypeScript:** No `any` types; strict interfaces for Token data and component props.
  * **Error Boundaries:** Implemented a global error boundary to gracefully handle crashes.

## 🏗️ Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

## 🧪 Project Structure

```bash
├── src/
│   ├── app/            # Next.js App Router pages & API routes
│   ├── components/     # UI components (TokenCard, PulseHeader, etc.)
│   ├── lib/            # Utilities, Redux store, mock data generators
│   └── hooks/          # Custom hooks (useTokenSocket, useAppDispatch)
```

-----

*Submission for Frontend Task - Token Trading Table*