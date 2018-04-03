import React from 'react'
import {Container,Text, List, ListItem, Header, Left, Body, Right, Title, Button, Icon, Toast, Thumbnail} from 'native-base';
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

    getHospitalData(){
        body = JSON.stringify({
            access_token: this.state.access_token
        })
        this.state.auth_service.post(body,'/hospital/user_hospitals')
        .then((response)=>{
            if(response.status!=200){
                this.showToast("Data fetching failed", "ok");
            }
            else{
                response.json().then((res_json) =>{
                    this.setState({
                        name: res_json[0].name,
                        state: res_json[0].state,
                        district: res_json[0].district,
                        address: res_json[0].address,
                        phone: res_json[0].phone,
                        email: res_json[0].email,
                        isVerified: res_json[0].isVerified,
                        status: res_json[0].status
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
                            <Icon onPress={() => this.props.navigation.goBack()} name='arrow-back' />
                        </Button>
                    </Left>

                    <Body style = {styles.title}>
                        <Title> HOSPITAL </Title>
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
                                <Text style = {styles.listItemLabel}>Name:{" "}</Text>
                                <Text style = {styles.listItemData}>{this.state.name}</Text>
                            </ListItem>

                            <ListItem>
                                <Text style = {styles.listItemLabel}>State:{" "}</Text>
                                <Text style = {styles.listItemData}>{this.state.state}</Text>
                            </ListItem>
                            
                            <ListItem>
                                <Text style = {styles.listItemLabel}>District:{" "}</Text>
                                <Text style = {styles.listItemData}>{this.state.district}</Text>
                            </ListItem>

                            <ListItem>
                                <Text style = {styles.listItemLabel}>Address:{" "}</Text>
                                <Text style = {styles.listItemData}>{this.state.address}</Text>
                            </ListItem>

                            <ListItem>
                                <Text style = {styles.listItemLabel}>Phone:{" "}</Text>
                                <Text style = {styles.listItemData}>{this.state.phone}</Text>
                            </ListItem>

                            <ListItem>
                                <Text style = {styles.listItemLabel}>E-mail:{" "}</Text>
                                <Text style = {styles.listItemData}>{this.state.email}</Text>
                            </ListItem>

                            <ListItem>
                                <Text style = {styles.listItemLabel}>Status:{" "}</Text>
                                <Text style = {styles.listItemData}>{this.state.status}</Text>
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

    listItemLabel:{
        fontSize: 20, 
        color:'#212121'
    },

    listItemData:{
        fontSize: 20, 
        color:'#757575',
        flex: 1
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
