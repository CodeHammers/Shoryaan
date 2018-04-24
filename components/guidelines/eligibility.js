import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Container, Header, Button, Title, Right, Left, Body, Icon } from 'native-base';

export class Eligibility extends React.Component {
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
                        <Title> Eligibility </Title>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
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
})