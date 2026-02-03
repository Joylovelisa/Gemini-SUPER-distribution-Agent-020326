# Technical Specification: Regulatory Command Center (v2.0)

**Document Version:** 2.0  
**Date:** 2025-05-20  
**Status:** Approved  

---

## 1. Executive Summary

The **Regulatory Command Center** is a high-performance, client-side Single Page Application (SPA) designed to serve as an Agentic AI System for FDA Device Related Records & Analytics. It provides regulatory affairs professionals, quality engineers, and medical device stakeholders with a centralized interface to visualize, search, and analyze critical safety and compliance data.

The system distinguishes itself through a unique "Artistic Lens" UI engine, allowing users to switch between 20 distinct visual themes inspired by famous painters, enhancing user engagement and reducing cognitive fatigue during data-heavy analysis.

Key capabilities include:
1.  **Regulatory Dashboard**: Live visualization of FDA data streams (510(k), Recalls, Adverse Events, GUDID).
2.  **Distribution Analysis**: An interactive module for parsing supply chain CSV data, visualizing distribution networks, and analyzing delivery logistics.
3.  **Dynamic Localization**: Real-time toggling between English and Traditional Chinese.
4.  **Client-Side Intelligence**: Zero-latency data processing and filtering using React's reactive state management.

---

## 2. System Architecture

### 2.1 Technology Stack

The application is built on a modern, lightweight, and performant stack designed for rapid rendering and ease of maintenance.

*   **Runtime Environment**: Browser (Client-Side Only).
*   **Core Framework**: **React 19** (leveraging concurrent features and efficient reconciliation).
*   **Language**: **TypeScript** (Strict mode for type safety and interface enforcement).
*   **Build Tooling**: ES Modules via `importmap` (No heavy bundler required for dev, high portability).
*   **Styling**:
    *   **Tailwind CSS**: Utility-first CSS for layout and responsiveness.
    *   **Inline Styles**: Used for dynamic theme injection (CSS Variables).
    *   **Google Fonts**: Dynamic loading of display fonts (`Inter`, `Outfit`, `Playfair Display`).
*   **Visualization**:
    *   **Recharts**: Composable React components based on D3.js for SVG-based charting.
    *   **Lucide React**: Lightweight, consistent SVG icons.

### 2.2 Directory Structure

The project follows a flat, component-centric structure optimized for small-to-medium scale applications.

```
/
├── index.html              # Application entry point, CDN links, Import maps
├── index.tsx               # React DOM hydration
├── App.tsx                 # Main application controller and router logic
├── types.ts                # Global TypeScript definitions (Interfaces/Types)
├── constants.ts            # Static data, Theme definitions, Translations
├── spec.md                 # Technical documentation
└── components/
    ├── Layout.tsx          # Wrapper for Global Theme Context injection
    ├── Header.tsx          # Navigation, Search, and Global Controls
    ├── Charts.tsx          # Dashboard visualization widgets
    ├── Results.tsx         # Search results list and filtering logic
    ├── ResultsSection.tsx  # Re-export module for architectural consistency
    └── DistributionAnalysis.tsx # Complex module for Supply Chain Analytics
```

### 2.3 State Management Strategy

The application utilizes React's built-in `useState` and `useMemo` hooks for state management, avoiding the overhead of external libraries like Redux.

*   **Global State**: Lifted to `App.tsx` (Theme, Language, View Mode).
*   **Derived State**: Heavily relies on `useMemo` to compute filtered datasets (e.g., `filteredRecords` in Results and Distribution Analysis) only when dependencies change, ensuring 60fps performance even with large datasets.
*   **Reference Management**: `useRef` is employed for DOM manipulation in file uploads, preserving clean render cycles.

---

## 3. Theming Engine: "Artistic Lens"

The core differentiator of the UI is the dynamic theming engine defined in `types.ts` and `constants.ts`.

### 3.1 Architecture
The `PainterStyle` interface defines the contract for a theme:
*   **ID/Name**: Unique identifiers.
*   **Colors**: A palette object containing:
    *   `bgGradientStart` / `bgGradientEnd`: Defines the linear gradient background.
    *   `glassBg` / `glassBorder`: RGBA values for the glassmorphism effect.
    *   `textPrimary` / `textSecondary`: Contrast-checked text colors.
    *   `accent` / `accentHover`: Primary action colors.
    *   `chartColors`: Array of colors specifically for data visualization differentiation.
*   **Font**: Optional font family override (e.g., Serif for "Da Vinci").
*   **Pattern**: CSS background pattern (e.g., radial dots for "Lichtenstein").

### 3.2 Implementation (`Layout.tsx`)
The `Layout` component acts as a **CSS Variable Injector**. It receives the active `style` object and maps the JavaScript values to CSS Custom Properties (Variables) on the root container.

```css
/* Dynamic Injection Logic */
style={{
  background: `linear-gradient(...)`,
  '--glass-bg': colors.glassBg,
  '--glass-border': colors.glassBorder,
  '--accent-color': colors.accent,
  /* ... */
}}
```

This approach allows child components to use Tailwind classes like `border-[var(--glass-border)]` or vanilla CSS `var(--accent-color)` without knowing the active theme, enforcing a separation of concerns between structure and presentation.

---

## 4. Module Specifications

### 4.1 Header & Navigation (`Header.tsx`)

*   **Functionality**:
    *   **Language Toggle**: Switches `TRANSLATIONS_DICT` context between 'en' and 'zh-TW'.
    *   **Theme Selector**: Dropdown rendering 20 styles.
    *   **Jackpot Mode**: Randomly selects a theme using `Math.random()`.
    *   **View Switching**: Toggles between `dashboard` and `distribution` views.
    *   **Live Search**: Global search input (debounced by React state updates).
*   **Visuals**: Uses a `backdrop-blur-xl` container to float above the artistic background.

### 4.2 Regulatory Dashboard (`Charts.tsx`, `Results.tsx`)

#### 4.2.1 Data Visualization (`Charts.tsx`)
This component renders high-level metrics using `recharts`.
1.  **Record Type Distribution**: `PieChart` (Donut variant). Visualizes the proportion of 510(k), ADR, Recall, and GUDID records. Colors are dynamically pulled from the active theme's `chartColors` array.
2.  **Timeline Overview**: Custom vertical list visualization. Maps `dataTimeline` to a scrollable container with theme-accented timeline nodes.
3.  **Severity Indicators**: Custom CSS-based progress bars for "Device Class" and "Recall Severity".
4.  **Decision Code Analysis**: Horizontal `BarChart` showing distribution of FDA decision codes (e.g., SESE).

#### 4.2.2 Search & Results (`Results.tsx`)
*   **Data Aggregation**: Merges disparate data types (510k, ADR, etc.) into a unified `FdaRecord[]` array using `useMemo`.
*   **Filtering Algorithm**:
    *   **Tab Filter**: Filters by `source` property.
    *   **Text Search**: Performs a case-insensitive sub-string match across `device_name`, `k_number`, `applicant`, `narrative`, and `reason_for_recall`.
*   **Card Rendering**: Each record is rendered as a "Glass Card" with:
    *   Iconography specific to the record source.
    *   Conditional rendering fields (e.g., showing `decision_date` only for 510k).
    *   Interactive "Analyze" buttons.

### 4.3 Distribution Analysis Module (`DistributionAnalysis.tsx`)

This module allows users to perform supply chain analytics on raw CSV data.

#### 4.3.1 Data Ingestion
*   **Text Area Input**: Allows direct pasting of CSV/JSON data.
*   **File Upload**: Uses `FileReader` API to read text files asynchronously.
*   **CSV Parsing Logic**:
    *   Custom parser handles standard CSV formatting.
    *   **Regex Handling**: `lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g)` ensures that commas inside quoted strings (e.g., "Device Name, Pro") do not break column alignment.
    *   **Object Mapping**: Maps raw CSV columns to the `DistributionRecord` interface (SupplierID, Deliverdate, etc.).

#### 4.3.2 Filtering Engine
Four independent text filters (Supplier, License, Model, Customer) are combined using logical AND operations within a `useMemo` hook. This ensures that the charts immediately reflect any subset of data selected by the user.

#### 4.3.3 Visualization Suite
1.  **Summary Statistics**: Calculates Total Units (`reduce`), Unique Customers (`Set.size`), and Top Model (Frequency Map sorting).
2.  **Network Graph (Flow Visualization)**:
    *   **Logic**: Constructs a hierarchical tree object: `Supplier -> License -> Model`.
    *   **Render**: Simulates a Sankey diagram using flexbox columns. Connecting lines are implied via layout grouping.
    *   **Interactivity**: Hover effects highlight nodes.
3.  **Delivery Timeline**: `AreaChart` plotting aggregated quantities over `Deliverdate`.
4.  **Model Distribution**: `PieChart` showing market share of different models.
5.  **Top Customers**: Vertical `BarChart` ranking customers by total units received.
6.  **License Usage**: `BarChart` showing volume per regulatory license number.

#### 4.3.4 Analytic Assistance
*   **Follow-up Questions**: A static list of 20 deep-dive questions (e.g., "Which supplier has the highest defect rate?") guides the user in interpreting the data.

---

## 5. Data Models (TypeScript Interfaces)

### 5.1 FDA Record (`FdaRecord`)
Designed to handle polymorphism across different regulatory databases.
*   **Common**: `id`, `device_name`, `product_code`.
*   **510(k)**: `k_number`, `decision`, `summary`.
*   **ADR**: `adverse_event_id`, `patient_outcome`, `narrative`.
*   **Recall**: `recall_number`, `reason_for_recall`, `firm_name`.
*   **GUDID**: `primary_di`, `device_description`.

### 5.2 Distribution Record (`DistributionRecord`)
Strict schema matching the input CSV format.
*   `SupplierID`, `Deliverdate`, `CustomerID` (Strings).
*   `Number` (Number - quantity).
*   `DeviceNAME`, `Model`, `LicenseNo` (Strings).

---

## 6. UI Design Patterns

### 6.1 Glassmorphism
The application heavily utilizes the Glassmorphism trend to create depth.
*   **Background**: High-resolution CSS gradients or patterns.
*   **Layers**: Components use `rgba(255, 255, 255, alpha)` backgrounds with `backdrop-filter: blur(px)`.
*   **Borders**: Semi-transparent white/black borders mimic the edge of glass.

### 6.2 Responsive Design
*   **Grid System**: Uses CSS Grid and Flexbox.
*   **Breakpoints**:
    *   **Mobile**: Stacked layout, hidden text labels, simplified headers.
    *   **Tablet/Desktop**: multi-column dashboards, expanded visualization width.
*   **Scrollbars**: Custom webkit styling to match the theme accent color.

### 6.3 Animation
*   **Transitions**: All theme changes animate `background`, `color`, and `border-color` over 700ms (`duration-700 ease-in-out`).
*   **Entry Animations**: Keyframe animations (`fadeIn`) are applied to search results and charts for a smooth loading experience.

---

## 7. Performance Considerations

1.  **Bundle Size**:
    *   The app uses ESM imports via `esm.sh` to avoid large local `node_modules`.
    *   Icons are tree-shaken by importing specific Lucide icons.
2.  **Rendering**:
    *   Large datasets (Distribution Analysis) are processed in-memory.
    *   `useMemo` prevents recalculation of derived stats (sums, counts) unless input data or filters change.
    *   React `StrictMode` is enabled to catch lifecycle issues during development.
3.  **Asset Loading**:
    *   Fonts are loaded with `display=swap` to prevent FOUT (Flash of Unstyled Text).

---

## 8. Security & Privacy

*   **Client-Side Processing**: All data parsing for the Distribution Analysis happens locally in the user's browser memory. No data is uploaded to any server. This allows users to paste sensitive supply chain data without privacy risk.
*   **Sanitization**: Basic input handling is performed during CSV parsing, but since data is not executed or rendered as HTML, XSS risks are minimal.

---

## 9. Future Roadmap

1.  **Export Capabilities**: Add functionality to export the filtered analysis results as PDF or CSV.
2.  **Advanced Charts**: Replace the Flexbox Network Graph with a true SVG Sankey diagram using D3.js for complex relationship mapping.
3.  **Backend Integration**: Connect the dashboard to live FDA open APIs (openFDA) instead of using `MOCK_DATA`.
4.  **AI Integration**: Implement the "Agentic" features mentioned in metadata to automatically generate answers for the follow-up questions based on the loaded dataset.

---

**End of Specification**
