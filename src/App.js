import './App.css';
import MainRoute from './route/mainRoute';
import { Provider } from 'react-redux';
import store from './redux';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <MainRoute />
      </div>
    </Provider>
  );
}

export default App;
