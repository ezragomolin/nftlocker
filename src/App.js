import './App.css'
import UnstakedAssets from './PAGES/UnstakedAssets';
import Home from './PAGES/Home';
import {BrowserRouter as Router, Routes ,Route} from "react-router-dom";


function App() {
  return (
    // <div className="Home">
    //   <Home/>
    // </div>
<Router>
  <div className="App">
    <Routes>

      <Route path="/" element={<Home />}/>
     

      <Route path="/unstakedassets" element={<UnstakedAssets />}/>
      

    </Routes>

  </div>
</Router> 
    
  );
}

export default App;
