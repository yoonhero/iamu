import React, { useRef, useEffect, useState, LegacyRef } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  TouchableHighlight,
  useWindowDimensions,
} from "react-native";
import { Video } from "expo-av";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { VideoInfoType } from "../hooks/Utils";
import { Style } from "../styles";
import { useNavigation } from "@react-navigation/native";

export function VideoItem({
  item,
  offset,
  currentOffset,
  index,
  pageOffset,
  navigation,
}: {
  item: VideoInfoType;
  offset: number;
  currentOffset: number;
  index: number;
  pageOffset: number;
  navigation: any;
}): any {
  const styles = Style();
  const video = useRef(null) as LegacyRef<Video>;

  const [play, setPlay] = useState(false);
  const { width, height } = useWindowDimensions();

  const goToProfile = () => {
    setPlay(false);
    navigation.navigate("Profile");
  };

  const goToVideos = () => {
    setPlay(false);
    navigation.navigate("Videos", {
      topic: item?.title,
    });
  };

  useEffect(() => {
    const focused = navigation.addListener("focus", () => {
      if (index == pageOffset && item.id == offset) {
        setPlay(true);
      } else {
        setPlay(false);
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return focused;
  }, [navigation]);

  useEffect(() => {
    if (index == pageOffset && item.id == offset) {
      setPlay(true);
    } else {
      setPlay(false);
    }
  }, [offset, pageOffset, navigation]);

  useEffect(() => {
    if (item.id == currentOffset && index == pageOffset) {
      setPlay(true);
    }
  }, [pageOffset]);

  useEffect(() => {
    if (video == null || video == undefined) {
      return;
    }
    if (play) {
      video?.current?.playAsync();
    } else {
      video?.current?.pauseAsync();
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
            shouldPlay={play}
            source={{ uri: item?.uri }}
            isMuted={!play}
            resizeMode='cover'
            isLooping={true}
            style={{
              width: width,
              height: height,
              flex: 1,
            }}
          />
          <View style={styles.header}>
            <TouchableOpacity onPress={() => goToVideos()}>
              <Text style={{ color: "#fff", fontWeight: "600", fontSize: 20 }}>
                {item?.title}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mainContainer}>
            <View style={styles.innerLeft}>
              <View style={styles.dataContainer}>
                <Text style={styles.description} numberOfLines={4}>
                  {item?.description}
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
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => goToProfile()}>
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
