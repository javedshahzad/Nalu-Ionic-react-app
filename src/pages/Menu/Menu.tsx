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
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  archiveOutline,
  archiveSharp,
  arrowBack,
  bookmarkOutline,
  camera,
  cameraOutline,
  close,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  notificationsOutline,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from "ionicons/icons";
import "./Menu.scss";
import { Browser } from '@capacitor/browser';
import { useHistory } from 'react-router-dom';
import axios from "axios";

async function openExternalLink(url: string) {
  await Browser.open({ url: url });
}

const openLink = async (url: string) => {
  await Browser.open({ url: url });
};

interface AppPage {
  url: string;
  Icon: string;
  title: string;
  onClick?: () => void;
}

const Menu: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  const getResourceDetailsByID = (id) => {
    try {
      axios
        .get(`https://app.mynalu.com/wp-json/nalu-app/v1/ressources/${id}`)
        .then((response) => {
          console.log(response.data);
          history.push("/tabs/tab4/resourcedetail", {
            data: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
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
      title: "Get Full Access",
      url: "/page/Archived",
      Icon: 'assets/imgs/menu4.svg',
    },*/
    {
      title: "Notfallplan",
      url: "",
      Icon: 'assets/imgs/menu5.svg',
      onClick: () => getResourceDetailsByID(6999),
    },
    {
      title: "Quellen",
      url: "https://app.mynalu.com/quellen/",
      Icon: 'assets/imgs/menu6.svg',
    },
  
    {
      title: "Datenschutzerklärung",
      url: "https://app.mynalu.com/datenschutzerklaerung/",
      Icon: 'assets/imgs/menu7.svg',
      
    },
    {
      title: "Impressum",
      url: "https://app.mynalu.com/impressum/",
      Icon: 'assets/imgs/menu8.svg',
     
    },
    {
      title: "support@mynalu.com",
      url: "mailto:support@mynalu.com",
      Icon: 'assets/imgs/menu9.svg',
     
    },
    {
      title: "lisafilipe.nalu",
      url: "https://www.instagram.com/lisafilipe.nalu/",
      Icon: 'assets/imgs/menu10.svg',
    },
    {
      title: "lisafilipe.nalu",
      url: "https://www.facebook.com/lisafilipe.nalu",
      Icon: 'assets/imgs/menu11.svg',
    },
    
  ];

  // Function to close the menu
  const closeMenu = () => {
    const menu = document.querySelector('ion-menu');
    menu?.close();
    console.log("fdfdfdfd");
  };

  return (
    <IonPage className="Menu">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton color="dark" text={""} defaultHref="/tabs/tab1" />
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
                        } else if (appPage.url.startsWith("https://") || appPage.url.startsWith("mailto:") || appPage.url.startsWith("tel:")) {
                          openLink(appPage.url);
                        }
                      }}
                      routerLink={!appPage.url.startsWith("https://") ? appPage.url : undefined}
                      routerDirection="none"
                      lines="none"
                      detail={true}
                  >
                      <IonIcon
                          aria-hidden="true"
                          slot="start"
                          src={appPage.Icon}
                      />
                      <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
              </IonMenuToggle>
          );
      })}
        </IonList>

        {/*<div className="btnnn-holder ion-text-center ion-padding-top">
          <IonButton>
            <IonIcon src="assets/imgs/logout.svg" slot="start" />
            Sign out
          </IonButton>
        </div>*/}

    
      </IonContent>
    </IonPage>
  );
};

export default Menu;
