import React from 'react'
import {Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Toast} from 'native-base'
import {StatusBar,StyleSheet,AsyncStorage,ScrollView,TextInput, View} from 'react-native'

import {AuthService} from '../../services/auth'
import {ValidateService} from '../../services/validate'
import I18n, { getLanguages } from 'react-native-i18n';

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

            validator: new ValidateService(this),

            languages:""

        }

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

    /** A function that checks that the new password matches the confirmed password */
    checkForm(){
        if(this.newPassword == this.confirmedPassword) {
            return true;
        }
        else {
            return false;
        }
    }

    /** A function that sends a request to the API to reset the user password */
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

    /** A function that renders the view */
    render(){
        return(
            <Container style = {styles.form}>
                <Header style = {styles.header} noShadow =  {true} androidStatusBarColor={'#D32F2F'}>
                    <Left style = {{flex: 1}}>

                            <Icon name='arrow-back' style={{color:'white'}}  onPress={() => this.props.navigation.goBack()}/>
                 
                    </Left>

                    <Body style = {styles.title}>
                        <Title> Password </Title>
                    </Body>
                
                    <Right style = {{flex: 1}}>
                        
                            <Icon name='md-checkmark' style={{color:'white'}}  onPress={() => this.editPassword()} />
                  
                    </Right>
                </Header>

                <ScrollView>
                    <View style = {styles.form}>
                        <Text style = {styles.inputFieldLabels}>
                         { this.state.languages.includes('ar') ?  I18n.t('Old password') : 'Old password'}
                         </Text>
                        <TextInput style={styles.inputBox} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder= {this.state.languages.includes('ar') ?   I18n.t("Enter your old password") : 'Enter your old password'}
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            secureTextEntry = {true}
                            autoCapitalize = 'none'
                            onChangeText={(text) =>{this.setState({oldPassword: text});}}
                        />

                        <Text style = {styles.inputFieldLabels}> { this.state.languages.includes('ar') ?  I18n.t('New password') : 'New password'}</Text>
                        <TextInput style={styles.inputBox} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder= { this.state.languages.includes('ar') ?  I18n.t("Enter your new password, minimum of 8 characters") : "Enter your new password, minimum of 8 characters"}
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            secureTextEntry = {true}
                            autoCapitalize = 'none'
                            onChangeText={(text) =>{this.setState({newPassword: text});}}
                        />

                        <Text style = {styles.inputFieldLabels}> { this.state.languages.includes('ar') ?  I18n.t('Confirm password') : 'Confirm password'}</Text>
                        <TextInput style={styles.inputBox} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder= {  this.state.languages.includes('ar') ?  I18n.t("Re-enter your new password, please don't copy it") : "Re-enter your new password, please don't copy it"}
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

I18n.fallbacks = true;

I18n.translations = {
    'en': require('../../locales/en'),
    'ar-EG': require('../../locales/ar')
};