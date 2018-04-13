import React from 'react'
import {Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Picker, Item, Toast} from 'native-base'
import {StatusBar, StyleSheet, ScrollView, View, TextInput, AsyncStorage, Keyboard} from 'react-native'

import {AuthService} from '../../services/auth'
import {ValidateService} from '../../services/validate'

export class EditHospitalPrivateProfile extends React.Component
{
    constructor(props)
    {
        super(props);

        //Receive that data passed in from the hospital private view
        const {params} = this.props.navigation.state;

        this.state = {
            nameSaved: params.name,
            stateSaved: params.state || "Cairo",
            districtSaved: params.district,
            addressSaved: params.address,
            phoneSaved: params.phone,
            statusSaved: params.status || "Public",
            emailSaved: params.email,

            name: params.name,
            state: params.state || "Cairo",
            district: params.district,
            address: params.address,
            phone: params.phone,
            email: params.email,
            status: params.status || "Public",
            self: params.self,

            //The arrays are used to populate the pickers
            states: ["Cairo", "Alexandria", "Giza", "Aswan", "Asyut", "Beheira", "Beni Suef", "Dakahlia", "New Valley", "Port Said", "Sharqia", "Suez"],
            statusOptions: ["Public", "Private"],

            access_token: "",

            auth_service: new AuthService(this), //instance from an authentication service
            validator: new ValidateService(this) //instance from a validation service
        }

        this.checkStoredToken();  //Retreive the token from the device cache   
    }

    /** A function that retrieves that access token from the mobile's cache */
    checkStoredToken(){
        AsyncStorage.getItem("access_token").then((value) => {
            if(value!=undefined){
                this.setState({access_token:value})
            }
        }).done();
    }

    /** A group of functions keep tracking of changing the pickers data */
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

    /** A function that sends a request to the API to edit hospital data */
    editProfile(){
        body = JSON.stringify({
            name: this.state.name,
            state: this.state.state,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            district: this.state.district,
            status: this.state.status
        })
        this.state.auth_service.post(body,'/hospital/update')
        .then((response)=>{
            if(response.status!=200){
                this.setState({
                    name:this.state.nameSaved, 
                    state:this.state.stateSaved, 
                    email:this.state.emailSaved, 
                    phone: this.state.phoneSaved, 
                    address: this.state.addressSaved, 
                    status: this.state.statusSaved, 
                    district: this.state.districtSaved})
                this.showToast("Invalid update","ok");
            }
            else{
                this.showToast("update sucess","ok");
                this.state.self.getViewData();
                this.props.navigation.goBack();
            }
        })
    }

    /** A function that renders the actual view on the screen */
    render(){
        return(
            <Container style = {styles.form}>
                <Header style = {styles.header} noShadow =  {true} androidStatusBarColor={'#D32F2F'}>
                    <Left style = {{flex: 1}}>
                        <Button transparent>
                            <Icon onPress={() => { Keyboard.dismiss; this.props.navigation.goBack()}} name='arrow-back' />
                        </Button>
                    </Left>

                    <Body style = {styles.title}>
                        <Title> Edit </Title>
                    </Body>
                
                    <Right style = {{flex: 1}}>
                        <Button transparent>
                            <Icon onPress = {()=> {Keyboard.dismiss; this.editProfile()}} name='md-checkmark' />
                        </Button>
                    </Right>
                </Header>

                <ScrollView>

                    <View style = {styles.form}>

                        <Text style = {styles.inputFieldLabels}> Hospital's name</Text>
                        <TextInput style={styles.inputBoxNormal} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            defaultValue= {this.state.name}
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
                        <TextInput style={styles.inputBoxNormal} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            defaultValue= {this.state.district}
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            autoCapitalize={'sentences'}
                            onChangeText={(text) =>{this.setState({district: text});}}
                        />

                        <Text style = {styles.inputFieldLabels}> Address</Text>
                        <TextInput style={styles.inputBoxNormal} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            defaultValue= {this.state.address}
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            autoCapitalize = {'sentences'}
                            onChangeText={(text) =>{this.setState({address: text});}}
                        />

                        <Text style = {styles.inputFieldLabels}> Phone</Text>
                        <TextInput style={styles.inputBoxNormal} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            defaultValue= {this.state.phone}
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            keyboardType = 'numeric'
                            onChangeText={(text) =>{this.setState({phone: text});}}
                        />

                        <Text style = {styles.inputFieldLabels}> E-mail</Text>
                        <TextInput style={styles.inputBoxNormal} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            defaultValue= {this.state.email}
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            keyboardType = 'email-address'
                            autoCapitalize = {'none'}
                            onChangeText={(text) =>{this.setState({email: text});}}
                        />

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
                         <Button primary onPress={()=> this.props.navigation.navigate('LocateOnMap',{self: this}) }>
                            <Text>
                                Change Your Map Position 
                            </Text>
                        </Button>

                    </View>

                </ScrollView>

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