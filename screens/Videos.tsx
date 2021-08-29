// Videos 2 columns
import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components/native";
import { VideoInfoType } from "../hooks/Utils";
import { FlatList, useWindowDimensions } from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import { Video } from "expo-av";

const Main = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const VideoContainer = styled.View`
  margin: 5px;
  border-radius: 20px;
  background: black;
`;

const data1: VideoInfoType[] = [
  {
    id: 0,
    title: "#animation",
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description: "This animation ...",
  },
  {
    id: 1,
    title: "#animation",
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description: "test test !!",
  },
  {
    id: 2,
    title: "#animation",
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description: "w.w",
  },
];
const data2: VideoInfoType[] = [
  {
    id: 3,
    title: "#nono",
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description: "wow wowowowoowowow",
  },
  {
    id: 4,
    title: "#nono",
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    description: "i'm genius",
  },
  {
    id: 5,
    title: "#nono",
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    description: "hahaha",
  },
];
const data3: VideoInfoType[] = [
  {
    id: 6,
    title: "#Movie",
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    description: "awesome!!",
  },
  {
    id: 7,
    title: "#Movie",
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    description: "I don't believe it",
  },
  {
    id: 8,
    title: "#Movie",
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    description: "wonderful",
  },
];

let dataArray = [...data1, ...data2, ...data3];

const Videos = ({ navigation }: { navigation: any }) => {
  const [datas, setDatas] = useState(dataArray);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    setDatas(dataArray);
  }, [dataArray]);

  const renderVideo = useCallback(
    ({ item }: { item: VideoInfoType }) => {
      let randomHeight = Math.ceil(Math.random() * ((height / 3) * 2));
      return (
        <VideoContainer key={item.id}>
          <Video
            shouldPlay={false}
            source={{ uri: item?.uri }}
            isMuted={true}
            resizeMode='cover'
            style={{
              width: Math.ceil((width - 20) / 2),
              height:
                randomHeight > height / 4 && randomHeight < height / 2
                  ? randomHeight
                  : height / 3,
              borderRadius: 20,
            }}
          />
        </VideoContainer>
      );
    },
    [datas]
  );

  return (
    <Main>
      <MasonryList
        data={datas}
        numColumns={2}
        renderItem={renderVideo}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
      />
    </Main>
  );
};

export default Videos;
