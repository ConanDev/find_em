import { DisplayStats } from './ManagePartners';
import './App.css';
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

export default App;
