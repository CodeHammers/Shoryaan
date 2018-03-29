import React from 'react'
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Tabs, Tab} from 'native-base';
import {StatusBar,StyleSheet} from 'react-native'

import {HospitalPublicProfileInfo} from './hospitalInfo'

export class HospitalPublicProfile extends React.Component
{
    render(){
        return(
            <Container>
                
                <StatusBar translucent={false}  style = {styles.statusBar} barStyle = "light-content"/>

                <Header hasTabs style = {styles.header} noShadow =  {true} androidStatusBarColor={'#D32F2F'}>
                    <Left style = {{flex: 1}}>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>

                    <Body style = {styles.title}>
                       <Title> HOSPITAL </Title>
                    </Body>
                   
                    <Right style = {{flex: 1}}>
                        <Button transparent>
                            <Icon name='search' />
                        </Button>
                    </Right>
                </Header>
                
                <Tabs  initialPage={0}>
                    <Tab tabStyle = {styles.inactiveTabStyle} textStyle = {styles.inactiveTabTextStyle} 
                        activeTabStyle = {styles.activeTabStyle} activeTextStyle = {styles.activeTabTextStyle} heading="Profile">
                        <HospitalPublicProfileInfo/>
                    </Tab>

                    <Tab tabStyle = {styles.inactiveTabStyle} textStyle = {styles.inactiveTabTextStyle} 
                        activeTabStyle = {styles.activeTabStyle} activeTextStyle = {styles.activeTabTextStyle} heading="Blood requests">
                    </Tab>
                </Tabs>

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