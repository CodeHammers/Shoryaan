import React from 'react'
import {Container,Text, List, ListItem, Header, Left, Body, Right, Title, Button, Icon,H1,H2,H3} from 'native-base';
import {StyleSheet, View, ScrollView, StatusBar} from 'react-native'

import MapView from 'react-native-maps';

import I18n, { getLanguages } from 'react-native-i18n';

export class NotificationDetail extends React.Component
{
    constructor(props){
        super(props)
        const { params } = this.props.navigation.state;
        this.state = {
            title: params.title,
            details: params.details,
            bloodTypes: params.bloodTypes,
            lng: params.lng,
            lat: params.lat,
            region: {
                latitude: 26.78825,
                longitude: 30.4324,
                latitudeDelta: 10.0922,
                longitudeDelta: 10.0421,
              },
        }
    }

    componentWillMount() {
        getLanguages().then(languages => {
            this.setState({ languages: languages });
            //alert(languages)
        });
    }

    /** A function that renders the actual view */
    render(){
        return(
            <Container style = {styles.form}>
                <Header style = {styles.header} noShadow =  {true} androidStatusBarColor={'#D32F2F'}>
                    <Left style = {{flex: 1}}>
      
                        <Icon name='arrow-back' style={{color:'white'}}  onPress={() => this.props.navigation.goBack()} />
    
                    </Left>

                    <Body style = {styles.title}>
                        <Title> Details </Title>
                    </Body>
                
                    <Right style = {{flex: 1}}>
                 
                        <Icon name='home' style={{color:'white'}} />
               
                    </Right>
                </Header>
                <View style={{flex:.5}}>
                 <H3>{I18n.t('Request Details')}</H3>
                 <Text> {I18n.t('Title')}: <Text note>{this.state.title}</Text> </Text> 
                 <Text> {I18n.t('details')}: <Text note>{this.state.details}</Text> </Text> 
                 <Text> {I18n.t('Needed Blood Types')}: <Text note>{this.state.bloodTypes}</Text> </Text> 
                </View>

                <View  style={{flex:.5}}>

                    <MapView style={{flex:1}}
                        region={this.state.region}
                        onRegionChange={this.onRegionChange}
                    >

                    <MapView.Marker
                            coordinate={  {latitude: this.state.lat || 44,longitude: this.state.lng || 11} }
                            title={this.state.title}
                            description={this.state.description}
                            />

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
    'en': require('../../locales/en'),
    'ar-EG': require('../../locales/ar')
};