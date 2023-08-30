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
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ReactPlayer from "react-player";
import img from "../../../Images/Ellipse 11.png";
import seal from "../../../Images/SealCheck.png"
import img2 from "../../../Images/image 4.png"
import img3 from "../../../Images/image 3.png"


import videoIcon from "../../../Icons/Videocamera.png"
import audioIcon from "../../../Icons/Music Note.png"
import playCircle from "../../../Icons/Play Circle.jpg"

import Thumbnail from '../Thumbnail';
import AudioPlayer from '../AudioPlayes';
import audioFile from "../../../audio/testing.mp4"

 const CourseInnerOverview: React.FC = () => {
  const history = useHistory();
  const [togglePlay, setTogglePlay] = useState('video');

  const handleVideoClick = (value)=>{
    setTogglePlay(value)
  }
  return (
    <IonPage className="CourseInnerOverview">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton color="dark" text={""} defaultHref="/tabs/tab2" />
          </IonButtons>
          <IonTitle>Stretching & Loosening Exercises</IonTitle>
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
            {
              togglePlay === 'video'?
               <ReactPlayer
            url={"https://player.vimeo.com/external/768936607.m3u8?s=da16b0319d8ef09713f6b1843a66d487537b4861&logging=false"}
            controls={true}
  
            /> 
            
      
    //   <video  height="240" controls>
    //   <source src="https://player.vimeo.com/external/768936607.m3u8?s=da16b0319d8ef09713f6b1843a66d487537b4861&logging=false" 
    //   />
    //   Your browser does not support the video tag.
    // </video>
            :
            <>
            <div className="audio_player_div">
            <IonGrid>
              <IonRow>
                <IonCol size="6">
                   <img src={img3} alt="" />
                </IonCol>
                <IonCol size="6">
                <div className="title">
                     <h3>Stretching & Loosening Exercises</h3>
                     </div>
                </IonCol>
              </IonRow>
            </IonGrid>

            <ReactPlayer
            url={"https://player.vimeo.com/external/768936607.m3u8?s=da16b0319d8ef09713f6b1843a66d487537b4861&logging=false"}
            config={{
              file:{
                forceAudio: true,
              },
            }}
           
           height="100px"
           playing={false}
           controls={true}
      />
            </div>
            </>
            }
    
          <div className="playbuttons ">
            <div    
            className={`video_span togglePlay ${togglePlay === 'video' ? 'active' : ''}`}
            onClick={()=> handleVideoClick('video')}>
              <img src={audioIcon} alt="" />
              <span>Video</span>
            </div>
            <div     
            className={`audio_span togglePlay ${togglePlay === 'audio' ? 'active' : ''}`}
            onClick={()=> handleVideoClick('audio')}>
              <img src={audioIcon} alt="" />
              <span>Audio</span>
            </div>
          </div>
          </div>
          <div className="title">
            <h3>Stretching & Loosening Exercises</h3>
          </div>
          <IonGrid>
              <IonRow>
                  <IonCol size="2">
                    <div className="img_relative">
                    <img src={img}/>
                    <div className="img_absolute">
                      <img src={seal} />
                    </div>
                    </div>
                  </IonCol>
                  <IonCol size="10">
                    <div className="align_col">
                      <div className="createdby">Created by</div >
                      <div className="message"><span>Dr. Ilca Wilhelm, MD,</span> Medical Specialist at the University Clinic for Anesthesiology and Pain Medicine of Inselspital, University Hospital Bern</div>
                    </div>
                  </IonCol>
              </IonRow>
          </IonGrid>
          <div className="paragraph">
            When we experience pain our body, our body usually reacts by increasing muscle tension
          </div>
          <IonGrid>
            <IonRow>
              <IonCol size="5">
                <img src={img2}/>
              </IonCol>
              <IonCol size="7">
              <div className="paragraph_2">Abdomen: Abdominal Breathing</div>
              <div className="align_justify">
                <span>3 Minutes</span>
                <span><img src={playCircle} alt="" /></span>
              </div>
              </IonCol>
            </IonRow>
          </IonGrid>
          <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton expand="block" >Continue</IonButton>
        </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CourseInnerOverview;
