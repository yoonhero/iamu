import React, { useState, useCallback, useEffect } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import { VideoInfoType } from "../hooks/Utils";
import { VideoItem } from "../components/VideoItem";

interface FlatlistType {
  data: VideoInfoType[];
  offset: number;
}

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
    id: 0,
    title: "#nono",
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description: "wow wowowowoowowow",
  },
  {
    id: 1,
    title: "#nono",
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    description: "i'm genius",
  },
  {
    id: 2,
    title: "#nono",
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    description: "hahaha",
  },
];
const data3: VideoInfoType[] = [
  {
    id: 0,
    title: "#Movie",
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    description: "awesome!!",
  },
  {
    id: 1,
    title: "#Movie",
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    description: "I don't believe it",
  },
  {
    id: 2,
    title: "#Movie",
    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    description: "wonderful",
  },
];

let dataArray = [
  { data: data1, offset: 0 },
  { data: data2, offset: 0 },
  { data: data3, offset: 0 },
];

// Object {
//   "addListener": [Function addListener],
//   "canGoBack": [Function canGoBack],
//   "dispatch": [Function dispatch],
//   "getParent": [Function getParent],
//   "getState": [Function anonymous],
//   "goBack": [Function anonymous],
//   "isFocused": [Function isFocused],
//   "navigate": [Function anonymous],
//   "pop": [Function anonymous],
//   "popToTop": [Function anonymous],
//   "push": [Function anonymous],
//   "removeListener": [Function removeListener],
//   "replace": [Function anonymous],
//   "reset": [Function anonymous],
//   "setOptions": [Function setOptions],
//   "setParams": [Function anonymous],
// }

export default function VerNhorScrollVideo({
  navigation,
}: {
  navigation: any;
}) {
  // useEffect(() => {
  //   console.log(navigation);
  // }, []);

  const { width, height } = useWindowDimensions();
  // the offset of the horizontal flatlist item
  const [horizontalOffset, setHorizontalOffset] = useState(0);

  // the offset of the vertical flatlist's flatlist
  const [verticalOffset, setVerticalOffset] = useState(0);
  const [datas, setDatas] = useState(dataArray);

  useEffect(() => {
    let dataArr = datas;
    if (dataArr.length > verticalOffset) {
      dataArr[verticalOffset].offset = horizontalOffset;
    }
    setDatas(dataArr);
  }, [horizontalOffset]);

  useEffect(() => {
    const dataArr = datas;
    if (dataArr.length > verticalOffset) {
      setHorizontalOffset(dataArr[verticalOffset].offset);
    }
    setDatas(dataArr);
  }, [verticalOffset]);

  const getVerticalItem = useCallback(
    (data: any, index: number) => ({
      length: height,
      offset: height * index,
      index,
    }),
    []
  );
  const getHorizontalItem = useCallback(
    (data: any, index: number) => ({
      length: height,
      offset: width * index,
      index,
    }),
    []
  );

  const renderVideo = useCallback(
    (item: VideoInfoType, offset: number, pageIndex: number): any => {
      return (
        <VideoItem
          item={item}
          offset={horizontalOffset}
          currentOffset={offset}
          index={pageIndex}
          pageOffset={verticalOffset}
          navigation={navigation}
        />
      );
    },
    [horizontalOffset, verticalOffset, navigation]
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
            setHorizontalOffset(
              Math.ceil(e.nativeEvent.contentOffset.x / width)
            );
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          legacyImplementation={true}
          windowSize={1}
          initialNumToRender={2}
        />
      );
    },
    [horizontalOffset, verticalOffset, datas]
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <FlatList
        data={datas}
        keyExtractor={(item: FlatlistType, index: number) => String(index)}
        renderItem={renderFlatlist}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          setVerticalOffset(Math.ceil(e.nativeEvent.contentOffset.y / height));
        }}
        removeClippedSubviews={true}
        legacyImplementation={true}
        windowSize={1}
        initialNumToRender={2}
      />
    </View>
  );
}
