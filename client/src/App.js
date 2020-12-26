import { useEffect } from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { Provider } from 'react-redux';
import store from './store';

import { loadUser } from './actions/authActions';
import UploadPage from './pages/UploadPage';
import { loadArtworks } from './actions/artworkActions';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadArtworks());
  });

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Route path="/" component={HomePage} exact />
          <Route path="/login" component={LoginPage} exact />
          <Route path="/upload" component={UploadPage} exact />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
