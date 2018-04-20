import React from 'react';
import { Container, Icon, Header, Title, Button, Left, Right, Body, Text, Toast, ActionSheet } from 'native-base';
import { TouchableOpacity, View, Image, StatusBar, StyleSheet, ScrollView, AsyncStorage } from 'react-native'
import { H3 } from 'native-base'
import { AuthService } from '../../services/auth'

var BUTTONS = [
    { text: "Change password", icon: "md-create", iconColor: "red" },
    { text: "Notifications", icon: "md-notifications", iconColor: "red" },
    { text: "Log out", icon: "md-log-out", iconColor: "red" }
];

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            /** variable to indicate whether the user manages a hospital or not */
            manager: false,
            auth_service: new AuthService()
        };

        /** Retrieve the access token stored in the mobile cache and then retrieve the user data from the DB */
        this.getViewData();
    }

    getViewData() {
        this.checkStoredToken().then(
            () => { this.getUserData() }
        )
    }
    /** check the access token if it is defined or not */
    checkStoredToken() {
        return AsyncStorage.getItem("access_token").then((value) => {
            if (value != undefined) {
                this.setState({ access_token: value })
            }
        })
    }
    /** Retrieve user data from the database */
    getUserData() {
        body = JSON.stringify({
            access_token: this.state.access_token
        })
        this.state.auth_service.post(body, '/auth/me')
            .then((response) => {
                if (response.status != 200) {
                    alert("Can't connect to server")
                }
                else {
                    response.json().then((resJSON) => {
                        this.setState({
                            manager: resJSON.hospitalManager
                        })
                    })
                }
            })
    }
    /** Funtion to show settings menu when user click on settings icon */
    showUserSettings() {
        ActionSheet.show(
            {
                options: BUTTONS,
                title: "User Settings"
            },
            buttonIndex => {
                if (buttonIndex != undefined || buttonIndex != null) {
                    if (BUTTONS[buttonIndex].text == "Change password") {
                        this.props.navigation.navigate('ChangeUserPassword');
                    }
                    if (BUTTONS[buttonIndex].text == "Notifications") {
                        this.props.navigation.navigate('Notifications');
                    }
                    if (BUTTONS[buttonIndex].text == "Log out") {
                        AsyncStorage.setItem("access_token",undefined).then(
                            ()=>{ this.props.navigation.navigate('Landing');}
                        )
                    }

                }
            }
        )
    }

    /** A function that renders the actual the view on the screen */
    render() {
        const self = this;
        return (

            <Container>
                <StatusBar translucent={false} style={styles.statusBar} barStyle="light-content" />

                <Header style={styles.header} noShadow={true} androidStatusBarColor={'#D32F2F'}>
                    <Left style={{ flex: 1 }}>
                        <Button transparent>
                            <Icon name='search' onPress={() => this.props.navigation.navigate('InitialSearch')} />
                        </Button>
                    </Left>

                    <Body style={styles.title}>
                        <Title> HOME </Title>
                    </Body>

                    <Right style={{ flex: 1 }}>
                        <Button transparent>
                            <Icon name='md-settings' onPress={() => this.showUserSettings()} />
                        </Button>
                    </Right>
                </Header>

                <ScrollView>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.button} onPress={() => { this.props.navigation.navigate('Profile') }}>
                            <Image
                                source={require('../../images/home/i-received-icon.png')}
                                style={styles.ImageIconStyle}
                            />
                            <Text style={styles.textbutton}>
                                My Profile
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => { this.props.navigation.navigate('DonationMap') }} >
                            <Image
                                source={require('../../images/home/12_blood_2.png')}
                                style={styles.ImageIconStyle}
                            />
                            <Text style={styles.textbutton}>
                                Donate Blood
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.container}>
                        <TouchableOpacity style={styles.button}>
                            <Image
                                source={require('../../images/home/can-i-give-blood-icon-homepage.png')}
                                style={styles.ImageIconStyle}
                            />
                            <Text style={styles.textbutton}>
                                Guidelines
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}>
                            <Image
                                source={require('../../images/home/Health_Tests-512.png')}
                                style={styles.ImageIconStyle}
                            />
                            <Text style={styles.textbutton}>
                                Blood Facts
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.container}>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            if (this.state.manager) {
                                this.props.navigation.navigate('ManagedHospitals');
                            }
                            else {
                                this.props.navigation.navigate('CreateHospital');
                            }
                        }}>
                            <Image
                                source={require('../../images/home/hos.png')}
                                style={styles.ImageIconStyle}
                            />
                            <Text style={styles.textbutton}>
                                My Hospital
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => { this.props.navigation.navigate('InitialSearch') }}>
                            <Image
                                source={require('../../images/home/search.png')}
                                style={styles.ImageIconStyle}
                            />
                            <Text style={styles.textbutton}>
                                Search
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}

/** Style sheet used for styling components used in the render function */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    header: {
        backgroundColor: '#F44336',
        height: 50
    },

    statusBar: {
        backgroundColor: '#D32F2F'
    },

    textbutton: {
        color: '#F44336',
        fontSize: 16,
        fontWeight: 'bold'
    },

    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    button: {
        flex: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: '35%',
        height: 200
    },

    ImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 50,
        width: 50,
        resizeMode: 'stretch',
    },
})