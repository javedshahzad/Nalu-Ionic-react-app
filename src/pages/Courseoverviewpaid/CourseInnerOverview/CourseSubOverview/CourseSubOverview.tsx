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
  
  import "./CourseSubOverview.scss";
  import { useEffect, useState, useRef } from "react";
  import { useHistory, useParams } from "react-router";
  import img3 from "../../../../Images/image 3.png";  
  import audioIcon from "../../../../Icons/Music Note.png";
  import playCircle from "../../../../Icons/Play Circle.jpg";
  
  import { useTranslation } from "react-i18next";
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

  
  const CourseSubOverview: React.FC = () => {
    const history = useHistory();
    const [togglePlay, setTogglePlay] = useState("video");
    const [courseData, setCourseData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [ismarkLoading, setIsMarlLoading] = useState(false);
    const data: any = useParams();
    console.log("ID from route:", data);


    useEffect(() => {
      getData(data.id);
    }, []);
  
    const handleVideoClick = (value) => {
      setTogglePlay(value);
    };
    const handleComplete = (id) => {
      getData(id);
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
    const markAsDone = (URL) => {
      setIsMarlLoading(true);
      try {
        axios
          .post(URL)
          .then((response) => {
            console.log(response.data);
            // setCourseData(response.data);
            if(response.data.status = "success"){
            history.push(`/tabs/tab2/courseinneroverview`);
            }
            setIsMarlLoading(false);
          })
          .catch((error) => {
            setIsMarlLoading(false);
            console.log(error);
          });
      } catch (error) {
        setIsMarlLoading(false);
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
                      defaultHref="/tabs/tab2/courseinneroverview"
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
                      <MediaPlayer className="player" src={courseData?.video_url? courseData?.video_url : ""}>
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
  
                          <MediaPlayer
                            src={
                              "https://media-files.vidstack.io/sprite-fight/audio.mp3"
                            }
                          >
                            <MediaProvider></MediaProvider>
                            <DefaultAudioLayout icons={defaultLayoutIcons} />
                            <DefaultVideoLayout
                              icons={defaultLayoutIcons}
                              thumbnails={courseData?.audio_thumbnail}
                            />
                          </MediaPlayer>
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
                          {courseData?.authority?.title ? (
                            <>
                              <div className="createdby">Created By</div>
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
  
                  <IonGrid>
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
                  {!courseData?.completed ? (
                      <div
                        style={{
                          borderRadius: "10px",
                          fontSize: "18px",
                          height: "54px",
                          marginLeft: "15px",
                          marginRight: "15px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#EE5F64",
                        }}
                        onClick={()=> markAsDone(courseData?.completion_link)}
                      >
                        {ismarkLoading ? (
                          <IonSpinner
                            class="mark_loading_spinner"
                            name="crescent"
                            style={{"color":"white","width":"30px","height":"30px"}}
                          />
                        ) : (
                          <p style={{"color":"white"}}>Mark as Done</p>
                        )}
                      </div>
                  ) : (
                    ""
                  )}
                </div>
              </IonContent>
            </IonPage>
          </>
        )}
      </>
    );
  };
  
  export default CourseSubOverview;
  