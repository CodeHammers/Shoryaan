import React from 'react';
import { Container, Icon, Header, Title, Button, Left, Right, Body, Text, Toast, ActionSheet } from 'native-base';
import { TouchableOpacity, View, Image, StatusBar, StyleSheet, ScrollView, AsyncStorage } from 'react-native'
import { H3 } from 'native-base'
import { AuthService } from '../../services/auth'


export class HospitalHome extends React.Component {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;

        this.state = {
            id: params.id,
            auth_service: new AuthService()
        };

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
                            <Icon name='arrow-back' onPress={() => this.props.navigation.goBack()} />
                        </Button>
                    </Left>

                    <Body style={styles.title}>
                        <Title> HOSPITAL </Title>
                    </Body>
                    <Right style = {{flex: 1}}>
                        <Button transparent>
                        </Button>
                    </Right>

                
                </Header>

                <ScrollView>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate('PrivateProfileInfo',{id: this.state.id})  }}>
                            <Image
                                source={require('../../images/home/hos.png')}
                                style={styles.ImageIconStyle}
                            />
                            <Text style={styles.textbutton}>
                                 Hospital Profile
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress= {()=>{this.props.navigation.navigate('BloodRequestsDashboard',{id: this.state.id})} }>
                            <Image
                                source={require('../../images/home/hos.png')}
                                style={styles.ImageIconStyle}
                            />
                            <Text style={styles.textbutton}>
                                Blood Requests
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.container}>
                        <TouchableOpacity style={styles.button}  onPress= {()=>{this.props.navigation.navigate('Managers',{id: this.state.id})} }>
                            <Image
                                source={require('../../images/home/hos.png')}
                                style={styles.ImageIconStyle}
                            />
                            <Text style={styles.textbutton}>
                                Other Managers
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}  onPress={()=>{ this.props.navigation.navigate('CreateHospital')}} >
                            <Image
                                source={require('../../images/home/hos.png')}
                                style={styles.ImageIconStyle}
                            />
                            <Text style={styles.textbutton} >
                                Create 
                            </Text>
                        </TouchableOpacity>
                    </View>



                    <View style={styles.container}>
            
                        <TouchableOpacity style={styles.button}  onPress={()=>{ this.props.navigation.navigate('DonorsStats')}} >
                            <Image
                                source={require('../../images/home/hos.png')}
                                style={styles.ImageIconStyle}
                            />
                            <Text style={styles.textbutton} >
                                Stats 
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