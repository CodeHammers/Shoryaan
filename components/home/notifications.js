import React from 'react'
import {Container,Text, List, ListItem, Header, Left, Body, Right, Title, Button, Icon,Thumbnail} from 'native-base';
import {StyleSheet, View, ScrollView, StatusBar} from 'react-native'

export class Notifications extends React.Component
{


    constructor(props){
        super(props)
        this.state ={
            arrayholder:[1,2,3,4,5,6]
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
                        <Title> Notifications </Title>
                    </Body>
                
                    <Right style = {{flex: 1}}>
                        <Button transparent>
                            <Icon name='home' />
                        </Button>
                    </Right>
                </Header>

                 <Text> This is a placeholding page notifications shall go</Text>
     
                <View>

                    <List dataArray={this.state.arrayholder} renderRow={(arrayholder) =>
                        <ListItem avatar button={true}  onPress={() => {this.props.navigation.navigate('NotificationDetail') }}>
                            <Left>
                                <Thumbnail source={require('../../hos.png')} />
                            </Left>
                            <Body>
                                <Text s>{'title'}</Text>
                                <Text  note>{'date'}</Text>
                            </Body>
                            <Right>
                                <Text  note>{'private'}</Text>
                            </Right>
                        </ListItem>
                    }>
                    </List>



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