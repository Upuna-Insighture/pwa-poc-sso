import './App.css';
import { BrowserRouter } from "react-router-dom";
import RouterFile from './routes/route';
import { AuthProvider } from './auth/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RouterFile />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
