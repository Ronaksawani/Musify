import React from 'react'
import { useState , useEffect } from 'react';


const CLIENT_ID="################################";
const CLIENT_SECRET="################################";
var a;
const Auth = () => {

    const [accessToken, setAccessToken]=useState('');
    
    const fetchToken=()=>{
        const authParameters= {
            method: 'post',
            headers: {
              'content-Type': 'application/x-www-form-urlencoded'},
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET }  
      
            fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(res=>res.json())
            .then(data=>setAccessToken(data.access_token));
            
    }
    a=accessToken;

    useEffect(()=>{
        fetchToken();
        

    },[]);

  return 
}
export {a}
export default Auth
