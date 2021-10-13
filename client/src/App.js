import "./App.css"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { Room } from "./components/Room/Room"
import { Index } from "./components/Index"

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Index />
          </Route>
          <Route exac path="/room/:id">
            <Room />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
