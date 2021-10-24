import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Room } from './components/Room/Room'
import Index from './components/Index/Index'
import { UserProvider } from './context/userContext'
import Header from './components/Header/Header'
// import Test from './Test'

function App() {
  return (
    <Router>
      <UserProvider>
        {/* <Test /> */}
        <div className="bg-white h-screen w-screen">
          <Header />
          <Switch>
            <Route exact path="/">
              <Index />
            </Route>
            <Route exac path="/room/:id">
              <Room />
            </Route>
          </Switch>
        </div>
      </UserProvider>
    </Router>
  )
}

export default App
