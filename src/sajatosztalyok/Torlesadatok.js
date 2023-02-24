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
    return fetch(IP.ipcim+"adatoklekerdezese")
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

torles=(szam)=>{
alert(szam)

var bemenet={
  bevitel1:szam
 
}

fetch(IP.ipcim+"torles_adat", {
  method: "DELETE",
  body: JSON.stringify(bemenet),
  headers: {"Content-type": "application/json; charset=UTF-8"}
}

)
.then(x => x.text())
.then(y => {
alert(y)

fetch(IP.ipcim+"adatoklekerdezese")
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
          
          
          <Text style={{color:"brown",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   > Telefonszám: {item.adatok_telefonszam} </Text> 
          <Text style={{color:"purple",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   > Email cím: {item.adatok_emailcim} </Text> 
          <Text style={{color:"blue",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   > Üzenet:{item.adatok_uzenet} </Text>
          <Text style={{color:"blue",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >{item.adatok_kutyaid} </Text>
          <Text style={{color:"blue",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   > Dátum: {item.adatok_datum} </Text>

          <TouchableOpacity
        style={styles.kekgomb}
        onPress={async ()=>this.torles(item.adatok_id)}
      >
        <Text style={{color:"white",fontWeight:"bold",fontSize:15}}  >Törlés</Text>
      </TouchableOpacity>
          
          </View>
        
        }

        
          keyExtractor={({adatok_id}, index) => adatok_id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  kekgomb: {
    alignItems: "center",
    backgroundColor: "red",
    padding: 10,
    width:250,
    marginLeft:"auto",
    marginRight:"auto",
  }
});
