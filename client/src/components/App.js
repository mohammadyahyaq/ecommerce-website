import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as actions from '../actions/authActionCreaters';

// import the react custom components
import NavBar from './navbar/NavBar';

function App() {
  const dispatch = useDispatch()
  dispatch(actions.fetchUser());
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Route exact path='/'>
          This is the route route
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
