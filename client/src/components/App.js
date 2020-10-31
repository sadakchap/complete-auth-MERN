import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ConfirmEmail from './pages/ConfirmEmail';
const { default: Authenticate } = require("./pages/Authenticate");

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Authenticate} exact />
        <Route path="/user/verify/:token" component={ConfirmEmail} exact />
      </Switch>
    </Router>
  );
}

export default App;
