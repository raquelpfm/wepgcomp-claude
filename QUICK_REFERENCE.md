# WEPGCOMP Quick Reference Guide

## File Locations

| Component | Location |
|-----------|----------|
| Services | `/src/services/*.service.ts` |
| Types | `/src/types/*.types.ts` |
| Contexts | `/src/contexts/*.tsx` |
| Hooks | `/src/hooks/use*.ts` |
| Components | `/src/components/{common,layout}/*.tsx` |
| Pages | `/src/pages/**/*.tsx` |
| Routes | `/src/routes/*.tsx` |
| Constants | `/src/utils/constants.ts` |
| Validators | `/src/utils/validators.ts` |
| Formatters | `/src/utils/formatters.ts` |

## API Endpoints Quick Reference

### Authentication
- `POST /auth/login` - Login user
- `POST /auth/register/{professor|student|listener}` - Register
- `POST /auth/confirm-email` - Confirm email
- `GET /auth/me` - Get current user
- `POST /auth/refresh` - Refresh token

### Users
- `GET /users` - List all (paginated, filtered)
- `GET /users/{id}` - Get by ID
- `GET /users/professors/pending` - Pending approvals
- `POST /users/professors/approve` - Approve/reject
- `POST /users/{id}/grant-admin` - Grant admin
- `POST /users/{id}/assign-coordinator` - Assign coordinator

### Events
- `GET /events` - All event editions
- `GET /events/active` - Active edition
- `POST /events` - Create edition
- `PUT /events/{id}` - Update edition
- `POST /events/{id}/set-active` - Activate edition

### Sessions & Rooms
- `GET /sessions` - Get sessions (by eventEditionId)
- `POST /sessions` - Create session
- `POST /sessions/validate` - Check conflicts
- `GET /rooms` - All rooms
- `POST /rooms` - Create room
- `GET /rooms/available` - Available for time slot

### Presentations
- `GET /presentations` - List (paginated)
- `POST /presentations` - Create
- `PUT /presentations/{id}` - Update
- `POST /presentations/{id}/upload-pdf` - Upload PDF
- `POST /presentations/{id}/vote` - Submit vote
- `GET /presentations/rankings` - Get rankings
- `POST /presentations/{id}/submit` - Submit (DRAFT→SUBMITTED)

### Certificates & Awards
- `GET /certificates` - List
- `POST /certificates/generate` - Generate
- `POST /certificates/send` - Send via email
- `GET /awards` - List awards
- `POST /awards/select` - Select recipients
- `GET /awards/evaluator-rankings` - Evaluator rankings

## User Roles & Permissions

### 6 User Roles
1. **SUPER_ADMIN** - Full system control
2. **ADMIN** - Event management, user approvals
3. **COORDINATOR** - Event coordination (one per edition)
4. **PROFESSOR** - View presentations, vote
5. **DOCTORAL_STUDENT** - Create presentation, submit
6. **LISTENER** - View presentations, vote

### Role Permissions Mapping
See `src/types/auth.types.ts` for detailed RolePermissions object

### Protected Routes Pattern
```typescript
<Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]} />}>
  <Route path="/admin/*" element={<AdminPage />} />
</Route>
```

## Data Types Quick Lookup

### Enums
| Type | Values |
|------|--------|
| `UserRole` | SUPER_ADMIN, ADMIN, COORDINATOR, PROFESSOR, DOCTORAL_STUDENT, LISTENER |
| `UserStatus` | PENDING_EMAIL_CONFIRMATION, PENDING_APPROVAL, ACTIVE, INACTIVE, REJECTED |
| `EventEditionStatus` | DRAFT, REGISTRATION_OPEN, REGISTRATION_CLOSED, IN_PROGRESS, COMPLETED, ARCHIVED |
| `PresentationStatus` | DRAFT, SUBMITTED, SCHEDULED, COMPLETED, CANCELLED |
| `CertificateType` | PARTICIPANT, PRESENTER, EVALUATOR, AWARD_PRESENTER, AWARD_EVALUATOR, ORGANIZER |

### Key Response Types
```typescript
// API Response wrapper
ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

// Pagination
PaginatedResponse<T> {
  data: T[]
  pagination: { page, limit, total, totalPages }
}

// Auth Response
AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
  expiresIn: number
}
```

## Context & Hooks

### AuthContext
```typescript
useAuth() returns {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login(credentials): Promise<void>
  logout(): Promise<void>
  hasRole(roles): boolean
  hasPermission(permission): boolean
}
```

### EventContext
```typescript
useEvent() returns {
  activeEvent: EventEdition | null
  allEvents: EventEdition[]
  isLoading: boolean
  error: string | null
  refreshActiveEvent(): Promise<void>
  setActiveEvent(eventId): Promise<void>
}
```

## Constants

| Constant | Value |
|----------|-------|
| MIN_PASSWORD_LENGTH | 8 |
| MAX_PDF_SIZE_MB | 10 |
| DEFAULT_PRESENTATION_DURATION | 20 minutes |
| MAX_SCORE | 10 |
| MIN_SCORE | 0 |
| DEFAULT_PAGE_SIZE | 20 |
| MAX_EVALUATOR_AWARDS | 3 |
| AWARD_RANKS | 1st, 2nd, 3rd |

## localStorage Keys
- `accessToken` - JWT access token
- `refreshToken` - JWT refresh token
- `activeEventId` - Current event edition ID
- `userData` - Cached user data (optional)

## Common Component Props Pattern

```typescript
interface ComponentProps {
  // Data
  data?: SomeType
  items?: SomeType[]
  
  // Callbacks
  onSubmit?: (data: any) => Promise<void>
  onChange?: (value: any) => void
  onClose?: () => void
  
  // State
  isLoading?: boolean
  error?: string | null
  
  // UI
  title?: string
  disabled?: boolean
  className?: string
}
```

## Service Pattern

All services follow this pattern:
```typescript
const serviceName = {
  async methodName(params): Promise<ApiResponse<T>> {
    const response = await api.method('/endpoint', data)
    return response.data
  }
}

export default serviceName
```

## Error Handling Pattern

```typescript
try {
  const response = await service.method(params)
  
  if (!response.success) {
    throw new Error(response.message || 'Unknown error')
  }
  
  // Use response.data
} catch (err: any) {
  const message = err.response?.data?.message || err.message
  // Handle error
}
```

## Form Pattern (React Hook Form + Zod)

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

type FormData = z.infer<typeof schema>

export const MyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })
  
  const onSubmit = async (data: FormData) => {
    // Submit data
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  )
}
```

## API Configuration

| Setting | Value |
|---------|-------|
| Base URL | `$VITE_API_URL` or `http://localhost:4000/api` |
| Timeout | 30 seconds |
| Token Header | `Authorization: Bearer {token}` |
| Content-Type | `application/json` |
| Token Refresh | Automatic on 401 |
| Redirect on Auth Fail | `/auth/login` |

## Project Statistics

- **TypeScript Files**: 44+
- **Service Methods**: 100+
- **Type Interfaces**: 30+
- **User Roles**: 6
- **Main Contexts**: 2
- **Protected Routes**: 9+
- **Dependencies**: 10 core

## Common Imports

```typescript
// Types
import type { User, UserRole, Presentation, EventEdition } from '@/types'
import { UserRole, PresentationStatus } from '@/types'

// Services
import { api, authService, userService, presentationService } from '@/services'

// Hooks
import { useAuth, useEvent } from '@/hooks'

// Utils
import { ROUTES, MIN_SCORE, MAX_SCORE } from '@/utils/constants'

// Components
import { Button, Modal, Loading, Card } from '@/components/common'
import { AppLayout } from '@/components/layout'
```

## Development Workflow

### Start Dev Server
```bash
npm run dev
# Available at http://localhost:3000
```

### Build for Production
```bash
npm run build
# Output in dist/
```

### Lint Code
```bash
npm run lint
```

### API Configuration
Create `.env` file:
```env
VITE_API_URL=http://localhost:4000/api
```

## Page Placeholder Routes (Need Implementation)

- `/app/admin/users`
- `/app/admin/approvals`
- `/app/admin/presentations`
- `/app/admin/sessions`
- `/app/admin/schedule`
- `/app/admin/rankings`
- `/app/admin/certificates`
- `/app/admin/events`
- `/app/student/my-presentation`
- `/app/presentations`
- `/app/presentations/:id`

These routes are defined in `AppRoutes.tsx` but render PlaceholderPage components.

## Next Steps for Mock Data Layer

1. Create `/src/services/mock/` directory
2. Implement mock services mirroring real service interfaces
3. Create mock data generators by role
4. Add feature flag to toggle real vs mock services
5. Update service exports to support both modes
6. Consider localStorage persistence for offline support

---

**Document Location**: `/Users/raquelparadella/Documents/wepgcomp-claude/PROJECT_STRUCTURE_ANALYSIS.md`
**Last Updated**: November 11, 2025
