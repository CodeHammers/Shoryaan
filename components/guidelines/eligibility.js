import React from 'react';
import { StyleSheet, StatusBar, Switch, View, ScrollView } from 'react-native';
import { Container, Header, Button, Title, Right, Left, Body, Icon, Card, CardItem, Text, Content } from 'native-base';

import I18n, { getLanguages } from 'react-native-i18n';

export class Eligibility extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question1: false,
            question2: false,
            question3: false,
            question4: false,
            question5: false,
            question6: false,
            question7: false,
            question8: false,
            question9: false,
            question10: false,
            question11: false,
            question12: false,
            question13: false,
            question14: false
        };
    }

    componentWillMount() {
        getLanguages().then(languages => {
            this.setState({ languages: languages });
            //alert(languages)
        });
    }

    onValue1Change(value) {
        this.setState({
            question1: value
        });
    }

    onValue2Change(value) {
        this.setState({
            question2: value
        });
    }

    onValue3Change(value) {
        this.setState({
            question3: value
        });
    }

    onValue4Change(value) {
        this.setState({
            question4: value
        });
    }

    onValue5Change(value) {
        this.setState({
            question5: value
        });
    }

    onValue6Change(value) {
        this.setState({
            question6: value
        });
    }

    onValue7Change(value) {
        this.setState({
            question7: value
        });
    }

    onValue8Change(value) {
        this.setState({
            question8: value
        });
    }

    onValue9Change(value) {
        this.setState({
            question9: value
        });
    }

    onValue10Change(value) {
        this.setState({
            question10: value
        });
    }

    onValue11Change(value) {
        this.setState({
            question11: value
        });
    }

    onValue12Change(value) {
        this.setState({
            question12: value
        });
    }

    onValue13Change(value) {
        this.setState({
            question13: value
        });
    }

    onValue14Change(value) {
        this.setState({
            question14: value
        });
    }

    render() {
        const content1 = this.state.question1
            ?
            <View>
                <Text style={{ color: 'red', fontSize: 16 }}>
                    {I18n.t('You cannot donate at this time. However, we would be delighted to see you when you are 18.')}
                </Text>
            </View>
            : null;
        const content2 = this.state.question2
            ?
            <View>
                <Text style={{ color: 'red', fontSize: 16 }}>
                    {I18n.t('If you have never given blood before, then you cannot donate However:  - if you are between 65 and 69 years and have given blood in the last 10 years then you can give blood.  - if you are 70 years or over and you have given blood in the last 2 years and you have a certificate of fitness from your GP, you can give blood. The certificate is valid for 12 months from the date of issue.')}
                </Text>
            </View>
            : null;
        const content3 = this.state.question3
            ?
            <View>
                <Text style={{ color: 'red', fontSize: 16 }}>
                    {I18n.t('If you weigh less than 50 kgs you are unable to donate at this time. If you weigh more than 130 kgs you are unable to give blood at a mobile blood donor clinic.')}
                </Text>
            </View>
            : null;
        const content4 = this.state.question4
            ?
            <View>
                <Text style={{ color: 'red', fontSize: 16 }}>
                    {I18n.t('If you are a female under 26 years of age and are less than 5ft 6 inches (168cms) in height and less than 10st 3lb (65 kgs) your height and weight will need to be assessed to establish your eligibility to donate.')}
                </Text>
            </View>
            : null;
        const content5 = this.state.question5
            ?
            <View>
                <Text style={{ color: 'red', fontSize: 16 }}>
                    {I18n.t('You cannot donate if you have any illness or injury which may mean that it is not safe to give your blood to a sick patient.')}
                </Text>
            </View>
            : null;
        const content6 = this.state.question6
            ?
            <View>
                <Text style={{ color: 'red', fontSize: 16 }}>
                    {I18n.t('You cannot donate if you had an endoscopy (scope) in the last 4 months. If you were diagnosed with a medical condition or illness.')}
                </Text>
            </View>
            : null;
        const content7 = this.state.question7
            ?
            <View>
                <Text style={{ color: 'red', fontSize: 16 }}>
                    {I18n.t('You cannot donate for 4 months from the date of the tattoo or the piercing.')}
                </Text>
            </View>
            : null;
        const content8 = this.state.question8
            ?
            <View>
                <Text style={{ color: 'red', fontSize: 16 }}>
                    {I18n.t('You cannot donate during pregnancy and for 12 months after your pregnancy.')}
                </Text>
            </View>
            : null;
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

                <ScrollView>
                    <Content>

                        <Card>

                            <CardItem>

                                <View style={styles.circle}>
                                    
                                    <Text style={styles.Number}>
                                        1
                                    </Text>
                                
                                </View>
                                
                                <View style={{ flex: 5 }}>

                                    <Text style={styles.question}>
                                        {I18n.t('Are you under 18?')}
                                    </Text>
                                
                                </View>

                                <Right style={{ flex: 1 }}>
                                    <Switch
                                        onValueChange={this.onValue1Change.bind(this)}
                                        value={this.state.question1}
                                        thumbTintColor="green"
                                        tintColor="red"
                                    />
                                </Right>
                            
                            </CardItem>
                            
                            <CardItem footer>
                                {content1}
                            </CardItem>
                        
                        </Card>

                        <Card style={{ marginTop: -2 }}>

                            <CardItem>

                                <View style={styles.circle}>

                                    <Text style={styles.Number}>
                                        2
                                    </Text>

                                </View>

                                <View style={{ flex: 5 }}>
                                
                                    <Text style={styles.question}>
                                        {I18n.t('Are you 65 years of age or over?')}
                                    </Text>
                                
                                </View>

                                <Right style={{ flex: 1 }}>
                                    <Switch
                                        onValueChange={this.onValue2Change.bind(this)}
                                        value={this.state.question2}
                                        thumbTintColor="green"
                                        tintColor="red"
                                    />
                                </Right>

                            </CardItem>

                            <CardItem footer>
                                {content2}
                            </CardItem>

                        </Card>

                        <Card style={{ marginTop: -2 }}>

                            <CardItem>

                                <View style={styles.circle}>

                                    <Text style={styles.Number}>
                                        3
                                    </Text>

                                </View>

                                <View style={{ flex: 5 }}>

                                    <Text style={styles.question}>
                                        {I18n.t('Do you weigh less than 7 stone 12 lbs (less than 50kgs) or more than 20 stone 6 lbs (130kgs)?')}
                                    </Text>

                                </View>    

                                <Right style={{ flex: 1 }}>
                                    <Switch
                                        onValueChange={this.onValue3Change.bind(this)}
                                        value={this.state.question3}
                                        thumbTintColor="green"
                                        tintColor="red"
                                    />
                                </Right>

                            </CardItem>

                            <CardItem footer>
                                {content3}
                            </CardItem>

                        </Card>

                        <Card style={{ marginTop: -2 }}>

                            <CardItem>

                                <View style={styles.circle}>

                                    <Text style={styles.Number}>
                                        4
                                    </Text>

                                </View>

                                <View style={{ flex: 5 }}>

                                    <Text style={styles.question}>
                                        {I18n.t('For women; are you under 26 years of age?')}
                                    </Text>

                                </View>    

                                <Right style={{ flex: 1 }}>
                                    <Switch
                                        onValueChange={this.onValue4Change.bind(this)}
                                        value={this.state.question4}
                                        thumbTintColor="green"
                                        tintColor="red"
                                    />
                                </Right>

                            </CardItem>

                            <CardItem footer>
                                {content4}
                            </CardItem>

                        </Card>

                        <Card style={{ marginTop: -2 }}>
                            
                            <CardItem>

                                <View style={styles.circle}>

                                    <Text style={styles.Number}>
                                        5
                                    </Text>

                                </View>

                                <View style={{ flex: 5 }}>

                                    <Text style={styles.question}>
                                        {I18n.t('Today or in the last 2 weeks have you had any illness or injury, e.g. a cough, a cold, a sore throat, vomiting, diarrhoea or an open wound?')}
                                    </Text>

                                </View>

                                <Right style={{ flex: 1 }}>
                                    <Switch
                                        onValueChange={this.onValue5Change.bind(this)}
                                        value={this.state.question5}
                                        thumbTintColor="green"
                                        tintColor="red"
                                    />
                                </Right>

                            </CardItem>

                            <CardItem footer>
                                {content5}
                            </CardItem>

                        </Card>

                        <Card style={{ marginTop: -2 }}>
                            
                            <CardItem>

                                <View style={styles.circle}>

                                    <Text style={styles.Number}>
                                        6
                                    </Text>

                                </View>

                                <View style={{ flex: 5 }}>

                                    <Text style={styles.question}>
                                        {I18n.t('Have you had any medical tests or investigations in the last 4 months or since your last donation?')}
                                    </Text>

                                </View>

                                <Right style={{ flex: 1 }}>
                                    <Switch
                                        onValueChange={this.onValue6Change.bind(this)}
                                        value={this.state.question6}
                                        thumbTintColor="green"
                                        tintColor="red"
                                    />
                                </Right>

                            </CardItem>

                            <CardItem footer>
                                {content6}
                            </CardItem>

                        </Card>

                        <Card style={{ marginTop: -2 }}>

                            <CardItem>

                                <View style={styles.circle}>

                                    <Text style={styles.Number}>
                                        7
                                    </Text>

                                </View>

                                <View style={{ flex: 5 }}>

                                    <Text style={styles.question}>
                                        {I18n.t('Have you had a tattoo or body piercing in the last 4 months?')}
                                    </Text>

                                </View>

                                <Right style={{ flex: 1 }}>
                                    <Switch
                                        onValueChange={this.onValue7Change.bind(this)}
                                        value={this.state.question7}
                                        thumbTintColor="green"
                                        tintColor="red"
                                    />
                                </Right>

                            </CardItem>

                            <CardItem footer>
                                {content7}
                            </CardItem>

                        </Card>

                        <Card style={{ marginTop: -2 }}>
                            <CardItem>
                                <View style={styles.circle}>

                                    <Text style={styles.Number}>
                                        8
                                    </Text>

                                </View>

                                <View style={{ flex: 5 }}>

                                    <Text style={styles.question}>
                                        {I18n.t('For women; are you pregnant or have you have you been pregnant in the past 12 months?')}
                                    </Text>

                                </View>

                                <Right style={{ flex: 1 }}>
                                    <Switch
                                        onValueChange={this.onValue8Change.bind(this)}
                                        value={this.state.question8}
                                        thumbTintColor="green"
                                        tintColor="red"
                                    />
                                </Right>

                            </CardItem>

                            <CardItem footer>
                                {content8}
                            </CardItem>

                        </Card>

                    </Content>
                </ScrollView>
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

    circle: {
        width: 35,
        height: 35,
        borderRadius: 18,
        alignItems: 'center',
        backgroundColor: '#F44336',
        marginRight: 10,
        marginLeft: -7
    },

    Number: {
        marginTop: 5,
        color: 'white',
        fontWeight: 'bold'
    },

    question: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
    }
})

I18n.fallbacks = true;

I18n.translations = {
    'en': require('../../locales/en'),
    'ar-EG': require('../../locales/ar')
};