import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Activate from './pages/Activate';
const { default: Authenticate } = require("./pages/Authenticate");

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Authenticate} exact />
        <Route path="/user/verify/:token" component={Activate} exact />
      </Switch>
    </Router>
  );
}

export default App;
