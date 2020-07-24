import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from "./components/AppNavBar";
import ShoppingList from './components/ShoppingList';
import { Provider } from 'react-redux';
import store from './store';

// actions
import { loadUser } from './actions/authActions';

// components
import ItemModal from './components/ItemModal.js';
import MiniMap from './components/MiniMap';


import {
  Container
} from 'reactstrap';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar/>
        <Container>
          <ItemModal/>
          <ShoppingList/>
          <MiniMap />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
