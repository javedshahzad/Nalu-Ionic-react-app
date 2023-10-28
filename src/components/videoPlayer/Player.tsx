import '@vidstack/react/player/styles/default/theme.css';

import { useEffect, useRef, useState } from 'react';

import styles from './player.module.css';

import {
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  Poster,
  Track,
  type MediaCanPlayDetail,
  type MediaCanPlayEvent,
  type MediaPlayerInstance,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
  type MediaViewType,
} from '@vidstack/react';

import { AudioLayout } from './Layouts/audio-layout';
import { VideoLayout } from './Layouts/video-layout';

export function Player({url, video_thumbnail,source}) {

  let player = useRef<MediaPlayerInstance>(null),
    [src, setSrc] = useState(''),
    [viewType, setViewType] = useState<MediaViewType>('unknown');

  useEffect(() => {
    // Initialize src.
    changeSource(source);

    // Subscribe to state updates.
    return player.current!.subscribe(({ paused, viewType }) => {
      // console.log('is paused?', '->', paused);
      setViewType(viewType);
    });
  }, []);

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent,
  ) {
    // We can configure provider's here.
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  // We can listen for the `can-play` event to be notified when the player is ready.
  function onCanPlay(detail: MediaCanPlayDetail, nativeEvent: MediaCanPlayEvent) {
    // ...
  }

  function changeSource(type: string) {
    const muxPlaybackId = 'VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU';
    switch (type) {
      case 'audio':
        setSrc('https://media-files.vidstack.io/sprite-fight/audio.mp3');
        break;
      case 'video':
        setSrc(`https://stream.mux.com/${muxPlaybackId}/low.mp4`);
        break;
      case 'hls':
        setSrc(`https://stream.mux.com/${muxPlaybackId}.m3u8`);
        break;
    }
  }

  return (
    <>
      <MediaPlayer
        className={`${styles.player} media-player`}
        src={url}
        crossorigin
        onProviderChange={onProviderChange}
        onCanPlay={onCanPlay}
        ref={player}
      >
        <MediaProvider>
          {viewType === 'video' && (
            <Poster
              className={`${styles.poster} vds-poster`}
              src={video_thumbnail}
              alt=" "
            />
          )}
          
        </MediaProvider>

        {/* Layouts */}
        {viewType === 'audio' ? (
          <AudioLayout />
        ) : viewType === 'video' ? (
          <VideoLayout thumbnails={video_thumbnail}/>
        ) : null}
      </MediaPlayer>
    </>
  );
}