/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  ImageBackground,
  View,
} from 'react-native';
import Input from './src/1.todo/input';


function App(): React.JSX.Element {

  return (
    <View style={{backgroundColor:'#0C0D0C',height:'100%'}} >
     
      <Input/>
      
    </View>
  );
}


export default App;
