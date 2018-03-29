import React from 'react'
import {Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Picker, Item} from 'native-base'
import {StatusBar,StyleSheet, ScrollView, View, TextInput} from 'react-native'

export class CreateHospital extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            name: "",
            state: "",
            district: "",
            address: "",
            phone: "",
            email: "",
            isVerified: false,
            status: "",
            states: ["Cairo", "Alexandria", "Giza", "Aswan", "Asyut", "Beheira", "Beni Suef", "Dakahlia", "New Valley", "Port Said", "Sharqia", "Suez"],
            statusOptions: ["Public", "Private"]
        }
    }

    onStateValueChange(value) {
        this.setState({
            state: value
        });
    }

    onStatusOptionValueChange(value) {
        this.setState({
            status: value
        });
    }

    render(){
        return (
            <Container>

                <StatusBar translucent={false}  style = {styles.statusBar} barStyle = "light-content"/>

                <Header hasTabs style = {styles.header} noShadow =  {true} androidStatusBarColor={'#D32F2F'}>
                    <Left style = {{flex: 1}}>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>

                    <Body style = {styles.title}>
                    <Title> CREATE </Title>
                    </Body>
                
                    <Right style = {{flex: 1}}>
                        <Button transparent>
                            <Icon name='md-checkmark' />
                        </Button>
                    </Right>
                </Header>

                <ScrollView>

                    <View style = {styles.form}>

                        <Text style = {styles.inputFieldLabels}> Hospital's name</Text>
                        <TextInput style={styles.inputBox} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder= "Hospital's official name"
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            autoCapitalize={'sentences'}
                            onChangeText={(text) =>{this.setState({name: text});}}
                        />

                        <Text style = {styles.inputFieldLabels}> State</Text>
                        <Picker
                            iosHeader="Select one"
                            mode="dropdown"
                            selectedValue= {this.state.state}
                            onValueChange={this.onStateValueChange.bind(this)}
                            style = {styles.pickerList}
                            >
                            {this.state.states.map((item, index) => {
                                return (<Item style = {styles.pickerItem} label={item} value={item} key={index}/>) 
                            })}
                        </Picker>

                        <Text style = {styles.inputFieldLabels}> District</Text>
                        <TextInput style={styles.inputBox} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder= "i.e. Helioplis"
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            onChangeText={(text) =>{this.setState({district: text});}}
                        />

                        <Text style = {styles.inputFieldLabels}> Address</Text>
                        <TextInput style={styles.inputBox} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder= "i.e building number, St. name off St. name"
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            autoCapitalize = {'sentences'}
                            onChangeText={(text) =>{this.setState({address: text});}}
                        />

                        <Text style = {styles.inputFieldLabels}> Phone</Text>
                        <TextInput style={styles.inputBox} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder= "[City code] + [8 numbers]"
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            keyboardType = 'numeric'
                            onChangeText={(text) =>{this.setState({phone: text});}}
                        />

                        <Text style = {styles.inputFieldLabels}> E-mail</Text>
                        <TextInput style={styles.inputBox} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder= "ie. queens@gmail.com"
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            keyboardType = 'email-address'
                            onChangeText={(text) =>{this.setState({email: text});}}
                        />

                        <Text style = {styles.inputFieldLabels}> Status</Text>
                        <Picker
                            iosHeader="Select one"
                            mode="dropdown"
                            selectedValue= {this.state.status}
                            onValueChange={this.onStatusOptionValueChange.bind(this)}
                            style = {styles.pickerList}
                            >
                            {this.state.statusOptions.map((item, index) => {
                                return (<Item style = {styles.pickerItem} label={item} value={item} key={index}/>) 
                            })}
                        </Picker>

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

    form:{
        backgroundColor: '#FFFF'
    },

    inputBox: {
        flexDirection: 'row',
        backgroundColor:'#ffffff',
        borderRadius: 15,
        paddingHorizontal:25,
        fontSize:16,
        color:'#757575',
        borderColor: '#757575',
        borderWidth: 2,
        marginVertical: 8,
        marginHorizontal: 10
    },

    inputFieldLabels:{
        paddingTop:5,
        paddingLeft:10,
        fontSize: 20
    },

    pickerList:{
        flexDirection: 'row',
        marginHorizontal: 25,
    },

    pickerItem:{
        fontSize: 16,
        color: '#757575'
    }
})