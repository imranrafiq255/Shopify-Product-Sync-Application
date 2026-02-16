import "./styles/App.css";
import Navbar from "./features/auth/components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
const App = () => {
  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
};

export default App;
