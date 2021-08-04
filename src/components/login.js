import React, { useState } from 'react';
import Card from './cards';
import { UserContext} from './context'
import { useOktaAuth } from '@okta/okta-react';

const Login = () => {
        const [show, setShow]         = React.useState(true);
        const [status, setStatus]     = React.useState('');
        const [email, setEmail]       = React.useState('');
        const [password, setPassword] = React.useState('');
        const ctx = React.useContext(UserContext);  
        const { oktaAuth } = useOktaAuth();
        const [sessionToken, setSessionToken] = useState();
       
        const handleSubmit = (e) => {
          e.preventDefault();
      
          oktaAuth.signInWithCredentials({ email, password })
          .then(res => {
            const sessionToken = res.sessionToken;
            setSessionToken(sessionToken);
            // sessionToken is a one-use token, so make sure this is only called once
            oktaAuth.signInWithRedirect({ sessionToken });
          })
          .catch(err => console.log('Found an error', err));
        };

        const handleEmailChange = (e) => {
          setEmail(e.target.value);
        };
      
        const handlePasswordChange = (e) => {
          setPassword(e.target.value);
        };
        
        if (sessionToken) {
          // Hide form while sessionToken is converted into id/access tokens
          return null;
        }
      
      const clearForm = () => {
        setShow(true);
      }
      return (
        <Card
          bgcolor="secondary"
          header="Login"
          status={status}
          body={show ? (  
                  <>
                  Email address<br/>
                  <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={handleEmailChange}/><br/>
                  Password<br/>
                  <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={handlePasswordChange}/><br/>
                  <button type="submit" className="btn btn-dark" onClick={handleSubmit}>Login</button>
                  </>
                ):(
                  <>
                  <h5>Successful Login: Please choose your options</h5>
                  <a href="#/deposit" className="btn btn-dark" onClick={clearForm} >Deposit money</a>
                  <h1></h1>
                  <a href="#/withdraw" className="btn btn-dark">Withdraw money</a>
                  <h1></h1>
                  </>
                )}
        />
      )      
        
}
export default Login