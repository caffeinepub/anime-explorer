# ANIMEFLIX

## Current State
Anime discovery app with browse, search, filter, detail pages, and My List. Backend uses HTTP outcalls to Jikan API.

## Requested Changes (Diff)

### Add
- Backend: visitor counter (stable var), `recordVisit` update call, `getVisitCount` query
- Frontend: secret admin page at `/admin-stats` showing total visitor count
- Frontend: auto-record a visit on app load

### Modify
- App.tsx: add `/admin-stats` route

### Remove
- Nothing

## Implementation Plan
1. Add `visitorCount` stable var to backend with `recordVisit` and `getVisitCount` functions
2. Call `recordVisit` once on app mount in App.tsx
3. Create `AdminPage` component at `/admin-stats` showing the count, styled to match dark theme
4. Register route in router
