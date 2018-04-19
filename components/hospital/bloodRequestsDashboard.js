import React from 'react'
import {Container,Text, List, ListItem, Header, Left, Body, Right, Title, Button, Icon} from 'native-base';
import {StyleSheet, View, ScrollView, StatusBar} from 'react-native'

import { AuthService } from '../../services/auth'


export class BloodRequestsDashboard extends React.Component
{

    constructor(props) {
      super(props);
      const { params } = this.props.navigation.state;

      this.state = {
        id: params.id,
        bloodRequests: [],
        auth_service: new AuthService()

      };
      this.getRequests()
    }

    getRequests(){
        body = JSON.stringify(this.state)
        this.state.auth_service.post(body,'/notification/index')
        .then((respons)=> { return respons.json() } )
        .then((res_json)=>{
            this.setState({bloodRequests: res_json })
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
                        <Title> REQUESTS </Title>
                    </Body>
                
                    <Right style = {{flex: 1}}>
                        <Button transparent>
                            <Icon name='home' />
                        </Button>
                    </Right>
                </Header>



                  <List dataArray={this.state.bloodRequests} renderRow={(arrayholder) =>
                        <ListItem avatar button={true} >
                            <Left>
                                <Thumbnail source={require('../../hos.png')} />
                            </Left>
                            <Body>
                                <Text style={styles.listitemname}>{arrayholder.title}</Text>
                                <Text style={styles.StatePickerItem} note>{arrayholder.details}</Text>
                            </Body>
                            <Right>
                                <Text style={styles.StatePickerItem} note>{'|^--^|'}</Text>
                            </Right>
                        </ListItem>
                    }>
                    </List>





                 <Text> This is a placeholding page where the blood requests dashboard shall go</Text>
                <Button bordered danger onPress={()=>this.props.navigation.navigate('BloodRequestForm',{id:this.state.id})}>
                    <Text>
                        Make Blood Request
                    </Text>
                </Button>
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