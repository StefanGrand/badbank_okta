import React, {  useState, useContext } from 'react';
import Card from './cards';
import { UserContext} from './context'

function Withdraw () {

  const [status, setStatus]     = useState('');
  // const [email, setEmail]       = useState('');
  // const [password, setPassword] = useState('');
  const ctx = useContext(UserContext);
  const [withdraw, setWithdraw] = useState(0);
  const [totalState, setTotalState] = useState(0);

  const handleSubmit = (event) => {
    ctx.users[0].balChange()
    // changeBalance(ctx.users[0].balance = totalState - withdraw);
    // ctx.users[0].balance = totalState - withdraw;
    let newTotal = ctx.users[0].balance - withdraw;
    ctx.users[0].balance = newTotal;
    if (newTotal >= 0) {
    ctx.users[0].balance = newTotal;
    ctx.users[0].balChange(newTotal);
    setTotalState(newTotal)
    } else {
    window.alert("Your balance is not suffient")
    }
    console.log(totalState)
    console.log(ctx)
    event.preventDefault()
  };
    
   
    const handleChange = (event) => {
      
      setWithdraw(Number(event.target.value));
    };

// export default class Withdraw extends Component{
    // render(){
    return (
      <Card
        bgcolor="secondary"
        header="Withdraw"
        status={status}
        body={
                <>
                <button type="submit" className="btn btn-dark" onClick={handleSubmit}>Confirm withdraw</button>
                <p></p>
                <input type="number" min="1" className="btn btn-dark" placeholder="Amount (min $1)" onChange={handleChange} ></input>
                <p>Account Balance  ${JSON.stringify(ctx.users[ctx.users.length-1].balance)} </p>
                <img src="withdraw.PNG" className="img-fluid" alt="Responsive image" width="150rem"/>
                <h1>
                </h1>
                <p></p>
                <p>You are loged in as:</p>
                <p> 
                {JSON.stringify(ctx.users[ctx.users.length-1].email)}</p>
                <a className="btn btn-dark" href="#/login" >Logout</a>
                </>
              }
      />
    )
  // }
// }
}
export default Withdraw;