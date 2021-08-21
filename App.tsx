import { StatusBar } from "expo-status-bar";
import React, { useRef, useEffect, useState, LegacyRef } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Image,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");

interface VideoItem {
  id: number;
  uri: string;
  title: string;
  description: string;
}

const Main = styled.View`
  flex: 1;
`;

function VideoData({ item, offset }: { item: VideoItem; offset: number }): any {
  const video = useRef(null) as LegacyRef<Video>;

  const [play, setPlay] = useState(false);
  useEffect(() => {
    if (item.id == offset + 1) {
      setPlay(true);
    } else {
      setPlay(false);
    }
  }, [offset]);
  useEffect(() => {
    if (video == null || video == null) {
      return;
    }
    if (play) {
      video.current.playAsync();
    } else {
      video.current.pauseAsync();
    }
  }, [play]);
  return (
    <View key={item.id}>
      <TouchableOpacity
        onPress={() => setPlay(!play)}
        style={{ position: "relative" }}>
        <Video
          ref={video}
          source={{ uri: item.uri }}
          isMuted={offset !== item.id}
          resizeMode='cover'
          isLooping={true}
          style={styles.video}
        />
        <View style={styles.header}>
          <Text style={{ color: "#fff", fontWeight: "600", fontSize: 20 }}>
            {item.title}
          </Text>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.innerLeft}>
            <View style={styles.dataContainer}>
              <Text style={styles.description} numberOfLines={4}>
                {item.description}
              </Text>
            </View>
          </View>

          <View style={styles.innerRight}>
            <ImageBackground
              source={{
                uri: "http://drive.google.com/uc?export=view&id=1BDK19ybygCB13Ep6eLE2WzU7Q8vuEdnk",
              }}
              style={styles.profile}
              borderRadius={25}>
              <TouchableOpacity style={styles.btn}>
                <Icon name='ios-add' color='#fff' size={15} />
              </TouchableOpacity>
            </ImageBackground>

            <Icon name='ios-heart' size={45} color='#fff' />
            <Text style={{ color: "#fff", marginBottom: 25 }}>1234</Text>

            <Icon2 name='comment' size={45} color='#fff' />
            <Text style={{ color: "#fff", marginBottom: 25 }}>1234</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  let data: VideoItem[] = [
    {
      id: 1,
      title: "#animation",
      uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      description:
        "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
    },
    {
      id: 2,
      title: "#nono",
      uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      description:
        "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
    },
    {
      id: 3,
      title: "#Movie",
      uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      description: "z.z",
    },
  ];

  const [flatlistOffset, setFlatlistOffset] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setOffset(Math.ceil(flatlistOffset / height));
  }, [flatlistOffset]);

  function renderItem({ item }: { item: VideoItem }): any {
    return <VideoData item={item} offset={offset} />;
  }

  return (
    <Main>
      <StatusBar style='auto' />
      <FlatList<VideoItem>
        data={data}
        keyExtractor={(item: VideoItem) => String(item.id)}
        pagingEnabled={true}
        renderItem={renderItem}
        onScroll={(e) => {
          setFlatlistOffset(e.nativeEvent.contentOffset.y);
        }}
      />
    </Main>
  );
}

const styles = StyleSheet.create({
  video: {
    height: height,
    width: width,
  },
  header: {
    width: width,
    height: 100,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top: 0,
  },
  text: {
    color: "#fff",
    fontSize: 17,
    marginRight: 15,
  },
  mainContainer: {
    height: "40%",
    flexDirection: "row",
    width: width,
    position: "absolute",
    bottom: 20,
  },
  innerLeft: {
    width: "80%",
    height: "100%",
  },
  innerRight: {
    width: "20%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  profile: {
    height: 50,
    width: 50,
    alignItems: "center",
    marginBottom: 25,
  },
  btn: {
    backgroundColor: "#ff5b77",
    width: 20,
    height: 20,
    borderRadius: 10,
    elevation: 5,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: -10,
  },
  dataContainer: {
    height: "100%",
    justifyContent: "flex-end",
    width: "100%",
    position: "absolute",
    bottom: 0,
    padding: 15,
  },
  title: {
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    color: "#e5e5e5",
    fontSize: 16,
    fontWeight: "500",
  },
});
