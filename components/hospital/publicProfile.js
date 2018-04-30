import React from 'react'
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Tabs, Tab} from 'native-base';
import {StatusBar,StyleSheet} from 'react-native'

import {HospitalPublicProfileInfo} from './hospitalInfo'

export class HospitalPublicProfile extends React.Component
{
    constructor(props)
    {
        super(props);

        //Receive the parameters passed in from the search view
        const { params } = this.props.navigation.state;

        if(params != undefined || params == null)
            this.state = {
                name: params.name,
                state: params.state,
                district: params.district,
                address: params.address,
                phone: params.phone,
                email: params.email,
                isVerified: params.isVerified,
                status: params.status
        };
    }

    /** A function that renders that actual view on the screen */
    render(){
        return(
            <Container>
                
                <StatusBar translucent={false}  style = {styles.statusBar} barStyle = "light-content"/>

                <Header hasTabs style = {styles.header} noShadow =  {true} androidStatusBarColor={'#D32F2F'}>
                    <Left style = {{flex: 1}}>
                        
                            <Icon name='arrow-back'  style={{color:'white'}} onPress={() => this.props.navigation.goBack()} />
            
                    </Left>

                    <Body style = {styles.title}>
                        <Title> Hospital </Title>
                    </Body>
                   
                    <Right style = {{flex: 1}}>
                       
                            <Icon name='search'   style={{color:'white'}}  />
              
                    </Right>
                </Header>
                
                <Tabs  initialPage={0}>
                    <Tab tabStyle = {styles.inactiveTabStyle} textStyle = {styles.inactiveTabTextStyle} 
                        activeTabStyle = {styles.activeTabStyle} activeTextStyle = {styles.activeTabTextStyle} heading="Profile">
                        <HospitalPublicProfileInfo data = {this.state}/>
                    </Tab>

                    <Tab tabStyle = {styles.inactiveTabStyle} textStyle = {styles.inactiveTabTextStyle} 
                        activeTabStyle = {styles.activeTabStyle} activeTextStyle = {styles.activeTabTextStyle} heading="Blood requests">
                    </Tab>
                </Tabs>

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

    inactiveTabStyle:{
        backgroundColor: '#F44336'
    },

    inactiveTabTextStyle:{
        color: '#FFFF'
    },

    activeTabStyle:{
        backgroundColor: '#F44336'
    },

    activeTabTextStyle:{
        color: '#FFFF'
    }
})