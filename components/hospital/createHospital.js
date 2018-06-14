import React from 'react'
import {Container, Header, Title, Content, Button, Left, Right, Body, Toast, Icon, Text, Picker, Item,Fab} from 'native-base'
import {StatusBar,StyleSheet, AsyncStorage, ScrollView, View, TextInput, Keyboard} from 'react-native'

import {AuthService} from '../../services/auth'
import {ValidateService} from '../../services/validate'

import I18n, { getLanguages } from 'react-native-i18n';



export class CreateHospital extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            name: "",
            state: "Cairo",
            district: "",
            address: "",
            phone: "",
            email: "",
            locationLongitude: 22.5,
            locationLatitude: 22.5,
            isVerified: false,
            status: "Public",
            states: ["Cairo", "Alexandria", "Giza", "Aswan", "Asyut", "Beheira", "Beni Suef", "Dakahlia", "New Valley", "Port Said", "Sharqia", "Suez"],
            statusOptions: [ "Public" , "Private"],
            position: null,


            access_token: "",
            auth_service: new AuthService(this),

            valid_email: undefined,
            validator: new ValidateService(this),

            languages: ''
        }
        
        this.checkStoredToken();        
    }

    componentWillMount() {
        getLanguages().then(languages => {
            this.setState({ languages: languages });
            //alert(languages)
            //alert(languages)
        });
    }


    /** A function that retrieves that access token from the mobile's cache */    
    checkStoredToken(){
        AsyncStorage.getItem("access_token").then((value) => {
            if(value!=undefined){
                this.setState({access_token:value})
            }
        }).done();
    }

    /** A function that's used for validating the email field */
    validateEmail(email){
        this.state.validator.validate_email(email)
    }

    /** Functions that keep track of chaning picker values */
    onStateValueChange(value) {
        this.setState({
            state: value
        });
    }

    onStatusOptionValueChange(value) {
        this.setState({
            status: value
        });
    }

    /** A function that's used to display an interaction message */
    showToast(msg,btn){
        Toast.show({
            text: msg,
            position: 'bottom',
            buttonText: btn,
            duration: 5000,
            style: {
                backgroundColor: "#212121",
                opacity:0.76
            }
        })
    }

    /** A function that sends a request to the API to create a new hospital */
    createHospital(){
   
        body = JSON.stringify({
            name: this.state.name,
            state: this.state.state,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            status: this.state.status,
            district:this.state.district,
            locationLongitude: this.state.position == null ? this.state.locationLongitude : this.state.position.longitude,
            locationLatitude: this.state.position == null ? this.state.locationLatitude : this.state.position.latitude,
            isVerified: this.state.isVerified,
            access_token: this.state.access_token
        })
        this.state.auth_service.post(body,'/hospital/create')
        .then((response)=>{
            if(response.status!=200){
                this.showToast("Creation failed", "ok");
          
            }
            else{

                this.showToast("Creation succeeded", "ok");
                response.json().then(
                    (resJson)=>{
                        this.props.navigation.navigate('ManagedHospitals',{id: resJson.id});
                    }
                )
            }
        })
    }

    /**
     *  A function that renders the actual view
    */
    render(){
        return (
            <Container>

                <StatusBar translucent={false}  style = {styles.statusBar} barStyle = "light-content"/>

                <Header style = {styles.header} noShadow =  {true} androidStatusBarColor={'#D32F2F'}>
                    <Left style = {{flex: 1}}>
                  
                        <Icon style={{color:'white'}} onPress={() => {Keyboard.dismiss; this.props.navigation.goBack()}} name='arrow-back' />
      
                    </Left>

                    <Body style = {styles.title}>
                        <Title style = {{fontSize: 17}}> Create Hospital </Title>
                    </Body>
                
                    <Right style = {{flex: 1}}>
                     
                        <Icon name='md-checkmark' style={{color:'white'}}  onPress={()=> {Keyboard.dismiss; this.createHospital()}} />
                    
                    </Right>
                </Header>

                <ScrollView>

                    <View style = {styles.form}>

                        <Text style = {styles.inputFieldLabels}> { this.state.languages.includes('ar') ? I18n.t("Hospital name") : 'Hospital name'}  </Text>
                        <TextInput style={styles.inputBoxNormal} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder=   { this.state.languages.includes('ar') ? I18n.t("Hospital's official name") : "Hospital's official name" }  
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            autoCapitalize={'sentences'}
                            onChangeText={(text) =>{this.setState({name: text});}}
                        />

                        <Text style = {styles.inputFieldLabels}> State</Text>
                        <Picker
                            iosHeader="Select one"
                            mode="dropdown"
                            selectedValue= {this.state.state}
                            onValueChange={this.onStateValueChange.bind(this)}
                            style = {styles.pickerList}
                            >
                            {this.state.states.map((item, index) => {
                                return (<Item style = {styles.pickerItem} label={item} value={item} key={index}/>) 
                            })}
                        </Picker>

                        <Text style = {styles.inputFieldLabels}>   { this.state.languages.includes('ar') ? I18n.t("District"):'District' } </Text>
                        <TextInput style={styles.inputBoxNormal} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder= {I18n.t("Helioplis")}  
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            autoCapitalize={'sentences'}
                            onChangeText={(text) =>{this.setState({district: text});}}
                        />

                        <Text style = {styles.inputFieldLabels}>  { this.state.languages.includes('ar') ? I18n.t("Address"):'Address'}  </Text>
                        <TextInput style={styles.inputBoxNormal} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder=  {I18n.t("building number St name off St name")}    
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            autoCapitalize = {'sentences'}
                            onChangeText={(text) =>{this.setState({address: text});}}
                        />

                        <Text style = {styles.inputFieldLabels}>  { this.state.languages.includes('ar') ? I18n.t("Phone") : 'Phone' } </Text>
                        <TextInput style={styles.inputBoxNormal} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder= {I18n.t("City code 8-11 digits")}  
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            keyboardType = 'numeric'
                            onChangeText={(text) =>{this.setState({phone: text});}}
                        />
                        
                        <Text style = {styles.inputFieldLabels}>  { this.state.languages.includes('ar') ? I18n.t("E-mail") : 'E-mail' }</Text>
                        <TextInput style={styles.inputBoxNormal} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder= "ie. queens@gmail.com"
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            keyboardType = 'email-address'
                            autoCapitalize = {'none'}
                            onChangeText={(text) =>{this.setState({email: text});}}
                        />
                    
                        <Text style = {styles.inputFieldLabels}> { this.state.languages.includes('ar') ? I18n.t("Status") :'Status' }</Text>
                        <Picker
                            iosHeader="Select one"
                            mode="dropdown"
                            selectedValue= {this.state.status}
                            onValueChange={this.onStatusOptionValueChange.bind(this)}
                            style = {styles.pickerList}
                            >
                            {this.state.statusOptions.map((item, index) => {
                                return (<Item style = {styles.pickerItem} label={ this.state.languages.includes('ar') ? I18n.t(item) :item} value={item} key={index}/>) 
                            })}
                        </Picker>


 


                    </View>

                </ScrollView>

            <Fab
                onPress={()=> this.props.navigation.navigate('LocateOnMap',{self: this}) }                 
                containerStyle={{ }}
                style={{ backgroundColor: 'red' }}
                position="bottomRight">
                <Icon name="pin" />
            </Fab>
            </Container>
        )
    }
}

/** Style sheet used for styling components used in the render function */
const styles = StyleSheet.create({
    statusBar:{
        backgroundColor: '#D32F2F'
    },

    header:{
        backgroundColor: '#F44336',
        height: 50
    },

    title:{
        flex: 1,  
        justifyContent: 'center', 
        alignItems: 'center'
    },

    form:{
        backgroundColor: '#FFFF'
    },

    inputBoxNormal: {
        flex:1,
        flexDirection: 'row',
        backgroundColor:'#ffffff',
        borderRadius: 15,
        paddingHorizontal:25,
        fontSize:16,
        color:'#757575',
        borderColor: '#757575',
        borderWidth: 2,
        marginVertical: 8,
        marginHorizontal: 10
    },

    inputBoxError:{
        flexDirection: 'row',
        backgroundColor:'#ffffff',
        borderRadius: 15,
        paddingHorizontal:25,
        fontSize:16,
        color:'#757575',
        borderColor: '#CF000F',
        borderWidth: 2,
        marginVertical: 8,
        marginHorizontal: 10
    },

    inputBoxPass:{
        flexDirection: 'row',
        backgroundColor:'#ffffff',
        borderRadius: 15,
        paddingHorizontal:25,
        fontSize:16,
        color:'#757575',
        borderColor: '#1E824C',
        borderWidth: 2,
        marginVertical: 8,
        marginHorizontal: 10
    },

    inputFieldLabels:{
        paddingTop:5,
        paddingLeft:10,
        fontSize: 20
    },

    pickerList:{
        flexDirection: 'row',
        marginHorizontal: 25,
    },

    pickerItem:{
        fontSize: 16,
        color: '#757575'
    }
})