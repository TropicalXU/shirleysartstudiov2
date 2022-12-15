//importing main links
import React from 'react';
import Main from './components/MainComponent';
import './App.css';
import ScrollTop from './functionalComponents/ScrollTop';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { SnackbarProvider } from 'notistack';

const store = ConfigureStore();

//MAIN APP COMPONENT
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollTop>
          <div>
            <SnackbarProvider maxSnack={3}>
              <Main />
            </SnackbarProvider>
          </div>
        </ScrollTop>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
