import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity, Alert,Button } from 'react-native';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      gameState: [ 
      [0,0,0],
       [0,0,0],
        [0,0,0]
 
  ],
      currentPlayer: 1,
    }

    
  }
  componentDidMount()
  {
    this.initialiseGame();
  }
  initialiseGame=()=>{
  this.setState({gameState:
  [
      [0,0,0],
       [0,0,0],
        [0,0,0],
 ],
  currentPlayer: 1,
   });
  }

   getWinner = () =>{
     const num=3;
     var arr=this.state.gameState;
     var sum;
     for(var i=0;i<num;i++){
       sum=arr[i][0]+arr[i][1]+arr[i][2];
       if(sum==3){return 1;
       }
       else if(sum==-3){return -1;}
     }

     for(var j=0;j<num;j++){
       sum=arr[0][j]+arr[1][j]+arr[2][j];
       if(sum==3){return 1;
       }
       else if(sum==-3){return -1;}
     }

    
      sum=arr[0][0]+arr[1][1]+arr[2][2];
       if(sum==3){return 1;
       }
       else if(sum==-3){return -1;}
       sum=arr[2][0]+arr[1][1]+arr[0][2];
       if(sum==3){return 1;
       }
       else if(sum==-3){return -1;}
     return 0;

   }
   onNewGame=()=>{this.initialiseGame();}

  onTilePress=(row,col)=>{
    var value=this.state.gameState[row][col];
    if(value!==0){return; }
      var currentPlayer=this.state.currentPlayer;
      var arr=this.state.gameState.slice();
      arr[row][col]=currentPlayer;
      this.setState({gameState: arr});

      var nextPlayer=(currentPlayer == 1) ? -1 : 1;
      this.setState({currentPlayer: nextPlayer});

      var winner=this.getWinner();
      if(winner==1){Alert.alert("1st player has won the game");
      this.initialiseGame();
      }
      else if(winner==-1){Alert.alert("2nd player has won the game");
      this.initialiseGame();}
     
  }

  renderIcon=(row,col)=>{
    var value=this.state.gameState[row][col];
    switch(value)
    {
        case 1:return <Icon name="close" style={styles.tileX}/>;
        case -1:return <Icon name="circle-outline" style={styles.tileO}/>;
        default:return <View/>;
    }
  }
  render() {
    return (
      <View style={styles.container}>
      <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress={()=>this.onTilePress(0,0)} style={[styles.tile,{borderLeftWidth:0,borderTopWidth:0}]}>
        {this.renderIcon(0,0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.onTilePress(0,1)} style={[styles.tile,{borderTopWidth:0}]}>
        {this.renderIcon(0,1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.onTilePress(0,2)} style={[styles.tile,{borderTopWidth:0,borderRightWidth:0}]}>
        {this.renderIcon(0,2)}
        </TouchableOpacity>
        </View>
         <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress={()=>this.onTilePress(1,0)}  style={[styles.tile,{borderLeftWidth:0}]}>
        {this.renderIcon(1,0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.onTilePress(1,1)} style={styles.tile}>
        {this.renderIcon(1,1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.onTilePress(1,2)}  style={[styles.tile,{borderRightWidth:0}]}>
        {this.renderIcon(1,2)}
        </TouchableOpacity>
        </View>
         <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress={()=>this.onTilePress(2,0)} style={[styles.tile,{borderLeftWidth:0,borderBottomWidth:0}]}>
        {this.renderIcon(2,0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.onTilePress(2,1)}  style={[styles.tile,{borderBottomWidth:0}]}>
        {this.renderIcon(2,1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.onTilePress(2,2)}  style={[styles.tile,{borderRightWidth:0,borderBottomWidth:0}]}>
        {this.renderIcon(2,2)}
        </TouchableOpacity>
        </View>
        <Button title="start" onPress={this.onNewGame}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    alignItems:'center',
  
  },
  tile:{
    borderWidth:1,
    width:100,
    height:100,
  },
  tileX:{
  fontSize:80,
 
},
tileO:{
  fontSize:60,
 
  
}
});
