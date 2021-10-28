import './sass/main.scss'
import { Switch, Route } from 'react-router-dom'

import PrivateRoute from './Components/PrivateRoute'
import Login from './Components/auth/Login'
import Signup from './Components/auth/Signup'
import About from './Components/About'
import Footer from './Components/Footer'
import LandingPage from './Components/landingPage/LandingPage'
import Navigation from './Components/Navigation'
import UserDashboard from './Components/userDashboard/UserDashboard'
import UserProfileOther from './Components/userProfileOther/UserProfileOther'
import UserProfileOwn from './Components/userprofileOwn/UserProfileOwn'
import UserSearch from './Components/userSearch/UserSearch'



function App() {
  return (
    <div className="App">
        <Navigation/>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/about" exact component={About} />
            <PrivateRoute exact path='/account/:id/dashboard' component={UserDashboard} />
            <PrivateRoute exact path='/account/:id/profile' component={UserProfileOwn} />
            <PrivateRoute exact path='/account/:id/search' component={UserSearch} />
            <PrivateRoute exact path='/account/:id/people' component={UserProfileOther} />
          </Switch>
        <Footer/>
    </div>
  );
}

export default App;
