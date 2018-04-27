import React from 'react';
import { Container, Header, Item, Input, Icon, Button, Text, CheckBox, Body, ListItem, Picker, Content, List, Left, Right, Thumbnail } from 'native-base';
import { TouchableOpacity, ScrollView, View, StatusBar, StyleSheet, ActivityIndicator } from 'react-native';
import { AuthService } from '../../services/auth'

import I18n, { getLanguages } from 'react-native-i18n';

export class Search extends React.Component {
    constructor(props) {
        super(props);
        const self = this.props.self

        this.state = {
            checked: false,
            states: ["", "Cairo", "Alexandria", "Giza", "Aswan", "Asyut", "Beheira", "Beni Suef", "Dakahlia", "New Valley", "Port Said", "Sharqia", "Suez"],
            statuss: ["", "Private", "Public"],
            selectedState: "Cairo",
            selectedStatus: "Private",
            searchText: "",
            auth_service: new AuthService,
            arrayholder: [],
            name: "",
            state: "",
            district: "",
            address: "",
            phone: "",
            email: "",
            isVerified: "",
            status: "",
            self: self,
            loading: false
        };
    }

    componentWillMount() {
        getLanguages().then(languages => {
            this.setState({ languages: languages });
            //alert(languages)
        });
    }

    /**
     * intiates the search process
     * uses the keyword in textbox to search
     * checks if filters used and adds them
     * 
     */
    Search(text) {
        this.setState({ loading: true })
        url = '/hospital/index'
        if (text == undefined)
            text = this.state.searchText
        if (this.state.checked) {
            if (this.state.selectedState != "" & this.state.selectedStatus == "") {
                url = url + '?name=' + text + '&state=' + this.state.selectedState
            }
            else if (this.state.selectedState == "" & this.state.selectedStatus != "") {
                url = url + '?name=' + text + '&status=' + this.state.selectedStatus
            }
            else if (this.state.selectedState == "" & this.state.selectedStatus == "") {
                url = url + '?name=' + text
            }
            else {
                url = url + '?name=' + text + '&state=' + this.state.selectedState + '&status=' + this.state.selectedStatus
            }
        }
        else {
            url = url + '?name=' + text
        }

        this.state.auth_service.get(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loading: false })

                this.setState({ arrayholder: responseJson })
            });
    }
    /**
     * 
     * hook function to update state 
     * with the current selected value
     * in filters
     */
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
    /**
     * navigates user to specific hospital profile with data for this hopsital 
     */
    navgiateToHospital(name, state, district, address, phone, email, isVerified, status) {
        this.setState({
            name: name,
            state: state,
            district: district,
            address: address,
            phone: phone,
            email: email,
            isVerified: isVerified,
            status: status,

        })

        this.state.self.props.navigation.navigate('HospitalPublicProfile', {
            name: name,
            state: state,
            email: email,
            phone: phone,
            address: address,
            status: status,
            isVerified: isVerified,
            district: district
        })
    }

    showToast(msg, btn) {
        Toast.show({
            text: msg,
            position: 'bottom',
            buttonText: btn,
            duration: 5000,
            style: {
                backgroundColor: "#212121",
                opacity: 0.76
            }
        })
    }

    /** A function that renders that actual view on the screen */
    render() {
        const self = this;
        const content = this.state.checked
            ?
            <View>
                <Text style={styles.inputFieldLabels}> {I18n.t('State')}</Text>
                <Picker
                    iosHeader="Select one"
                    mode="dropdown"
                    selectedValue={this.state.selectedState}
                    onValueChange={this.onStateValueChange.bind(this)}
                    style={styles.StatePicker}
                >
                    {this.state.states.map((item, index) => {
                        return (<Item style={styles.StatePickerItem} label={item} value={item} key={index} />)
                    })}
                </Picker>
                <Text style={styles.inputFieldLabels}> {I18n.t('Status')}</Text>
                <Picker
                    iosHeader="Select one"
                    mode="dropdown"
                    selectedValue={this.state.selectedStatus}
                    onValueChange={this.onStatusValueChange.bind(this)}
                    style={styles.StatePicker}
                >
                    {this.state.statuss.map((item, index) => {
                        return (<Item style={styles.StatePickerItem} label={item} value={item} key={index} />)
                    })}
                </Picker>
            </View>
            : null;

        return (
            <ScrollView>

                <View style={{ backgroundColor: '#f5f5f5' }}>

                    <Header searchBar style={styles.header} noShadow={true} androidStatusBarColor={'#D32F2F'}>
                        <Item rounded>
                            <Icon onPress={() => { this.Search() }} name="ios-search" />
                            <Input onChangeText={(text) => { this.setState({ searchText: text }); }} placeholder= {I18n.t("Search")} />
                        </Item>

                    </Header>

                    <ListItem>
                        <CheckBox
                            checked={this.state.checked}
                            onPress={() => this.setState({ checked: !this.state.checked })} />
                        <Body>
                            <Text>{I18n.t('Use Filter')}</Text>
                        </Body>
                    </ListItem>

                    {content}


                    <View style={{ width: 200, alignItems: 'center', alignSelf: 'center' }}>

                    </View>
                    {
                        this.state.loading &&
                        <ActivityIndicator />
                    }
                    <List dataArray={this.state.arrayholder} renderRow={(arrayholder) =>
                        <ListItem avatar button={true} onPress={() => { this.navgiateToHospital(arrayholder.name, arrayholder.state, arrayholder.district, arrayholder.address, arrayholder.phone, arrayholder.email, arrayholder.isVerified, arrayholder.status) }}>
                            <Left>
                                <Thumbnail source={require('../../hos.png')} />
                            </Left>
                            <Body>
                                <Text style={styles.listitemname}>{arrayholder.name}</Text>
                                <Text style={styles.StatePickerItem} note>{arrayholder.address}</Text>
                            </Body>
                            <Right>
                                <Text style={styles.StatePickerItem} note>{arrayholder.status}</Text>
                            </Right>
                        </ListItem>
                    }>
                    </List>

                </View>
            </ScrollView>
        );
    }
}

/** Style sheet used for styling components used in the render function */
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F44336',
        height: 70,
        paddingTop: 10
    },

    statusBar: {
        backgroundColor: '#D32F2F'
    },

    inputFieldLabels: {
        paddingTop: 5,
        paddingLeft: 10,
        fontSize: 20
    },

    StatePicker: {
        flexDirection: 'row',
        marginHorizontal: 25,
    },

    StatePickerItem: {
        fontSize: 16,
        color: '#757575'
    },

    listitemname: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black'
    },

    searchButton: {
        marginTop: 21,
        marginBottom: 21,
        backgroundColor: '#F44336'
    }
})

I18n.fallbacks = true;

I18n.translations = {

    'en': require('../../locales/en'),
    'ar-EG': require('../../locales/ar')
};