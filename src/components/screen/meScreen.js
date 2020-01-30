import React, { useState, useEffect, Component }  from 'react';
import { Text, View, Button } from 'react-native';
function meScreen(props) {
  const [count, setCount] = useState(0);
  
  // Similar to componentDidMount and componentDidUpdate:
  
  useEffect(() => {
    //console.log(props.navigation.setParams({title: '我的'}))
  });

  return (
    <View>
      <Text>You clicked {count} times</Text>
        <Button title="click me" onPress={() => setCount(count + 1)}>
      </Button>
    </View>
  );
}
export default meScreen