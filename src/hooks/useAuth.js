import { useSelector } from "react-redux";

export default function useAuth() {
  const { user, isAuthenticated, isLoading, isHydrated, error } = useSelector((s) => s.user);
  return { user, isAuthenticated, isLoading, isHydrated, error };
}