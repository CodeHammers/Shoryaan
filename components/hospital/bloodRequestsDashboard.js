import React from 'react'
import {Container,Text, List, ListItem, Header, Left, Body, Right, Title, Button, Icon,Thumbnail,Fab} from 'native-base';
import {StyleSheet, View, ScrollView, StatusBar} from 'react-native'

import { AuthService } from '../../services/auth'

import I18n, { getLanguages } from 'react-native-i18n';



export class BloodRequestsDashboard extends React.Component
{

    constructor(props) {
      super(props);
      const { params } = this.props.navigation.state;

      this.state = {
        id: params.id,
        bloodRequests: [],
        auth_service: new AuthService(),
        languages: ""

      };
      this.getRequests()
    }




    getRequests(){
        body = JSON.stringify(this.state)
        this.state.auth_service.post(body,'/notification/index')
        .then((res)=> { return res.json() } )
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
                  
                            <Icon name='arrow-back' style={{color:'white'}}  onPress={() => this.props.navigation.goBack()} />
 
                    </Left>

                    <Body style = {styles.title}>
                        <Title> Requests </Title>
                    </Body>
                
                    <Right style = {{flex: 1}}>
                 
                            <Icon name='home' style={{color:'white'}} />
             
                    </Right>
                </Header>

              <View style={{flexDirection:'row',margin:10}}>               
                <Text>  { this.state.languages.includes('ar') ? I18n.t('Blood Requests') : 'Blood Requests'} </Text>
                <Right>
                    <Button transparent onPress={()=>{this.getRequests()}}> 
                        <Icon style={{color:'red'}} name='md-sync' />
                    </Button>
                </Right>
    

                
                </View>

                <ScrollView>
                    <View>
                  <List dataArray={this.state.bloodRequests} renderRow={(arrayholder) =>
                        <ListItem avatar button={true} onPress={()=>this.props.navigation.navigate('BloodRequestDetails',{br:arrayholder,self: this})}>
                            <Left>
                                <Thumbnail source={require('../../hos.png')} />
                            </Left>
                            <Body>
                                <Text style={styles.listitemname}>{arrayholder.title}</Text>
                                <Text style={styles.StatePickerItem} note>{arrayholder.bloodTypes}</Text>
                            </Body>
                            <Right>

                                <Icon style={styles.StatePickerItem} style ={ arrayholder.lng  ? {color: 'red'}: {}  }  name='pin'></Icon>
                            </Right>
                        </ListItem>
                    }>
                    </List>




 



                    </View>

  
                    </ScrollView>
        <Fab
           onPress={()=>this.props.navigation.navigate('BloodRequestForm',{id:this.state.id,self:this})}
            containerStyle={{ }}
            style={{ backgroundColor: 'red' }}
            position="bottomRight">
            <Icon name="add" />
          </Fab>

          
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
