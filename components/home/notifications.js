import React from 'react'
import {Container,Text, List, ListItem, Header, Left, Body, Right, Title, Button, Icon,Thumbnail,H3} from 'native-base';
import {StyleSheet, View, ScrollView, StatusBar,AsyncStorage} from 'react-native'

import {AuthService} from '../../services/auth'

import MapView from 'react-native-maps';
import I18n, { getLanguages } from 'react-native-i18n';

export class Notifications extends React.Component
{

    constructor(props){
        super(props)
        this.state ={
            notifications:[],
            auth_service: new AuthService(this),
            languages:""
        }
        this.getViewData();

    }


    /** 
     * A function that retrieves the user data on two steps, first get the access token from the mobile cache
     * and then call function to get the user data 
    */
    getViewData(){
        this.checkStoredToken().then(
            ()=>{this.getUserData()}
        )
    }

    componentWillMount() {
        getLanguages().then(languages => {
            this.setState({ languages: languages });
            //alert(languages)
        });
    }

    /**
     *  A function that retrieves that access token from the mobile's cache 
     */
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
                alert("Something went wrong, try again")
            }
            else{
                response.json().then((resJSON) =>{
                    this.setState({bloodType: resJSON.bloodtype || "?"})
                    this.getRequests(resJSON.bloodtype)
                })
            }
        })
    }

    getRequests(bt){
        body = JSON.stringify({bloodtype: bt})
        this.state.auth_service.post(body,'/notification/index')
        .then((res)=> { return res.json() } )
        .then((res_json)=>{
            this.setState({notifications: res_json })
        })
    }

    /** 
     * A function that renders the actual view 
    */
    render(){
        return(
            <Container style = {styles.form}>
                <Header style = {styles.header} noShadow =  {true} androidStatusBarColor={'#D32F2F'}>
                    <Left style = {{flex: 1}}>
                            <Icon name='arrow-back' onPress={() => this.props.navigation.goBack()}  style={{color:'white'}} />
              
                    </Left>

                    <Body style = {styles.title}>
                        <Title> Notifications </Title>
                    </Body>
                
                    <Right style = {{flex: 1}}>
      
                        <Icon name='home' style={{color:'white'}}  />

                    </Right>
                </Header>

                <View >

                    <H3>{ this.state.languages.includes('ar') ?  I18n.t('Notifications') : 'Notifications' }</H3>
                    <List dataArray={this.state.notifications} renderRow={(arrayholder) =>
                        <ListItem avatar button={true}  
                        onPress={() => {this.props.navigation.navigate('NotificationDetail',arrayholder) }}>
                            <Left>
                                <Thumbnail source={require('../../hos.png')} />
                            </Left>
                            <Body>
                                <Text s>{arrayholder.title}</Text>
                                <Text  note>{arrayholder.bloodTypes}</Text>
                            </Body>
                            <Right>
                            <Icon style={styles.StatePickerItem} style ={ arrayholder.lng  ? {color: 'red'}: {}  }  name='pin'></Icon>
                            </Right>
                        </ListItem>
                    }>
                    </List>

                </View>

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
    }
})

I18n.fallbacks = true;

I18n.translations = {
    'en': require('../../locales/en'),
    'ar-EG': require('../../locales/ar')
};