import React, {useEffect} from "react";
import io from 'socket.io-client';
import {useSelector} from 'react-redux';

import {BaseSetting} from 'config'

const socketConnect = {
  socket: undefined
}

export function useSocket() {
  return socketConnect.socket;
}

const SocketProvider = (props) => {
  const login = useSelector((state) => state.auth.login);
  
  useEffect(() => {
    if(login?.success == true){
      console.error('SOCKETIO: INICIAR SESION',login, BaseSetting.urlSocketCuiQly)
      const newSocket = io(
        BaseSetting.urlSocketCuiQly,
        {query: {id: login.userId }}
      )
      console.error("SOCKETIO: id-", login.userId, socketConnect)
      newSocket.emit('testConnectionDev');
      socketConnect.socket=newSocket;
      console.error('SOCKETIO: ref', socketConnect.socket)
    }else{
      if(socketConnect.socket) {
        console.log('SOCKETIO: SESION CERRADA..')
        socketConnect.socket.close()
        socketConnect.socket=undefined;
      }
    }
  
    return () => {
      /*if(socketConnect.socket) {
        console.log('SOCKETIO: SESION CERRADA..')
        socketConnect.socket.emit('disconnectChat')
        socketConnect.socket.close()
        socketConnect.socket=undefined;
      }*/
    }
	}, [login]);
  
  return null
  
}

export default SocketProvider;