import React from 'react'
import {Container,Text, List, ListItem, Header, Left, Body, Right, Title, Button, Icon,Form,Input,Item,H1,H2,H3} from 'native-base';
import {StyleSheet, View, ScrollView, StatusBar} from 'react-native'

export class BloodRequestForm extends React.Component
{

    constructor(props){
        super(props);

        this.state = {
            title:'',
            content:'',
            bloodTypes:''
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


                    <Button bordered danger style={{marginTop:8}} rounded>
                        <Text>
                            Make Blood Request
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