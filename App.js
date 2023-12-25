import { StatusBar } from 'expo-status-bar';
import { Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useEffect, useState } from 'react';
import Tts from 'react-native-tts';
import Clipboard from '@react-native-clipboard/clipboard';
import Snackbar from 'react-native-snackbar'

Tts.setDefaultLanguage('en-GB');
Tts.setDefaultVoice('com.apple.ttsbundle.Moira-compact');
Tts.setDefaultRate(0.5);
Tts.setDefaultPitch(1.2);


export default function App() {
  const [Quote,setQuote] = useState('Loading..');
  const [Author,setAuthor] = useState('Loading...');
  const [isLoading,setIsLoading] = useState(false);
  console.log(hello);
  const randomQuote = ()=>{
    setIsLoading(true);
    fetch("https://api.quotable.io/random").then(res=>res.json()).then(result=>{
      console.log(result.content);
      setQuote(result.content);
      setAuthor(result.author);
      setIsLoading(false);
    })
  }
  useEffect(()=>{
    randomQuote();
  },[]);
  const speakNow=()=>{
    Tts.stop();
    Tts.speak( Quote + 'by' + Author);
  }

  const copyToClipboard=()=>{
    Clipboard.setString(Quote);
    Snackbar.show({
      text:'Quote copied!',
      duration:Snackbar.LENGTH_SHORT,
    })
  }
  const tweetNow =()=>{
    const url =`whatsapp://send?text=${encodeURIComponent(Quote)}`;
    Linking.openURL(url);
  }
  const facebooknow =()=>{
    const url =`fb://post?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"/>
      <View style={styles.quote}>
        <Text  style={{textAlign:'center',fontSize:'600',color:'#333',marginBottom:20}}>Quote of the Day</Text>
        <FontAwesome5 name='quote-left' style={{fontSize:20,marginBottom:-12}} color='#000'/>
            <Text style={{color:'#000',fontSize:16,lineHeight:26,letterSpacing: 1.1,fontWeight:'400',textAlign:'center',marginBottom:10,paddingHorizontal:30}}>
               {Quote}
            </Text>
        <FontAwesome5 name='quote-right' style={{fontSize:18,marginTop:-20,marginBottom:20 }} color='#000'/>
          
        <Text style={{textAlign:'right',fontWeight:'300',fontStyle:'italic',fontSize:16,color:'#000'}}>--{Author}</Text>
        <TouchableOpacity onPress={randomQuote} style={{backgroundColor:isLoading?'rgb(111, 140, 179,0.7)':'rgb(111, 140, 179,1)',padding:20,borderRadius:30,marginVertical:20}}>
            <Text style={{color:'#fff',fontSize:18,textAlign:'center'}}>
              {isLoading?'Loading...':'New Quote'}
              </Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
          <TouchableOpacity onPress={speakNow} style={{borderWidth:2,borderColor:'rgb(111, 140, 179)',borderRadius:50,padding:15}}>
            <FontAwesome name='volume-up' size={22} color={rgb(111, 140, 179)} />
          </TouchableOpacity>

          <TouchableOpacity onPress={copyToClipboard} style={{borderWidth:2,borderColor:'rgb(111, 140, 179)',borderRadius:50,padding:15}}>
            <FontAwesome5 name='copy' size={22} color={rgb(111, 140, 179)} />
          </TouchableOpacity>

          <TouchableOpacity onPress={tweetNow} style={{borderWidth:2,borderColor:'rgb(111, 140, 179)',borderRadius:50,padding:15}}>
            <FontAwesome name='whatsapp' size={22} color={rgb(111, 140, 179)} />
          </TouchableOpacity>

          <TouchableOpacity onPress={facebooknow} style={{borderWidth:2,borderColor:'rgb(111, 140, 179)',borderRadius:50,padding:15}}>
            <FontAwesome name='facebook' size={22} color={rgb(111, 140, 179)} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(111, 140, 179)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quote:{
    width:'90%',
    backgroundColor:"pink",
    borderRadius:20,
    padding:20
  }
});


// npm install --global eas-cli &&
//  npx create-expo-app quote-app &&
//   cd quote-app && 
//   eas init --id 5c66f8a6-5e6f-4778-b94c-134556386062

//   To run your project, navigate to the directory and run one of the following npm commands.

// - cd quote-app
// - npm run android
// - npm run ios # you need to use macOS to build the iOS project - use the Expo app if you need to do iOS development without a Mac
// - npm run web