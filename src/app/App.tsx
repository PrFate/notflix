import { BrowserRouter, Route } from 'react-router-dom';

import './App.scss';

import { Header } from './header/Header';
import { Home } from './home/Home';
import { Shows } from './shows/Shows'
import { Friends } from './friends/Friends';
import { Library } from './library/Library';
import { Profile } from './profile/Profile';
import { SignIn } from './signin/SignIn';
import { Search } from './search/Search';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Route path='/library/:id' component={Library} exact></Route>
      <Route path='/signin/:email' component={SignIn} exact></Route>
      <Route path='/search' component={Search} exact></Route>
      <Route path='/signin' component={SignIn} exact></Route>
      <Route path='/profile' component={Profile} exact></Route>
      <Route path='/friends' component={Friends} exact></Route>
      <Route path="/shows" component={Shows} exact></Route>
      <Route path="/" component={Home} exact></Route>
    </BrowserRouter>
  );
}

export default App;
