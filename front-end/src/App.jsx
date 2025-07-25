import { BrowserRouter as Router } from 'react-router-dom';
import Navegacion from './components/Navegacion';
import { useUserContext } from './context/UserProvider';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  const { user } = useUserContext();

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white transition-colors duration-300">
        {user && <Navegacion />}
        <AppRoutes user={user} />
      </div>
    </Router>
  );
}

export default App;