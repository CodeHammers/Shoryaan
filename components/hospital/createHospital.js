import React from 'react'
import {Container, Header, Title, Content, Button, Left, Right, Body, Toast, Icon, Text, Picker, Item} from 'native-base'
import {StatusBar,StyleSheet, AsyncStorage, ScrollView, View, TextInput} from 'react-native'

import {AuthService} from '../../services/auth'
import {ValidateService} from '../../services/validate'

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
            valid_email: undefined,
            isVerified: false,
            status: "Public",
            states: ["Cairo", "Alexandria", "Giza", "Aswan", "Asyut", "Beheira", "Beni Suef", "Dakahlia", "New Valley", "Port Said", "Sharqia", "Suez"],
            statusOptions: ["Public", "Private"],

            access_token: "",

            auth_service: new AuthService(this),
            validator: new ValidateService(this)
        }

        this.checkStoredToken();        
    }

    checkStoredToken(){
        AsyncStorage.getItem("access_token").then((value) => {
            if(value!=undefined){
                this.setState({access_token:value})
            }
        }).done();
    }

    validateEmail(email){
        this.state.validator.validate_email(email)
    }

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

    createHospital(){
        body = JSON.stringify({
            name: this.state.name,
            state: this.state.state,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            status: this.state.status,
            locationLongitude: this.state.locationLongitude,
            locationLatitude: this.state.locationLatitude,
            isVerified: this.state.isVerified
        })
        this.state.auth_service.post(body,'/hospital/create')
        .then((response)=>{
            if(response.status!=200){
                this.showToast("Creation failed", "ok");
                response.json().then(
                    (res_json)=>{
                        alert(res_json.invalidAttributes)
                    }
                )
            }
            else{
                this.showToast("Creation succeeded", "ok");
                this.props.navigation.navigate('PrivateProfileInfo', 
                {
                    name: this.state.name,
                    state: this.state.state,
                    email: this.state.email,
                    phone: this.state.phone,
                    address: this.state.address,
                    status: this.state.status,
                    district: this.state.district,
                    isVerified: this.state.isVerified
                });
            }
        })
    }

    render(){
        return (
            <Container>

                <StatusBar translucent={false}  style = {styles.statusBar} barStyle = "light-content"/>

                <Header style = {styles.header} noShadow =  {true} androidStatusBarColor={'#D32F2F'}>
                    <Left style = {{flex: 1}}>
                        <Button transparent>
                            <Icon onPress={() => this.props.navigation.goBack()} name='arrow-back' />
                        </Button>
                    </Left>

                    <Body style = {styles.title}>
                    <Title> CREATE </Title>
                    </Body>
                
                    <Right style = {{flex: 1}}>
                        <Button transparent>
                            <Icon onPress={()=> this.createHospital()} name='md-checkmark' />
                        </Button>
                    </Right>
                </Header>

                <ScrollView>

                    <View style = {styles.form}>

                        <Text style = {styles.inputFieldLabels}> Hospital's name</Text>
                        <TextInput style={styles.inputBox} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder= "Hospital's official name"
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

                        <Text style = {styles.inputFieldLabels}> District</Text>
                        <TextInput style={styles.inputBox} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder= "i.e. Helioplis"
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            onChangeText={(text) =>{this.setState({district: text});}}
                        />

                        <Text style = {styles.inputFieldLabels}> Address</Text>
                        <TextInput style={styles.inputBox} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder= "i.e building number, St. name off St. name"
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            autoCapitalize = {'sentences'}
                            onChangeText={(text) =>{this.setState({address: text});}}
                        />

                        <Text style = {styles.inputFieldLabels}> Phone</Text>
                        <TextInput style={styles.inputBox} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder= "[City code] + [8 numbers]"
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            keyboardType = 'numeric'
                            onChangeText={(text) =>{this.setState({phone: text});}}
                        />
                        
                        <Text style = {styles.inputFieldLabels}> E-mail</Text>
                        <Item style={{width:'100%', borderBottomColor: '#FFFF'}}>
                            <TextInput style={styles.inputBox} 
                                underlineColorAndroid='rgba(0,0,0,0)' 
                                placeholder= "ie. queens@gmail.com"
                                placeholderTextColor = "#757575"
                                selectionColor="#212121"
                                keyboardType = 'email-address'
                                onChangeText={(text) =>{this.setState({email: text}); this.validateEmail(text);}}
                            />
                            {this.state.valid_email == true &&
                                (
                                    <Icon style={{color:'green'}}  name='checkmark-circle'/>
                                )
                            }
                            {this.state.valid_email == false &&
                                (
                                    <Icon style={{color:'red'}}  name='close-circle'/>
                                )
                            }
                        </Item>

                        <Text style = {styles.inputFieldLabels}> Status</Text>
                        <Picker
                            iosHeader="Select one"
                            mode="dropdown"
                            selectedValue= {this.state.status}
                            onValueChange={this.onStatusOptionValueChange.bind(this)}
                            style = {styles.pickerList}
                            >
                            {this.state.statusOptions.map((item, index) => {
                                return (<Item style = {styles.pickerItem} label={item} value={item} key={index}/>) 
                            })}
                        </Picker>

                    </View>

                </ScrollView>

            </Container>
        )
    }
}

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

    inputBox: {
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