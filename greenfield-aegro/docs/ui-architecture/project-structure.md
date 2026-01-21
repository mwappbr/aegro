# Project Structure

```plaintext
src/
├── App.vue                          # Root component with layout
├── main.ts                          # Application entry point
├── router/
│   └── index.ts                     # Vue Router configuration
├── assets/
│   ├── styles/
│   │   ├── main.css                 # Global styles + Tailwind imports
│   │   └── variables.css            # CSS custom properties (design tokens)
│   └── fonts/                       # Local font files (Roboto) if self-hosted
├── components/
│   ├── common/                      # Shared/reusable components
│   │   ├── AppButton.vue            # Accessible button component
│   │   ├── AppCard.vue              # Card container component
│   │   ├── AppBreadcrumb.vue        # Breadcrumb navigation
│   │   ├── AppSpinner.vue           # Loading spinner
│   │   ├── AppSkeleton.vue          # Skeleton loading placeholder
│   │   ├── AppErrorMessage.vue      # Error state display
│   │   └── AppIcon.vue              # Icon wrapper (Flaticon Uicons)
│   ├── layout/
│   │   ├── TheHeader.vue            # Site header with navigation
│   │   ├── TheFooter.vue            # Site footer
│   │   └── TheSkipLink.vue          # Skip to main content link
│   ├── story/
│   │   ├── StoryCard.vue            # Article preview card for list
│   │   ├── StoryList.vue            # List of story cards
│   │   ├── StoryDetail.vue          # Full article view
│   │   └── StoryMeta.vue            # Metadata display (author, time, points)
│   └── comment/
│       ├── CommentItem.vue          # Single comment with collapse
│       ├── CommentList.vue          # List of root comments
│       └── CommentThread.vue        # Recursive nested comments
├── composables/
│   ├── useApi.ts                    # Generic API fetch wrapper
│   ├── useHackerNews.ts             # HackerNews-specific API calls
│   ├── useRelativeTime.ts           # Date formatting (date-fns)
│   ├── useLocalStorage.ts           # Cache management
│   └── useAccessibility.ts          # Focus management, announcements
├── services/
│   ├── api/
│   │   ├── client.ts                # Fetch client with error handling
│   │   └── hackerNewsApi.ts         # HackerNews API service
│   └── cache/
│       └── storageCache.ts          # localStorage cache utilities
├── types/
│   ├── story.ts                     # Story/Item type definitions
│   ├── comment.ts                   # Comment type definitions
│   └── api.ts                       # API response types
├── utils/
│   ├── sanitize.ts                  # DOMPurify wrapper
│   ├── formatters.ts                # Text/number formatters
│   └── constants.ts                 # App constants (API URLs, timeouts)
├── views/
│   ├── HomeView.vue                 # Homepage with story list
│   ├── StoryView.vue                # Individual story page
│   └── NotFoundView.vue             # 404 error page
└── __tests__/
    ├── components/                  # Component unit tests
    ├── composables/                 # Composable tests
    └── services/                    # Service tests
```

## Directory Conventions

- **components/**: Organized by feature domain (common, layout, story, comment)
- **composables/**: Reusable composition functions (use* prefix)
- **services/**: External integrations and business logic
- **types/**: TypeScript interfaces and type definitions
- **views/**: Route-level page components
- **__tests__/**: Mirrors src/ structure for easy test discovery

---
