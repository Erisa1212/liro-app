import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Reading from './pages/Reading';
import SavedBooks from './pages/SavedBooks';
import Status from './pages/Status';

function App() {
  return (
    <Router>
      <div className="flex h-screen w-screen overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 w-full overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/status" element={<Status />} />
            <Route path="/reading" element={<Reading />} />
            <Route path="/saved-books" element={<SavedBooks />} />
          </Routes>
        </main>

      </div>

    </Router>
  );
}

export default App;