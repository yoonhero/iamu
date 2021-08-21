import { StatusBar } from "expo-status-bar";
import React, {
  useRef,
  useEffect,
  useState,
  LegacyRef,
  useCallback,
} from "react";
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
  TouchableHighlight,
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
  background-color: #000;
`;

function VideoData({
  item,
  offset,
  index,
  pageOffset,
}: {
  item: VideoItem;
  offset: number;
  index: number;
  pageOffset: number;
}): any {
  const video = useRef(null) as LegacyRef<Video>;

  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (index == pageOffset && item.id == offset + 1) {
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
      <TouchableHighlight
        onPress={() => setPlay(!play)}
        onLongPress={() => alert("like this content")}
        style={{ position: "relative" }}>
        <>
          <Video
            ref={video}
            shouldPlay={index == pageOffset && item.id == offset + 1}
            source={{ uri: item.uri }}
            isMuted={offset === item.id}
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
        </>
      </TouchableHighlight>
    </View>
  );
}

export default function App() {
  let data1: VideoItem[] = [
    {
      id: 1,
      title: "#animation",
      uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      description: "This animation ...",
    },
    {
      id: 2,
      title: "#animation",
      uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      description: "test test !!",
    },
    {
      id: 3,
      title: "#animation",
      uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      description: "w.w",
    },
  ];
  let data2: VideoItem[] = [
    {
      id: 1,
      title: "#nono",
      uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      description: "wow wowowowoowowow",
    },
    {
      id: 2,
      title: "#nono",
      uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      description: "i'm genius",
    },
    {
      id: 3,
      title: "#nono",
      uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      description: "hahaha",
    },
  ];
  let data3: VideoItem[] = [
    {
      id: 1,
      title: "#Movie",
      uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      description: "awesome!!",
    },
    {
      id: 2,
      title: "#Movie",
      uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      description: "I don't believe it",
    },
    {
      id: 3,
      title: "#Movie",
      uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      description: "wonderful",
    },
  ];
  let datas = [data1, data2, data3];

  const [flatlistOffset, setFlatlistOffset] = useState(0);
  const [offset, setOffset] = useState(0);
  const [flatlistsOffset, setFlatlistsOffset] = useState(0);
  const [pageOffset, setPageOffset] = useState(0);
  let pageIndex = 0;

  useEffect(() => {
    setOffset(Math.ceil(flatlistOffset / width));
  }, [flatlistOffset]);

  useEffect(() => {
    setPageOffset(Math.ceil(flatlistsOffset) / height);
  }, [flatlistsOffset]);

  const updateIndex = ({ viewableItems }: { viewableItems: any }) => {
    console.log(viewableItems);
    setOffset(viewableItems.id);
  };

  const renderFlatlist = ({
    item,
    index,
  }: {
    item: VideoItem[];
    index: number;
  }): any => {
    pageIndex = index;

    return (
      <FlatList<VideoItem>
        data={item}
        keyExtractor={(item: VideoItem) => String(item.id)}
        pagingEnabled={true}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal
        onScroll={(e) => {
          setFlatlistOffset(e.nativeEvent.contentOffset.x);
        }}
        removeClippedSubviews={true}
      />
    );
  };

  const renderItem = ({ item }: { item: VideoItem }): any => {
    return (
      <VideoData
        item={item}
        offset={offset}
        index={pageIndex}
        pageOffset={pageOffset}
      />
    );
  };

  return (
    <Main>
      <StatusBar style='auto' />
      <FlatList
        data={datas}
        keyExtractor={(item: VideoItem[], index: number) => String(index)}
        renderItem={renderFlatlist}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          setFlatlistsOffset(e.nativeEvent.contentOffset.y);
        }}
        removeClippedSubviews={true}
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
