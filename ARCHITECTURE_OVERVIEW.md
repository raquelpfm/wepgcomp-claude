# WEPGCOMP Architecture Overview

## High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        WEPGCOMP Application                      │
└─────────────────────────────────────────────────────────────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
         ┌──────▼──────┐ ┌──────▼──────┐ ┌─────▼──────┐
         │ Auth System │ │ Event Mgmt  │ │ Presentation│
         │  (Login)    │ │  (Sessions) │ │  (Voting)   │
         └──────┬──────┘ └──────┬──────┘ └─────┬──────┘
                │               │               │
                └───────────────┼───────────────┘
                                │
                    ┌───────────▼──────────┐
                    │   Context API        │
                    │ - AuthContext        │
                    │ - EventContext       │
                    └───────────┬──────────┘
                                │
                    ┌───────────▼──────────┐
                    │   Services Layer     │
                    │ - api.ts (Axios)     │
                    │ - authService        │
                    │ - userService        │
                    │ - eventService       │
                    │ - presentationService│
                    │ - certificateService │
                    └───────────┬──────────┘
                                │
                    ┌───────────▼──────────┐
                    │   HTTP Layer         │
                    │ Axios with:          │
                    │ - Token Interceptor  │
                    │ - Error Handling     │
                    │ - Auto-refresh       │
                    └───────────┬──────────┘
                                │
                    ┌───────────▼──────────┐
                    │ Backend API Server   │
                    │ (http://localhost... │
                    │  /api)               │
                    └──────────────────────┘
```

## Component Hierarchy

```
App.tsx
├── BrowserRouter
│   ├── AuthProvider (AuthContext)
│   │   ├── State: user, isLoading, error
│   │   ├── Methods: login, logout, refreshUser
│   │   └── Hooks: useAuth()
│   │
│   └── EventProvider (EventContext)
│       ├── State: activeEvent, allEvents
│       ├── Methods: setActiveEvent, refreshActiveEvent
│       └── Hooks: useEvent()
│
└── AppRoutes
    ├── Public Routes
    │   ├── / → HomePage
    │   ├── /auth/login → LoginPage
    │   ├── /auth/register → RegisterPage
    │   └── /auth/confirm-email → ConfirmEmailPage
    │
    └── Protected Routes (ProtectedRoute guard)
        ├── /app/dashboard → DashboardPage
        ├── /app/profile → Profile
        │
        ├── Admin Routes (allowedRoles: [SUPER_ADMIN, ADMIN, COORDINATOR])
        │   ├── /app/admin/users
        │   ├── /app/admin/approvals
        │   ├── /app/admin/presentations
        │   ├── /app/admin/sessions
        │   ├── /app/admin/schedule
        │   ├── /app/admin/rankings
        │   ├── /app/admin/certificates
        │   └── /app/admin/events
        │
        ├── Student Routes (allowedRoles: [DOCTORAL_STUDENT])
        │   └── /app/student/my-presentation
        │
        └── Common Routes (all authenticated)
            ├── /app/presentations
            └── /app/presentations/:id
```

## Data Flow: Authentication

```
┌──────────────┐
│  LoginPage   │
│  (User      │
│   enters     │
│   email/pwd) │
└──────┬───────┘
       │
       ├─────────────────────────────┐
       │                             │
       ▼                             │
┌────────────────┐                  │
│ useAuth hook   │                  │
└────────┬───────┘                  │
         │                          │
         ▼                          │
┌──────────────────────────────┐   │
│ AuthContext.login()          │   │
└────────────┬─────────────────┘   │
             │                     │
             ▼                     │
┌──────────────────────────────┐   │
│ authService.login()          │   │
│ POST /auth/login             │   │
└────────────┬─────────────────┘   │
             │                     │
             ▼                     │
┌──────────────────────────────┐   │
│ api.post()                   │   │
│ (Axios instance)             │   │
└────────────┬─────────────────┘   │
             │                     │
             ▼                     │
┌──────────────────────────────┐   │
│ Request Interceptor:         │   │
│ Add Authorization header     │   │
└────────────┬─────────────────┘   │
             │                     │
             ▼                     │
┌──────────────────────────────┐   │
│ Backend API                  │   │
│ Validates credentials        │   │
│ Returns: {                   │   │
│   success: true,             │   │
│   data: {                    │   │
│     user: User,              │   │
│     accessToken: string,     │   │
│     refreshToken: string     │   │
│   }                          │   │
│ }                            │   │
└────────────┬─────────────────┘   │
             │                     │
             ▼                     │
┌──────────────────────────────┐   │
│ Response returned            │   │
└────────────┬─────────────────┘   │
             │                     │
             ├─────────────────────┘
             │
             ▼
┌──────────────────────────────┐
│ Store tokens in localStorage:│
│ - accessToken               │
│ - refreshToken              │
└────────────┬─────────────────┘
             │
             ▼
┌──────────────────────────────┐
│ Update AuthContext state:    │
│ - setUser(response.data.user)│
│ - setLoading(false)          │
└────────────┬─────────────────┘
             │
             ▼
┌──────────────────────────────┐
│ Redirect to /app/dashboard   │
└──────────────────────────────┘
```

## Data Flow: API Request with Token

```
┌─────────────────────────────────────────┐
│ Component requests data                 │
│ presentationService.getPresentations()  │
└──────────────┬────────────────────────────┘
               │
               ▼
    ┌─────────────────────┐
    │ Axios GET request   │
    │ to /presentations   │
    └────────────┬────────┘
                 │
                 ▼
    ┌──────────────────────────────────┐
    │ Request Interceptor:             │
    │                                  │
    │ 1. Read token from localStorage  │
    │ 2. Add to header:                │
    │    Authorization: Bearer TOKEN   │
    │ 3. Pass to backend               │
    └────────────┬─────────────────────┘
                 │
                 ▼
    ┌──────────────────────────────────┐
    │ Backend API processes request     │
    │ Validates token & permissions    │
    └────────────┬─────────────────────┘
                 │
           ┌─────┴─────┐
           │           │
      Success      Error (401)
           │           │
           ▼           ▼
    ┌──────────┐  ┌──────────────────────┐
    │ 200 OK   │  │ Response Interceptor │
    │ Returns  │  │ Handle 401:          │
    │ data     │  │                      │
    └────┬─────┘  │ 1. Try refresh token │
         │        │ 2. POST /auth/refresh│
         │        │ 3. Get new accessTok │
         │        │ 4. Retry request     │
         │        │                      │
         │        │ If refresh fails:    │
         │        │ - Clear tokens       │
         │        │ - Redirect to login  │
         └────┬───┴─────────────┬────────┘
              │                 │
         Success            Failure
              │                 │
              ▼                 ▼
    ┌──────────────┐   ┌──────────────┐
    │ Return data  │   │ Throw error  │
    │ to component │   │ in component │
    └──────────────┘   └──────────────┘
```

## User Role Access Control

```
                    ┌─ Unauthenticated User
                    │  ├─ / (HomePage)
                    │  ├─ /auth/login
                    │  ├─ /auth/register
                    │  └─ /auth/confirm-email
                    │
        ┌───────────┴────────────┐
        │ Authenticated User      │
        │                        │
        ▼                        ▼
   ┌────────────┐         ┌──────────────┐
   │ ALL_USERS  │         │ ROLE_BASED   │
   ├────────────┤         ├──────────────┤
   │ /dashboard │         │ ADMIN routes │
   │ /profile   │         │ Student route│
   │ /presentations │     │ Special perms │
   └────────────┘         └──────────────┘
        │                         │
   ┌────┴────────────────────────┴────┐
   │                                   │
   ▼                                   ▼
┌─────────────────────┐         ┌──────────────────┐
│ SUPER_ADMIN/ADMIN   │         │ PROFESSOR        │
│ COORDINATOR         │         │ DOCTORAL_STUDENT │
├─────────────────────┤         │ LISTENER         │
│ + All user routes   │         ├──────────────────┤
│ + /app/admin/*      │         │ Limited access   │
│ + manage users      │         │ to:              │
│ + manage events     │         │ - View present.  │
│ + manage sessions   │         │ - Vote           │
│ + manage certs      │         │ - My presentation│
│ + manage awards     │         │   (student)      │
└─────────────────────┘         └──────────────────┘
```

## State Management: Contexts

```
┌─────────────────────────────────────────────────────┐
│            Root App with Providers                   │
└──────────────────┬──────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
┌──────────────────────┐   ┌──────────────────────┐
│  AuthContext         │   │  EventContext        │
├──────────────────────┤   ├──────────────────────┤
│ State:               │   │ State:               │
│ - user              │   │ - activeEvent        │
│ - isAuthenticated   │   │ - allEvents          │
│ - isLoading         │   │ - isLoading          │
│ - error             │   │ - error              │
│                     │   │                      │
│ Methods:            │   │ Methods:             │
│ - login()           │   │ - setActiveEvent()   │
│ - logout()          │   │ - refreshActiveEv.() │
│ - refreshUser()     │   │ - refreshAllEvents() │
│ - hasRole()         │   │                      │
│ - hasPermission()   │   │                      │
│                     │   │                      │
│ Storage:            │   │ Storage:             │
│ - localStorage      │   │ - localStorage       │
│   tokens            │   │   activeEventId      │
└──────────┬──────────┘   └──────────┬───────────┘
           │                        │
           │                        │
      useAuth()                 useEvent()
      hook                      hook
           │                        │
           └────────────┬───────────┘
                        │
              ┌─────────▼─────────┐
              │  Components use   │
              │  hooks to access  │
              │  context state &  │
              │  methods          │
              └───────────────────┘
```

## Service Layer Structure

```
┌──────────────────────────────────────────┐
│         Services (src/services/)          │
├──────────────────────────────────────────┤
│                                          │
│  ┌────────────────────────────────┐     │
│  │ api.ts (Axios Instance)        │     │
│  │ - Base configuration           │     │
│  │ - Request interceptors         │     │
│  │ - Response interceptors        │     │
│  │ - Error handling               │     │
│  │ - Token management             │     │
│  └────────────────────────────────┘     │
│                  ▲                       │
│                  │ uses                  │
│                  │                       │
│  ┌─────────────┬─┴───────────────┬──────┐
│  │             │                 │      │
│  ▼             ▼                 ▼      ▼
│ ┌──────────┐┌──────────┐┌──────────────┐
│ │auth.     ││user.     ││event.        │
│ │service.ts││service.ts││service.ts    │
│ │          ││          ││              │
│ │POST login││GET users ││GET events    │
│ │POST reg. ││POST appr.││POST sessions │
│ │POST conf.││GET pend. ││GET rooms     │
│ │POST logout││POST grants││PUT/DELETE   │
│ └──────────┘└──────────┘└──────────────┘
│
│  ┌──────────────┬──────────────┐
│  │              │              │
│  ▼              ▼              ▼
│┌──────────────┐┌──────────────────────┐
││presentation. ││certificate.service.ts│
││service.ts    ││                      │
││              ││GET certificates      │
││GET present.  ││POST generate         │
││POST vote     ││POST send             │
││POST submit   ││GET awards            │
││POST upload   ││POST select awards    │
│└──────────────┘└──────────────────────┘
│
│  ┌────────────────┐
│  │ index.ts       │
│  │ (exports all)  │
│  └────────────────┘
│
└──────────────────────────────────────────┘
```

## Type Organization

```
┌──────────────────────────────────────────┐
│          Types (src/types/)               │
├──────────────────────────────────────────┤
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ user.types.ts                      │  │
│ │ - UserRole enum (6 roles)          │  │
│ │ - UserStatus enum                  │  │
│ │ - User interface                   │  │
│ │ - Professor extends User           │  │
│ │ - DoctoralStudent extends User     │  │
│ │ - Listener extends User            │  │
│ │ - Registration interfaces          │  │
│ └────────────────────────────────────┘  │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ auth.types.ts                      │  │
│ │ - AuthResponse interface           │  │
│ │ - LoginCredentials interface       │  │
│ │ - TokenPayload interface           │  │
│ │ - PasswordReset interfaces         │  │
│ │ - RolePermissions mapping          │  │
│ │ - Permission type                  │  │
│ └────────────────────────────────────┘  │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ event.types.ts                     │  │
│ │ - EventEditionStatus enum          │  │
│ │ - EventEdition interface           │  │
│ │ - Session interface                │  │
│ │ - Room interface                   │  │
│ │ - ScheduleItem interface           │  │
│ │ - ScheduleConflict interface       │  │
│ └────────────────────────────────────┘  │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ presentation.types.ts              │  │
│ │ - PresentationStatus enum          │  │
│ │ - Presentation interface           │  │
│ │ - PresentationVote interface       │  │
│ │ - PresentationRanking interface    │  │
│ │ - PresentationWithDetails interface│  │
│ └────────────────────────────────────┘  │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ certificate.types.ts               │  │
│ │ - CertificateType enum             │  │
│ │ - Certificate interface            │  │
│ │ - Award interface                  │  │
│ │ - AwardSelection interface         │  │
│ │ - CertificateGenerationRequest     │  │
│ └────────────────────────────────────┘  │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ index.ts (central exports)         │  │
│ │ - ApiResponse<T> interface         │  │
│ │ - PaginatedResponse<T> interface   │  │
│ │ - FilterOptions interface          │  │
│ │ - SortOptions interface            │  │
│ │ - PaginationOptions interface      │  │
│ │ - LoadingState interface           │  │
│ │ - Re-exports all other types       │  │
│ └────────────────────────────────────┘  │
│                                          │
└──────────────────────────────────────────┘
```

## Authentication Flow Diagram

```
                    START
                      │
                      ▼
              ┌──────────────┐
              │ No token in  │
              │ localStorage?│
              └───┬───────┬──┘
               Yes│       │No
                  │       │
            ┌─────▼─┐  ┌──▼──────────┐
            │Public │  │ Check token  │
            │Pages  │  │ validity     │
            └───────┘  └──┬────────┬──┘
                         │        │
                      Valid    Invalid
                         │        │
                    ┌────▼┐   ┌───▼────┐
                    │Auth │   │ Clear  │
                    │OK   │   │tokens &│
                    │     │   │redirect│
                    └────┬┘   │to login│
                         │    └────────┘
                    ┌────▼──────────────┐
                    │Protected Routes   │
                    │(ProtectedRoute)   │
                    └────┬──────────────┘
                         │
                    ┌────▼──────────────┐
                    │ Check role-based  │
                    │ access control    │
                    └────┬──────┬───────┘
                    Good │      │Bad
                         │      │
                    ┌────▼┐  ┌──▼──────┐
                    │Load │  │ Show    │
                    │Page │  │ Denied  │
                    └──────┘  │Message  │
                              └─────────┘
```

---

**Key Takeaways:**

1. **Separation of Concerns**: Services handle API, Contexts handle state, Components handle UI
2. **Type Safety**: All data structures are typed with TypeScript interfaces
3. **Token Management**: Automatic token refresh prevents frequent re-logins
4. **Role-Based Access**: Protected routes enforce role-based access control
5. **Error Handling**: Centralized through axios interceptors and context error states
6. **Scalability**: Easy to add new services/routes by following established patterns

