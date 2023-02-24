import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity, TextInput } from 'react-native';
const IP=require("./Ipcim")

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
        isLoading: true,
        szo:"",
        dataSource:[]
    }
  }

  szavazat=(szam)=>{
    //alert(szam)
    var bemenet={
      bevitel1:szam
    }

  fetch(IP.ipcim + "szavazatfelvitel", {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(y => alert(y));

  }


  componentDidMount(){
    return fetch(IP.ipcim + 'kutya')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  keres=()=>{
      //alert("hello")
      var bemenet={
        bevitel1:this.state.szo
      }
  
    fetch(IP.ipcim + "keres", {
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      }
    
    )
    .then(x => x.json())
    .then(y =>{
       //alert(JSON.stringify(y))
       this.setState({ dataSource : y })
      }
    );
  }

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
{/*-------------------------------------------------- Keresés */}
        <Text style={{color:"brown",fontSize:20,textAlign:"center",marginTop:50, marginLeft:20,marginRight:20}}>Add meg a keresendő szót:</Text>
        <TextInput
        style={{height: 40, marginLeft:20,marginRight:20}}
        placeholder="Szó megadása"
        onChangeText={(beirtszoveg)=>this.setState({szo:beirtszoveg})}
        value={this.state.szo}
      />
       <TouchableOpacity
        style={styles.kekgomb}
        onPress={ ()=>this.keres()}
      >
        <Text style={{color:"white",fontWeight:"bold",fontSize:15}}  >Keresés</Text>
      </TouchableOpacity>
{/*-------------------------------------------------- Találatok */}
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 

          <View >
          
          <Image  source={{uri: IP.ipcim + item.kutya_kep}} style={{width:300,height:300,marginLeft:"auto",marginRight:"auto"}} /> 
          <Text style={{color:"brown",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >{item.tipus_nev} </Text> 
          <Text style={{color:"purple",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >{item.kutya_neme} </Text> 
          <Text style={{color:"green",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >{item.kutya_datum} </Text>

          
          </View>
        
        }

        
          keyExtractor={({tipus_id}, index) => tipus_id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  kekgomb: {
    alignItems: "center",
    backgroundColor: "brown",
    padding: 10,
    width:250,
    marginLeft:"auto",
    marginRight:"auto",
  }
});
