import React from 'react'
import {Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Picker, Item} from 'native-base'
import {StatusBar, StyleSheet, ScrollView, View, TextInput} from 'react-native'

export class EditHospitalPrivateProfile extends React.Component
{
    constructor(props)
    {
        super(props);

        const {params} = this.props.navigation.state;

        this.state = {
            nameSaved: params.name,
            stateSaved: params.state,
            districtSaved: params.district,
            addressSaved: params.address,
            phoneSaved: params.phone,
            statusSaved: params.status,

            name: params.name,
            state: params.state,
            district: params.district,
            address: params.address,
            phone: params.phone,
            email: params.email,
            status: params.status,

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
        return(
            <Container style = {styles.form}>
                <Header style = {styles.header} noShadow =  {true} androidStatusBarColor={'#D32F2F'}>
                    <Left style = {{flex: 1}}>
                        <Button transparent>
                            <Icon onPress={() => this.props.navigation.goBack()} name='arrow-back' />
                        </Button>
                    </Left>

                    <Body style = {styles.title}>
                    <Title> EDIT </Title>
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
                            defaultValue= {this.state.name}
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
                            defaultValue= {this.state.district}
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            onChangeText={(text) =>{this.setState({district: text});}}
                        />

                        <Text style = {styles.inputFieldLabels}> Address</Text>
                        <TextInput style={styles.inputBox} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            defaultValue= {this.state.address}
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            autoCapitalize = {'sentences'}
                            onChangeText={(text) =>{this.setState({address: text});}}
                        />

                        <Text style = {styles.inputFieldLabels}> Phone</Text>
                        <TextInput style={styles.inputBox} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            defaultValue= {this.state.phone}
                            placeholderTextColor = "#757575"
                            selectionColor="#212121"
                            keyboardType = 'numeric'
                            onChangeText={(text) =>{this.setState({phone: text});}}
                        />

                        <Text style = {styles.inputFieldLabels}> E-mail</Text>
                        <TextInput style={styles.inputBox} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            defaultValue= {this.state.email}
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