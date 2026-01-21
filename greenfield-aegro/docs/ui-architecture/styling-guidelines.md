# Styling Guidelines

## Styling Approach

**Primary:** Tailwind CSS with custom design tokens  
**Secondary:** Vue scoped styles for component-specific overrides  
**Icons:** Flaticon Uicons via CDN

**Methodology:**
- Utility-first with Tailwind for rapid development
- Custom CSS properties (design tokens) for theming
- Scoped styles only when Tailwind insufficient
- No CSS-in-JS or styled-components

## Global Theme Variables

```css
/* assets/styles/variables.css */

:root {
  /* === COLOR PALETTE === */
  
  /* Primary Blues */
  --color-primary: #1e40af;
  --color-primary-light: #3b82f6;
  --color-primary-dark: #1e3a8a;
  --color-secondary: #60a5fa;
  --color-accent: #93c5fd;
  
  /* Semantic Colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  
  /* Neutral Grays */
  --color-gray-900: #111827;
  --color-gray-700: #374151;
  --color-gray-500: #6b7280;
  --color-gray-300: #d1d5db;
  --color-gray-100: #f3f4f6;
  --color-gray-50: #f9fafb;
  --color-white: #ffffff;
  
  /* === TYPOGRAPHY === */
  
  /* Font Families */
  --font-family-base: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
  --font-family-mono: 'Roboto Mono', 'Courier New', monospace;
  
  /* Font Sizes */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 2rem;      /* 32px */
  
  /* Font Weights */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-snug: 1.3;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.6;
  
  /* === SPACING === */
  
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 0.75rem;   /* 12px */
  --spacing-base: 1rem;    /* 16px */
  --spacing-lg: 1.25rem;   /* 20px */
  --spacing-xl: 1.5rem;    /* 24px */
  --spacing-2xl: 2rem;     /* 32px */
  --spacing-3xl: 3rem;     /* 48px */
  --spacing-4xl: 4rem;     /* 64px */
  
  /* === LAYOUT === */
  
  --max-width-content: 800px;
  --max-width-container: 1200px;
  --header-height: 80px;
  --header-height-mobile: 64px;
  
  /* === BORDERS & SHADOWS === */
  
  --border-radius-sm: 0.25rem;  /* 4px */
  --border-radius-md: 0.5rem;   /* 8px */
  --border-radius-lg: 0.75rem;  /* 12px */
  
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  /* === FOCUS === */
  
  --focus-ring-color: var(--color-primary);
  --focus-ring-width: 3px;
  --focus-ring-offset: 2px;
  
  /* === TRANSITIONS === */
  
  --transition-fast: 150ms ease-out;
  --transition-normal: 200ms ease-in-out;
  --transition-slow: 300ms ease-in-out;
  
  /* === Z-INDEX === */
  
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal: 400;
  --z-tooltip: 500;
}

/* === DARK MODE (Future) === */
/* 
@media (prefers-color-scheme: dark) {
  :root {
    --color-gray-900: #f9fafb;
    --color-gray-50: #111827;
    ...
  }
}
*/

/* === REDUCED MOTION === */

@media (prefers-reduced-motion: reduce) {
  :root {
    --transition-fast: 0ms;
    --transition-normal: 0ms;
    --transition-slow: 0ms;
  }
  
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* === FOCUS STYLES === */

:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}

/* Remove default focus for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}

/* === BASE STYLES === */

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--color-gray-900);
  background-color: var(--color-gray-50);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* === SCREEN READER ONLY === */

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Skip Link - visible on focus */
.skip-link {
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: var(--z-fixed);
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--border-radius-md);
  text-decoration: none;
  font-weight: var(--font-weight-semibold);
}

.skip-link:focus {
  top: var(--spacing-base);
}
```

## Tailwind Configuration

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e40af',
          light: '#3b82f6',
          dark: '#1e3a8a'
        },
        secondary: '#60a5fa',
        accent: '#93c5fd'
      },
      fontFamily: {
        sans: ['Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
        mono: ['Roboto Mono', 'Courier New', 'monospace']
      },
      fontSize: {
        // Enforce minimum 14px (0.875rem)
        'xs': ['0.875rem', { lineHeight: '1.4' }],  // 14px, not 12px
        'sm': ['0.875rem', { lineHeight: '1.4' }],  // 14px
        'base': ['1rem', { lineHeight: '1.5' }],     // 16px
        'lg': ['1.125rem', { lineHeight: '1.6' }],   // 18px
        'xl': ['1.25rem', { lineHeight: '1.4' }],    // 20px
        '2xl': ['1.5rem', { lineHeight: '1.3' }],    // 24px
        '3xl': ['2rem', { lineHeight: '1.2' }],      // 32px
      },
      spacing: {
        '18': '4.5rem',  // 72px
        '22': '5.5rem',  // 88px
      },
      maxWidth: {
        'content': '800px',
        'container': '1200px'
      },
      minHeight: {
        'touch': '44px'  // Minimum touch target
      },
      boxShadow: {
        'hover': '0 4px 12px rgba(0, 0, 0, 0.15)'
      },
      borderRadius: {
        'card': '12px'
      }
    }
  },
  plugins: []
}
```

---
