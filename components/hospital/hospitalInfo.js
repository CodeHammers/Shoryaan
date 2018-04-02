import React from 'react'
import { Container,Text, List, ListItem} from 'native-base';
import {StyleSheet, View, ScrollView} from 'react-native'

export class HospitalPublicProfileInfo extends React.Component
{
    constructor(props){
        super(props);

        const { params } = this.props.data;

        if(params != undefined || params == null)
            this.state = {
                name: params.name,
                state: params.state,
                district: params.district,
                address: params.address,
                phone: params.phone,
                email: params.email,
                isVerified: params.isVerified,
                status: params.status
        };
    }   

    render(){
        return(
            <Container>

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