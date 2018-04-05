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

            auth_service: new AuthService(this)
        }

        this.getViewData();
    }  

    getViewData(){
        this.checkStoredToken().then(
            ()=>{this.getHospitalData()}
        )
    }

   checkStoredToken(){
        return AsyncStorage.getItem("access_token").then((value) => {
            if(value!=undefined){
                this.setState({access_token:value})
            }  
        })
    }

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
                        status: resJSON[0].status
                    })
                })
            }
        })
    }
    
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
