import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { render } from 'react-dom';
import {BarCodeScanner} from 'expo-barcode-scanner'
import * as Permission from 'expo-permissions'


export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermission:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal',
            scannedBookId:'',
            scannedStudentId:''
        }
    }
    getCameraPermission=async(id)=>{
const {status}=await Permissions.askAsync(Permissions.CAMERA);
this.setState({
    hasCameraPermission:status==='granted',
    scanned:false,
    buttonState:id
})
    }
    handleBarCodeScanned=async({type,data})=>{
        this.setState({scanned:true,scannedData:data, buttonState:'normal'})
    }
    render(){
        const hasCameraPermission=this.state.hasCameraPermission;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState;
        if(buttonState==='clicked' && hasCameraPermission){
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned ? undefined:this.handleBarCodeScanned}
style={StyleSheet.absoluteFillObject}
                ></BarCodeScanner>
            )
        }
        else if(buttonState ==='normal'){
    return(

        <View> 
            <View>
                <Image
                source ={require ('../assets/booklogo.jpg')}
                style={{width:200,height:200}}
                />
                <Text
                style={{textAlign:'center',fontSize:30}}
                >Wily</Text>
            </View>
            <Text> {
                hasCameraPermission===true ? this.state.scannedData:'request camera permission'
                } </Text>
                <View>
<TextInput
placeholder='Book Id'
value={this.state.scannedBookId}
></TextInput>
               
    <TouchableOpacity
    onPress={()=>{this.getCameraPermission('BookId')}}
    >

        <Text>Scan</Text>
    </TouchableOpacity>
        </View>
        <View>
<TextInput
placeholder='Student Id'
value={this.state.scannedStudentId}
></TextInput>
               
    <TouchableOpacity
    onPress={()=>{this.getCameraPermission('StudentId')}}

    >

        <Text>Scan</Text>
    </TouchableOpacity>
        </View>  
        </View>
    )}
}}