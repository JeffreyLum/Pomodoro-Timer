import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Vibration, Button, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

//placed outside of class app so clearInterval() can work properly
let ticky
export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      minutes: 25,
      seconds: 30,
      breakMinutes: '05',
      breakSeconds: '00',
      task: 'GET TO WORK  ',  //The names of my tasks end in 2 spaces because there are some phones that cut off text early and that was my case. textBreakStrategy didn't work https://stackoverflow.com/questions/54750503/text-is-getting-cut-off-in-android-for-react-native
      startpause: 'START',
      running: true,
    }
  }

  //STARTS AND STOPS THE TIMER
  tickInSeconds = () => {
    if (this.state.running !== false) {
      clearInterval(ticky)
      ticky = setInterval(this.leadingZero(this.ticker), 1000)

      this.setState(prevState => ({
        startpause: 'STOP',
        running: false,
      }))
    }
    else {
      clearInterval(ticky)
      this.setState(prevState => ({
        startpause: 'START',
        running: true
      }))

    }
  }

  //WHAT HAPPENS WHEN TICKS
  ticker = () => {

    this.setState(prevState => ({
      seconds: this.leadingZero(prevState.seconds - 1)
    }))

    if (this.state.seconds === '0-1') {
      this.setState(prevState => ({
        minutes: this.leadingZero(prevState.minutes - 1),
        seconds: 59
      }))
    }

    if (this.state.minutes === '00' && this.state.seconds === '00') {
      Vibration.vibrate(1000)
    }

    if (this.state.minutes === '0-1' && this.state.seconds === 59 && this.state.task === 'GET TO WORK  ') {
      // Vibration.vibrate(1000)
      this.setState(prevState => ({
        task: 'Take a Break  ',
        minutes: this.state.breakMinutes,
        seconds: this.state.breakSeconds,
      }))
    }
    if (this.state.minutes === '0-1' && this.state.seconds === 59 && this.state.task === 'Take a Break  ') {
      // Vibration.vibrate(1000)
      this.setState(prevState => ({
        task: 'GET TO WORK  ',
        minutes: 25,
        seconds: 30
      }))
    }
  }

  //TIMER FOR THE WORK
  setWorkMinuteInput = change => {
    clearInterval(ticky)
    this.setState(prevState => ({
      minutes: this.leadingZero(change),
      startpause: 'START',
      running: true,
      task: 'GET TO WORK  ',

    }))
  }
  setWorkSecondInput = change => {
    clearInterval(ticky)
    if (change > 59) {
      this.setState(prevState => ({
        seconds: change = '59',
        startpause: 'START',
        running: true,
        task: 'GET TO WORK  ',

      }))
    }
    this.setState(prevState => ({
      seconds: this.leadingZero(change),
      startpause: 'START',
      running: true,
      task: 'GET TO WORK  ',
    }))
  }

  //TIMER FOR THE BREAK
  setBreakMinuteInput = change => {
    clearInterval(ticky)
    this.setState(prevState => ({
      breakMinutes: this.leadingZero(change),
      startpause: 'START',
      running: true,
      task: 'GET TO WORK  ',
    }))

    if (this.state.task === 'Take a Break  ') {
      this.reset()
    }
  }
  setBreakSecondInput = change => {
    clearInterval(ticky)
    if (change > 59) {
      this.setState(prevState => ({
        breakSeconds: change = '59',
      }))
    }
    this.setState(prevState => ({
      breakSeconds: this.leadingZero(change),
      startpause: 'START',
      running: true,
      task: 'GET TO WORK  ',
    }))

    if (this.state.task === 'Take a Break  ') {
      this.reset()
    }
  }

  //ADDS A 0 TO THE FRONT IF SINGLE DIGIT
  leadingZero = number => {

    if (number === 0 || number === '') {
      return '00'
    }
    else if (number < 10) {
      return '0' + number
    }
    return number
  }

  //RESETS
  reset = () => {
    clearInterval(ticky)
    this.setState(prevState => ({
      minutes: 25,
      seconds: 30,
      startpause: 'START',
      running: true,
      task: 'GET TO WORK  '
    }))
  }

  //Changes color of the container
  containerStyle = () => {
    if (this.state.task === 'GET TO WORK  ') {
      return {
        flex: 1,
        backgroundColor: '#eb2f06',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }
    }
    else {
      return {
        flex: 1,
        backgroundColor: '#341f97',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }
    }
  }

  //Changes color of the task
  taskStyle = () => {
    if (this.state.task === 'GET TO WORK  ') {
      return {
        fontSize: 45,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'yellow',
      }
    }
    else {
      return {
        fontSize: 45,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'green',

      }
    }
  }

  //Changes color of the start and pause button
  startpauseStyle = () => {
    if (this.state.startpause === 'START') {
      return {
        color: 'white',
        backgroundColor: '#009432',
        width: 100,
        height: 50,
        textAlign: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 50,
        margin: 10
      }
    }
    else {
      return {
        color: 'white',
        backgroundColor: '#c23616',
        width: 100,
        height: 50,
        textAlign: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 50,
        margin: 10
      }
    }
  }

  //Changes color of the timer
  timerStyle = () => {
    if (this.state.task === 'GET TO WORK  ') {
      return {
        fontSize: 100,
        color: '#353b48',
        textAlign: 'center'
      }
    }
    else {
      return {
        fontSize: 100,
        color: 'grey',
        textAlign: 'center'
      }
    }
  }

  //Changes color of the title
  textStyle = () => {
    if (this.state.task === 'GET TO WORK  ') {
      return {
        color: 'black',
        textAlign: 'center',
        marginBottom: 35,
        fontSize: 25,
        fontWeight: 'bold'
      }
    }
    else {
      return {
        color: 'white',
        textAlign: 'center',
        marginBottom: 35,
        fontSize: 25
      }
    }
  }

  //Changes color and font weight of the text next to the TextInputs
  textNextToInputStyle = () => {
    if (this.state.task === 'GET TO WORK  ') {
      return {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold'
      }
    }
    else {
      return {
        color: 'white',
        fontSize: 15,
      }
    }
  }

  render() {
    return (

      <View style={this.containerStyle()}>
        <Text style={this.textStyle()}>Pomodoro Timer - JEFFREY LUM  </Text>

        <View>
          <Text style={this.taskStyle()}>{this.state.task}</Text>
          <Text style={this.timerStyle()}>{this.state.minutes}:{this.state.seconds}</Text>
        </View>

        {/* TEXT INPUTS */}
        <View style={{ flexDirection: 'row' }}>
          <Text style={this.textNextToInputStyle()}>Set Work Timer: </Text>
          <View>
            <KeyboardAvoidingView>
              <TextInput
                keyboardType='numeric'
                style={styles.textBox}
                value={this.state.input}
                maxLength={2}
                placeholder='Minutes'
                placeholderTextColor='#c8c0c0'
                onChangeText={this.setWorkMinuteInput} />
            </KeyboardAvoidingView>
          </View>
          <View>
            <KeyboardAvoidingView>
              <TextInput
                keyboardType='numeric'
                style={styles.textBox}
                value={this.state.input}
                maxLength={2}
                placeholder='Seconds'
                placeholderTextColor='#c8c0c0'
                onChangeText={this.setWorkSecondInput} />
            </KeyboardAvoidingView>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={this.textNextToInputStyle()}>Set Break Timer: </Text>
          <View>
            <KeyboardAvoidingView>
              <TextInput
                keyboardType='numeric'
                style={styles.textBox}
                value={this.state.input}
                maxLength={2}
                placeholder='Minutes'
                placeholderTextColor='#c8c0c0'
                onChangeText={this.setBreakMinuteInput} />
            </KeyboardAvoidingView>
          </View>
          <View>
            <KeyboardAvoidingView>
              <TextInput
                keyboardType='numeric'
                style={styles.textBox}
                value={this.state.input}
                maxLength={2}
                placeholder='Seconds'
                placeholderTextColor='#c8c0c0'
                onChangeText={this.setBreakSecondInput} />
            </KeyboardAvoidingView>
          </View>
        </View>

        {/* START AND PAUSE BUTTON */}
        <View>
          <TouchableOpacity
            style={this.startpauseStyle()}
            onPress={this.tickInSeconds}>
            <Text style={styles.textInButton}>{this.state.startpause}</Text>
          </TouchableOpacity>
        </View>

        {/* RESET BUTTON */}
        <View>
          <TouchableOpacity
            style={styles.buttonPress}
            onPress={this.reset}>
            <Text style={styles.textInButton}>RESET</Text>
          </TouchableOpacity>

        </View>

      </View >
    )
  }
}

const styles = StyleSheet.create({

  textBox: {
    color: 'white',
    backgroundColor: 'grey',
    marginBottom: 25,
    flexDirection: 'row',
    textAlign: 'center',
    marginLeft: 5,
    marginHorizontal: 10,
    width: '90%',
    borderRadius: 50

  },

  buttonPress: {
    color: 'white',
    backgroundColor: '#273c75',
    width: 100,
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 50,
    margin: 10
  },

  textInButton: {
    textAlign: 'center',
    fontWeight: 'bold',
  }
})
