# API Integration Guide — Frontend Ready for Backend

**For:** Oracle (Backend Engineer)  
**Purpose:** Exact spec for connecting frontend pages to backend APIs  
**Status:** Frontend pages built, awaiting API endpoints  

---

## Current State

All pages use **client-side filtering** with hardcoded data arrays:
- `useState` for filters
- `useMemo` for filtering logic
- No API calls yet

**To integrate:** Replace the static arrays with API calls.

---

## Page-by-Page Integration Points

### 1. Guides Hub (`/app/guides/page.tsx`)

#### Current Implementation
```typescript
const frameworks = [
  { id: 1, title: 'Usage-Based Pricing', effort: 'medium', revenue: 'medium', ... },
  // ... 7 total items
];

// Client-side filtering
const filteredFrameworks = useMemo(() => {
  return frameworks.filter((f) => {
    const effortMatch = effort === 'all' || f.effort === effort;
    const revenueMatch = revenue === 'all' || f.revenue === revenue;
    const searchMatch = searchQuery === '' || f.title.toLowerCase().includes(searchQuery.toLowerCase());
    return effortMatch && revenueMatch && searchMatch;
  });
}, [effort, revenue, searchQuery]);
```

#### Integration Steps
1. **Replace the static array** with an API call
2. **Load on component mount** (useEffect)
3. **Pass filters to API** as query parameters
4. **Show loading state** while fetching

#### Target API Endpoint
```
GET /api/v1/frameworks
Query Parameters:
  - effort?: 'easy' | 'medium' | 'hard'
  - revenue?: 'low' | 'medium' | 'high'
  - search?: string
  - limit?: number (default 50)
  - offset?: number (default 0)

Response:
{
  "data": [
    {
      "id": 1,
      "title": "Usage-Based Pricing",
      "slug": "usage-based-pricing",
      "effort": "medium",
      "revenue": "medium",
      "description": "Pay-per-call billing model...",
      "readTime": 8,
      "tags": ["api", "saas", "scaling"]
    },
    ...
  ],
  "total": 7,
  "limit": 50,
  "offset": 0
}
```

#### Code Change (in `page.tsx`)
```typescript
const [frameworks, setFrameworks] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  const params = new URLSearchParams();
  if (effort !== 'all') params.append('effort', effort);
  if (revenue !== 'all') params.append('revenue', revenue);
  if (searchQuery) params.append('search', searchQuery);
  
  setLoading(true);
  fetch(`/api/v1/frameworks?${params}`)
    .then(res => res.json())
    .then(data => setFrameworks(data.data))
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
}, [effort, revenue, searchQuery];

// Remove the hardcoded array, use fetched data instead
```

---

### 2. Case Studies Hub (`/app/case-studies/page.tsx`)

#### Current Implementation
```typescript
const caseStudies = [
  { id: 1, title: 'Lead Gen Agency...', industry: 'lead-gen', ... }
];

// Filtered client-side
const filteredCaseStudies = useMemo(() => {
  return caseStudies.filter(...);
}, [industry, revenue, searchQuery]);
```

#### Target API Endpoint
```
GET /api/v1/case-studies
Query Parameters:
  - industry?: string (lead-gen, content, data, support, research)
  - revenue?: 'low' | 'medium' | 'high'
  - search?: string
  - limit?: number
  - offset?: number

Response:
{
  "data": [
    {
      "id": 1,
      "title": "Lead Gen Agency Hits $45K/Month",
      "slug": "lead-gen-agency",
      "industry": "lead-gen",
      "revenue": "high",
      "founder": "Alex Chen",
      "description": "How Alex turned...",
      "metrics": {
        "initial": "$2.1K",
        "final": "$45K+",
        "growth": "21x"
      },
      "readTime": 10,
      "featured": true,
      "tags": ["usage-based", "saas", "growth"]
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0
}
```

#### Integration Notes
- Each case study needs `/case-studies/[slug]` page (dynamic route)
- Link points to detail page: `/case-studies/{slug}`
- Detail page will need full content from `/api/v1/case-studies/{id}`

---

### 3. Marketplace (`/app/marketplace/page.tsx`)

#### Current Implementation
```typescript
const tools = [
  { id: 1, name: 'Stripe Billing', category: 'payment', difficulty: 'easy', ... }
];

// Filtered client-side by category + difficulty
```

#### Target API Endpoint
```
GET /api/v1/tools
Query Parameters:
  - category?: string (payment, integration, analytics, database, content)
  - difficulty?: 'easy' | 'medium' | 'hard'
  - search?: string
  - limit?: number
  - offset?: number

Response:
{
  "data": [
    {
      "id": 1,
      "name": "Stripe Billing",
      "category": "payment",
      "difficulty": "easy",
      "useCase": "SaaS Billing",
      "description": "Complete billing platform...",
      "pros": ["Flexible pricing models", "Webhook support", ...],
      "link": "https://stripe.com",
      "featured": true
    }
  ],
  "total": 6,
  "limit": 50,
  "offset": 0
}
```

#### Integration Notes
- Tools link externally (no detail page needed)
- Can show "3rd party link opens in new tab" icon
- Consider affiliate tracking for links (future)

---

### 4. Revenue Streams (`/app/revenue-streams/page.tsx`)

#### Current Implementation
```typescript
const revenueStreams = [
  { id: 1, name: 'Usage-Based API', difficulty: 'easy', scalability: 'high', ... }
];

// Filtered client-side by difficulty + scalability
```

#### Target API Endpoint
```
GET /api/v1/revenue-streams
Query Parameters:
  - difficulty?: 'easy' | 'medium' | 'hard'
  - scalability?: 'low' | 'medium' | 'high'
  - limit?: number
  - offset?: number

Response:
{
  "data": [
    {
      "id": 1,
      "name": "Usage-Based API",
      "description": "Charge per API call...",
      "difficulty": "easy",
      "scalability": "high",
      "timeToRevenue": "4 weeks",
      "avgPrice": "$0.05–$0.50 per unit",
      "bestFor": "Text generation, search, classification agents",
      "effort": "Low infrastructure needed",
      "pros": ["Scales with demand", "Easy to understand", ...],
      "cons": ["Revenue unpredictable", "Users hesitant...", ...]
    }
  ],
  "total": 10,
  "limit": 50,
  "offset": 0
}
```

#### Integration Notes
- No pagination needed (only 10 items)
- No detail page needed
- Can all load on single page

---

## Search API (All Hubs)

For full-text search across frameworks, case studies, etc.:

```
GET /api/v1/search
Query Parameters:
  - q: string (search query)
  - type?: 'framework' | 'case-study' | 'tool' | 'revenue-stream' | 'all'
  - limit?: number

Response:
{
  "results": [
    {
      "type": "framework",
      "id": 1,
      "title": "Usage-Based Pricing",
      "slug": "usage-based-pricing",
      "excerpt": "Pay-per-call billing model...",
      "url": "/guides/usage-based-pricing"
    },
    {
      "type": "case-study",
      "id": 1,
      "title": "Lead Gen Agency...",
      "slug": "lead-gen-agency",
      "excerpt": "Alex Chen scaled from $2.1K...",
      "url": "/case-studies/lead-gen-agency"
    }
  ],
  "total": 42
}
```

---

## Analytics API (Bonus)

For tracking page views and engagement:

```
POST /api/v1/analytics/events
Body:
{
  "event": "page_view" | "filter_applied" | "search_performed" | "external_link_clicked",
  "page": "/guides",
  "metadata": {
    "filter_effort": "medium",
    "search_query": "pricing",
    "tool_name": "Stripe"
  }
}
```

---

## Dynamic Routes (Detail Pages)

### Case Study Detail
```
GET /case-studies/:slug
  → Fetch /api/v1/case-studies?slug=lead-gen-agency
  → Render full article + author bio + testimonials
```

### Framework Detail (Optional)
```
GET /guides/:slug
  → Fetch /api/v1/frameworks?slug=usage-based-pricing
  → Render full framework content + code examples
```

---

## Error Handling

### On Frontend (Already Structured)
```typescript
// Each page can add:
if (loading) return <LoadingSpinner />;
if (error) return <ErrorState message={error.message} />;
if (data.length === 0) return <EmptyState />;
```

### Expected API Errors
- `400 Bad Request` — Invalid filter parameter
- `404 Not Found` — Resource doesn't exist
- `429 Too Many Requests` — Rate limiting
- `500 Internal Server Error` — Backend issue

### Suggested Response Format (for errors)
```json
{
  "error": {
    "code": "INVALID_FILTER",
    "message": "Invalid effort value. Must be: easy, medium, hard, or all"
  }
}
```

---

## Rate Limiting

### Suggested Strategy
- API key authentication (JWT or API key in header)
- Rate limit: 1000 requests/minute per client
- Return `X-RateLimit-*` headers in response
- Frontend can show "Too many requests" message

### Example Header
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 998
X-RateLimit-Reset: 1703270400
```

---

## CORS Configuration

### Needed for Vercel Deployment
```
Access-Control-Allow-Origin: https://agentmonetization.io
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
```

---

## Testing the Integration

### 1. Local Testing
```bash
# Start frontend
cd agent-monetization-hub-frontend
npm run dev
# Now at http://localhost:3000/guides

# Start backend
cd ../agent-monetization-hub-backend
npm run dev
# Now at http://localhost:3001/api/v1/...

# Frontend auto-calls localhost:3001 in dev mode
```

### 2. Mock API Testing (while Oracle builds)
Use mock responses in frontend:
```typescript
if (process.env.NEXT_PUBLIC_USE_MOCK_API === 'true') {
  // Use hardcoded data
  setFrameworks(mockFrameworksData);
} else {
  // Call real API
  const res = await fetch(`/api/v1/frameworks?${params}`);
}
```

### 3. Production Testing
Once deployed to Vercel:
- Frontend at https://agentmonetization.io
- Backend at https://api.agentmonetization.io (or same domain)
- CORS should allow cross-origin requests

---

## Integration Checklist (for Oracle)

- [ ] Frameworks endpoint (GET with filters)
- [ ] Case Studies endpoint (GET with filters)
- [ ] Tools/Marketplace endpoint (GET with filters)
- [ ] Revenue Streams endpoint (GET with filters)
- [ ] Full-text search endpoint (cross-content search)
- [ ] Case Study detail endpoint (for `/case-studies/[slug]`)
- [ ] Framework detail endpoint (for `/guides/[slug]`)
- [ ] Rate limiting headers
- [ ] CORS headers configured
- [ ] Error response format standardized
- [ ] Analytics tracking endpoint (bonus)

---

## Integration Checklist (for Pixel)

- [ ] Replace hardcoded arrays with API calls
- [ ] Add loading states to all pages
- [ ] Add error handling to all pages
- [ ] Wire up dynamic `/guides/:slug` detail page
- [ ] Wire up dynamic `/case-studies/:slug` detail page
- [ ] Connect search functionality to search API
- [ ] Add analytics tracking calls
- [ ] Test with real API responses
- [ ] Performance audit (Lighthouse)
- [ ] Deploy to Vercel staging

---

## Estimated Integration Time

- **Guides:** 1 hour
- **Case Studies:** 1.5 hours
- **Marketplace:** 1 hour
- **Revenue Streams:** 0.5 hours
- **Error handling + testing:** 1 hour
- **Total:** ~5 hours (can parallelize with Oracle's work)

---

**Last Updated:** May 20, 2026  
**Prepared by:** Pixel  
**For:** Oracle (Backend Engineer)
