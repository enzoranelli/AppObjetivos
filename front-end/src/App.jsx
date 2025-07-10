import { BrowserRouter as Router } from 'react-router-dom';
import Navegacion from './components/Navegacion';
import { useUserContext } from './context/UserProvider';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  const { user } = useUserContext();

  return (
    <Router>
      <div className="">
        {user && <Navegacion />}
        <AppRoutes user={user} />
      </div>
    </Router>
  );
}

export default App;