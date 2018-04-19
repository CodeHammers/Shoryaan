import React from 'react'
import { Container, Header, Item, Input, Icon,Title, Button, Text, CheckBox, Body, ListItem, Picker, Content, List, Left, Right, Thumbnail } from 'native-base';
import {StyleSheet, View, ScrollView, StatusBar} from 'react-native'

export class BloodRequestDetails extends React.Component
{

    constructor(props){
        super(props)
        this.state ={
            arrayholder:[1,2,3,4,5,6]
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
                        <Title> Managers </Title>
                    </Body>
                
                    <Right style = {{flex: 1}}>
                        <Button transparent>
                            <Icon name='home' />
                        </Button>
                    </Right>
                </Header>

                 <Text> all people managing hospital + ability to add more</Text>

                <View>

                    <List dataArray={this.state.arrayholder} renderRow={(arrayholder) =>
                        <ListItem avatar button={true} >
                            <Left>
                                <Thumbnail source={require('../../hos.png')} />
                            </Left>
                            <Body>
                                <Text style={styles.listitemname}>{'david'}</Text>
                                <Text style={styles.StatePickerItem} note>{'david'}</Text>
                            </Body>
                            <Right>
                                <Text style={styles.StatePickerItem} note>{'manager'}</Text>
                            </Right>
                        </ListItem>
                    }>
                    </List>



                </View>


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