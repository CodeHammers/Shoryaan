import React from 'react'
import {Container,Text, List, ListItem, Header, Left, Body, Right, Title, Button, Icon,Form,Input,Item,H1,H2,H3,Toast,Fab,Thumbnail,Badge} from 'native-base';
import {StyleSheet, View, ScrollView, StatusBar} from 'react-native'

import { AuthService } from '../../services/auth'

import MapView from 'react-native-maps';



export class DonorsStats extends React.Component
{

    constructor(props){
        super(props);

        this.state = {

            region: {
                latitude: 26.78825,
                longitude: 30.4324,
                latitudeDelta: 10.0922,
                longitudeDelta: 10.0421,
              },
  
              mr: {
                  latitude: 26.78825,
                  longitude: 30.4324,
              },
  
            auth_service: new AuthService(),
            donors: [],
            btStats:{}

        }
        this.getDonors()
    }
    countTypes(donors){
        bStats={};
        for(i=0 ;i < donors.length;i++){
            if(bStats[donors[i].bloodtype] == undefined){
                bStats[donors[i].bloodtype] =1

            }
            else{
                bStats[donors[i].bloodtype]+=1;
            }
        }
        this.setState({btStats:bStats})
    }

    getDonors(){
        body = JSON.stringify(this.state)
        this.state.auth_service.post(body,'/auth/donors_public')
        .then((res)=> { return res.json() } )
        .then((res_json)=>{
            this.setState({donors: res_json })
            this.countTypes(res_json)
        })
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
    /** A function that renders the actual view */
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
                        <Title> Stats </Title>
                    </Body>
                
                    <Right style = {{flex: 1}}>
                        <Button transparent>
                            <Icon name='home' />
                        </Button>
                    </Right>
                </Header>
                <H3> Blood Diversity </H3>


            
                <View style={{flex:.5}}>


                    <Text>A+</Text>
                    <Text>{this.state.btStats['A+']}</Text>
                    <Text>AB-</Text>
                    <Text>{this.state.btStats['AB-']}</Text>

                </View>


          <View  style={{flex:.5}}>

            <MapView style={{flex:1}}
                region={this.state.region}
                onRegionChange={this.onRegionChange}
            >

                {this.state.donors.map(marker => (
                    <MapView.Marker
                    coordinate={  {latitude: marker.lat || 11,longitude: marker.lng || 11} }
                    title={'Donor'}
                    description={marker.bloodtype}
                    />
                ))}

            </MapView>
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