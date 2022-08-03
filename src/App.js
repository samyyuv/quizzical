import './App.scss';
import Start from './components/Start';

function App() {
  return (
    <div className='container'>
      <div className="circle circle-big up"></div>
      <div className="circle circle-small small-up"></div>
      <Start />
      <div className="circle circle-small small-down"></div>
      <div className="circle circle-big down"></div>

    </div>
  );
}

export default App;
