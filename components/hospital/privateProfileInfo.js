import React from 'react'
import {Container,Text, List, ListItem, Header, Left, Body, Right, Title, Button, Icon} from 'native-base';
import {StyleSheet, View, ScrollView, StatusBar} from 'react-native'

export class PrivateProfileInfo extends React.Component
{
    constructor(props){
        super(props);

        //TODO: get hospital's data from the search view
        this.state = {
            name: "Queen's Hospital",
            state: "Cairo",
            district: "Heliopolis",
            address: "4 Sheikh Nour Eldin, off Thawra St.",
            phone: "0224186334",
            email: "N/A",
            isVerified: true,
            status: "Private"
        }
    }   

    render(){
        return(
            <Container style = {styles.form}>
                <Header style = {styles.header} noShadow =  {true} androidStatusBarColor={'#D32F2F'}>
                    <Left style = {{flex: 1}}>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>

                    <Body style = {styles.title}>
                        <Title> HOSPITAL </Title>
                    </Body>
                
                    <Right style = {{flex: 1}}>
                        <Button transparent>
                            <Icon onPress={() => this.props.navigation.navigate('EditHospitalPrivateProfile', this.state)} name='md-create' />
                        </Button>
                    </Right>
                </Header>

                <ScrollView>

                    <View style = {styles.mainList}>

                        <List>

                            <ListItem>
                                <Text style = {styles.listItemLabel}>Name:{" "}</Text>
                                <Text style = {styles.listItemData}>{this.state.name}</Text>
                            </ListItem>

                            <ListItem>
                                <Text style = {styles.listItemLabel}>State:{" "}</Text>
                                <Text style = {styles.listItemData}>{this.state.state}</Text>
                            </ListItem>
                            
                            <ListItem>
                                <Text style = {styles.listItemLabel}>District:{" "}</Text>
                                <Text style = {styles.listItemData}>{this.state.district}</Text>
                            </ListItem>

                            <ListItem>
                                <Text style = {styles.listItemLabel}>Address:{" "}</Text>
                                <Text style = {styles.listItemData}>{this.state.address}</Text>
                            </ListItem>

                            <ListItem>
                                <Text style = {styles.listItemLabel}>Phone:{" "}</Text>
                                <Text style = {styles.listItemData}>{this.state.phone}</Text>
                            </ListItem>

                            <ListItem>
                                <Text style = {styles.listItemLabel}>E-mail:{" "}</Text>
                                <Text style = {styles.listItemData}>{this.state.email}</Text>
                            </ListItem>

                            <ListItem>
                                <Text style = {styles.listItemLabel}>Status:{" "}</Text>
                                <Text style = {styles.listItemData}>{this.state.status}</Text>
                            </ListItem>

                        </List>

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

    mainList:{
        backgroundColor:'#FFFFFF'
    },

    listItemLabel:{
        fontSize: 20, 
        color:'#212121'
    },

    listItemData:{
        fontSize: 20, 
        color:'#757575',
        flex: 1
    }
})
