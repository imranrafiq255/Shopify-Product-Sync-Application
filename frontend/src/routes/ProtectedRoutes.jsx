import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectAuth } from "../features/auth/authSelector";
import { useEffect } from "react";
import { loadCurrentLoggedAdmin } from "../features/auth/authSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useAppDispatch();
  const { user, isCheckingAuth } = useAppSelector(selectAuth);
  useEffect(() => {
    if (!user) {
      dispatch(loadCurrentLoggedAdmin());
    }
  }, [dispatch, user]);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
