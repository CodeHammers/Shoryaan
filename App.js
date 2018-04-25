

import {  SwitchNavigator } from 'react-navigation';

import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Landing } from './components/login/landing'
import { Home } from './components/home/home'
import { Profile } from './components/profile/profile'
import { Search } from './components/search/search'
import { InitialSearch } from './components/search/initialsearch'
import { EditProfile } from './components/profile/editProfile'
import { HospitalPublicProfile } from './components/hospital/publicProfile'
import { CreateHospital } from './components/hospital/createHospital'
import { PrivateProfileInfo } from './components/hospital/privateProfileInfo'
import { EditHospitalPrivateProfile } from './components/hospital/privateProfileEdit'
import { ChangeUserPassword } from './components/profile/changePassword'
import { Intro } from './components/intro/intro'
import { LocateOnMap } from './components/hospital/locateOnMap'
import { HospitalHome } from './components/hospital/hospitalHome'
import { BloodRequestsDashboard } from './components/hospital/bloodRequestsDashboard'
import { Managers } from './components/hospital/managers'
import { BloodRequestForm } from './components/hospital/bloodRequestForm'
import { Notifications } from './components/home/notifications'
import { NotificationDetail } from './components/home/notificationDetail'
import { ManagedHospitals } from './components/hospital/managedHospitals'
import { DonationMap } from './components/home/donationmap'
import { BloodRequestDetails } from './components/hospital/bloodRequestDetails'
import { Guidelines } from './components/guidelines/guidelines'
import { Eligibility } from './components/guidelines/eligibility'
import { DonorsStats } from './components/hospital/donorsStats'

import { StackNavigator } from 'react-navigation'
import { Root } from "native-base";



/*
################################################################################
|--------------------------App Routing----------------------------------|
################################################################################
*/
const AuthStack = StackNavigator({   
    Landing: {
        screen: Landing,
    }, 

    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },
        initialRouteName: 'Landing',   
    }
);

const AppStack = StackNavigator({

    Home: {
        screen: Home
    },
    Profile: {
        screen: Profile
    },
    EditProfile: {
        screen: EditProfile
    },
    ChangeUserPassword: {
        screen: ChangeUserPassword
    },
    Search: {
        screen: Search
    },
    InitialSearch: {
        screen: InitialSearch
    },
    HospitalPublicProfile: {
        screen: HospitalPublicProfile
    },
    CreateHospital: {
        screen: CreateHospital
    },
    PrivateProfileInfo: {
        screen: PrivateProfileInfo
    },
    EditHospitalPrivateProfile: {
        screen: EditHospitalPrivateProfile
    },
    LocateOnMap:{
        screen: LocateOnMap
    },
    HospitalHome: {
        screen: HospitalHome
    },
    BloodRequestsDashboard: {
        screen: BloodRequestsDashboard
    },
    Managers: {
        screen: Managers
    },
    BloodRequestForm: {
        screen: BloodRequestForm
    },
    Notifications: {
        screen: Notifications
    },
    NotificationDetail: {
        screen: NotificationDetail
    },
    ManagedHospitals: {
        screen: ManagedHospitals
    },
    DonationMap: {
        screen: DonationMap
    },
    BloodRequestDetails:{
        screen: BloodRequestDetails
    },
    Guidelines:{
        screen: Guidelines
    },
    Eligibility:{
        screen: Eligibility
    },
    DonorsStats: {
        screen: DonorsStats
    }
},
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },
        initialRouteName: 'Home',
    },
)





const RootStack = SwitchNavigator(
    {
      AuthLoading: Intro,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )


  export default class App extends React.Component {

    render() {
        return (

            <Root>
                <RootStack />
            </Root>
        )
    }
}