import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity, } from 'react-native';
import IP from "./Ipcim"
export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  szavazat=(szam)=>{
    //alert(szam)
    var bemenet={
      bevitel1:szam
    }

  fetch(IP.ipcim+"szavazatfelvitel", {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(y => alert(y));

  }


  componentDidMount(){
    return fetch(IP.ipcim+"kutya")
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
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 

          <View >
          
          <Image  source={{uri: IP.ipcim+item.kutya_kep}} style={{width:300,height:300,marginLeft:"auto",marginRight:"auto"}} /> 
          <Text style={{color:"brown",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >{item.tipus_nev} </Text> 
          <Text style={{color:"purple",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >{item.kutya_neme} </Text> 
          <Text style={{color:"blue",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >{item.kutya_datum} </Text>

          
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
    backgroundColor: "blue",
    padding: 10,
    width:250,
    marginLeft:"auto",
    marginRight:"auto",
  }
});
