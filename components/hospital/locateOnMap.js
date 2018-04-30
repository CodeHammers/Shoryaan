import React from 'react'
import {Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Toast} from 'native-base'
import {StatusBar,StyleSheet,AsyncStorage,ScrollView,TextInput, View} from 'react-native'

import {AuthService} from '../../services/auth'
import {ValidateService} from '../../services/validate'


import MapView from 'react-native-maps';


export class LocateOnMap extends React.Component
{
    constructor(props)
    {
        super(props);
        const { params } = this.props.navigation.state;

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
            self: params.self,

   
        }

    }


    render(){
        return(
            <Container style = {styles.form}>
                <Header style = {styles.header} noShadow =  {true} androidStatusBarColor={'#D32F2F'}>
                    <Left style = {{flex: 1}}>
                       
                        <Icon name='arrow-back' style={{color:'white'}}   onPress={() => this.props.navigation.goBack()} />
                  
                    </Left>

                    <Body style = {styles.title}>
                        <Title> Locate on Map </Title>
                    </Body>
                
                    <Right style = {{flex: 1}}>

                        <Icon style={{color:'white'}}   onPress={() =>{this.state.self.setState({position:this.state.mr});this.props.navigation.goBack()} } name='md-checkmark' />
      
                    </Right>
                </Header>

                    <View  style={{flex:1}}>

                        <MapView style={{flex:1}}
                            initialRegion={this.state.region}
                            onRegionChange={this.onRegionChange}
                        >

                            <MapView.Marker draggable
                                coordinate={this.state.mr}
                                onDragEnd={(e) => this.setState({ mr: e.nativeEvent.coordinate })}
                                title={'Your Hospital'}
                                description={''}
                            />

                        </MapView>
                        <Text style={{color:'#222'}} note>Note: You need to long press the marker to start dragging </Text>
                     </View>
            </Container>
        )
    }
}


/** 
 *Style sheet used for styling components used in the render function 
*/
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

    inputBox: {
        flexDirection: 'row',
        backgroundColor:'#ffffff',
        borderRadius: 15,
        paddingHorizontal:25,
        fontSize:16,
        color:'#757575',
        borderColor: '#757575',
        borderWidth: 2,
        marginVertical: 8,
        marginHorizontal: 10
    },

    inputFieldLabels:{
        paddingTop:5,
        paddingLeft:10,
        fontSize: 20
    }
})

