import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useEffect } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { VideoInfoType } from "./Utils";
import { VideoItem } from "./components/Video";

const { width, height } = Dimensions.get("window");

interface FlatlistType {
  data: VideoInfoType[];
  offset: number;
}

let data1: VideoInfoType[] = [
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
let data2: VideoInfoType[] = [
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
let data3: VideoInfoType[] = [
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

let datas = [
  { data: data1, offset: 1 },
  { data: data2, offset: 1 },
  { data: data3, offset: 1 },
];

export default function App() {
  // the offset of the horizontal flatlist item
  const [flatlistOffset, setFlatlistOffset] = useState(0);

  // the offset of the vertical flatlist's flatlist
  const [flatlistsOffset, setFlatlistsOffset] = useState(0);

  useEffect(() => {
    datas[flatlistsOffset].offset = flatlistOffset + 1;
  }, [flatlistOffset]);

  const renderVideo = useCallback(
    (item: VideoInfoType, offset: number, pageIndex: number): any => {
      console.log(
        "PageIndex",
        pageIndex,
        flatlistsOffset,
        "Offset",
        offset,
        flatlistOffset
      );
      return (
        <VideoItem
          item={item}
          offset={flatlistOffset}
          currentOffset={offset}
          index={pageIndex}
          pageOffset={flatlistsOffset}
        />
      );
    },
    [flatlistsOffset, flatlistOffset, datas]
  );

  const renderFlatlist = useCallback(
    ({ item, index }: { item: FlatlistType; index: number }): any => {
      let pageIndex = index;
      let currentOffset = item.offset;
      return (
        <FlatList<VideoInfoType>
          data={item.data}
          keyExtractor={(item: VideoInfoType) => String(item.id)}
          pagingEnabled={true}
          renderItem={({ item }: { item: VideoInfoType }) =>
            renderVideo(item, currentOffset, pageIndex)
          }
          horizontal={true}
          onScroll={(e) => {
            setFlatlistOffset(Math.ceil(e.nativeEvent.contentOffset.x / width));
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      );
    },
    [flatlistsOffset, flatlistOffset, datas]
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar style='auto' />
      <FlatList
        data={datas}
        keyExtractor={(item: FlatlistType, index: number) => String(index)}
        renderItem={renderFlatlist}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          setFlatlistsOffset(Math.ceil(e.nativeEvent.contentOffset.y / height));
        }}
        removeClippedSubviews={true}
      />
    </View>
  );
}
