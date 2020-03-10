import React, { useState, useEffect, Component }  from 'react';
import { Text, View, Button } from 'react-native';

export interface Props {

}

export default function meScreen() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    //document.title = `You clicked ${count} times`;
  });

  return (
    <View>
      <Text>publish</Text>
    </View>
  );
}