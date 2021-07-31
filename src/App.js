import { DisplayStats } from './ManagePartners';
import './App.css';
const api = require('../pages/api')
//Maen Saassouh ©

function App() {
  return (
    <div className="App">
      <h1>Welcome back, Chief!</h1>
      <p align="left">Please enter the desired maximum range in kilometers. <br/>This will be used
        to select the partners of our company falling in this range, and only display the in-range offices of the former.
      </p>
	  <DisplayStats />
    </div>
  );
}
//I am stuck here.. no app.use() because there is no express here!
//probably there is a simple fix, but I am stopping at this branch (api1)
//to use next.js in another one (api-next1)
export default App;
