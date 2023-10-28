import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonProgressBar,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  musicalNoteOutline,
  notificationsOutline,
  pauseCircle,
  playCircle,
  videocamOutline,
} from "ionicons/icons";

import "./Coursechapter.scss";
import { useState, useEffect, useRef } from "react";
import NotificationBell from "../../components/NotificationBell";

const Coursechapter: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<string>("Video");

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleDurationChange = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    setActiveSegment("Video");
  }, []);
  const segmentChanged = (e: any) => {
    console.log(activeSegment);
    setActiveSegment(e.detail.value);
  };
  return (
    <IonPage className="Coursechapter">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton color="dark" text={""} defaultHref="/mygroups" />
          </IonButtons>
          <IonTitle>Stretching & Loosening</IonTitle>
          <IonButtons slot="end">
            <IonButton slot="end" fill="clear">
              <NotificationBell />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="seg-holder">
          <IonSegment
            onIonChange={(e) => segmentChanged(e)}
            value={activeSegment as any}
          >
            <IonSegmentButton value={"Video"} className="first">
              <IonLabel className="flex al-center">
                {activeSegment === "Video" ? (
                  <IonIcon src="assets/imgs/icn-videoactive.svg" />
                ) : (
                  <IonIcon src="assets/imgs/icn-video.svg" />
                )}
                Video
              </IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value={"Audio"} className="second">
              <IonLabel className="flex al-center">
                {activeSegment === "Audio" ? (
                  <IonIcon src="assets/imgs/icn-audioactive.svg" />
                ) : (
                  <IonIcon src="assets/imgs/icn-audio.svg" />
                )}
                Audio
              </IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>

        {activeSegment === "Video" ? (
          <div>
            <div className="player-holder">
              <video
                ref={videoRef}
                src="assets/imgs/doctor.mp4"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleDurationChange}
              />

              <div className="player-toolbar">
                <IonRow>
                  <IonCol size="4" className="flex al-center">
                    <IonButton
                      fill="clear"
                      onClick={() => handleSeek(currentTime - 10)}
                    >
                      <IonIcon src="assets/imgs/icn-rewind.svg" />
                    </IonButton>
                  </IonCol>
                  <IonCol
                    size="4"
                    className="play-btn flex al-center jc-center"
                  >
                    <IonButton fill="clear" onClick={togglePlay}>
                      {isPlaying ? (
                        <IonIcon color="dark" icon={pauseCircle} />
                      ) : (
                        <IonIcon src="assets/imgs/icn-play.svg" />
                      )}
                    </IonButton>
                  </IonCol>
                  <IonCol size="4" className="flex al-center jc-end">
                    <IonButton
                      fill="clear"
                      onClick={() => handleSeek(currentTime + 10)}
                    >
                      <IonIcon src="assets/imgs/icn-ff.svg" />
                    </IonButton>
                  </IonCol>
                </IonRow>
              </div>

              <div className="status">
                <IonProgressBar value={currentTime / duration}></IonProgressBar>
                <div className="flex al-center jc-between jc-center">
                  <h6>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </h6>
                  <IonButton fill="clear">
                    <IonIcon src="assets/imgs/icn-fullscreen.svg" />
                  </IonButton>
                </div>
              </div>
            </div>
            <div className="details ion-padding-horizontal">
              <h2>Stretching & Loosening Exercises</h2>

              <IonItem lines="none">
                <div className="start-slot flex al-start " slot="start">
                  <IonAvatar>
                    <img src="assets/imgs/user.png" alt="" />
                  </IonAvatar>

                  <IonIcon
                    className="verify"
                    src="assets/imgs/icn-verify.svg"
                  />
                </div>
                <IonLabel>
                  <p>Created by</p>
                  <h6 className="ion-text-wrap">
                    <span>Dr. Ilca Wilhelm, MD,</span> Medical Specialist at the
                    University Clinic for Anesthesiology and Pain Medicine of
                    Inselspital, University Hospital Bern
                  </h6>
                </IonLabel>
              </IonItem>

              <div className="desc">
                <p className="ion-text-wrap">
                  When we wcperience pain, our body usually reatcs by increasing
                  muscle tension.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {activeSegment === "Audio" ? (
          <div>
            <div className="aplayer-holder">
              <div className="aplayer">
                <IonItem lines="none">
                  <div className="thumb" slot="start">
                    <img src="assets/imgs/doctor.png" alt="" />
                  </div>
                  <IonLabel className="ion-text-wrap">
                    Stretching & Loosening Exercises
                  </IonLabel>
                </IonItem>
                <div>
                  <div className="status ion-padding-top">
                    <div className="flex al-center jc-between ">
                      <IonProgressBar value={0.5}></IonProgressBar>{" "}
                      <h6>1:10 / 2.53</h6>
                    </div>
                  </div>
                  <div className="player-toolbar">
                    <IonRow className="ion-justify-content-center">
                      <IonCol size="4" className="flex al-center jc-end">
                        <IonButton fill="clear">
                          <IonIcon src="assets/imgs/icn-rewind.svg" />
                        </IonButton>
                      </IonCol>
                      <IonCol
                        size="4"
                        className="play-btn flex al-center jc-center"
                      >
                        <IonButton fill="clear">
                          <IonIcon src="assets/imgs/icn-play.svg" />
                        </IonButton>
                      </IonCol>
                      <IonCol size="4" className="flex al-center jc-start">
                        <IonButton fill="clear">
                          <IonIcon src="assets/imgs/icn-ff.svg" />
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </div>
                </div>
              </div>
              <div className="details ion-padding-horizontal">
                <h2>Stretching & Loosening Exercises</h2>

                <IonItem lines="none">
                  <div className="start-slot flex al-start " slot="start">
                    <IonAvatar>
                      <img src="assets/imgs/user.png" alt="" />
                    </IonAvatar>

                    <IonIcon
                      className="verify"
                      src="assets/imgs/icn-verify.svg"
                    />
                  </div>
                  <IonLabel>
                    <p>Created by</p>
                    <h6 className="ion-text-wrap">
                      <span>Dr. Ilca Wilhelm, MD,</span> Medical Specialist at
                      the University Clinic for Anesthesiology and Pain Medicine
                      of Inselspital, University Hospital Bern
                    </h6>
                  </IonLabel>
                </IonItem>

                <div className="desc ion-padding-top">
                  <p className="ion-text-wrap">
                    When we wcperience pain, our body usually reatcs by
                    increasing muscle tension.
                  </p>
                </div>
              </div>

              <div className="play-list ion-padding-horizontal">
                <IonItem lines="none" button  detail={false} >
                  <div className="thumb" slot="start">
                    <img src="assets/imgs/relax.png" alt="" />
                  </div>
                  <IonLabel>
                    <h3 className="ion-text-wrap">
                      Abdomen: Abdominal Breathing
                    </h3>
                    <div className="flex al-center jc-between">
                      <p>3 Minutes</p>
                      <IonButton fill="clear" color="dark">
                        <IonIcon icon={playCircle} />
                      </IonButton>
                    </div>
                  </IonLabel>
                </IonItem>
              </div>

              <div className="btn-holder ion-text-center ion-padding-vertical">
                <IonButton expand="block">Mark as Done</IonButton>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Coursechapter;
