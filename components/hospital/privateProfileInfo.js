import React from 'react'
import {Container,Text, List, ListItem, Header, Left, Body, Right, Title, Button, Icon, Thumbnail} from 'native-base';
import {StyleSheet, View, ScrollView, StatusBar, AsyncStorage} from 'react-native'

import {AuthService} from '../../services/auth'

export class PrivateProfileInfo extends React.Component
{
    constructor(props){
        super(props);

        this.state = {
            name: "",
            state: "",
            district: "",
            address: "",
            phone: "",
            email: "",
            isVerified: undefined,
            status: "",
            access_token: "",

            auth_service: new AuthService(this) //instance from an authentication service
        }

        this.getViewData(); //Get the view related data.
    }  

    /** A function that retrieves the user data on two steps, first get the access token from the mobile cache
       and then call function to get the user data */
    getViewData(){
        this.checkStoredToken().then(
            ()=>{this.getHospitalData()}
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

    /** A function that sends a request to retreive the hospital data that's managed by the currently logged in user */
    getHospitalData(){
        body = JSON.stringify({
            access_token: this.state.access_token
        })
        this.state.auth_service.post(body,'/hospital/user_hospitals')
        .then((response)=>{
            if(response.status!=200){
               alret("Can't connect to server");
            }
            else{
                response.json().then((resJSON) =>{
                    this.setState({
                        name: resJSON[0].name,
                        state: resJSON[0].state,
                        district: resJSON[0].district,
                        address: resJSON[0].address,
                        phone: resJSON[0].phone,
                        email: resJSON[0].email,
                        isVerified: resJSON[0].isVerified,
                        status: resJSON[0].status,

                        position: null                      

                    })
                })
            }
        })
    }
    
    /** A function that handles the navigation from the private profile view to the editing view */
    navgiateToEdit(){
        this.props.navigation.navigate('EditHospitalPrivateProfile', {
            name: this.state.name,
            state: this.state.state,
            district: this.state.district,
            address: this.state.address,
            phone: this.state.phone,
            email: this.state.email,
            isVerified: this.state.isVerified,
            status: this.state.status,
            self: this
        })
    }
    
    /** A function that renders the actual the view on the screen */
    render(){
        return(
            <Container style = {styles.form}>
                <Header style = {styles.header} noShadow =  {true} androidStatusBarColor={'#D32F2F'}>
                    <Left style = {{flex: 1}}>
                        <Button transparent>
                            <Icon onPress={() => {this.props.navigation.navigate('Home')}} name='arrow-back' />
                        </Button>
                    </Left>

                    <Body style = {styles.title}>
                        <Title> Hospital </Title>
                    </Body>
                
                    <Right style = {{flex: 1}}>
                        <Button transparent>
                            <Icon onPress={() => this.navgiateToEdit()} name='md-create' />
                        </Button>
                    </Right>
                </Header>

                <View style = {styles.section}>
                    <Thumbnail style = {{width: 70, height: 70}} round source={require('../../hos.png')} />
                
                    <Text style = {styles.nameText}> {this.state.name} </Text>
                        
                    <Text style={{color:'white', paddingTop: 5}}>  
                        <Icon name = 'pin' style = {styles.icon} />
                        {" "}{this.state.state}, Egypt
                    </Text>
                </View>

                <View style={{ borderBottomColor: '#BDBDBD', borderBottomWidth: 3 }}/>

                <ScrollView>

                    <View style = {styles.mainList}>
                 

                        <List>

                            <ListItem>
                                <Text>Name:{" "}</Text>
                                <Text note>{this.state.name}</Text>
                            </ListItem>

                            <ListItem>
                                <Text>State:{" "}</Text>
                                <Text note>{this.state.state}</Text>
                            </ListItem>
                            
                            <ListItem>
                                <Text style = {styles.listItemLabel}>District:{" "}</Text>
                                <Text note>{this.state.district}</Text>
                            </ListItem>

                            <ListItem>
                                <Text>Address:{" "}</Text>
                                <Text note>{this.state.address}</Text>
                            </ListItem>

                            <ListItem>
                                <Text>Phone:{" "}</Text>
                                <Text note>{this.state.phone}</Text>
                            </ListItem>

                            <ListItem>
                                <Text>E-mail:{" "}</Text>
                                <Text note>{this.state.email}</Text>
                            </ListItem>

                            <ListItem last>
                                <Text>Status:{" "}</Text>
                                <Text note>{this.state.status}</Text>
                            </ListItem>

                        </List>

                        {
                            this.state.position == null &&
                            (

                                <Button primary onPress={()=> this.props.navigation.navigate('LocateOnMap',{self: this}) }>
                                    <Text>
                                        Locate Your Hospital on Map
                                    </Text>
                                </Button>

                            )
                        }
                

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

    mainList:{
        backgroundColor:'#FFFFFF'
    },

    icon:{
        color: 'white',
        fontSize: 20
    },

    nameText:{
        color:'white',
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 5
    },

    section: {
        height: 140,
        backgroundColor:'#F44336',
        alignItems: 'center',
    }
})
