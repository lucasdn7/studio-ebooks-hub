import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  requirePremium?: boolean;
  requireCreator?: boolean;
  redirectTo?: string;
}

const ProtectedRoute = ({
  children,
  requireAuth = true,
  requirePremium = false,
  requireCreator = false,
  redirectTo = '/login'
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Check if user is authenticated
  if (requireAuth && !user) {
    // Save the attempted URL for redirect after login
    sessionStorage.setItem('redirectAfterLogin', location.pathname);
    return <Navigate to={redirectTo} replace />;
  }

  // Check if user has premium access
  if (requirePremium && user) {
    // This would need to be implemented based on your user stats structure
    // For now, we'll assume premium is checked elsewhere
    const isPremium = user.user_metadata?.is_premium || false;
    if (!isPremium) {
      return <Navigate to="/plans" replace />;
    }
  }

  // Check if user is a creator
  if (requireCreator && user) {
    // This would need to be implemented based on your creator structure
    // For now, we'll assume creator status is checked elsewhere
    const isCreator = user.user_metadata?.is_creator || false;
    if (!isCreator) {
      return <Navigate to="/creator-signup" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute; 