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
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
  useIonViewWillLeave,
  isPlatform,
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
import playCircle from "../../../Icons/play.svg";

import Thumbnail from "../Thumbnail";
import AudioPlayer from "../AudioPlayes";
import audioFile from "../../../audio/testing.mp4";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { Suspense, startTransition } from "react";
import "@vidstack/react/player/styles/default/theme.css";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import axios from "axios";
import { HTTP } from "@awesome-cordova-plugins/http";
import { useLocation } from "react-router-dom";
import { Player } from "./../../../components/videoPlayer/Player";
import {
  fetchChapter,
  fetchCourses,
  fetchNextChapter,
} from "../../../actions/courseActions";
import { useDispatch, useSelector } from "react-redux";

const CourseInnerOverview: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const data: any = location?.state;

  const courseId = data?.course_id;
  const dispatch = useDispatch();
  // const [courseId, setCourseId] = useState(data?.course_id);

  const [togglePlay, setTogglePlay] = useState("video");
  const [courseData, setCourseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [videoPlayed, setVideoPlayed] = useState(false);
  const [ismarkLoading, setIsMarlLoading] = useState(false);
  const getChapter = useSelector(
    (state: any) => state.courseReducer.getChapter
  );
  const nextChapUrl = useSelector(
    (state: any) => state.courseReducer.getNextChapter
  );

  const handleVideoPlay = () => {
    dispatch<any>(fetchNextChapter(courseData.next_chapter));
    setVideoPlayed(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getChapter;
        setCourseData(result);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (nextChapUrl && nextChapUrl.length > 0) {
        try {
          const result = await nextChapUrl;
          setCourseData(result);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [dispatch, nextChapUrl]);

  // const handleVideoClick = (value) => {
  //   setTogglePlay(value);
  // };

  const handleComplete = (id) => {
    // history.push(`/tabs/tab1/courseinneroverview/${id}`);
    // getData(id, null);
  };

  const markAsDone = async (course) => {
    setIsMarlLoading(true);
    const URL = course?.completion_link;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    };

    try {
      let response;
      if (isPlatform("ios")) {
        const cordovaResponse = await HTTP.post(URL, {}, headers);
        response = JSON.parse(cordovaResponse.data);
        dispatch<any>(fetchCourses());
        nextChapUrl.then((response: any) => {
          setCourseData(response);
          setVideoPlayed(false);
        });
      } else {
        const axiosResponse = await axios.post(URL, null, { headers });
        response = axiosResponse.data;
        dispatch<any>(fetchCourses());
      }
      if (response.status === "success") {
        // getData(null, course?.next_chapter);
        nextChapUrl.then((response: any) => {
          setCourseData(response);
          setVideoPlayed(false);
        });
      }
    } catch (error) {
      console.error("Error marking course as done:", error);
    } finally {
      setIsMarlLoading(false);
    }
  };
  return (
    <>
      <IonPage className="CourseInnerOverview">
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              backgroundColor: "#F8F5F2",
            }}
          >
            <IonSpinner name="crescent"></IonSpinner>
          </div>
        ) : (
          <>
            <IonHeader className="ion-no-border">
              <IonToolbar>
                <IonButtons slot="start">
                  <IonBackButton
                    color="dark"
                    text={""}
                    defaultHref="/tabs/tab1"
                  />
                </IonButtons>
                <IonTitle>{courseData?.title}</IonTitle>
                {/*<IonButtons slot="end">
                  <IonButton color="dark">
                    <IonIcon icon={notificationsOutline} />
                  </IonButton>
                </IonButtons>*/}
              </IonToolbar>
            </IonHeader>
            <IonContent
              fullscreen
              className={`ion-no-padding ${
                isPlatform("ios") ? "safe-padding" : ""
              }`}
            >
              <div className="main_div">
                {courseData?.video_url ? (
                  <div className="player-wrapper">
                    <ReactPlayer
                      url={courseData?.video_url}
                      width="100%"
                      height="100%"
                      className="react-player"
                      controls={true}
                      playsinline={true}
                      onPlay={handleVideoPlay}
                    />
                  </div>
                ) : (
                  <></>
                )}
                <div className="title">
                  <h3>{courseData?.title}</h3>
                </div>

                <IonGrid>
                  <IonRow>
                    <IonCol size="3">
                      <div className="img_relative">
                        <div className="img_absolute">
                          <img
                            src={
                              courseData?.authority?.image
                                ? courseData?.authority?.image
                                : null
                            }
                          />
                        </div>
                      </div>
                    </IonCol>
                    <IonCol size="9">
                      <div className="align_col">
                        {courseData?.authority?.title ? (
                          <>
                            <div className="createdby">Erstellt durch</div>
                            <div className="message">
                              <span>{courseData?.authority?.title},</span>{" "}
                              {courseData?.authority?.description}
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </IonCol>
                  </IonRow>
                </IonGrid>

                <div
                  className="paragraph"
                  dangerouslySetInnerHTML={{ __html: courseData?.content }}
                ></div>

                <IonGrid className="chapter-exercises">
                  {courseData?.chapter_exercises?.map((item, index) => (
                    <IonRow key={index} onClick={() => handleComplete(item.id)}>
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
                {!courseData?.completed && (
                  <div
                    className={`mark-done-button`}
                    onClick={() => markAsDone(courseData)}
                  >
                    {ismarkLoading ? (
                      <IonSpinner
                        class="mark_loading_spinner"
                        name="crescent"
                        style={{
                          color: "white",
                          width: "30px",
                          height: "30px",
                        }}
                      />
                    ) : (
                      <p style={{ color: "white" }}>Abschliessen</p>
                    )}
                  </div>
                )}
              </div>
            </IonContent>
          </>
        )}
      </IonPage>
    </>
  );
};

export default CourseInnerOverview;
