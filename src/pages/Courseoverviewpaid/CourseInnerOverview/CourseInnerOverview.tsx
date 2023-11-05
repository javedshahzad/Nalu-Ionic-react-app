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
} from "@vidstack/react";
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { Player } from './../../../components/videoPlayer/Player';


const CourseInnerOverview: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
   const data : any = location?.state;
   const [courseId, setCourseId] = useState(data?.course_id);
 
  const [togglePlay, setTogglePlay] = useState("video");
  const [courseData, setCourseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ismarkLoading, setIsMarlLoading] = useState(false);


  useEffect(() => {
    getData(courseId,null);
  }, []);


  // const handleVideoClick = (value) => {
  //   setTogglePlay(value);
  // };
  const handleComplete = (id) => {
    // history.push(`/tabs/tab2/courseinneroverview/${id}`);
    getData(id,null)
  };

  const getData = (id,next_chapter) => {
    setIsLoading(true);
    let URL;
    if(id){
       URL = `https://app.mynalu.com/wp-json/nalu-app/v1/course-step/${id}`
    }
    else{
     URL =   next_chapter
    }
    console.log(URL)
    try {
      axios
        .get(URL,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('jwtToken')}`
          }
        })
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
  const markAsDone = (course) => {
    setIsMarlLoading(true);
    try {
      axios
        .post(course?.completion_link,null,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
          }
        })
        .then((response) => {
          console.log(response.data);
          if(response.data.status = "success"){
            getData(null,course?.next_chapter)
            // history.push('/tabs/tab2')
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
      
          <IonPage className="CourseInnerOverview">
            {
              isLoading?(
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
              ):
              (
                <>
                
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
                {/*<IonButtons slot="end">
                  <IonButton color="dark">
                    <IonIcon icon={notificationsOutline} />
                  </IonButton>
                </IonButtons>*/}
              </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-no-padding">
              <div className="main_div">
                <div className="player_div">
                  {togglePlay === "video" && courseData?.video_url ? (
                    <Player url ={courseData?.video_url} 
                    video_thumbnail={courseData?.video_thumbnail}
                     source={'video'}/>

                  ) : (
                    <>
                      

                        
                    </>
                  )}

                 
                </div>
                <div className="title">
                  <h3>{courseData?.ttile}</h3>
                </div>
                <IonGrid>
                  <IonRow>
                    <IonCol size="3">
                      <div className="img_relative">
                        <div className="img_absolute">
                          <img src={courseData?.authority?.image? courseData?.authority?.image : null} />
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
                {
                  !courseData?.completed && (
                    <div
                      
                      className={`mark-done-button`}
                      onClick={()=> markAsDone(courseData)}
                      
                    >
                      {ismarkLoading ? (
                        <IonSpinner
                          class="mark_loading_spinner"
                          name="crescent"
                          style={{"color":"white","width":"30px","height":"30px"}}
                        />
                      ) : (
                        <p style={{"color":"white"}}>Abschliessen</p>
                      )}
                    </div>
                  )
                }
               
              </div>
            </IonContent>
                </>
              )
            }
            
          </IonPage>
      
    </>
  );
};

export default CourseInnerOverview;
