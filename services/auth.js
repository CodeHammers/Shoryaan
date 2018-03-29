import {AsyncStorage} from 'react-native'

export  class AuthService{


    //for google avds use 10.0.2.2
    //BASE_URL ='http://10.0.2.2:1337';
    //for genymotion 
    BASE_URL ='http://10.0.3.2:1337';
    //production url
    //BASE_URL = 'https://kareememad.herokuapp.com'
    SELF=null
    constructor(self){
        this.SELF = self
    }
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
    /**
     * modified version of post
     * sends data with tokens attached to request
     * enables accessing protected routes
     */
    post_with_tokens(body,route){

    }
   /**
   *  Recieves a response from HTTP Request and extracts the
   *  access and refresh tokens to store them                                                                           
   * **********************************************************
   */
    handleToken(response){
        if(response.access_token == undefined)
            return false;
        AsyncStorage.setItem("refresh_token", response.refresh_token);
        return AsyncStorage.setItem("access_token", response.access_token);
    }
    



    checkStoredToken(){
    
        AsyncStorage.getItem("access_token").then((value) => {
          if(value!=undefined){
            this.SELF.setState({access_token:value})
            this.validateToken()
          }
        
      }).done();
      }
    
       /**
       * sends a post request to /auth/me to check             
       * validity of stored token                                                                                     
       * **********************************************************
       */
      validateToken(no_toast){
        this.SELF.setState({show_loader:true})
        body =  JSON.stringify({
          access_token: this.SELF.state.access_token
        })
        this.post(body,'/auth/me')
          //.then((response) =>{ return response.json()})
          .then((response) => {
            if(response.status!=200){
                this.SELF.setState({show_loader:false})
              //invalid token
            }
            else{
              response = response.json()
              .then((res_json)=>{
                if(no_toast)
                this.SELF.state.navigate(this.SELF.state.self,res_json)
                else
                this.SELF.props.navigation.navigate('Home', {
                  username: res_json.username,
                  email: res_json.email,
                  bloodtype: res_json.bloodtype,
                  gender: res_json.gender
                  
                })
    
                this.SELF.setState({show_loader:false})
    
    
                }
              )
              //valid token
              if(no_toast!=true)
                this.SELF.showToast('Already logged in! moving you to home','Good')
      
            }
          })
          .catch((error) => {
            alert("Cannot Connect to Server")
            this.SELF.setState({show_loader:false})
            console.error(error);
          });
    
      }
    
        /**
       * sends a post request to /auth/login with               
       * user data to check if user exists/authenticated                     
       * if authenticated,stores token recieved for             
       * future communication with server on user's behalf                                         
       * **********************************************************
       */
      login() {
        if( true!=this.SELF.state.valid_pass || this.SELF.state.valid_email!=true){
          this.SELF.showToast("Errors Detected in form ","I'll check")
          this.SELF.setState({show_loader:false})
          return;
        }
        body =  JSON.stringify({
          email: this.SELF.state.email,
          password: this.SELF.state.password,
        })
        this.post(body,'/auth/login')
          .then((response) =>{ 
            if(response.status!=200)
              return null;
            
            return response.json()})
          .then((response) => {
            if(response==null){
              this.SELF.showToast("invalid credentials","Okay")
              this.SELF.setState({show_loader:false})
              return ;
            }
    
            ht_res = this.handleToken(response)
            if(ht_res == false)
              this.SELF.showToast(response.message||"something went wrong,try again","Okay")
            else{
              ht_res.then(
                (res)=>{
                  this.SELF.setState({access_token:response.access_token})
                  this.SELF.showToast('Logged in Successfully','Great')
                  this.validateToken(true)
                }
              )
    
            }
            this.SELF.setState({show_loader:false})
          })
          .catch((error) => {
            alert("Could not connect to server")
            this.SELF.setState({show_loader:false})
          });
      }
  /**
   * sends a post request to /auth/signup with             
   * user data to create a new account if user does not                   
   * exist,if created,stores token recieved for           
   * future communication with server on user's behalf                                        
   * **********************************************************
   */

  register(){
    if(true!=this.SELF.state.valid_email || true!=this.SELF.state.valid_pass || this.SELF.state.valid_username!=true){
      this.SELF.showToast("Errors Detected in form ","I'll check")
      this.SELF.setState({show_loader:false})
      return;
    }
    body = JSON.stringify({
      email: this.SELF.state.email,
      username: this.SELF.state.username,
      bloodtype: this.SELF.state.selected2,
      password: this.SELF.state.password,
    })

    this.post(body,'/auth/signup')
      .then((response) => {
        if(response.status!=200){
         return null;
        }
        
        return response.json()
      })
      .then((response) => {
        if(response==null){
          this.SELF.showToast("User Exists","Hmmm")
          this.SELF.setState({show_loader:false})
          return ;
        }
        if(this.SELF.state.auth_service.handleToken(response)){
          this.SELF.showToast("Registered Successfully","Great")
          this.SELF.state.navigate(this.SELF.state.self,this.SELF.state)

        }
        else{
          this.SELF.showToast(response.message||"something went wrong,try again","Okay")
        }
        this.SELF.setState({show_loader:false})
      })
      .catch((error) => {
        alert("Cannot Connect to Server")
        this.SELF.setState({show_loader:false})
      });


  }
      

    
}