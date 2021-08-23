import React, { useRef, useEffect, useState, LegacyRef } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  TouchableHighlight,
} from "react-native";
import { Video } from "expo-av";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { VideoInfoType } from "../hooks/Utils";
import { Style } from "../styles";

export function VideoItem({
  item,
  offset,
  currentOffset,
  index,
  pageOffset,
}: {
  item: VideoInfoType;
  offset: number;
  currentOffset: number;
  index: number;
  pageOffset: number;
}): any {
  const styles = Style();
  const video = useRef(null) as LegacyRef<Video>;

  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (index == pageOffset && item.id == offset) {
      setPlay(true);
    } else {
      setPlay(false);
    }
  }, [offset, pageOffset]);

  useEffect(() => {
    if (item.id == currentOffset && index == pageOffset) {
      setPlay(true);
    }
  }, [pageOffset]);

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
            shouldPlay={play}
            source={{ uri: item.uri }}
            isMuted={!play}
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
