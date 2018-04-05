import React from 'react'
import {View} from 'react-native'
import {Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Item, Toast, Picker} from 'native-base';
import {StatusBar,StyleSheet,AsyncStorage,ScrollView,TextInput,Keyboard} from 'react-native'

import DatePicker from 'react-native-datepicker'

import {AuthService} from '../../services/auth'
import {ValidateService} from '../../services/validate'

export class EditProfile extends React.Component
{
    constructor(props)
    {
        super(props);

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

            valid_username: undefined,
            validName: undefined,
            validCity: undefined,

            bloodTypes: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-", "?"],
            states: ["Cairo", "Alexandria", "Giza", "Aswan", "Asyut", "Beheira", "Beni Suef", "Dakahlia", "New Valley", "Port Said", "Sharqia", "Suez"],
            genders: ["Male", "Female"],

            access_token: '',
            auth_service: new AuthService(this),
            validator: new ValidateService(this)
        };

        this.checkStoredToken();
    }

    checkStoredToken(){
        AsyncStorage.getItem("access_token").then((value) => {
          if(value!=undefined){
            this.setState({access_token:value})
          }
        }).done();
    }

    editProfile(){
        body = JSON.stringify({
                username: this.state.username,
                bloodtype: this.state.bloodType,
                name: this.state.name,
                state: this.state.state,
                city: this.state.city,
                dateOfBirth: this.state.dateOfBirth,
                password: "protected",
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

    render(){
        return(
            <Container style = {styles.mainScreen}>

                <StatusBar style = {styles.statusBar} barStyle = "light-content"/>

                <Header style = {styles.header} noShadow =  {true} androidStatusBarColor={'#D32F2F'}>
                    <Left style = {{flex: 1}}>
                        <Button transparent>
                            <Icon onPress={() => {Keyboard.dismiss; this.props.navigation.goBack()}} name='arrow-back' />
                        </Button>
                    </Left>

                    <Body style = {styles.title}>
                    <Title> Edit Profile </Title>
                    </Body>
                
                    <Right style = {{flex: 1}}>
                        <Button transparent>
                            <Icon onPress={() => {Keyboard.dismiss; this.editProfile()}} name='md-checkmark' />
                        </Button>
                    </Right>
                </Header>

                <ScrollView>

                    <View style = {styles.form}>

                        <Text style = {styles.inputFieldLabels}> Username</Text>
                        <TextInput 
                            style={[
                                this.state.valid_username == undefined? styles.inputBoxNormal : 
                                this.state.valid_username? styles.inputBoxPass : styles.inputBoxError
                            ]}
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            defaultValue = {this.state.username}
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            autoCapitalize = 'none'
                            onChangeText={(text) =>{this.setState({username: text}); this.validateUserName(text);}}
                        />

                        <Text style = {styles.inputFieldLabels}> Name</Text>
                        <TextInput 
                            style={styles.inputBoxNormal} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            defaultValue= {this.state.name}
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            autoCapitalize={'sentences'}
                            onChangeText={(text) =>{ this.setState({name: text});}}
                        />

                        <Text style = {styles.inputFieldLabels}> City</Text>
                        <TextInput 
                            style={styles.inputBoxNormal}
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            defaultValue= {this.state.city}
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            autoCapitalize={'sentences'}
                            onChangeText={(text) =>{ this.setState({city: text});}}
                        />

                        <Text style = {styles.inputFieldLabels}> State</Text>
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
                        
                        <Text style = {styles.inputFieldLabels}> Blood type</Text>
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
                        
                        <Text style = {styles.inputFieldLabels}> Gender</Text>
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

                        <Text style = {styles.inputFieldLabels}> Date of birth</Text>
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

            </Container>
        )
    }
} 

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