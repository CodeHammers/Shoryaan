import React from 'react'
import {Container,Text, List, ListItem, Header, Left, Body, Right, Title, Button, Icon,Form,Input,Item,H1,H2,H3,Toast} from 'native-base';
import {StyleSheet, View, ScrollView, StatusBar} from 'react-native'

import { AuthService } from '../../services/auth'

export class BloodRequestForm extends React.Component
{

    constructor(props){
        super(props);
        const { params } = this.props.navigation.state;

        this.state = {
            hospital: params.id,
            title:'',
            content:'',
            bloodTypes:'',
            auth_service: new AuthService(),
            position: null

        }
    }

    submitRequest(){
        body = JSON.stringify(this.state)
        this.state.auth_service.post(body,'/notification/create')
        .then((response)=>{
            if(response.status!=200){
                this.showToast("Creation failed", "ok");
            }
            else{
                this.showToast("Creation succeeded", "ok");
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
                        <Input  placeholder='Dsiplay Title'
                            onChangeText={(text) =>{ this.setState({title: text});}}

                        />
                      </Item>
                  
                    <Item style={{marginTop:8}} rounded>
                      <Icon style={{color:'red'}}    name='md-paper-plane' />
                      <Input   
                        placeholder='Content Details'
                        onChangeText={(text) =>{ this.setState({content: text});}}

                      />
             
                    </Item>
                    <Item style={{marginTop:8}} rounded>
                      <Icon style={{color:'red'}}    name='md-paper-plane' />
                      <Input   
                        placeholder='Blood Type(s) Needed'
                        onChangeText={(text) =>{ this.setState({bloodTypes: text});}}

                      />
             
                    </Item>


                    <Button bordered danger style={{marginTop:8}} rounded onPress={()=>{this.submitRequest()}}>
                        <Text>
                            Make Blood Request
                        </Text>
                    </Button>
                    <Button bordered  style={{marginTop:8}} danger onPress={()=>this.props.navigation.navigate('LocateOnMap',{self:this})}>
                    <Text>
                        Map
                    </Text>
                </Button>
                </Form>










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