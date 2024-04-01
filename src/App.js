import { useEffect, useReducer } from 'react';
import reducer from './reducer';
import './App.css';
import JoinSection from './JoinSection/JoinSection';
import socket from './socket';
import Chat from './Chat/Chat';
import axios from 'axios';

function App() {
  window.socket = socket;

  const initialState = {
    joined: false,
    roomId: null, 
    userName: null,
    users: [],
    messages: []
  }
  const [state, dispatch] = useReducer(reducer, initialState )

  const isLogged = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj
    })
    socket.emit('ROOM:JOIN', obj);
 
    const { data } = await axios.get(`/rooms/${obj.roomId}`)
    console.log(data)
    setUsers(data.users)
  }

  const setUsers = (users) => {
     dispatch({
        type: 'SET_USERS',
        payload: users,
     })
    console.log(users)
  }

  useEffect(() => {
    // socket.on('ROOM:JOINED',setUsers)
    socket.on('ROOM:SET_USERS', setUsers)
  }, [])
  
  
console.log(state)


  return (
    <div className="app">
      {!state.joined ? <JoinSection isLogged={isLogged} /> : <Chat state={state} />}
    </div>
  );
}

export default App;
