import React from 'react'
import {Container,Text, List, ListItem, Header, Left, Body, Right, Title, Button, Icon, Thumbnail} from 'native-base';
import {StyleSheet, View, ScrollView, StatusBar, AsyncStorage} from 'react-native'

import {AuthService} from '../../services/auth'

import I18n, { getLanguages } from 'react-native-i18n';


export class PrivateProfileInfo extends React.Component
{
    constructor(props){
        super(props);
        const { params } = this.props.navigation.state;

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
            id: params.id,
            auth_service: new AuthService(this), //instance from an authentication service
            languages: ""
        }

        this.getViewData(); //Get the view related data.
    }  




    componentWillMount() {
        getLanguages().then(languages => {
            this.setState({ languages: languages });
        });
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
                    h={};
                    for(i=0;i<resJSON.length;i++){
                        if(resJSON[i].id==this.state.id)
                         h=resJSON[i]
                    }


                    this.setState({
                        name: h.name,
                        state: h.state,
                        district: h.district,
                        address: h.address,
                        phone: h.phone,
                        email: h.email,
                        isVerified: h.isVerified,
                        status: h.status,

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
                     
                            <Icon name='arrow-back' style={{color:'white'}}   onPress={() => {this.props.navigation.goBack()}} />
                  
                    </Left>

                    <Body style = {styles.title}>
                        <Title> Hospital </Title>
                    </Body>
                
                    <Right style = {{flex: 1}}>
                   
                            <Icon name='md-create' style={{color:'white'}}  onPress={() => this.navgiateToEdit()} />
                   
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
                                <Text> { this.state.languages.includes('ar') ? I18n.t("Hospital name") : "Hospital name" } :{" "}</Text>
                                <Text note>{this.state.name}</Text>
                            </ListItem>

                            <ListItem>
                                <Text>State:{" "}</Text>
                                <Text note>{this.state.state}</Text>
                            </ListItem>
                            
                            <ListItem>
                                <Text style = {styles.listItemLabel}> { this.state.languages.includes('ar') ? I18n.t("District") :"District"} :{" "}</Text>
                                <Text note>{this.state.district}</Text>
                            </ListItem>

                            <ListItem>
                                <Text> { this.state.languages.includes('ar') ? I18n.t("Address") : "Address"} :{" "}</Text>
                                <Text note>{this.state.address}</Text>
                            </ListItem>

                            <ListItem>
                                <Text>{ this.state.languages.includes('ar') ? I18n.t("Phone") : "Phone"}:{" "}</Text>
                                <Text note>{this.state.phone}</Text>
                            </ListItem>

                            <ListItem>
                                <Text>{ this.state.languages.includes('ar') ? I18n.t("E-mail") : "E-mail"}:{" "}</Text>
                                <Text note>{this.state.email}</Text>
                            </ListItem>

                            <ListItem last>
                                <Text>{ this.state.languages.includes('ar') ? I18n.t("Status") : "Status"}:{" "}</Text>
                                <Text note>{this.state.status}</Text>
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
