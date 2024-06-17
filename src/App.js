
import './App.css';

import { Route,HashRouter,Routes } from 'react-router-dom';
import Home from './Components/Home'
import Create from './Components/Create'
import Upload from './Components/Upload';
import Configure from './Components/Configure';
import AllFolder from './Components/AllFolder';

function App() {
  return (
    <div>
    <HashRouter>
   
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/create" element={<Create />} />
    <Route path="/upload" element={<Upload />} />
    <Route path="/configure" element={<Configure />} />
    <Route path="/search" element={<AllFolder />} />
    </Routes>
    </HashRouter>
    </div>
  );
}

export default App;
