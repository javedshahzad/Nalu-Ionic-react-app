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
 import i18next from "i18next";
import { useTranslation } from 'react-i18next';
import { Suspense, startTransition } from 'react';

 const CourseInnerOverview: React.FC = () => {
  const history = useHistory();
  const { t, i18n, ready} = useTranslation();  
  const [togglePlay, setTogglePlay] = useState('video');

  const handleVideoClick = (value)=>{
    setTogglePlay(value)
  }
  console.log(ready);

  const handleLanguageChange = ()=> {
   // i18next.changeLanguage('de');
   // localStorage.setItem("language",'de')
  //  history.push('/configcycle')
    }
  return (
<>
        <IonPage className="CourseInnerOverview">
         <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton color="dark" text={""} defaultHref="/tabs/tab2" />
          </IonButtons>
          <IonTitle> 
          {t('course_inner_overview.header')} 
         </IonTitle>
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
                     <h3>{t('course_inner_overview.header')}</h3>
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
            <h3>{t('course_inner_overview.header')}</h3>
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
                      <div className="createdby">{t('course_inner_overview.created_by')}</div >
                      <div className="message">
                        <span>{t('course_inner_overview.message_1')}</span> 
                        {t('course_inner_overview.message_2')}
                        </div>
                    </div>
                  </IonCol>
              </IonRow>
          </IonGrid>
          <div className="paragraph">
          {t('course_inner_overview.description')}
                    </div>
          <IonGrid>
            <IonRow>
              <IonCol size="5">
                <img src={img2}/>
              </IonCol>
              <IonCol size="7">
              <div className="paragraph_2">{t('course_inner_overview.block')}</div>
              <div className="align_justify">
                <span>{t('course_inner_overview.timeline')}</span>
                <span><img src={playCircle} alt="" /></span>
              </div>
              </IonCol>
            </IonRow>
          </IonGrid>
          <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton expand="block" onClick={() => handleLanguageChange()}>{t('course_inner_overview.continue_button')}</IonButton>
        </div>
        </div>
      </IonContent>
      </IonPage>
        </>
    
     
  );
};

export default CourseInnerOverview;
