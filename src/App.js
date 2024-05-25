
import './App.css';

import { Route,HashRouter,Routes } from 'react-router-dom';
import Home from './Components/Home'
import Create from './Components/Create'
import Upload from './Components/Upload';

function App() {
  return (
    <div>
    <HashRouter>
   
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/create" element={<Create />} />
    <Route path="/upload" element={<Upload />} />
    </Routes>
    </HashRouter>
    </div>
  );
}

export default App;
