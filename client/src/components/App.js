import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminRoute from './AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import ConfirmEmail from './pages/ConfirmEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import UserDashboard from './pages/UserDashboard';
import PrivateRoute from './PrivateRoute';
const { default: Authenticate } = require("./pages/Authenticate");

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Authenticate} exact />
        <Route path="/user/verify/:token" component={ConfirmEmail} exact />
        <Route path="/user/password/forgot" component={ForgotPassword} />
        <Route path="/user/password/reset/:token" component={ResetPassword} />
        <PrivateRoute path="/user/dashboard" component={UserDashboard} exact />
        <AdminRoute path="/admin/dashboard" component={AdminDashboard} exact />
      </Switch>
    </Router>
  );
}

export default App;
