import {AsyncStorage} from 'react-native'

export  class ValidateService{

    SELF=null
    constructor(self){
        this.SELF =self;
    }
  /**
   * validates password 
   * criteria: min length 8
   * you can add more restrictions 
   * Requires being called on 
   * text change for password field passing it text
   */  
  validate_password(pass=false){
    
    pl = pass || this.SELF.state.password
    pl = pl.length
    if(pl<8){
      this.SELF.setState({valid_state:3}) ;
      this.SELF.setState({valid_pass:false});  
      
    }
    else{
          
      if(this.SELF.state.valid_state == 3){
        this.SELF.setState({valid_state:0})
        if(this.SELF.state.valid_email!=undefined)
          this.validate_email()
      }
      this.SELF.setState({valid_pass:true});
    }
  }
  /**
   * validates email 
   * criteria: valid email format
   * you can add more restrictions 
   * Requires being called on 
   * text change for email field passing it text
   */  

  validate_email(em){

    email = em || this.SELF.state.email
    if(!this.validateEmail(this.SELF.state.email)){
      this.SELF.setState({valid_state:1}) ;
      this.SELF.setState({valid_email:false});  
      
    }
    else{
          
      if(this.SELF.state.valid_state == 1){
        this.SELF.setState({valid_state:0})
 
        if(this.SELF.state.valid_pass!=undefined)
          this.validate_password()
      }
      this.SELF.setState({valid_email:true});
    }

  }
  /**
   * 
   * validates email format
   */
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

    /**
   * validates username 
   * criteria: min 3 chars (.i.e Ali,Ola,..)
   * you can add more restrictions 
   * Requires being called on 
   * text change for username field passing it text
   */ 
  validate_username(un=false){
    el =  un || this.SELF.state.username
    el = el.length
    if(el<3){
      this.SELF.setState({valid_state:2}) ;
      this.SELF.setState({valid_username:false});  
    }
    else{
      
      if(this.SELF.state.valid_state == 2){
        this.SELF.setState({valid_state:0})
        if(this.SELF.state.valid_pass!=undefined)
          this.validate_password()
        if(this.SELF.state.valid_email!=undefined)
          this.validate_email()
      }
      this.SELF.setState({valid_username:true});
    }
    //return (el >=2 || this.setState({valid_username:false}) ) && this.setState({valid_username:true})
  }


    
}