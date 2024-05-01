import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SettingScreen = () => {
  return (
    <View>
      <Text style= {styles.text}>SettingScreen</Text>
    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
    text:{
        marginTop: 300,
        fontSize: 30,
        textAlign: 'center',
    }
})