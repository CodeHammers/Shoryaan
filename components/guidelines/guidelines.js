import React from 'react';
import { Image, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import { Container, Header, Button, View, Title, Right, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';

import SCREEN_IMPORT from 'Dimensions'

const SCREEN_WIDTH = SCREEN_IMPORT.get('window').width;
const SCREEN_HEIGHT = SCREEN_IMPORT.get('window').height;
const cards = [
    {
        image: require('../../tog-help.jpg'),
    },
    {
        image: require('../../logo.jpg'),
    },
];

export class Guidelines extends React.Component {
    render() {
        return (
            <Container>
                <StatusBar translucent={false} style={styles.statusBar} barStyle="light-content" />

                <Header style={styles.header} noShadow={true} androidStatusBarColor={'#D32F2F'}>
                    <Left style={{ flex: 1 }}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>

                    <Body style={styles.title}>
                        <Title> Guidelines </Title>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>

                <View style={{ flex: 1 }}>
                    <DeckSwiper
                        dataSource={cards}
                        renderItem={item =>
                            <Card style={{ elevation: 3 }}>
                                <CardItem cardBody>

                                    <Image style={styles.FullScreenImage} source={item.image} />

                                </CardItem>
                            </Card>
                        }
                    />
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F44336',
        height: 50
    },

    statusBar: {
        backgroundColor: '#D32F2F'
    },

    FullScreenImage: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    //  resizeMode: 'stretch',
    }
})