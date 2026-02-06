import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import Login from './pages/login'
import HotelList from './pages/hotel/list'
import HotelEdit from './pages/hotel/edit'
import Dashboard from './pages/dashboard'

function App() {
  const { isAuthenticated, user } = useAuthStore()

  // Protected route wrapper
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />
    }
    return <>{children}</>
  }

  // Role-based route wrapper
  const RoleRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />
    }
    if (!allowedRoles.includes(user?.role || '')) {
      return <Navigate to="/" replace />
    }
    return <>{children}</>
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      
      {/* Merchant routes */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/hotels" 
        element={
          <ProtectedRoute>
            <HotelList />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/hotels/create" 
        element={
          <RoleRoute allowedRoles={['MERCHANT']}>
            <HotelEdit />
          </RoleRoute>
        } 
      />
      <Route 
        path="/hotels/edit/:id" 
        element={
          <RoleRoute allowedRoles={['MERCHANT']}>
            <HotelEdit />
          </RoleRoute>
        } 
      />
      
      {/* Admin routes */}
      <Route 
        path="/admin/hotels" 
        element={
          <RoleRoute allowedRoles={['ADMIN']}>
            <HotelList />
          </RoleRoute>
        } 
      />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App