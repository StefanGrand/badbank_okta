import React, {  useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, useHistory}  from 'react-router-dom';
import NavBar from './components/navbar';
import Home from './components/home';
import CreateAccount from './components/createaccount';
import Login from './components/login';
import Deposit from './components/deposit';
import Withdraw  from './components/withdraw';
import AllData from './components/alldata';
import {UserContext} from './components/context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SecureRoute, Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';


const App = () => {
  const [balance123, setBalance123] = useState(0);  
  const history = useHistory();
  
  const onAuthRequired = () => {
      history.push('/login');
    };

  const changeBalance = (props) => {
    console.log("PARENT COMPONENT")
    let balance123	= props;
    let newBalance =  balance123 ;
    setBalance123(newBalance)
  }

  return (
    <Router>
      <Security 
       issuer={`${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`}
       client_id={process.env.REACT_APP_OKTA_CLIENT_ID}
       redirect_uri={window.location.origin + '/callback'}
       onAuthRequired={onAuthRequired}
       >
      <NavBar/>
      <UserContext.Provider value={{users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:balance123, balChange: changeBalance}]}}>
        <div className="container" style={{padding: "20px"}}>
          <Route path="/" exact={true} component={Home} />
          <Route path="/CreateAccount/" exact={true} component={CreateAccount} />
          <Route path="/login/" render={() =>  <Login/>} />
          <SecureRoute path="/deposit/" exact={true} component={Deposit} />
          <SecureRoute path="/withdraw/" exact={true} component={Withdraw} />
          <SecureRoute path="/alldata/" exact={true} component={AllData} /> 
          <Route path='/callback' exact={true} component={LoginCallback} />
        </div>
      </UserContext.Provider>   
      </Security>   
    </Router>
  );
};

export default App
