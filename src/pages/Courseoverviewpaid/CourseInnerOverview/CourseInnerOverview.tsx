import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRippleEffect,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  add,
  menuOutline,
  notificationsOutline,
  searchOutline,
} from "ionicons/icons";

import "./CourseInnerOverview.scss";
import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";
import ReactPlayer from "react-player";
import img from "../../../Images/Ellipse 11.png";
import seal from "../../../Images/SealCheck.png";
import img2 from "../../../Images/image 4.png";
import img3 from "../../../Images/image 3.png";

import videoIcon from "../../../Icons/Videocamera.png";
import audioIcon from "../../../Icons/Music Note.png";
import playCircle from "../../../Icons/Play Circle.jpg";

import Thumbnail from "../Thumbnail";
import AudioPlayer from "../AudioPlayes";
import audioFile from "../../../audio/testing.mp4";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { Suspense, startTransition } from "react";
import "@vidstack/react/player/styles/default/theme.css";

import {
  MediaPlayer,
  MediaProvider,
  Poster,
  type MediaPlayerInstance,
} from "@vidstack/react";
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import axios from "axios";

const CourseInnerOverview: React.FC = () => {
  const history = useHistory();
  const { t, i18n, ready } = useTranslation();
  const [togglePlay, setTogglePlay] = useState("video");
  const [courseData, setCourseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData(27);
  }, []);

  const handleVideoClick = (value) => {
    setTogglePlay(value);
  };
  const handleLanguageChange = () => {
    // i18next.changeLanguage('de');
    // localStorage.setItem("language",'de')
    //  history.push('/configcycle')
  };

  const getData = (id) => {
    console.log;
    setIsLoading(true);
    try {
      axios
        .get(`https://app.mynalu.com/wp-json/nalu-app/v1/course-step/${id}`)
        .then((response) => {
          console.log(response.data);
          setCourseData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      {isLoading ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <IonSpinner name="crescent"></IonSpinner>
          </div>
        </>
      ) : (
        <>
          <IonPage className="CourseInnerOverview">
            <IonHeader className="ion-no-border">
              <IonToolbar>
                <IonButtons slot="start">
                  <IonBackButton
                    color="dark"
                    text={""}
                    defaultHref="/tabs/tab2"
                  />
                </IonButtons>
                <IonTitle>{courseData?.title}</IonTitle>
                <IonButtons slot="end">
                  <IonButton color="dark">
                    <IonIcon icon={notificationsOutline} />
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
              <div className="main_div">
                <div className="player_div">
                  {togglePlay === "video" && courseData?.video_url ? (
                    <MediaPlayer className="player" src={courseData?.video_url}>
                      <MediaProvider>
                        <DefaultVideoLayout
                          thumbnails={courseData?.video_thumbnail}
                          icons={defaultLayoutIcons}
                        />
                      </MediaProvider>
                    </MediaPlayer>
                  ) : (
                    <>
                      <div className="audio_player_div">
                        <IonGrid>
                          <IonRow>
                            <IonCol size="6">
                              <img src={img3} alt="" />
                            </IonCol>
                            <IonCol size="6">
                              <div className="title">
                                <h3>{courseData?.title}</h3>
                              </div>
                            </IonCol>
                          </IonRow>
                        </IonGrid>

                        <ReactPlayer
                          url={courseData?.audio_url}
                          config={{
                            file: {
                              forceAudio: true,
                            },
                          }}
                          height="100px"
                          playing={false}
                          controls={true}
                        />
                      </div>
                    </>
                  )}

                  <div className="playbuttons ">
                    <div
                      className={`video_span togglePlay ${
                        togglePlay === "video" ? "active" : ""
                      }`}
                      onClick={() => handleVideoClick("video")}
                    >
                      <img src={audioIcon} alt="" />
                      <span>Video</span>
                    </div>
                    <div
                      className={`audio_span togglePlay ${
                        togglePlay === "audio" ? "active" : ""
                      }`}
                      onClick={() => handleVideoClick("audio")}
                    >
                      <img src={audioIcon} alt="" />
                      <span>Audio</span>
                    </div>
                  </div>
                </div>
                <div className="title">
                  <h3>{courseData?.ttile}</h3>
                </div>
                <IonGrid>
                  <IonRow>
                    <IonCol size="3">
                      <div className="img_relative">
                        <div className="img_absolute">
                          <img src={courseData?.authority?.image} />
                        </div>
                      </div>
                    </IonCol>
                    <IonCol size="9">
                      <div className="align_col">
                        <div className="createdby">Created By</div>
                        <div className="message">
                          <span> {courseData?.authority?.title}, </span>
                          {courseData?.authority?.description}
                        </div>
                      </div>
                    </IonCol>
                  </IonRow>
                </IonGrid>
                <div className="paragraph">
                  {courseData?.authority?.content}
                </div>
                <IonGrid>
                  {courseData?.chapter_exercises?.map((item, index) => (
                    <IonRow key={index}>
                      <IonCol size="5">
                        <img
                          style={{
                            borderRadius: "30px",
                            height: "73px",
                            width: "90%",
                          }}
                          src={item.link_image}
                          alt={item.title}
                        />
                      </IonCol>
                      <IonCol size="7">
                        <div className="paragraph_2">{item.title}</div>
                        <div className="align_justify">
                          <span>{""}</span>
                          <span>
                            <img src={playCircle} alt="" />
                          </span>
                        </div>
                      </IonCol>
                    </IonRow>
                  ))}
                </IonGrid>

                <div className="btn-holder ion-text-center ion-padding-vertical">
                  <IonButton
                    expand="block"
                    onClick={() => handleLanguageChange()}
                  >
                    {"Mark as Done"}
                  </IonButton>
                </div>
              </div>
            </IonContent>
          </IonPage>
        </>
      )}
    </>
  );
};

export default CourseInnerOverview;
