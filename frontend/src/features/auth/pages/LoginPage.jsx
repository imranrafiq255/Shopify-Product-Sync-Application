import { Component } from "react";
import LoginForm from "../components/LoginForm.jsx";

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return <div>Error: {this.state.error.message}</div>;
    }
    return this.props.children;
  }
}

const LoginPage = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="w-96 p-6 shadow-lg bg-white">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <ErrorBoundary>
        <LoginForm />
      </ErrorBoundary>
    </div>
  </div>
);

export default LoginPage;
