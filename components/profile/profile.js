import React from 'react';
import {View,Image} from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,Fab , Card, CardItem,Thumbnail} from 'native-base';
import {ImageBackground,StatusBar,StyleSheet,AsyncStorage} from 'react-native'
import {H3,Input,Toast,Item,Label,Picker} from 'native-base'
import {AuthService} from '../../services/auth'


export class Profile extends React.Component {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
          username:params.username || "unknown",
          email:params.email || "unknown",
          bloodtype: params.bloodtype || "?",
          native_username: params.username || "unknown",
          native_bloodtype: params.bloodtype || "?",
          edit_username:false,
          edit_password:false,
          edit_bloodtype:false,
          access_token: null,
          auth_service: new AuthService()
        };
        this.checkStoredToken()
    } 

    checkStoredToken(){
        AsyncStorage.getItem("access_token").then((value) => {
          if(value!=undefined){
            this.setState({access_token:value})
          }
        
      }).done();
      }
    

    edit_username(){
        if(!this.state.edit_username)
            return;

        body = JSON.stringify({
            username: this.state.username,
            bloodType: this.state.bloodtype,
            password: "protected",
            access_token: this.state.access_token
            })
        this.state.auth_service.post(body,'/auth/edit')
        .then((response)=>{
            if(response.status!=200){
                this.setState({username:this.state.native_username})
                this.showToast("Invalid update","ok")
            }
            else{
                this.setState({native_username:this.state.username})
                this.showToast("update sucess","ok")
            }
        })
    }

    edit_bloodtype(){
        if(!this.state.edit_bloodtype)
        return;

        body = JSON.stringify({
            username: this.state.username,
            bloodtype: this.state.bloodtype,
            password: "protected",
            access_token: this.state.access_token
            })
        this.state.auth_service.post(body,'/auth/edit')
        .then((response)=>{
            if(response.status!=200){
                this.setState({bloodtype:this.state.native_bloodtype})
                this.showToast("Invalid update","ok")
            }
            else{
                this.setState({native_bloodtype:this.state.bloodtype})
                this.showToast("update sucess","ok")
            }
        })
    }

    /**
     * create Toast pattern to avoid repeating code                                     
     * **********************************************************
     */
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


   /**
   * keeps track of blood type current value                                       
   * **********************************************************
   */
    onBloodTypeChanged(value) {
        this.setState({
        bloodtype: value
        });
    }
    
    render() {
        const self = this;
        return (   
            
        
            <Container>

                <View style={styles.container} >
        
                <StatusBar
                backgroundColor={'transparent'}
                barStyle="light-content"Emad
                translucent
                />
                <Header style={{backgroundColor:'transparent'}} noShadow={true} androidStatusBarColor={'transparent'}/>

                 <Thumbnail round source={require('../../hos.png')} />
                    <Text style={{color:'white'}}> {this.state.native_username}</Text>
                    <Text style={{color:'white'}}>
                    
                    <Icon name='pin' style={{color:'white'}} />
                    Cairo,Egypt
                    </Text>

                </View>
                <View style={{flex:0.65,backgroundColor:'#f5f5f5'}}>
                    <Card>
                        <CardItem>
                        <Left>
                            <Body>
                            <Text>User Name</Text>
                            <Item>
                                 <Input disabled={!this.state.edit_username} style={{color:'#888',fontSize:14}}  placeholderTextColor='#999'  
                                 placeholder={this.state.username} 
                                 onChangeText={(text) => this.setState({username: text})}
                                 />
                            </Item>
                            </Body>
                        </Left>
                        <Button transparent Right onPress={()=>{this.setState({edit_username:!this.state.edit_username});this.edit_username()}} >
                            <Text>{ !this.state.edit_username?'Edit':'Done'}</Text>
                        </Button>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                        <Left>
                            <Body>
                            <Text>E-mail</Text>
                            <Item>
                                 <Input disabled={true} style={{color:'#888',fontSize:14}}  placeholderTextColor='#999'  placeholder={this.state.email} />
                            </Item>
                            </Body>
                        </Left>
                            <Button disabled transparent Right >
                            <Text>Edit</Text>
                            </Button>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                        <Left>
                            <Body>
                            <Text>Blood Type</Text>
                            <Picker padder
                            enabled ={this.state.edit_bloodtype}
                                mode="dropdown"
                                note={false}
                                selectedValue={this.state.bloodtype}
                                onValueChange={this.onBloodTypeChanged.bind(this)}
                            >
                                <Item label="A+"  style={{fontFamily:'Foundation'}} value="A+" />
                                <Item label="A"  style={{fontFamily:'Foundation'}} value="A" />
                                <Item label="AB"  style={{fontFamily:'Foundation'}} value="AB" />
                                <Item label="O"  style={{fontFamily:'Foundation'}} value="O" />
                                <Item label="O+"  style={{fontFamily:'Foundation'}} value="O+" />
                                <Item label="?"  style={{fontFamily:'Foundation'}} value="?" />

                            </Picker>
                    
                            </Body>
                        </Left>
                        <Button transparent Right >
                            <Text onPress={()=>{this.setState({edit_bloodtype:!this.state.edit_bloodtype});this.edit_bloodtype()}}>
                            { !this.state.edit_bloodtype?'Edit':'Done'}
                            </Text>
                        </Button>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem>
                        <Left>
                            <Body>
                            <Text>Password</Text>
                            <Text note>Protected </Text>
                            {
                                this.state.edit_password &&(
                                    <View>
                                    <Item>
                                        <Input disabled={true} style={{color:'#888',fontSize:14}}  placeholderTextColor='#999'  placeholder={this.state.email} />
                                    </Item>
                                    <Item>
                                        <Input disabled={true} style={{color:'#888',fontSize:14}}  placeholderTextColor='#999'  placeholder={this.state.email} />
                                    </Item>
                                    </View>
                                )
                            }
                            </Body>
                        </Left>
                        <Button transparent Right 
                        onPress={()=>{this.setState({edit_password:!this.state.edit_password});}}>
                            <Text>
                            { !this.state.edit_password?'Edit':'Done'}
                            </Text>
                        </Button>
                        </CardItem>
                    </Card>


                </View>

            </Container>

        )

    }
    
}


const styles = StyleSheet.create({
  container: {
    flex: .35,
    backgroundColor:'#555',
    alignItems: 'center'
  }
})
