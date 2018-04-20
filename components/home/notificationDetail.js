import React from 'react'
import {Container,Text, List, ListItem, Header, Left, Body, Right, Title, Button, Icon,H1,H2,H3} from 'native-base';
import {StyleSheet, View, ScrollView, StatusBar} from 'react-native'

export class NotificationDetail extends React.Component
{
    constructor(props){
        super(props)
        const { params } = this.props.navigation.state;
        this.state = {
            title: params.title,
            details: params.details,
            bloodTypes: params.bloodTypes
        }
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
                        <Title> Details </Title>
                    </Body>
                
                    <Right style = {{flex: 1}}>
                        <Button transparent>
                            <Icon name='home' />
                        </Button>
                    </Right>
                </Header>
                 <H3>Request Details</H3>
                 <Text> Title: <Text note>{this.state.title}</Text> </Text> 
                 <Text> details: <Text note>{this.state.details}</Text> </Text> 
                 <Text> Needed Blood Types: <Text note>{this.state.bloodTypes}</Text> </Text> 

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