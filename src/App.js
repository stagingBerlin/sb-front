import Navigation from './Components/Navigation'
import UserDashboard from './Components/userDashboard/UserDashboard'
import { Switch, Route } from 'react-router-dom'
import Login from './Components/auth/Login'
import Signup from './Components/auth/Signup'


function App() {
  return (
    <div className="App">
      <Navigation/>
      <UserDashboard/>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
