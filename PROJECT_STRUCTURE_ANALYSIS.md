# WEPGCOMP Project Structure Analysis

## Overview
WEPGCOMP is a comprehensive web application for managing doctoral presentation submissions, scheduling, voting, and certificate generation for the Computer Science Graduate Program (PGCOMP) at the Federal University of Bahia (UFBA).

---

## 1. Project Architecture

### Technology Stack
- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: Context API (AuthContext, EventContext)
- **Styling**: Tailwind CSS + Lucide React Icons
- **HTTP Client**: Axios with interceptors
- **Forms**: React Hook Form + Zod validation
- **Date Handling**: date-fns
- **Package Manager**: npm

### Directory Structure
```
src/
├── components/          # React components
│   ├── common/         # Reusable UI components (Button, Input, Modal, Alert, Card, Loading)
│   └── layout/         # Layout components (Header, Sidebar, AppLayout)
├── pages/              # Page components
│   ├── auth/           # Authentication pages (Login, Register, ConfirmEmail)
│   ├── HomePage.tsx    # Public home page
│   └── DashboardPage.tsx # Main dashboard
├── contexts/           # React Context providers
│   ├── AuthContext.tsx      # Authentication state management
│   └── EventContext.tsx     # Event edition state management
├── services/           # API service layer
│   ├── api.ts              # Axios instance with interceptors
│   ├── auth.service.ts     # Authentication endpoints
│   ├── user.service.ts     # User management endpoints
│   ├── event.service.ts    # Event/Session/Room endpoints
│   ├── presentation.service.ts # Presentation endpoints
│   ├── certificate.service.ts  # Certificate/Award endpoints
│   └── index.ts            # Central exports
├── types/              # TypeScript interfaces and enums
│   ├── auth.types.ts       # Auth-related types + RolePermissions
│   ├── user.types.ts       # User roles, statuses, types
│   ├── event.types.ts      # Event, Session, Room types
│   ├── presentation.types.ts # Presentation types
│   ├── certificate.types.ts # Certificate, Award types
│   └── index.ts            # Common API response types
├── hooks/              # Custom React hooks
│   ├── useAuth.ts     # Access AuthContext
│   └── useEvent.ts    # Access EventContext
├── routes/             # Routing configuration
│   ├── AppRoutes.tsx       # Route definitions
│   └── ProtectedRoute.tsx  # Route guard component
├── utils/              # Utility functions
│   ├── constants.ts    # Application constants
│   ├── validators.ts   # Custom validations
│   ├── formatters.ts   # Data formatting utilities
│   └── index.ts        # Exports
├── App.tsx             # Root component with providers
└── main.tsx            # Application entry point
```

---

## 2. Source Code Location & Structure

### Location
- **Root**: `/Users/raquelparadella/Documents/wepgcomp-claude/src`

### Key Directories

#### `/src/components`
- **Purpose**: Reusable React components
- **Structure**:
  - `common/`: Alert, Button, Card, Input, Loading, Modal
  - `layout/`: AppLayout, Header, Sidebar
- **Pattern**: Function components with TypeScript interfaces for props

#### `/src/pages`
- **Purpose**: Page/view components for routing
- **Current Pages**:
  - `HomePage.tsx` - Public landing page
  - `DashboardPage.tsx` - Main authenticated dashboard
  - `auth/LoginPage.tsx` - Login form
  - `auth/RegisterPage.tsx` - Registration form
  - `auth/ConfirmEmailPage.tsx` - Email confirmation
- **Note**: Many admin pages are placeholders in AppRoutes.tsx

#### `/src/services`
- **Purpose**: API communication layer
- **Architecture**: Each service file exports default object with async methods
- **Pattern**: Methods return `Promise<ApiResponse<T>>` or `Promise<ApiResponse>`

---

## 3. Services & API Calls

### API Configuration (`api.ts`)
- **Base URL**: `import.meta.env.VITE_API_URL || 'http://localhost:4000/api'`
- **Timeout**: 30 seconds
- **Interceptors**:
  - **Request**: Automatically adds Bearer token from localStorage
  - **Response**: 
    - Handles 401 (token refresh)
    - Handles 403 (permission errors)
    - Handles 404, 500 errors
  - **Token Refresh**: Attempts to refresh token on 401, redirects to login on failure

### Service Endpoints by Category

#### Authentication Service (`auth.service.ts`)
```
POST   /auth/register/professor        - Register professor
POST   /auth/register/student          - Register doctoral student
POST   /auth/register/listener         - Register listener
POST   /auth/login                     - Login (stores tokens)
POST   /auth/logout                    - Logout
POST   /auth/confirm-email             - Confirm email with token
GET    /auth/me                        - Get current user
POST   /auth/refresh                   - Refresh access token
POST   /auth/forgot-password           - Request password reset
POST   /auth/reset-password            - Confirm password reset
POST   /auth/change-password           - Change password (logged in)
```

#### User Service (`user.service.ts`)
```
GET    /users                          - List users (paginated, filtered)
GET    /users/{userId}                 - Get user by ID
GET    /users/professors/pending       - Get pending professor approvals
POST   /users/professors/approve       - Approve/reject professor
POST   /users/{userId}/grant-admin     - Grant admin privileges
POST   /users/{userId}/grant-super-admin - Grant super admin
POST   /users/{userId}/assign-coordinator - Assign event coordinator
POST   /users/{userId}/remove-coordinator - Remove coordinator role
DELETE /users/{userId}                 - Delete user
PUT    /users/{userId}                 - Update user profile
GET    /users/by-role                  - Get users by role
GET    /users/search                   - Search users
```

#### Event Service (`event.service.ts`)
```
--- Event Editions ---
GET    /events                         - Get all event editions
GET    /events/active                  - Get active event
GET    /events/{eventId}               - Get event by ID
POST   /events                         - Create event edition
PUT    /events/{eventId}               - Update event edition
POST   /events/{eventId}/set-active    - Set as active event
POST   /events/{eventId}/archive       - Archive event

--- Sessions ---
GET    /sessions                       - Get sessions (by eventEditionId param)
GET    /sessions/{sessionId}           - Get session by ID
POST   /sessions                       - Create session
PUT    /sessions/{sessionId}           - Update session
DELETE /sessions/{sessionId}           - Delete session
POST   /sessions/validate              - Validate session for conflicts
POST   /sessions/{sessionId}/presentations - Add presentation to session
DELETE /sessions/{sessionId}/presentations/{presentationId} - Remove presentation

--- Schedule ---
GET    /schedule                       - Get full event schedule

--- Rooms ---
GET    /rooms                          - Get all rooms
GET    /rooms/{roomId}                 - Get room by ID
POST   /rooms                          - Create room
PUT    /rooms/{roomId}                 - Update room
DELETE /rooms/{roomId}                 - Delete room
GET    /rooms/available                - Get available rooms for time slot
```

#### Presentation Service (`presentation.service.ts`)
```
GET    /presentations                  - List presentations (paginated)
GET    /presentations/{presentationId} - Get presentation details
POST   /presentations                  - Create presentation
PUT    /presentations/{presentationId} - Update presentation
DELETE /presentations/{presentationId} - Delete presentation
POST   /presentations/{presentationId}/upload-pdf - Upload PDF
GET    /presentations/{presentationId}/pdf - Get PDF URL
POST   /presentations/{presentationId}/vote - Submit vote
GET    /presentations/{presentationId}/votes - Get votes for presentation
GET    /presentations/{presentationId}/my-vote - Get current user's vote
GET    /presentations/rankings         - Get presentation rankings
GET    /presentations/student/{studentId} - Get student's presentation
GET    /presentations/me               - Get current user's presentation
POST   /presentations/reorder          - Reorder presentations in session
POST   /presentations/{presentationId}/submit - Submit presentation (DRAFT → SUBMITTED)
```

#### Certificate Service (`certificate.service.ts`)
```
--- Certificates ---
GET    /certificates                   - Get certificates (paginated)
GET    /certificates/{certificateId}   - Get certificate by ID
GET    /certificates/me                - Get current user's certificates
POST   /certificates/generate          - Generate certificates
POST   /certificates/send              - Send certificates via email
GET    /certificates/{certificateId}/download - Download certificate PDF (blob)

--- Awards ---
GET    /awards                         - Get awards for event
POST   /awards/select                  - Select award recipients
GET    /awards/evaluator-rankings      - Get evaluator rankings
DELETE /awards/{awardId}               - Delete award
```

---

## 4. Types & Interfaces

### User Types (`user.types.ts`)

#### Enums
```typescript
UserRole {
  SUPER_ADMIN, ADMIN, COORDINATOR,
  PROFESSOR, DOCTORAL_STUDENT, LISTENER
}

UserStatus {
  PENDING_EMAIL_CONFIRMATION,
  PENDING_APPROVAL,
  ACTIVE, INACTIVE, REJECTED
}
```

#### Key Interfaces
```typescript
interface User {
  id: string
  email: string
  name: string
  role: UserRole
  status: UserStatus
  createdAt: string
  updatedAt: string
}

interface Professor extends User {
  role: UserRole.PROFESSOR | ADMIN | SUPER_ADMIN | COORDINATOR
  matricula: string
  isAdmin: boolean
  isSuperAdmin: boolean
  approvedBy?: string
  approvedAt?: string
}

interface DoctoralStudent extends User {
  role: UserRole.DOCTORAL_STUDENT
  matricula: string
  presentationId?: string
}

interface Listener extends User {
  role: UserRole.LISTENER
}
```

### Authentication Types (`auth.types.ts`)

#### Key Interfaces
```typescript
interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
  expiresIn: number // seconds
}

interface TokenPayload {
  userId: string
  email: string
  role: UserRole
  iat: number
  exp: number
}

interface LoginCredentials {
  email: string
  password: string
}

interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
```

#### Role Permissions
```typescript
const RolePermissions = {
  SUPER_ADMIN: ['manage_users', 'manage_admins', 'manage_events', ...],
  ADMIN: ['manage_events', 'manage_presentations', ...],
  COORDINATOR: ['manage_events', 'manage_presentations', ...],
  PROFESSOR: ['view_presentations', 'vote_presentations', ...],
  DOCTORAL_STUDENT: ['create_presentation', 'edit_own_presentation', ...],
  LISTENER: ['view_presentations', 'vote_presentations', ...]
}
```

### Event Types (`event.types.ts`)

#### Enums
```typescript
EventEditionStatus {
  DRAFT, REGISTRATION_OPEN, REGISTRATION_CLOSED,
  IN_PROGRESS, COMPLETED, ARCHIVED
}
```

#### Key Interfaces
```typescript
interface EventEdition {
  id: string
  name: string // e.g., "WEPGCOMP 2024"
  year: number
  edition: number
  description: string
  submissionDeadline: string // ISO date
  eventStartDate: string
  eventEndDate: string
  maxPresentations: number
  presentationDuration: number // minutes
  allowVoting: boolean
  coordinatorId?: string
  status: EventEditionStatus
  isActive: boolean // only one active
  createdAt: string
  updatedAt: string
  createdBy: string
}

interface Session {
  id: string
  eventEditionId: string
  name: string
  date: string // ISO date
  startTime: string // HH:mm
  endTime: string // HH:mm
  roomId?: string
  roomName?: string
  presentationIds: string[]
  maxPresentations?: number
  createdAt: string
  updatedAt: string
  createdBy: string
}

interface Room {
  id: string
  name: string
  building?: string
  capacity: number
  hasProjector: boolean
  hasComputer: boolean
  notes?: string
  isActive: boolean
}

interface ScheduleItem {
  date: string
  sessions: {
    session: Session
    presentations: Array<{ presentation: {...} }>
  }[]
}

interface ScheduleConflict {
  type: 'room' | 'time' | 'session'
  message: string
  sessionId?: string
  roomId?: string
  conflictingItems: string[]
}
```

### Presentation Types (`presentation.types.ts`)

#### Enums
```typescript
PresentationStatus {
  DRAFT, SUBMITTED, SCHEDULED,
  COMPLETED, CANCELLED
}
```

#### Key Interfaces
```typescript
interface Presentation {
  id: string
  eventEditionId: string
  studentId: string
  studentName: string
  studentMatricula: string
  title: string
  abstract: string
  keywords: string[]
  advisorName: string
  advisorEmail: string
  suggestedDate?: string
  suggestedTime?: string
  scheduledDate?: string
  scheduledTime?: string
  duration: number // minutes
  sessionId?: string
  roomId?: string
  pdfUrl?: string
  pdfFileName?: string
  pdfUploadedAt?: string
  status: PresentationStatus
  submittedAt?: string
  createdAt: string
  updatedAt: string
  averageScore?: number
  totalVotes?: number
}

interface PresentationVote {
  id: string
  presentationId: string
  userId: string
  userName: string
  userRole: string
  score: number // 0-10
  comment?: string
  votedAt: string
}

interface PresentationRanking {
  presentation: Presentation
  averageScore: number
  totalVotes: number
  rank: number
}

interface PresentationWithDetails extends Presentation {
  student: { id, name, email, matricula }
  session?: { id, name, startTime, endTime }
  room?: { id, name, capacity }
}
```

### Certificate Types (`certificate.types.ts`)

#### Enums
```typescript
CertificateType {
  PARTICIPANT, PRESENTER, EVALUATOR,
  AWARD_PRESENTER, AWARD_EVALUATOR, ORGANIZER
}
```

#### Key Interfaces
```typescript
interface Certificate {
  id: string
  eventEditionId: string
  userId: string
  userName: string
  userEmail: string
  type: CertificateType
  issuedAt: string
  pdfUrl?: string
  certificateNumber: string
  awardTitle?: string // e.g., "Best Presentation"
  presentationTitle?: string
  isSent: boolean
  sentAt?: string
}

interface Award {
  id: string
  eventEditionId: string
  type: 'presentation' | 'evaluator'
  rank: number // 1st, 2nd, 3rd
  recipientId: string
  recipientName: string
  presentationId?: string
  presentationTitle?: string
  score?: number
  totalVotes?: number
  awardedAt: string
  awardedBy: string
}

interface AwardSelection {
  eventEditionId: string
  type: 'presentation' | 'evaluator'
  selections: {
    userId: string
    presentationId?: string
    rank: number
  }[]
}
```

### Common API Types (`types/index.ts`)

```typescript
interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

interface PaginatedResponse<T = any> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

interface FilterOptions {
  search?: string
  status?: string
  role?: string
  eventEditionId?: string
  dateFrom?: string
  dateTo?: string
}

interface SortOptions {
  field: string
  direction: 'asc' | 'desc'
}

interface PaginationOptions {
  page: number
  limit: number
}

interface LoadingState {
  isLoading: boolean
  error: string | null
}
```

---

## 5. Authentication & Authorization

### AuthContext (`contexts/AuthContext.tsx`)

#### State Management
```typescript
interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  hasRole: (roles: UserRole | UserRole[]) => boolean
  hasPermission: (permission: string) => boolean
}
```

#### Key Features
- **Token Storage**: localStorage (accessToken, refreshToken)
- **Auto-Login**: Loads user on mount if token exists
- **Token Refresh**: Automatic refresh on 401 response via API interceptor
- **Permission Checks**: Role-based hasRole() and hasPermission() methods
- **Error Handling**: Captures and provides auth error messages

#### Flow
1. User logs in via `login(credentials)`
2. Tokens stored in localStorage
3. axios interceptor adds Bearer token to all requests
4. On 401, attempts automatic refresh
5. On logout, clears tokens and resets user state

### Protected Routes (`routes/ProtectedRoute.tsx`)

#### Features
- Checks authentication status
- Validates user role against allowedRoles array
- Shows loading state while checking
- Redirects unauthenticated users to /auth/login
- Renders access denied message for insufficient permissions
- Wraps all authenticated routes with AppLayout

#### Usage
```typescript
<Route element={<ProtectedRoute requireAuth allowedRoles={[UserRole.ADMIN]} />}>
  <Route path="/app/admin/users" element={<AdminUsersPage />} />
</Route>
```

### Role-Based Navigation (`components/layout/Sidebar.tsx`)

- Dynamically builds menu items based on user.role
- Different items for SUPER_ADMIN, ADMIN, COORDINATOR, PROFESSOR, DOCTORAL_STUDENT, LISTENER
- Highlights active route
- Mobile-responsive with overlay

---

## 6. Component Types by User Role

### Super Admin / Admin / Coordinator
**Accessible Routes**:
- `/app/dashboard` - Main dashboard
- `/app/admin/users` - User management
- `/app/admin/approvals` - Professor approvals
- `/app/admin/presentations` - Manage presentations
- `/app/admin/sessions` - Manage sessions
- `/app/admin/schedule` - View/edit schedule
- `/app/admin/rankings` - Rankings and awards
- `/app/admin/certificates` - Generate/send certificates
- `/app/admin/events` - Create/edit event editions

**Key Permissions**:
- Manage users and roles
- Approve/reject professor registrations
- Create and manage event editions
- Create and manage sessions
- Manage presentations and schedule
- Generate and send certificates
- Select award recipients

### Professor
**Accessible Routes**:
- `/app/dashboard` - Personal dashboard
- `/app/presentations` - List all presentations
- `/app/presentations/:id` - View presentation details

**Key Permissions**:
- View all presentations
- Vote on presentations (0-10 score)
- View schedule
- May have approval rights (if COORDINATOR)

### Doctoral Student
**Accessible Routes**:
- `/app/dashboard` - Personal dashboard
- `/app/student/my-presentation` - Manage own presentation
- `/app/presentations` - List all presentations

**Key Permissions**:
- Create presentation
- Edit own presentation
- Upload presentation PDF (max 10MB)
- View schedule
- Submit presentation (DRAFT → SUBMITTED)

### Listener
**Accessible Routes**:
- `/app/dashboard` - Dashboard
- `/app/presentations` - View presentations

**Key Permissions**:
- View presentations
- Vote on presentations
- View schedule

---

## 7. Existing Mock Data or Service Patterns

### Current Status
**No mock data layer exists yet.** The application is designed as a frontend-only project that communicates with a backend API.

### Key Implementation Patterns

#### Service Pattern
Each service (`auth.service.ts`, `user.service.ts`, etc.) follows this pattern:
```typescript
const serviceName = {
  async methodName(params): Promise<ApiResponse<T>> {
    const response = await api.get/post/put/delete('/endpoint', config)
    return response.data
  }
}
export default serviceName
```

#### Context Pattern
Contexts provide:
- State for the data
- Loading and error states
- Async functions to fetch/update data
- Callbacks to refresh data

Example from `AuthContext`:
```typescript
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Load user on mount if token exists
    const loadUser = async () => { ... }
    loadUser()
  }, [])
  
  const login = useCallback(async (credentials) => { ... }, [])
  const logout = useCallback(async () => { ... }, [])
  
  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, ... }}>
      {children}
    </AuthContext.Provider>
  )
}
```

#### Hook Pattern
Custom hooks provide easy context access:
```typescript
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('Must use within AuthProvider')
  return context
}
```

#### Component Pattern
Components accept props, use hooks, and typically don't manage API calls directly:
```typescript
export const MyComponent: React.FC<{ data: Presentation }> = ({ data }) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  
  // Components fetch data via context or hooks
  // Services are called in contexts/pages, not components
}
```

#### API Response Pattern
All API responses follow this structure:
```typescript
{
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}
```

#### Axios Configuration Pattern
Request interceptor automatically adds token:
```typescript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

---

## 8. Key Implementation Patterns Summary

### Storage
- localStorage: accessToken, refreshToken, activeEventId, userData

### Validation
- Client-side via Zod schemas in forms
- React Hook Form integration for form state
- Custom validators in utils/validators.ts

### Error Handling
- API interceptor handles common HTTP errors
- Services return `ApiResponse` with success flag
- Contexts manage error states and display messages
- Components check response.success before using data

### Async Patterns
- useCallback for memoized async functions
- useEffect for initialization and side effects
- Loading and error states in contexts
- Proper error propagation through try/catch

### Styling
- Tailwind CSS utility classes
- Responsive design with mobile-first approach
- Color system: primary/secondary color variants
- Lucide React for icons

### TypeScript
- Strong typing throughout (no `any` except in ApiResponse<T>)
- Discriminated unions (UserRole enum)
- Interfaces for all data structures
- Proper prop typing for components

---

## 9. Constants & Configuration

### Key Constants (`utils/constants.ts`)
- APP_NAME, APP_VERSION
- PGCOMP/UFBA information
- Validation: MIN_PASSWORD_LENGTH (8), MAX_PDF_SIZE_MB (10)
- Pagination: DEFAULT_PAGE_SIZE (20)
- Presentation: DURATION_OPTIONS, DEFAULT_DURATION (20 min)
- Voting: MIN_SCORE (0), MAX_SCORE (10)
- Awards: AWARD_RANKS (1, 2, 3), MAX_EVALUATOR_AWARDS (3)
- Time slots: 08:00 - 19:00
- Storage keys for localStorage
- Error and success message mappings
- Route paths
- Status color mappings for UI

---

## 10. Integration Points for Mock Data

To implement a mock data layer, you should:

1. **Create mock services** that implement the same interfaces as real services
2. **Add feature flags** to toggle between real and mock data
3. **Maintain consistency** with existing response structures (ApiResponse<T>)
4. **Follow service patterns** already established in the codebase
5. **Support all role scenarios** with different data sets per UserRole
6. **Generate realistic data** using the defined Type interfaces

### Where to Create Mock Layer
- Create `/src/services/mock/` directory
- Mirror real service structure: mock.auth.service.ts, mock.user.service.ts, etc.
- Use consistent naming and export patterns
- Create utility functions to generate mock data by role
- Consider localStorage fallback for persistence

### Key Data Shapes to Mock
- Users (all 6 roles)
- Event Editions (with different statuses)
- Presentations (various statuses and vote scores)
- Sessions (with rooms and time conflicts)
- Certificates and Awards
- Votes and Rankings

---

## Conclusion

The WEPGCOMP project is well-structured with:
- Clear separation of concerns (services, components, contexts)
- Strong TypeScript typing throughout
- Consistent error handling and API patterns
- Role-based access control
- Context API for state management
- Comprehensive type definitions for all domain entities

This foundation makes it straightforward to add a mock data layer while maintaining consistency and type safety.
