import {IonAvatar,IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addCircle, addCircleOutline, checkmarkCircle, notificationsOutline } from "ionicons/icons";

import "./Community.scss";
import { useState } from "react";

const Community: React.FC = () => {
  const itemList = [
    {
      avatarText: 'A',
      title: 'NALU Endo Flow - English',
      subTitle: 'Nisi Quis voluptate esse pariatela',
      time: '6:27 PM',
      icon: checkmarkCircle,
    },
    {
      avatarText: 'A',
      title: 'NALU Endo Flow - English',
      subTitle: 'Nisi Quis voluptate esse pariatela',
      time: '6:27 PM',
      icon: checkmarkCircle,
    },
    {
      avatarText: 'A',
      title: 'NALU Community - German',
      subTitle: 'Nisi Quis voluptate esse pariatela',
      time: '6:27 PM',
      icon: addCircleOutline,
    },
    {
      avatarText: 'A',
      title: 'NALU Community - German',
      subTitle: 'Nisi Quis voluptate esse pariatela',
      time: '6:27 PM',
      icon: addCircleOutline,
    },
    {
      avatarText: 'A',
      title: 'NALU Community - German',
      subTitle: 'Nisi Quis voluptate esse pariatela',
      time: '6:27 PM',
      icon: addCircleOutline,
    },
  ];

  const [itemStates, setItemStates] = useState(itemList.map(item => item.icon)); // Initialize with the icons from the itemList

  const toggleIcon = (index) => {
    const updatedStates = [...itemStates];
    updatedStates[index] = updatedStates[index] === addCircleOutline ? checkmarkCircle : addCircleOutline;
    setItemStates(updatedStates);
  };
  return (
    <IonPage className="Community">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton color="dark" text={""} defaultHref="/" />
          </IonButtons>
          <IonTitle>
            Browse Groups
            </IonTitle>
            <IonButtons slot="end">
              <IonButton color="dark">
                <IonIcon icon={notificationsOutline} />
              </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
       <div className="search-holder">
        <IonSearchbar></IonSearchbar>
       </div>

       {/* <div className="the-list">
          <IonItem lines="none" detail={false} routerLink="/chat">
            <IonAvatar className="flex al-center jc-center" slot="start">
              <h3>A</h3>
            </IonAvatar>
            <IonLabel>
              <h4>NALU Endo Flow - English</h4>
              <h6 className="ion-text-wrap">Nisi Quis voluptate esse pariatela</h6>
            </IonLabel> 
            <div className="end-slot ion-text-right" slot="end">
              <p>6:27 PM</p>
              <IonIcon className="done" icon={checkmarkCircle} />
            </div>
          </IonItem>
          <IonItem lines="none" detail={false}>
            <IonAvatar className="flex al-center jc-center" slot="start">
              <h3>A</h3>
            </IonAvatar>
            <IonLabel>
              <h4>NALU Endo Flow - English</h4>
              <h6 className="ion-text-wrap">Nisi Quis voluptate esse pariatela</h6>
            </IonLabel> 
            <div className="end-slot ion-text-right" slot="end">
              <p>6:27 PM</p>
              <IonIcon className="done" icon={checkmarkCircle} />
            </div>
          </IonItem>
          <IonItem lines="none" detail={false}>
            <IonAvatar className="flex al-center jc-center" slot="start">
              <h3>A</h3>
            </IonAvatar>
            <IonLabel>
              <h4>NALU Community - German</h4>
              <h6 className="ion-text-wrap">Nisi Quis voluptate esse pariatela</h6>
            </IonLabel> 
            <div className="end-slot ion-text-right" slot="end">
              <p>6:27 PM</p>
              <IonIcon icon={addCircleOutline} />
            </div>
          </IonItem>
          <IonItem lines="none" detail={false}>
            <IonAvatar className="flex al-center jc-center" slot="start">
              <h3>A</h3>
            </IonAvatar>
            <IonLabel>
              <h4>NALU Community - German</h4>
              <h6 className="ion-text-wrap">Nisi Quis voluptate esse pariatela</h6>
            </IonLabel> 
            <div className="end-slot ion-text-right" slot="end">
              <p>6:27 PM</p>
              <IonIcon icon={addCircleOutline} />
            </div>
          </IonItem>
          <IonItem lines="none">
            <IonAvatar className="flex al-center jc-center" slot="start">
              <h3>A</h3>
            </IonAvatar>
            <IonLabel>
              <h4>NALU Community - German</h4>
              <h6 className="ion-text-wrap">Nisi Quis voluptate esse pariatela</h6>
            </IonLabel> 
            <div className="end-slot ion-text-right" slot="end">
              <p>6:27 PM</p>
              <IonIcon icon={addCircleOutline} />
            </div>
          </IonItem>
       </div>  */}

       <div className="the-list">
      {itemList.map((item, index) => (
        <IonItem key={index} lines="none" detail={false} >
          <IonAvatar className="flex al-center jc-center" slot="start">
            <h3>{item.avatarText}</h3>
          </IonAvatar>
          <IonLabel>
            <h4>{item.title}</h4>
            <h6 className="ion-text-wrap">{item.subTitle}</h6>
          </IonLabel>
          <div className="end-slot ion-text-right" slot="end" onClick={() => toggleIcon(index)}>
            <p>{item.time}</p>
            <IonIcon className={itemStates[index] === addCircleOutline ? 'add' : 'done'} icon={itemStates[index]} />
          </div>
        </IonItem>
      ))}
    </div>
      </IonContent>
    </IonPage>
  );
};

export default Community;
