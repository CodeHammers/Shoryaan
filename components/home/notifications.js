import React from 'react'
import {Container,Text, List, ListItem, Header, Left, Body, Right, Title, Button, Icon,Thumbnail} from 'native-base';
import {StyleSheet, View, ScrollView, StatusBar,AsyncStorage} from 'react-native'


import {AuthService} from '../../services/auth'

export class Notifications extends React.Component
{


    constructor(props){
        super(props)
        this.state ={
            notifications:[],
            auth_service: new AuthService(this)
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
                        <Button transparent>
                            <Icon onPress={() => this.props.navigation.goBack()} name='arrow-back' />
                        </Button>
                    </Left>

                    <Body style = {styles.title}>
                        <Title> Notifications </Title>
                    </Body>
                
                    <Right style = {{flex: 1}}>
                        <Button transparent>
                            <Icon name='home' />
                        </Button>
                    </Right>
                </Header>

     
                <View>

                    <List dataArray={this.state.notifications} renderRow={(arrayholder) =>
                        <ListItem avatar button={true}  
                        onPress={() => {this.props.navigation.navigate('NotificationDetail',arrayholder) }}>
                            <Left>
                                <Thumbnail source={require('../../hos.png')} />
                            </Left>
                            <Body>
                                <Text s>{arrayholder.title}</Text>
                                <Text  note>{'date'}</Text>
                            </Body>
                            <Right>
                                <Text  note>{'private'}</Text>
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