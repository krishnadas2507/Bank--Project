import{BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';
import Layout from './components/Layout'
import Frontpage from './components/Frontpage'
import Request from './components/Request';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      
      < Route path='/' element={<Layout/>}>
      <Route index element={<Frontpage/>}/>
      <Route path='/Request' element={<Request/>}/>
      </Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
