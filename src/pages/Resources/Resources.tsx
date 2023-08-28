import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  checkmarkCircle,
  informationCircleOutline,
  menuOutline,
  notificationsOutline,
  searchOutline,
} from "ionicons/icons";

import "./Resources.scss";
import { useHistory } from "react-router";

const Resources: React.FC = () => {
  const history = useHistory();

  const navigateToNextPage = () => {
    history.push('/resourcedetail'); // Navigate to the "/next" route
  };

  
  const resourceCards = [
    {
      title: 'Nicht die Regel',
      iconSrc: 'assets/imgs/rc1.png',
      recommendedBy: 'Recommended by Dr.Jorg Keckstein, MD',
      description: 'Nicht die regel handelt von drei Frauen, die uber ihr Leben mit Endometriose erzahlen.',
    },
    {
      title: 'Veniam exerci',
      iconSrc: 'assets/imgs/r2.png',
      recommendedBy: 'Sponsored',
      description: 'Eiusmod enim et dolor in velit mollit velit Commodo laborum eiusmod aute ex.Laboris nisi ipsum occaecat officia nulla',
    },
    {
      title: 'Nisi ullamco ad',
      iconSrc: 'assets/imgs/r3.png',
      recommendedBy: 'Recommended by NALU Community',
      description: 'Magna eu officia sit ipsum consectetur velit amet pariatur in sit tempor velit. Ex non est nostrud dolor ad officia. Volupt',
    },
    {
      title: 'Consequat dol',
      iconSrc: 'assets/imgs/r4.png',
      recommendedBy: 'Recommended by Alena Romanovic, Pshycology',
      description: 'Duis laborum fugiat aliqua ad nulla elit dolor duis aliquip commodo anim. Officia irsure',
    },
  ];

  
  return (
    <IonPage className="Resources">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="dark">
              <IonIcon icon={menuOutline} />
            </IonButton>
          </IonButtons>

          <IonButtons slot="end">
            <IonButton color="dark">
              <IonIcon icon={searchOutline} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton color="dark">
              <IonIcon icon={notificationsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <div className="selector mtype">
          <IonRadioGroup>
            <IonItem lines="none">
              <IonIcon slot="start" src="assets/imgs/f1.svg" />
              <IonLabel>Books</IonLabel>
              <IonRadio value="books"></IonRadio>
            </IonItem>

            <IonItem lines="none">
              <IonIcon slot="start" src="assets/imgs/f2.svg" />
              <IonLabel>Movies</IonLabel>
              <IonRadio value="Movies"></IonRadio>
            </IonItem>

            <IonItem lines="none">
              <IonIcon slot="start" src="assets/imgs/f3.svg" />
              <IonLabel>Articles</IonLabel>
              <IonRadio value="Articles"></IonRadio>
            </IonItem>

            <IonItem lines="none">
              <IonIcon slot="start" src="assets/imgs/f4.svg" />
              <IonLabel>Pap</IonLabel>
              <IonRadio value="Pap"></IonRadio>
            </IonItem>
          </IonRadioGroup>
        </div>
        <div className="the-list">
        {resourceCards.map((card, index) => (
           <div className="resource-card"  key={index} onClick={() => navigateToNextPage()}>
           <IonItem lines="none">
             <div className="thumb" slot="start">
               <img src={card.iconSrc} alt="" />
             </div>

             <IonLabel>
               <div className="first flex al-center">
                 <h3>{card.title}</h3>
                 <IonIcon src="assets/imgs/moviesm.svg" />
               </div>
               <div className="second flex al-center">
                 <IonIcon icon={informationCircleOutline} />
                 <p className="ion-text-wrap">
                   {card.recommendedBy}
                 </p>
               </div>
               <h5 className="ion-text-wrap">
                {card.description}
               </h5>
               <div className="btns-holder flex al-center jc-between">
                 <div className="btn ion-activatable ripple-parent flex al-center">
                   <IonIcon src="assets/imgs/icn-like.svg" />
                   <h6>136</h6>
                 </div>
                 <div className="btn ion-activatable ripple-parent flex al-center">
                   <IonIcon src="assets/imgs/icn-dislike.svg" />
                
                 </div>
                 <div className="btn ion-activatable ripple-parent flex al-center">
                   <IonIcon src="assets/imgs/icn-fav.svg" />
                   <h6>Save</h6>
                 </div>
               </div>
             </IonLabel>
           </IonItem>
         </div>
        ))}
       
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Resources;
