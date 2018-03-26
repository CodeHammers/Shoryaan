import React from 'react'
import {View,Image} from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,Fab , Card, CardItem,Thumbnail,List,ListItem} from 'native-base';
import {ImageBackground,StatusBar,StyleSheet,AsyncStorage,ScrollView} from 'react-native'
import {H3,Input,Toast,Item,Label,Picker} from 'native-base'

export class Profile extends React.Component
{
    //Add props and state

    render(){
        return(
            <Container>
                <StatusBar style = {styles.statusBar} barStyle = "light-content"/>

                <Header style = {styles.header} noShadow =  {true} androidStatusBarColor={'#D32F2F'}>
                    <Left style = {{flex: 1}}>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>

                    <Body style = {styles.title}>
                       <Title> PROFILE </Title>
                    </Body>
                   
                    <Right style = {{flex: 1}}>
                        <Button transparent>
                        <Icon name='md-create' />
                        </Button>
                    </Right>
                </Header>

                <View style = {styles.section}>
                    <Thumbnail style = {{width: 70, height: 70}} round source={require('../../images/profile/pp.png')} />
                
                    <Text style = {styles.usernameText}> 
                        Sayed Alesawy
                    </Text>
                        
                    <Text style={{color:'white', paddingTop: 5}}>  
                        <Icon name = 'pin' style = {styles.icon} />
                        {" "}Cairo, Egypt
                    </Text>
                </View>

                <View style={{ borderBottomColor: '#BDBDBD', borderBottomWidth: 3 }}/>

                <View style = {styles.bloodBar}>
                    <View style = {styles.bloodBarNested}>
                        <View style={{flexDirection: 'row', alignContent: 'flex-start'}}>
                            <Text style={{fontSize: 40, fontWeight: 'bold', lineHeight: 40, color: '#D32F2F', paddingLeft:25}}>A</Text>
                            <Text style={{fontSize: 15, lineHeight: 15, color: '#D32F2F'}}>+ve</Text>
                        </View>

                        <View style={{flexDirection: 'row', alignContent: 'flex-end'}}>
                            <Text style={{fontSize: 40, fontWeight: 'bold', lineHeight: 40, color: '#D32F2F'}}>2</Text>
                            <Text style={{fontSize: 15, lineHeight: 15, color: '#D32F2F', paddingRight: 15}}>months</Text>
                        </View>
                    </View>
                    
                    <View style = {styles.bloodBarSub}>
                        <View style={{flexDirection: 'row', alignContent: 'flex-start'}}>
                            <Text style={{fontSize: 18, color: '#757575'}}>Blood Type</Text>
                        </View>

                        <View style={{flexDirection: 'row', alignContent: 'flex-end'}}>
                        <Text style={{fontSize: 18, color: '#757575'}}>Next donation</Text>
                        </View>
                    </View>
                </View>
                
                <View style={{ borderBottomColor: '#BDBDBD', borderBottomWidth: 2 }}/>

                <ScrollView>
                    <View style = {styles.mainList}>
                        <List>
                            <ListItem>
                                <Text style = {{fontSize: 25, color:'#212121'}}>Username:{" "}</Text>
                                <Text style = {{fontSize: 20, color:'#757575'}}>Sayed Alesawy</Text>
                            </ListItem>

                            <ListItem>
                                <Text style = {{fontSize: 25, color:'#212121'}}>Name:{" "}</Text>
                                <Text style = {{fontSize: 20, color:'#757575'}}>Sayed Kotb Sayed Kotb</Text>
                            </ListItem>
                            
                            <ListItem>
                                <Text style = {{fontSize: 25, color:'#212121'}}>E-mail:{" "}</Text>
                                <Text style = {{fontSize: 20, color:'#757575'}}>sayed@shoryaan.com</Text>
                            </ListItem>

                            <ListItem>
                                <Text style = {{fontSize: 25, color:'#212121'}}>Age:{" "}</Text>
                                <Text style = {{fontSize: 20, color:'#757575'}}>20</Text>
                            </ListItem>

                            <ListItem>
                                <Text style = {{fontSize: 25, color:'#212121'}}>State:{" "}</Text>
                                <Text style = {{fontSize: 20, color:'#757575'}}>Cairo</Text>
                            </ListItem>

                            <ListItem>
                                <Text style = {{fontSize: 25, color:'#212121'}}>City:{" "}</Text>
                                <Text style = {{fontSize: 20, color:'#757575'}}>Nozha</Text>
                            </ListItem>

                            <ListItem>
                                <Text style = {{fontSize: 25, color:'#212121'}}>Gender:{" "}</Text>
                                <Text style = {{fontSize: 20, color:'#757575'}}>Male</Text>
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

    usernameText:{
        color:'white',
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 5
    },

    icon:{
        color: 'white',
        fontSize: 20
    },

    listItem:{

    },

    bloodBar:{
        flexDirection: 'column',
        backgroundColor:'#FFFF',
        height: 80
    },

    bloodBarNested:{
        flex: 1, 
        flexDirection: 'row', 
        paddingTop: 15, 
        paddingLeft: 10, 
        paddingRight: 10, 
        paddingBottom: 5,
        justifyContent: 'space-between'
    },

    bloodBarSub:{
        height: 30,
        flexDirection: 'row', 
        paddingLeft: 10, 
        paddingRight: 10, 
        paddingBottom: 5,
        justifyContent: 'space-between'
    },

    section: {
      height: 140,
      backgroundColor:'#F44336',
      alignItems: 'center',
    },

    mainList:{
        backgroundColor:'#FFFFFF'
    }
})