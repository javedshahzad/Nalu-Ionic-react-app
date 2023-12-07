import React, { useState } from 'react';
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonPage,
  IonRippleEffect,
  IonTitle,
  IonToolbar,
  useIonRouter,
  isPlatform,
  IonAlert,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  arrowBackOutline,
  trashBinOutline,
  logOutOutline,
} from "ionicons/icons";
import "./Menu.scss";
import { Browser } from "@capacitor/browser";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { HTTP } from "@awesome-cordova-plugins/http";
import { ArrowLeftIcon } from "@vidstack/react/icons";

async function openExternalLink(url: string) {
  await Browser.open({ url: url });
}

const openLink = async (url: string) => {
  if (url.startsWith('https://app.mynalu.com') || url.startsWith('http://app.mynalu.com')) {
    await Browser.open({ url: url });
  } else {
    window.open(url, '_system');
  }
};


interface AppPage {
  url: string;
  Icon: string;
  title: string;
  onClick?: () => void;
}

const Menu: React.FC = () => {
  const history = useHistory();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  let isPremium = false; // Default to false
  try {
    const roles = JSON.parse(localStorage.getItem('roles') || '{}'); // Parse the roles or default to an empty object
    isPremium = Object.values(roles).includes('premium'); // Check if 'premium' is one of the roles
  } catch (e) {
    console.error('Error parsing roles from localStorage:', e);
  }

  const handleLogout = () => {
    localStorage.clear();
    history.push('/onboarding');
  };

  const handleAccountDeletion = async () => {
    setShowDeleteConfirm(false);

    const token = localStorage.getItem('jwtToken');
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        if (isPlatform("ios")) {
          await HTTP.post('https://app.mynalu.com/wp-json/nalu-app/v1/account-deletion', {}, headers);
        } else {
          await axios.post('https://app.mynalu.com/wp-json/nalu-app/v1/account-deletion', {}, { headers });
        }
        setShowDeleteSuccess(true);
        handleLogout();
      } catch (error) {
        console.error('Error deleting account:', error);
        handleLogout();
      }
    }
  };
  const location = useLocation();

  const backHandler = () => {
    window.history.back();
  };

  const appPages: AppPage[] = [
    /*{
      title: "Edit Profile",
      url: "/page/Inbox",
      Icon: 'assets/imgs/menu1.svg',
      
    },
    {
      title: "Preferences",
      url: "/page/Outbox",
      Icon: 'assets/imgs/menu2.svg',
     
    },
    {
      title: "Notifications",
      url: "/page/Favorites",
      Icon: 'assets/imgs/menu3.svg',
     
    },
    {
      title: "NALU beitreten",
      url: "",
      Icon: 'assets/imgs/menu4.svg',
      onClick: () => history.push("/membership"),
    },*/
    {
      title: "Notfallplan",
      url: "/tabs/tab4/resourcedetail/6999",
      Icon: "assets/imgs/menu5.svg",
      // onClick: () => getResourceDetailsByID(6999),
      onClick: () => history.push("/tabs/tab4/resourcedetail/6999"),
    },
    {
      title: "Quellen",
      url: "https://app.mynalu.com/quellen/",
      Icon: "assets/imgs/menu6.svg",
    },

    {
      title: "Datenschutzerklärung",
      url: "https://app.mynalu.com/datenschutzerklaerung/",
      Icon: "assets/imgs/menu7.svg",
    },
    {
      title: "Impressum",
      url: "https://app.mynalu.com/impressum/",
      Icon: "assets/imgs/menu8.svg",
    },
    {
      title: "support@mynalu.com",
      url: "mailto:support@mynalu.com",
      Icon: "assets/imgs/menu9.svg",
    },
    {
      title: "nalu_health",
      url: "https://www.mynalu.com/instagram",
      Icon: "assets/imgs/menu10.svg",
    },
    {
      title: "nalu.health",
      url: "https://www.mynalu.com/facebook",
      Icon: "assets/imgs/menu11.svg",
    },
  ];

  // Function to close the menu
  const closeMenu = () => {
    const menu = document.querySelector("ion-menu");
    menu?.close();
  };

  return (
    <IonPage className="Menu">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="dark" onClick={backHandler}>
              <IonIcon icon={arrowBackOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Menü</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="slide-menu">
        {/*<div className="close-btn-holder ion-text-right">
            <IonButton fill="clear" size="large" onClick={closeMenu} color="dark"> 
              <IonIcon icon={arrowBack} />
            </IonButton>
        </div>
        <div className="profile-holder ion-text-center">
          <IonAvatar>
            <img src="assets/imgs/avatar.png" alt="" />
          </IonAvatar>
          <div className="btnn ion-activatable ripple-parent flex al-center jc-center">
                  <IonRippleEffect />
                  <IonIcon icon={camera} />
          </div>
          <h1>Angelina</h1>
          <h6>example@gmail.com</h6>
        </div>*/}
        {!isPremium && (
          <IonMenuToggle autoHide={false} className="join-nalu">
            <IonItem button onClick={() => history.push("/membership")}>
              <IonIcon aria-hidden="true" slot="start" src="assets/imgs/menu4.svg" />
              <IonLabel>NALU beitreten</IonLabel>
            </IonItem>
          </IonMenuToggle>
        )}
        <IonList id="inbox-list">
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  onClick={() => {
                    if (appPage.onClick) {
                      appPage.onClick();
                    } else {
                      openLink(appPage.url);
                    }
                  }}
                  routerLink={
                    !appPage.url.startsWith("https://")
                      ? appPage.url
                      : undefined
                  }
                  routerDirection="none"
                  lines="none"
                  detail={true}
                >
                  <IonIcon aria-hidden="true" slot="start" src={appPage.Icon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      {isPlatform('ios') && (
        <IonMenuToggle autoHide={false} className="delete-account">
          <IonItem button onClick={() => setShowDeleteConfirm(true)}>
            <IonIcon aria-hidden="true" slot="start" src={trashBinOutline} />
            <IonLabel>NALU Konto löschen</IonLabel>
          </IonItem>
        </IonMenuToggle>
      )}

      <div className="btnnn-holder ion-text-center ion-padding-top">
        <IonButton onClick={handleLogout}>
          <IonIcon src={logOutOutline} slot="start" />
          Abmelden
        </IonButton>
      </div>
      <IonAlert
        isOpen={showDeleteConfirm}
        onDidDismiss={() => setShowDeleteConfirm(false)}
        header={'Konto löschen'}
        message={'Bist du dir sicher, dass du dein Konto löschen willst? Alle deine Daten werden dauerhaft gelöscht und können nicht wiederhergestellt werden.'}
        buttons={[
          {
            text: 'Nein',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Ja, löschen',
            handler: handleAccountDeletion,
          },
        ]}
      />
      <IonAlert
        isOpen={showDeleteSuccess}
        onDidDismiss={() => history.push('/onboarding')}
        header={'Kontolöschung eingeleitet'}
        message={'Der Kontolöschungsprozess wurde erfolgreich eingeleitet und wird in den nächsten 2 Wochen abgeschlossen.'}
        buttons={['OK']}
      />
      </IonContent>
    </IonPage>
  );
};

export default Menu;
