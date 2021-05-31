import * as React from "react"; 
import { Button, Image, View, Platform } from "react-native"; 
import * as ImagePicker from "expo-image-picker"; 
import * as Permissions from "expo-permissions";

export default class Gallery extends React.Component{
    constructor(){
        super();
        this.state={
            image:null,
        }
    }
    getPermission=async()=>{
        if(Platform.os !== 'web'){
            const{status}=await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if(status !== "granted"){
                alert("Sorry we need permission to make this work")
            }
        }
    }
    componentDidMount(){
        this.getPermission();
    }
    pickImage=async()=>{
        try{
            var result= await ImagePicker.launchImageLibraryAsync({

                mediaTypes:ImagePicker.MediaTypeOptions.All,
                allowsEditing:true,
                aspect:[4,3],
                quality:1
            })
            if(!result.cancelled){
                this.setState({image:result.data});
                this.uploadImage(result.uri)
            }
        }
        catch(e){
            console.log(e);
        }
    }
    uploadImage=async(uri)=>{
        const data=new FormData();
        var fileName= uri.split("/")[uri.split("/").length - 1]
        var type= `image/${uri.split('.')[uri.split('.').length - 1]}`
        const fileToUpload={
            uri:uri,
            name:fileName,
            type:type,

        }
        data.append("digit", fileToUpload);
        fetch("https://f292a3137990.ngrok.io/predict-digit", {
            method:"POST",
            body:data,
            headers:{
                "content-type":"multipart/form-data"
                
            }
        })
        .then((Response)=>Response.json()).then((result)=>{
            console.log("Success: ", result)
        })
        .catch((error)=>{
            console.log("error", error)
        })
    }
    
    render(){
        return(
            <View style={{marginTop:500, alignItems:"center", justifyContent:"center"}}>
                <Button color="black" title="Click Me" onPress={this.pickImage()}/>
            </View>
        )
    }
}