import React from 'react'
import {View} from 'react-native'
import {Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Item, Toast, Picker,Input,Badge,Fab} from 'native-base';
import {StatusBar,StyleSheet,AsyncStorage,ScrollView,TextInput,Keyboard} from 'react-native'

import DatePicker from 'react-native-datepicker'

import {AuthService} from '../../services/auth'
import {ValidateService} from '../../services/validate'
import I18n, { getLanguages } from 'react-native-i18n';

export class EditProfile extends React.Component
{
    constructor(props)
    {
        super(props);

        //receive the parameters passed in from the profile view
        const { params } = this.props.navigation.state;

        this.state = {
            usernameSaved: params.username,
            bloodTypeSaved: params.bloodType || "?",
            genderSaved: params.gender || "Male",
            nameSaved: params.name || "",
            citySaved: params.city || "",
            stateSaved: params.state || "Cairo",
            dateOfBirthSaved: params.dateOfBirth,

            username: params.username,
            name: params.name || "",
            state: params.state || "Cairo",
            city: params.city || "",
            bloodType: params.bloodType || "?",
            gender: params.gender || "Male",
            dateOfBirth: params.dateOfBirth,
            self: params.self,

            //These group of variables are used for form validaitons
            valid_username: undefined,
            validName: undefined,
            validCity: undefined,


            position: params.position,


            //The arrays are used to populate the picker values
            bloodTypes: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-", "?"],
            states: ["Cairo", "Alexandria", "Giza", "Aswan", "Asyut", "Beheira", "Beni Suef", "Dakahlia", "New Valley", "Port Said", "Sharqia", "Suez"],
            genders: ["Male", "Female"],

            access_token: '',
            auth_service: new AuthService(this),   //instance from an authentication service
            validator: new ValidateService(this), //instance from a validation service
            valid_state: 0,  //indicates the validity state of the form (valid, invalid password, ..)
            languages:""
        };
        //alert(params.position.latitude)
        this.checkStoredToken();
    }

    componentWillMount() {
        getLanguages().then(languages => {
            this.setState({ languages: languages });
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

    /** A function that sends an edit request to the API */
    editProfile(){
        body = JSON.stringify({
                username: this.state.username,
                bloodtype: this.state.bloodType,
                name: this.state.name,
                state: this.state.state,
                city: this.state.city,
                dateOfBirth: this.state.dateOfBirth,
                password: "protected",
                lat: this.state.position ? this.state.position.latitude : null,
                lng: this.state.position ? this.state.position.longitude : null,
                gender: this.state.gender,
                access_token: this.state.access_token
            })
        this.state.auth_service.post(body,'/auth/edit')
        .then((response)=>{
            if(response.status!=200){
                this.setState(
                    {bloodType:this.state.bloodTypeSaved, 
                    username:this.state.usernameSaved, 
                    gender:this.state.genderSaved,
                    name: this.state.nameSaved, 
                    city: this.state.citySaved, 
                    state: this.state.stateSaved, 
                    dateOfBirth: this.state.dateOfBirthSaved 
                })
                this.showToast("Invalid update","ok");
            }
            else{
                this.showToast("update sucess","ok");
                this.state.self.getViewData();
                this.props.navigation.goBack();
            }
        })
    }

    /** A group of functions that are used to keep track of changing picker values */
    onStateValueChange(value) {
        this.setState({
            state: value
        });
    }

    onGenderValueChange(value) {
        this.setState({
            gender: value
        });
    }

    onBloodTypeValueChange(value) {
        this.setState({
            bloodType: value
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

    /** A group of functions that call validation methods on the form's fields*/
    validate_username(username=false){
        this.state.validator.validate_username(username)
    }

    validate_name(name=false){
        this.state.validator.validate_name(name)
    }

    validate_city(city=false){
        this.state.validator.validate_city(city)
    }

    /** A function that renders the view on the screen */
    render(){
        return(
            <Container style = {styles.mainScreen}>

                <StatusBar style = {styles.statusBar} barStyle = "light-content"/>

                <Header style = {styles.header} noShadow =  {true} androidStatusBarColor={'#D32F2F'}>
                    <Left style = {{flex: 1}}>
                    
                            <Icon name='arrow-back' style={{color:'white'}} onPress={() => {Keyboard.dismiss; this.props.navigation.goBack()}}  />
                
                    </Left>

                    <Body style = {styles.title}>
                        <Title> Edit Profile </Title>
                    </Body>
                
                    <Right style = {{flex: 1}}>
                   
                            <Icon name='md-checkmark'  style={{color:'white'}} onPress={() => {Keyboard.dismiss; this.editProfile()}} />
                
                    </Right>
                </Header>

                <ScrollView>

                    <View style = {styles.form}>

                        <Text style = {styles.inputFieldLabels}> {this.state.languages.includes('ar') ?  I18n.t('Username') : 'Username' }</Text>
                        <TextInput 
                            style={[
                                this.state.valid_username == undefined? styles.inputBoxNormal : 
                                this.state.valid_username ? styles.inputBoxPass : styles.inputBoxError
                            ]}
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            defaultValue = {this.state.username}
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            autoCapitalize = 'none'
                            onChangeText={(text) =>{this.setState({username: text}); this.validate_username(text);}}
                        />

                        {this.state.valid_state== this.state.validator.INVALID_USERNAME && (
                            <Badge   style={{backgroundColor:'#F44336',opacity:.8}}>
                            <Text  style={{color:'white'}} note>username: invalid characters</Text>
                            </Badge>
                        )}

                        <Text style = {styles.inputFieldLabels}>{ this.state.languages.includes('ar') ? I18n.t('Name') : 'Name'}</Text>
                        <TextInput 
                            style={[
                                this.state.validName == undefined? styles.inputBoxNormal : 
                                this.state.validName ? styles.inputBoxPass : styles.inputBoxError
                            ]}
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            defaultValue= {this.state.name}
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            autoCapitalize={'sentences'}
                            onChangeText={(text) =>{ this.setState({name: text}); this.validate_name(text);}}
                        />

                        {this.state.valid_state== this.state.validator.INVALID_NAME && (
                            <Badge   style={{backgroundColor:'#F44336',opacity:.8}}>
                            <Text  style={{color:'white'}} note>name: invalid characters/too short</Text>
                            </Badge>
                        )}

                        <Text style = {styles.inputFieldLabels}>{  this.state.languages.includes('ar') ?  I18n.t('City') : 'City'}</Text>
                        <TextInput 
                            style={[
                                this.state.validCity == undefined? styles.inputBoxNormal : 
                                this.state.validCity ? styles.inputBoxPass : styles.inputBoxError
                            ]}
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            defaultValue= {this.state.city}
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            autoCapitalize={'sentences'}
                            onChangeText={(text) =>{ this.setState({city: text});this.validate_city(text)}}
                        />
                        {this.state.valid_state== this.state.validator.INVALID_CITY && (
                            <Badge   style={{backgroundColor:'#F44336',opacity:.8}}>
                            <Text  style={{color:'white'}} note>city: invalid</Text>
                            </Badge>
                        )}

                        <Text style = {styles.inputFieldLabels}>{ this.state.languages.includes('ar') ? I18n.t('State') : 'State'}</Text>
                        <Picker
                            iosHeader="Select one"
                            mode="dropdown"
                            selectedValue={this.state.state}
                            onValueChange={this.onStateValueChange.bind(this)}
                            style = {styles.StatePicker}
                            >
                            {this.state.states.map((item, index) => {
                                return (<Item style = {styles.StatePickerItem} label={item} value={item} key={index}/>) 
                            })}
                        </Picker>
                        
                        <Text style = {styles.inputFieldLabels}>{  this.state.languages.includes('ar') ? I18n.t('Blood type') : 'Blood type'}</Text>
                        <Picker
                            iosHeader="Select one"
                            mode="dropdown"
                            selectedValue={this.state.bloodType}
                            onValueChange={this.onBloodTypeValueChange.bind(this)}
                            style = {styles.StatePicker}
                            >
                            {this.state.bloodTypes.map((item, index) => {
                                return (<Item style = {styles.StatePickerItem} label={item} value={item} key={index}/>) 
                            })}
                        </Picker>
                        
                        <Text style = {styles.inputFieldLabels}> { this.state.languages.includes('ar') ? I18n.t('Gender') : 'Gender'}</Text>
                        <Picker
                            iosHeader="Select one"
                            mode="dropdown"
                            selectedValue={this.state.gender}
                            onValueChange={this.onGenderValueChange.bind(this)}
                            style = {styles.StatePicker}
                            >
                            {this.state.genders.map((item, index) => {
                                return (<Item style = {styles.StatePickerItem} label={item} value={item} key={index}/>) 
                            })}
                        </Picker> 

                        <Text style = {styles.inputFieldLabels}>{ this.state.languages.includes('ar') ? I18n.t('Date of birth') : 'Date of birth'}</Text>
                        <DatePicker
                            style={{width: 125}}
                            date={this.state.dateOfBirth}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="1940-01-01"
                            maxDate="2000-12-31"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                  borderColor: '#FFFF',
                                  borderRadius: 5,
                                  borderWidth: 2,
                                  marginVertical: 5,
                                  width: 20
                                },
                                dateText:{
                                    fontSize: 15,
                                    paddingLeft: 10
                                }
                            }}
                            onDateChange={(date) => {this.setState({dateOfBirth: date})}}
                        />
                        
                    <View/>

                    </View>

                </ScrollView>

            <Fab
                 onPress={()=>this.props.navigation.navigate('LocateOnMap',{self:this})}             
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
    mainScreen:{
        backgroundColor: '#FFFF'
    },

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

    StatePicker:{
        flexDirection: 'row',
        marginHorizontal: 25,
    },

    StatePickerItem:{
        fontSize: 16,
        color: '#757575'
    }
})

I18n.fallbacks = true;

I18n.translations = {
    'en': require('../../locales/en'),
    'ar-EG': require('../../locales/ar')
};