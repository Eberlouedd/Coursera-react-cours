import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import Main from './components/MainComponent'
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore'



class App extends Component{
  
  render(){
    const store = ConfigureStore();
    return (
      <Provider store={store}>
        <div className="App">
            <Main />
        </div>
      </Provider>
    );
  }
}

export default App;
