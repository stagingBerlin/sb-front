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
import ProjectSearch from './Components/projectSearch/ProjectSearch'
import ProjectsOwn from './Components/projectsOwn/ProjectsOwn'
import EditUserProfile from './Components/userprofileOwn/EditUserProfile'
import CreateProjectsOwn from './Components/projectsOwn/CreateProjectsOwn'
import EinzelViewOwnProject from './Components/projectsOwn/EinzelViewOwnProject'
import EditOwnProject from './Components/projectsOwn/EditOwnProject'
import AddProjectDetail from './Components/projectsOwn/AddProjectDetail'

function App() {
  
  return (
    <div className="App">
        <Navigation/>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/about" exact component={About} />
            
            <PrivateRoute exact path='/account/dashboard' component={UserDashboard} />
            <PrivateRoute exact path='/account/profile' component={UserProfileOwn} />
            <PrivateRoute exact path='/account/search' component={ProjectSearch} />
            <PrivateRoute exact path='/account/project' component={ProjectsOwn} />
            <PrivateRoute exact path='/account/project/:id' component={({ match }) => <EinzelViewOwnProject id={match.params.id}/>} />
            <PrivateRoute exact path='/account/createproject' component={CreateProjectsOwn} />
            <PrivateRoute exact path='/account/project/edit' component={EditOwnProject} />
            <PrivateRoute exact path='/account/people' component={UserProfileOther} />
            <PrivateRoute exact path='/account/editprofile' component={EditUserProfile} />

          </Switch>
        <Footer/>
    </div>
  );
}

export default App
