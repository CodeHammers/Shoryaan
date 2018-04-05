import {AsyncStorage} from 'react-native'

export  class ValidateService{

    SELF=null
    constructor(self){
        this.SELF =self;
    }

    INVALID_PHONE =6
    INVALID_CITY = 5
    INVALID_NAME = 4
    INVALID_PASSWORD = 3
    INVALID_USERNAME = 2
    INVALID_EMAIL = 1
    VALID_FORM = 0
    
    /**
     * validates password 
     * criteria: min length 8
     * you can add more restrictions 
     * Requires being called on 
     * text change for password field passing it text
     */  
    validate_password(pass=false){
        
        pl = pass || this.SELF.state.password || this.SELF.state.oldPassword
        pl = pl.length
        if(pl<8){
        this.SELF.setState({valid_state:this.INVALID_PASSWORD}) ;
        this.SELF.setState({valid_pass:false});  
        
        }
        else{
            
        if(this.SELF.state.valid_state == this.INVALID_PASSWORD){
            this.SELF.setState({valid_state:this.VALID_FORM})
            if(this.SELF.state.valid_email!=undefined)
                this.validate_email()
            if(this.SELF.state.valid_username!=undefined)
                this.validate_username()
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
            this.SELF.setState({valid_state:this.INVALID_EMAIL});
            this.SELF.setState({valid_email:false});  
        }
        else{
            if(this.SELF.state.valid_state == this.INVALID_EMAIL){
                this.SELF.setState({valid_state:this.VALID_FORM})
        
            if(this.SELF.state.valid_pass!=undefined)
                this.validate_password()

            if(this.SELF.state.valid_username!=undefined)
                this.validate_username()
            }
            this.SELF.setState({valid_email:true});
        }

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
        if(!this.validateUserName(el)){
            this.SELF.setState({valid_state:this.INVALID_USERNAME}) ;
            this.SELF.setState({valid_username:false});  
        }
        else{
            if(this.SELF.state.valid_state == this.INVALID_USERNAME){
                this.SELF.setState({valid_state: this.VALID_FORM})
                if(this.SELF.state.valid_pass!=undefined)
                    this.validate_password()
                if(this.SELF.state.valid_email!=undefined)
                    this.validate_email()
                if(this.SELF.state.validName!=undefined)
                    this.validate_name()
                if(this.SELF.state.validCity!=undefined)
                    this.validate_city()
            }
            this.SELF.setState({valid_username:true});
        }
    }

    validate_name(n=false){
        nl =  n || this.SELF.state.name
        if(!this.validateName(nl)){
            this.SELF.setState({valid_state:this.INVALID_NAME}) ;
            this.SELF.setState({validName:false});  
        }
        else{
            if(this.SELF.state.valid_state == this.INVALID_NAME){
                this.SELF.setState({valid_state:this.VALID_FORM})
                if(this.SELF.state.valid_username!=undefined)
                    this.validate_username()
                if(this.SELF.state.validCity!=undefined)
                    this.validate_city()

            }
            this.SELF.setState({validName:true});
        }
    }



    validate_city(c=false){
        cl =  c || this.SELF.state.city
        if(!this.validateCity(cl)){
            this.SELF.setState({valid_state:this.INVALID_CITY}) ;
            this.SELF.setState({validCity:false});  
        }
        else{
            if(this.SELF.state.valid_state == this.INVALID_CITY){
                this.SELF.setState({valid_state:this.VALID_FORM})
                if(this.SELF.state.valid_username!=undefined)
                    this.validate_username()
                if(this.SELF.state.validName!=undefined)
                    this.validate_name()

            }
            this.SELF.setState({validName:true});
        }
    }


    validate_phone(p=false){
        pl =  p || this.SELF.state.city
        if(!this.validatePhoneNumber(pl)){
            this.SELF.setState({valid_state:this.INVALID_PHONE}) ;
            this.SELF.setState({validPhone:false});  
        }
        else{
            if(this.SELF.state.valid_state == this.INVALID_CITY){
                this.SELF.setState({valid_state:this.VALID_FORM})

            }
            this.SELF.setState({validPhone:true});
        }
    }

    validateName(name)
    {
        var regex = /^[a-zA-Z ]{3,30}$/;
        return regex.test(String(name));
    }

    validateCity(city)
    {
        var regex = /^[a-zA-Z ]{3,30}$/;
        return regex.test(String(city));
    }

    validateUserName(username)
    {
        var regex = /^[a-zA-Z][a-z0-9A-Z ]{2,20}$/;
        return regex.test(String(username));
    }

    validatePhoneNumber(phone)
    {
        var regex = /^[0-9]{8,11}$/
        return regex.test(String(phone));
    }
    /**
     * 
     * validates email format
     */
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}