# Dashboard Documentation

## Overview

The LocalFinder platform includes a comprehensive role-based dashboard system built with Next.js, React, and shadcn/ui components. The dashboard provides different interfaces for three user roles: **Admin**, **Business Owner**, and **Regular User**.

## Dashboard Structure

### Role-Based Access

The dashboard automatically adapts based on the user's role:

- **Admin Dashboard** (`/dashboard/admin`) - Platform management and monitoring
- **Business Dashboard** (`/dashboard/business`) - Business performance and review management
- **User Dashboard** (`/dashboard/user`) - Personal activity and contributions

### Components Used

All dashboard components use **shadcn/ui** for consistent, accessible UI:

- `Card`, `CardHeader`, `CardTitle`, `CardContent` - Content containers
- `Button` - Interactive buttons with variants
- `Badge` - Status indicators and labels
- `Input` - Form inputs
- `Select` - Dropdown selections

## Dashboard Features

### Admin Dashboard

**Location:** `/dashboard/admin`

**Features:**
- Platform statistics (Total Businesses, Active Users, Pending Approvals, Total Reviews)
- Recent business registrations with approval status
- Quick actions (Add Business, Manage Users, Review Moderation, View Reports)
- System alerts and notifications
- Analytics overview placeholder

**Navigation Items:**
- Dashboard
- Businesses
- Users
- Reviews
- Analytics
- Reports
- Settings

### Business Dashboard

**Location:** `/dashboard/business`

**Features:**
- Business performance metrics (Profile Views, Total Reviews, Average Rating, Revenue)
- Recent customer reviews with response management
- Quick actions (Respond to Reviews, Upload Photos, Update Hours, Edit Profile)
- Business status indicators (Profile Status, Verification, Photos)
- Performance analytics placeholder

**Navigation Items:**
- Overview
- My Business
- Reviews
- Analytics
- Photos
- Settings

### User Dashboard

**Location:** `/dashboard/user`

**Features:**
- Personal statistics (Reviews Written, Saved Places, Photos Added, Helpful Votes)
- Recent activity feed
- My recent reviews
- Quick actions (Write a Review, Add Business, Upload Photos)
- Saved places list
- Contribution stats (Elite Reviewer level, Photos count, Helpful Votes)

**Navigation Items:**
- Dashboard
- My Reviews
- Saved Places
- Activity
- Notifications
- Settings

## Component Architecture

### StatCard Component

Reusable component for displaying statistics with icons and change indicators.

**Props:**
- `title`: Statistic label
- `value`: Main value to display
- `change`: Optional change indicator text
- `changeType`: "positive" | "negative" | "neutral"
- `icon`: Lucide icon component
- `iconColor`: Tailwind color class for icon
- `iconBg`: Tailwind background class for icon container

### DashboardSidebar

Role-aware sidebar navigation component.

**Props:**
- `role`: "admin" | "business" | "user"

**Features:**
- Dynamic navigation items based on role
- Active route highlighting
- Badge notifications
- Help & Support link
- Logout button

### DashboardHeader

Top header with search, notifications, and user info.

**Props:**
- `title`: Page title
- `subtitle`: Optional page subtitle

**Features:**
- Search bar
- Notification bell with indicator
- User profile display

## Theme

The dashboard uses the same blue/green theme as the main site:

- **Primary Blue**: `blue-600`, `blue-700`
- **Accent Green**: `green-600`, `green-700`
- **Gradients**: `from-blue-600 to-green-600`
- **Backgrounds**: `gray-50`, `white`

## Authentication & Role Management

Currently, the role is determined by a mock function `getUserRole()`. In production, this should:

1. Check authentication status
2. Retrieve user role from session/context
3. Redirect unauthenticated users to login
4. Enforce role-based route access

**Example Implementation:**

```typescript
// In production, use auth context
import { useAuth } from "@/contexts/AuthContext";

const getUserRole = (): "admin" | "business" | "user" => {
  const { user } = useAuth();
  return user?.role || "user";
};
```

## Routing

The dashboard uses Next.js App Router with route groups:

```
app/
  (dashboard)/
    layout.tsx          # Dashboard layout wrapper
    dashboard/
      page.tsx        # Main dashboard (redirects to role-specific)
    admin/
      page.tsx         # Admin dashboard
    business/
      page.tsx         # Business dashboard
    user/
      page.tsx         # User dashboard
```

## Future Enhancements

1. **Real-time Analytics**: Integrate chart libraries (Recharts, Chart.js)
2. **Data Tables**: Add shadcn Table component for listing data
3. **Forms**: Business profile editing, review responses
4. **File Upload**: Photo upload functionality
5. **Notifications**: Real-time notification system
6. **Search & Filters**: Advanced filtering for lists
7. **Pagination**: Handle large datasets
8. **Export**: Export reports and data

## Usage Example

To access a specific role dashboard:

```typescript
// Navigate to admin dashboard
router.push('/dashboard/admin');

// Navigate to business dashboard
router.push('/dashboard/business');

// Navigate to user dashboard
router.push('/dashboard/user');
```

## Styling

All components use Tailwind CSS with:
- Responsive design (mobile-first)
- Consistent spacing (`p-6`, `gap-6`, etc.)
- Hover states and transitions
- Shadow and border utilities
- Gradient backgrounds

## Accessibility

Components follow accessibility best practices:
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus states
- Color contrast compliance

