import React , {useState , useEffect} from 'react';
import './App.css';
import Routes from './Routes';
import NavBar from './NavBar';
import FoodlyApi from './api';


function App() {

  const [userToken , setUserToken] = useState(localStorage.getItem('token'));
  const [username , setUsername] = useState(localStorage.getItem('username'));


  useEffect(() => {
    localStorage.setItem('token' , userToken)
  } , [userToken])


  FoodlyApi.token = localStorage.getItem('token');



  const signUp = async (newUser) => {
    const generatedToken = await FoodlyApi.register(newUser);
    setUserToken(generatedToken);
    localStorage.setItem('token' , generatedToken);
    setUsername(localStorage.getItem('username'));
  }

  const login = async (returningUser) => {
    const generatedToken = await FoodlyApi.authenticate(returningUser);
    setUserToken(generatedToken)
    localStorage.setItem('token' , FoodlyApi.token);
    setUsername(localStorage.getItem('username'));
  }


  const logout = () => {
    setUserToken(undefined);
    setUsername(localStorage.getItem('username'));
  }

  const addComment = async (comment) => {
    const createComment = await FoodlyApi.makeComment(comment);
    return createComment;
  }

  

  
  return (
    <div className="fill-window">
      <NavBar />
    <Routes signUp = {signUp} token = {userToken} login = {login}  logout = {logout} addComment = {addComment}/>
    </div>
  );
}

export default App;