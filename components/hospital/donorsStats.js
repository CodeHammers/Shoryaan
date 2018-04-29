import React from 'react'
import {Container,Text, List, ListItem, Header, Left, Body, Right, Title, Button, Icon,Form,Input,Item,H1,H2,H3,Toast,Fab,Thumbnail,Badge} from 'native-base';
import {StyleSheet, View, ScrollView, StatusBar} from 'react-native'

import { AuthService } from '../../services/auth'

import MapView from 'react-native-maps';

import I18n, { getLanguages } from 'react-native-i18n';




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
            auth_service: new AuthService(),
            donors: [],
            btStats:{},
            bloodTypes:  ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-','?'],

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
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
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
                <H3>  {I18n.t('Blood Diversity')}  </H3>


            
                <View style={{flex:.5}}>
                    <List>
                    {this.state.bloodTypes.map((item, index) => {
                        if(this.state.btStats[item]==undefined)
                            return ;
                        return (      
                        <ListItem>
                            <Body>
                                <Text>{item}</Text>
                                <Text note>{'hello'}</Text>
                            </Body>
                            <Right>
                                <Badge>
                                <Text >{this.state.btStats[item]}</Text>
                                </Badge>
                            </Right>
                        </ListItem>          
                        ) 
                    })}
                    </List>

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

I18n.fallbacks = true;

I18n.translations = {
 
  'ar': require('../../locales/ar'),
 
};