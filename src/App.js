import "./App.css"; 
import { useState } from "react"; 
import axios from "axios";
 
function App() {
 
  const [data, setData] = useState([]);
  const click = () => {
    fetch("http://localhost:9901/getAll")
      .then((response) => response.json()).then((data) => {
 setData(data); 
      }); 
  };
 
  const [userid, setUserID] = useState(""); 
  const [pass, setPassword] = useState("");
  const [email, setEmailID] = useState("");

  const updateUserId = (event) => { 
    setUserID(event.target.value); 
  };
 
  const updatePassword = (event) => {
    setPassword(event.target.value);
  };
 
  const updateEmail = (event) => {
    setEmailID(event.target.value);
  };
 
  const updateUser = () => {
 
    axios
      .put("http://localhost:9901/update", {
        userid: userid, //the left side userid is from the function in express to mssql
        password: pass,
        emailid: email, 
      })
 
      .then((response) => {
        console.log(response);
        
      });
 
  };
 
  const deleteUser = () => {
 
    axios
       .delete("http://localhost:9901/delete", { params: { userid: userid } })
      .then((response) => {
        console.log(response);
      });
  };
 
  const insertUser = (event) => {
 
    event.preventDefault();
 
    axios.post("http://localhost:9901/insert", {
        userid: userid, 
        password: pass,
        emailid: email,
      })
 
      .then((response) => {
   console.log(response);
      });
 
    console.log(userid + " " + pass + " " + email);
  };
 
  return (
 
    <div className="App">
      
      <div className="center">
        <form onSubmit={insertUser}>
          <h1>React Express</h1>
          <label>User ID</label>
          <input type="text" onChange={updateUserId} value={userid} /> 
          <br /> 
          <label>Password</label>
          <input type="password" onChange={updatePassword} value={pass} />
          <br />
          <label>Email ID</label>
          <input type="email" onChange={updateEmail} value={email} />
          <br />
          <input type="submit" value="Add" />
          &nbsp;&nbsp;
          <input type="button" value="Delete" onClick={deleteUser} />
          <input type="button" value="Update" onClick={updateUser} />
          <input type="reset" value="Reset" />

        
      <input type="button" onClick={click} value="DisplayAllUser" />
      </form>
      <table style={{ border: "2px solid black" }}>
        <tbody>
        <tr> <th>User ID</th> <th>Password</th> <th>Email ID</th></tr>
        {Array.isArray(data)? (
 
            data.map((user,index) => (
                <tr key={index}>
                <td>{user.userid} </td>
               <td>{user.password}</td>
            <td>{user.emailid}</td>
          </tr>)
        )):
        setData([])
            }
          </tbody>
      </table>
      </div>
    
    </div>
  );
}
 
export default App;