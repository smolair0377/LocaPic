import React, { useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import {Button, ListItem, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import socketIOClient from "socket.io-client";
import { useState } from 'react';





function ChatScreen(props) {
  var socket = socketIOClient("https://192.168.1.96:3001"); // Sinon essayer : 190.168.1.254

  const [currentMessage, setCurrentMessage]= useState('');

  useEffect(() => {
    console.log('Effect déclanché');
    function handleSocket(){
    socket.emit('sendMessage','Pipe Active');
    socket.on('sendMessageToAll',(x)=>{
      console.log(x);
    });
    }
    handleSocket();
    
  }, []);

  function handleChange(x){
    setCurrentMessage(x);
  }

  function sendMessageToPipe(){
    console.log('Nouveau message envoyé au back : '+ currentMessage);
    function handleEmit(){
      socket.emit('sendMessage', currentMessage);
      setCurrentMessage('');
    }
    
    handleEmit();
  }
  return (
    <View style={{flex:1}}>
       
        <ScrollView  style={{flex:1, marginTop: 15}}>
          <ListItem title="Parfait et toi ?" subtitle="Alex"/>
          <ListItem title="Coucou ça roule ?" subtitle="John"/>
        </ScrollView >

        <KeyboardAvoidingView behavior="padding" enabled>
            <Input
                containerStyle = {{marginBottom: 5}}
                placeholder='Your message'
                value= {currentMessage}
                onChangeText={(e)=>{handleChange(e);}}
            />
            <Button
                icon={
                    <Icon
                    name="envelope-o"
                    size={20}
                    color="#ffffff"
                    />
                } 
                title="Send"
                buttonStyle={{backgroundColor: "#eb4d4b"}}
                type="solid"
                onPress={()=>{sendMessageToPipe();}}
            />
        </KeyboardAvoidingView>
        
    </View>
  );
}

export default ChatScreen;