import React from 'react';
import { Container, Header, Item, Input, Icon, Button, Text, CheckBox, Body, ListItem, Picker, Content, List ,Left,Right,Thumbnail} from 'native-base';
import { TouchableOpacity, ScrollView, View, StatusBar, StyleSheet } from 'react-native';
import {AuthService} from '../../services/auth'

export class Search extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            checked: false,
            states: ["Cairo", "Alexandria", "Giza", "Aswan", "Asyut", "Beheira", "Beni Suef", "Dakahlia", "New Valley", "Port Said", "Sharqia", "Suez"],
            status: ["Private", "Public"],
            selectedState: "Cairo",
            selectedStatus: "Private",
            searchText: "",
            auth_service: new AuthService,
            arrayholder:[]
        };
        //this.arrayholder = [] ;
    }

    Search(){
        arrayholder =[]
        seg = '/hospital/index'
        if(this.state.checked){
             seg +=  '?name='+this.state.searchText +'&state='+this.state.selectedState +'&status='+this.state.selectedStatus   
            
        }
        else{
            
            seg +=  '?name='+this.state.searchText 
        }
        //alert(seg)

        this.state.auth_service.get(seg)
        .then((response)=>{response.json().then(
            (data)=>{
              //alert("hello")
              this.setState({arrayholder:data})
            }
          )
        }
      )
    }

    onStateValueChange(value) {
        this.setState({
            selectedState: value
        });
    }

    onStatusValueChange(value) {
        this.setState({
            selectedStatus: value
        });
    }

    setSearchText(value){
        this.setState({
            searchText: value
        });
    }

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

    render() {
   //     for(var i = 0; i < 15; i++){
  //          this.arrayholder.push({'name': 'Apple', 'address' : '$6'});
  //          }
        const content = this.state.checked
        ? 
        <View>
            <Text style = {styles.inputFieldLabels}> State</Text>
            <Picker
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.state.selectedState}
                onValueChange={this.onStateValueChange.bind(this)}
                style = {styles.StatePicker}
                >
                {this.state.states.map((item, index) => {
                    return (<Item style = {styles.StatePickerItem} label={item} value={item} key={index}/>) 
                })}
            </Picker>
            <Text style = {styles.inputFieldLabels}> Status</Text>
            <Picker
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.state.selectedStatus}
                onValueChange={this.onStatusValueChange.bind(this)}
                style = {styles.StatePicker}
                >
                {this.state.status.map((item, index) => {
                    return (<Item style = {styles.StatePickerItem} label={item} value={item} key={index}/>) 
                })}
            </Picker>
        </View>
        : null;

        return (
            <ScrollView>

        <View style={{backgroundColor:'#f5f5f5'}}>


            <Header searchBar  style={styles.header} noShadow =  {true}  androidStatusBarColor={'#D32F2F'}>
                <Item rounded>
                    <Icon name="ios-search" />
                    <Input onChangeText={(text)=>{this.setState({searchText: text });}} placeholder="Search" />
                </Item>
                <Button transparent>
                    <Text onChange={this.setSearchText.bind(this)} >Search</Text>
                </Button>
            </Header>

            <ListItem>
                <CheckBox 
                checked={this.state.checked}
                onPress={() => this.setState({ checked: !this.state.checked })} />
                <Body>
                    <Text>Use Filter</Text>
                </Body>
            </ListItem>
            
            { content }
            
            <View style={{width: 200, alignItems: 'center', alignSelf: 'center'}}>
            <Button style={styles.searchButton} block rounded onPress={() => {this.Search()}}>
                <Text>Search</Text>
            </Button>
            </View>
            <List dataArray={this.state.arrayholder} renderRow={(arrayholder) =>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={require('../../hos.png')} />
                    </Left>
                    <Body>
                        <Text>{arrayholder.name}</Text>
                        <Text note>{arrayholder.address}</Text>
                    </Body>
                    <Right>
                        <Text note>{arrayholder.status}</Text>
                    </Right>
                </ListItem>
                
                }>
            </List> 
        </View>
        </ScrollView>

        );
    }
}

//add onPress in search result
//check search function
//check array
//check filter

const styles = StyleSheet.create({
    header: {
      backgroundColor: '#F44336',
      height: 70,
      paddingTop: 10
    },

    statusBar: {
        backgroundColor: '#D32F2F'
    },

    inputFieldLabels:{
        paddingTop:5,
        paddingLeft:10,
        fontSize: 20
    },

    StatePicker:{
        flexDirection: 'row',
        marginHorizontal: 25,
    },

    StatePickerItem:{
        fontSize: 16,
        color: '#757575'
    },

    searchButton:{
        marginTop:21, 
        marginBottom:21, 
        backgroundColor:'#F44336'
    }
})