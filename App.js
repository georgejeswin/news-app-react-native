import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [news, setNews] = useState([]);

  useEffect(()=>{
    fetchData();
  },[])

  const newsURL = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=40a33e38941441608b99a34e7cee3160";

  const fetchData = async () => {
    try {
      const response = await fetch(newsURL);
      const json= await response.json();
      const newNews= await json.articles;
      setNews(newNews);
      console.log(news);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
      data={news}
        keyExtractor={(item,index)=>item.title}
        renderItem={({item})=>{
          return(
            <TouchableOpacity style={styles.itemContainer}>
                <View style={styles.item}>
                <Image source={{
                  uri:item.urlToImage,
                  width:Dimensions.get('window').width-50,
                  height:300,
                
                }}
                style={styles.img} />
                    <Text style={styles.text}>
                      {item.title}
                    </Text>
                  </View>
              </TouchableOpacity>
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop:50,
    backgroundColor:'#1a1a1a'
  },
  itemContainer:{
    width:Dimensions.get("window").width-50,
    height:400,
    alignItems:'center',
    justifyContent:'center'
  },
  item:{
    backgroundColor:'#333333',
    paddingBottom:20,
    borderRadius:30
  },
  img:{
    borderRadius:30
  },
  text:{
    marginTop:15,
    paddingHorizontal:20,
    color:'white'
  }
});
