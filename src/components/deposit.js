import React, { useState, useContext } from 'react';
import Card from './cards';
import { UserContext} from './context'


function Deposit () {

  const [status, setStatus]     = useState('');
  // const [email, setEmail]       = useState('');
  // const [password, setPassword] = useState('');
  const ctx = useContext(UserContext); 
  //account
  const [deposit, setDeposit] = useState(0);
  const [totalState, setTotalState] = useState(0);
  
  const handleSubmit = (event) => {  
    ctx.users[0].balance = totalState + deposit;
    let newTotal = ctx.users[0].balance;
    ctx.users[0].balChange(newTotal) 
    setTotalState(newTotal)
    console.log(newTotal)
    console.log(ctx)
    event.preventDefault();
  };
  
  const handleChange = (event) => {
    setDeposit(Number(event.target.value));
  };
  

      // render(){
        return (
          <Card
            bgcolor="secondary"
            header="Deposit"
            status={status}
            body={  
                    <>
                    <button type="submit" className="btn btn-dark" onClick={handleSubmit} >Confirm deposit</button>
                    <p></p>
                    <input type="number" min="1" className="btn btn-dark" placeholder="Specify amount" onChange={handleChange} ></input>
                    <p >Account Balance ${ctx.users[0].balance}  </p>
                    <img src="deposit.png" className="img-fluid" alt="Responsive image" width="150rem"/>
                    <p></p>
                    <p>You are loged in as:</p>
                    <p> {JSON.stringify(ctx.users[ctx.users.length-1].email)}</p>
                    
                    <a className="btn btn-dark"  href="#/login" >Logout</a>
                    {/* Logout to be defined */}
                    </>
                   }
          />
        )
      // }
    
}
export default Deposit;