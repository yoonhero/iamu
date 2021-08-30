import React, { useState, useEffect } from "react";
import { VideoInfoType } from "../hooks/Utils";
import { Image, useWindowDimensions } from "react-native";
import * as VideoThumbnails from "expo-video-thumbnails";
import styled from "styled-components/native";

const VideoContainer = styled.View`
  margin: 5px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.1);
`;

const VideoThumbnail = ({ item }: { item: VideoInfoType }) => {
  const { width, height } = useWindowDimensions();
  const [image, setImage] = useState("");
  let randomHeight = Math.ceil(Math.random() * ((height / 3) * 2));

  const getThumbanil = async () => {
    const { uri } = await VideoThumbnails.getThumbnailAsync(item?.uri, {
      time: 1000,
    });
    setImage(uri);
  };

  useEffect(() => {
    getThumbanil();
  }, []);

  return (
    <VideoContainer key={item.id}>
      <Image
        source={{
          uri:
            image != "" || image != undefined || image != null
              ? image
              : "https://www.solidbackgrounds.com/images/1920x1080/1920x1080-dark-pastel-blue-solid-color-background.jpg",
        }}
        style={{
          width: Math.ceil((width - 20) / 2),
          height:
            randomHeight > height / 4 && randomHeight < (height / 3) * 2
              ? randomHeight
              : height / 3,
          borderRadius: 20,
        }}
      />
    </VideoContainer>
  );
};

export default VideoThumbnail;
