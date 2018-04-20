import React from 'react'
import {Container,Text, List, ListItem, Header, Left, Body, Right, Title, Button, Icon,Form,Input,Item,H1,H2,H3,Toast,Fab} from 'native-base';
import {StyleSheet, View, ScrollView, StatusBar} from 'react-native'

import { AuthService } from '../../services/auth'

export class BloodRequestDetails extends React.Component
{

    constructor(props){
        super(props);
        const { params } = this.props.navigation.state;

        this.state = {
            hospital: params.id,
            title: params.br.title,
            content: params.br.details,
            bloodTypes: params.br.bloodTypes,
            n_id: params.br.id,
            auth_service: new AuthService(),
            position: {latitude:params.br.lat,longitude: params.br.lng}

        }
    }

    updateRequest(){
        body = JSON.stringify(this.state)
        this.state.auth_service.post(body,'/notification/update')
        .then((response)=>{
            if(response.status!=200){
                this.showToast("update failed", "ok");
            }
            else{
                this.showToast("update succeeded", "ok");
                this.props.navigation.goBack();
            }
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
                        <Button transparent>
                            <Icon onPress={() => this.props.navigation.goBack()} name='arrow-back' />
                        </Button>
                    </Left>

                    <Body style = {styles.title}>
                        <Title> New Request </Title>
                    </Body>
                
                    <Right style = {{flex: 1}}>
                        <Button transparent>
                            <Icon name='home' />
                        </Button>
                    </Right>
                </Header>







         <Form style={{margin:15}}>
                <H3>Request Form</H3>
              
              <Item style={{marginTop:8}} rounded>
                        <Icon style={{color:'red'}}   active name='md-paper-plane' />
                        <Input  placeholder={this.state.title}
                            onChangeText={(text) =>{ this.setState({title: text});}}

                        />
                      </Item>
                  
                    <Item style={{marginTop:8}} rounded>
                      <Icon style={{color:'red'}}    name='md-paper-plane' />
                      <Input   
                        placeholder={this.state.content}
                        onChangeText={(text) =>{ this.setState({content: text});}}

                      />
             
                    </Item>
                    <Item style={{marginTop:8}} rounded>
                      <Icon style={{color:'red'}}    name='md-paper-plane' />
                      <Input   
                        placeholder={this.state.bloodTypes}
                        onChangeText={(text) =>{ this.setState({bloodTypes: text});}}

                      />
             
                    </Item>


                    <Button bordered danger style={{marginTop:8}} rounded onPress={()=>{this.updateRequest()}}>
                        <Text>
                            Update Blood Request
                        </Text>
                    </Button>
         
                </Form>





            <Fab
                 onPress={()=>this.props.navigation.navigate('LocateOnMap',{self:this})}             
                containerStyle={{ }}
                style={{ backgroundColor: 'red' }}
                position="bottomRight">
                <Icon name="pin" />
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