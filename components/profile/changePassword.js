import React from 'react'
import {Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Toast} from 'native-base'
import {StatusBar,StyleSheet,AsyncStorage,ScrollView,TextInput, View} from 'react-native'

import {AuthService} from '../../services/auth'
import {ValidateService} from '../../services/validate'

export class ChangeUserPassword extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            oldPassword: "",
            newPassword: "",
            confirmedPassword: "",

            access_token: '',
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

    checkForm(){
        if(this.newPassword == this.confirmedPassword) {
            return true;
        }
        else {
            return false;
        }
    }

    editPassword(){
        var correct = this.checkForm();
        if(correct == true){
            body = JSON.stringify({
                    password: this.state.oldPassword,
                    reset_password: this.state.newPassword,
                    access_token: this.state.access_token
                })
            this.state.auth_service.post(body,'/auth/resetpassword')
            .then((response)=>{
                if(response.status!=200){
                    this.setState({oldPassword:"", newPassword: "", confirmedPassword: ""});
                    this.showToast("Invalid update", "ok");
                }
                else{
                    this.showToast("update succeeded", "ok");
                    this.props.navigation.goBack();
                }
            })
        }
        else{
            this.showToast("New and confirmed passwords differ", "ok");
        }
    }

    render(){
        return(
            <Container style = {styles.form}>
                <Header style = {styles.header} noShadow =  {true} androidStatusBarColor={'#D32F2F'}>
                    <Left style = {{flex: 1}}>
                        <Button transparent>
                            <Icon onPress={() => this.props.navigation.goBack()} name='arrow-back' />
                        </Button>
                    </Left>

                    <Body style = {styles.title}>
                        <Title> PASSWORD </Title>
                    </Body>
                
                    <Right style = {{flex: 1}}>
                        <Button transparent>
                            <Icon onPress={() => this.editPassword()} name='md-checkmark' />
                        </Button>
                    </Right>
                </Header>

                <ScrollView>
                    <View style = {styles.form}>
                        <Text style = {styles.inputFieldLabels}> Old password</Text>
                        <TextInput style={styles.inputBox} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder= "Enter your old password"
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            secureTextEntry = {true}
                            autoCapitalize = 'none'
                            onChangeText={(text) =>{this.setState({oldPassword: text});}}
                        />

                        <Text style = {styles.inputFieldLabels}> New password</Text>
                        <TextInput style={styles.inputBox} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder= "Enter your new password, minimum of 8 characters"
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            secureTextEntry = {true}
                            autoCapitalize = 'none'
                            onChangeText={(text) =>{this.setState({newPassword: text});}}
                        />

                        <Text style = {styles.inputFieldLabels}> Confirm password</Text>
                        <TextInput style={styles.inputBox} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder= "Re-enter your new password, please don't copy it"
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            secureTextEntry = {true}
                            autoCapitalize = 'none'
                            onChangeText={(text) =>{this.setState({confirmedPassword: text});}}
                        />
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
    }
})