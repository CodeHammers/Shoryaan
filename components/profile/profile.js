import React from 'react'
import {View} from 'react-native'
import {Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Thumbnail, List, ListItem} from 'native-base';
import {StatusBar, StyleSheet, AsyncStorage, ScrollView} from 'react-native'

import {AuthService} from '../../services/auth'
import I18n, { getLanguages } from 'react-native-i18n';

export class Profile extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            username: "",
            email: "",
            state: "",
            city: "",
            name: "",
            bloodType: "?",
            nextDonation: "60",  //currently hardcoded
            gender: "",
            dateOfBirth: "",

            access_token: '',
            auth_service: new AuthService(this), //instance from an authentication service
            languages:""

        }

        //Retrieve the view need data.
        this.getViewData();
    }

    componentWillMount() {
        getLanguages().then(languages => {
            this.setState({ languages: languages });
            //alert(languages)
        });
    }

    /** A function that retrieves the user data on two steps, first get the access token from the mobile cache
       and then call function to get the user data */
    getViewData(){
        this.checkStoredToken().then(
            ()=>{this.getUserData()}
        )
    }

    /** A function that retrieves that access token from the mobile's cache */
    checkStoredToken(){
        return AsyncStorage.getItem("access_token").then((value) => {
            if(value!=undefined){
                this.setState({access_token:value})
            }  
        })
    }

    /** A function that retrieves the user data from the database */
    getUserData(){
        body = JSON.stringify({
            access_token: this.state.access_token
        })
        this.state.auth_service.post(body,'/auth/me')
        .then((response) => {
            if(response.status != 200){
                alert("Can't connect to server")
            }
            else{
                response.json().then((resJSON) =>{

                    this.setState({
                        username: resJSON.username,
                        state: resJSON.state,
                        city: resJSON.city,
                        name: resJSON.name,
                        bloodType: resJSON.bloodtype || "?",
                        gender: resJSON.gender,
                        dateOfBirth: resJSON.dateOfBirth,
                        email: resJSON.email,
                        position: {latitude: resJSON.lat,longitude: resJSON.lng}
                    })

                })
            }
        })
    }
    
    /** An adpater function to reformat the blood type for proper representation, eg.turns + into +ve */
    convertBloodTypeSign(){
        var bloodType = this.state.bloodType;

        if(bloodType == '?') return "";
        else{
            if(bloodType[bloodType.length - 1] == '+'){
                return "+ve";
            }else{
                return "-ve";
            }
        }
    }

    /** A function to extract the blood group letter from a string */
    convertBloodType(){
        var bloodType = this.state.bloodType;

        if(bloodType == '?') return "?"
        else return bloodType.slice(0,-1);
    }

    /** A function that handles the data transaction between the profile and the edit profile views */
    navgiateToEdit(){
        this.props.navigation.navigate('EditProfile', {
            username:this.state.username,
            state: this.state.state,
            city: this.state.city,
            name: this.state.name,
            bloodType: this.state.bloodType,
            gender: this.state.gender,
            dateOfBirth: this.state.dateOfBirth ,
            position: this.state.position,
            self: this
        })
    }

    /** A function that renders the actual view on the screen */
    render(){
        return(
            <Container style = {styles.mainScreen}>
                <StatusBar translucent={false}  style = {styles.statusBar} barStyle = "light-content"/>

                <Header style = {styles.header} noShadow =  {true} androidStatusBarColor={'#D32F2F'}>
                    <Left style = {{flex: 1}}>
                    
                            <Icon name='arrow-back' style={{color:'white'}}  onPress={() => this.props.navigation.goBack()}/>
              
                    </Left>

                    <Body style = {styles.title}>
                       <Title> Profile </Title>
                    </Body>
                   
                    <Right style = {{flex: 1}}>
                  
                            <Icon name='md-create' style={{color:'white'}}  onPress={() => this.navgiateToEdit()}/>
        
                    </Right>
                </Header>

                <View style = {styles.section}>
                    <Thumbnail style = {{width: 70, height: 70}} round source={require('../../prof.png')} />
                
                    <Text style = {styles.usernameText}> {this.state.username} </Text>
                        
                    <Text style={{color:'white', paddingTop: 5}}>  
                        <Icon name = 'pin' style = {styles.icon} />
                        {" "}{this.state.state}, Egypt
                    </Text>
                </View>

                <View style={{ borderBottomColor: '#BDBDBD', borderBottomWidth: 3 }}/>

                <View style = {styles.bloodBar}>
                    <View style = {styles.bloodBarNested}>
                        <View style={{flexDirection: 'row', alignContent: 'flex-start'}}>
                            <Text style={{fontSize: 40, fontWeight: 'bold', lineHeight: 40, color: '#D32F2F', paddingLeft:25}}>{this.convertBloodType()}</Text>
                            <Text style={{fontSize: 15, lineHeight: 15, color: '#D32F2F'}}>{this.convertBloodTypeSign()}</Text>
                        </View>

                        <View style={{flexDirection: 'row', alignContent: 'flex-end'}}>
                            <Text style={{fontSize: 40, fontWeight: 'bold', lineHeight: 40, color: '#D32F2F'}}>{this.state.nextDonation}</Text>
                            <Text style={{fontSize: 15, lineHeight: 15, color: '#D32F2F', paddingRight: 15}}>
                            {this.state.languages.includes('ar') ?   I18n.t('days') : 'days' }
                            </Text>
                        </View>
                    </View>
                    
                    <View style = {styles.bloodBarSub}>
                        <View style={{flexDirection: 'row', alignContent: 'flex-start'}}>
                            <Text style={{fontSize: 18, color: '#757575'}}>
                            { this.state.languages.includes('ar') ? I18n.t('Blood Type') : 'Blood Type' }
                            </Text>
                        </View>

                        <View style={{flexDirection: 'row', alignContent: 'flex-end'}}>
                        <Text style={{fontSize: 18, color: '#757575'}}>
                            { this.state.languages.includes('ar') ? I18n.t('Next donation') : 'Next donation'}
                        </Text>
                        </View>
                    </View>
                </View>
                
                <View style={{ borderBottomColor: '#BDBDBD', borderBottomWidth: 2 }}/>

                <ScrollView>
                    <View style = {styles.mainList}>
                        <List>
                            <ListItem>
                                <Text>{ this.state.languages.includes('ar') ?  I18n.t('Username') :'Username' }:{" "}</Text>
                                <Text note>{this.state.username}</Text>
                            </ListItem>

                            <ListItem>
                                <Text>{this.state.languages.includes('ar') ?  I18n.t('E-mail') : 'E-mail'}:{" "}</Text>
                                <Text note>{ this.state.email}</Text>
                            </ListItem>

                            <ListItem>
                                <Text>{ this.state.languages.includes('ar') ?  I18n.t('Name') : 'Name' }:{" "}</Text>
                                <Text note>{this.state.name}</Text>
                            </ListItem>

                            <ListItem>
                                <Text>{ this.state.languages.includes('ar') ?  I18n.t('State') : 'State'}:{" "}</Text>
                                <Text note>{this.state.state}</Text>
                            </ListItem>

                            <ListItem>
                                <Text>{ this.state.languages.includes('ar') ?  I18n.t('City') : 'City'}:{" "}</Text>
                                <Text note>{this.state.city}</Text>
                            </ListItem>

                            <ListItem>
                                <Text>{ this.state.languages.includes('ar') ?  I18n.t('Gender') : 'Gender'}:{" "}</Text>
                                <Text note>{this.state.gender}</Text>
                            </ListItem>

                            <ListItem last>
                                <Text>{ this.state.languages.includes('ar') ?  I18n.t('Date of birth'): 'Date of birth'}:{" "}</Text>
                                <Text note>{this.state.dateOfBirth}</Text>
                            </ListItem>

                        </List>
                    </View>
                </ScrollView>
                
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

    usernameText:{
        color:'white',
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 5
    },

    icon:{
        color: 'white',
        fontSize: 20
    },

    bloodBar:{
        flexDirection: 'column',
        backgroundColor:'#FFFF',
        height: 80
    },

    bloodBarNested:{
        flex: 1, 
        flexDirection: 'row', 
        paddingTop: 15, 
        paddingLeft: 10, 
        paddingRight: 10, 
        paddingBottom: 5,
        justifyContent: 'space-between'
    },

    bloodBarSub:{
        height: 30,
        flexDirection: 'row', 
        paddingLeft: 10, 
        paddingRight: 10, 
        paddingBottom: 5,
        justifyContent: 'space-between'
    },

    section: {
      height: 140,
      backgroundColor:'#F44336',
      alignItems: 'center',
    },

    mainList:{
        backgroundColor:'#FFFFFF'
    }
})

I18n.fallbacks = true;

I18n.translations = {
    'en': require('../../locales/en'),
    'ar-EG': require('../../locales/ar')
};