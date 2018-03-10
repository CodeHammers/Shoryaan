import {AsyncStorage} from 'react-native'

export  class AuthService{
    BASE_URL ='http://10.0.3.2:1337';

    post(body,route){
        return  fetch(this.BASE_URL+route
        ,{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: body
        }
        )
    }
    handleToken(response){
        if(response.access_token == undefined)
            return false;
        AsyncStorage.setItem("access_token", response.access_token);
        AsyncStorage.setItem("refresh_token", response.refresh_token);
        return true;
    }
    

    
}