import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "./Membership.scss";

const Membership: React.FC = () => {
  return (
    <IonPage className="Membership">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="" color={"dark"} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding-horizontal" fullscreen>
        <div className="title ion-text-center">
          <h2>Mit NALU Zyklusbeschwerden in den Griff kriegen</h2>
        </div>
        <div className="section sec1">
          <IonGrid>
            <IonRow className="header-row">
              <IonCol size="4">
                <h4></h4>
              </IonCol>
              <IonCol size="4">
                <h4>Kostenlos</h4>
              </IonCol>
              <IonCol size="4" className="ion-text-center">
                <h4>Premium</h4>
              </IonCol>
            </IonRow>
            <IonRow className="value-row">
              <IonCol size="5">
                <h5>Kursbestandteil Verstehe deinen weiblichen Zyklusn</h5>
              </IonCol>
              <IonCol size="2" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-badge.svg" />
              </IonCol>
              <IonCol size="5" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-badge.svg" />
              </IonCol>
            </IonRow>
            <IonRow className="value-row">
              <IonCol size="5">
                <h5>Zyklus Journal</h5>
              </IonCol>
              <IonCol size="2" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-badge.svg" />
              </IonCol>
              <IonCol size="5" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-badge.svg" />
              </IonCol>
            </IonRow>
            <IonRow className="value-row">
              <IonCol size="5">
                <h5>Ressourcen-Datenbank mit hilfreichen Tools und Adressen</h5>
              </IonCol>
              <IonCol size="2" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-badge.svg" />
              </IonCol>
              <IonCol size="5" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-badge.svg" />
              </IonCol>
            </IonRow>
            <IonRow className="value-row">
              <IonCol size="5">
                <h5>Kompletter NALU Zyklus Flow Online Kurs mit Übungen und Protokoll</h5>
              </IonCol>
              <IonCol size="2" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-lock.svg" />
              </IonCol>
              <IonCol size="5" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-badge.svg" />
              </IonCol>
            </IonRow>
            <IonRow className="value-row">
              <IonCol size="5">
                <h5>Monatliche Live Q&A Sessions während 1 Jahr</h5>
              </IonCol>
              <IonCol size="2" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-lock.svg" />
              </IonCol>
              <IonCol size="5" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-badge.svg" />
              </IonCol>
            </IonRow>
            <IonRow className="value-row">
              <IonCol size="5">
                <h5>Monatliche Live Frauenkreis während 1 Jahr</h5>
              </IonCol>
              <IonCol size="2" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-lock.svg" />
              </IonCol>
              <IonCol size="5" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-badge.svg" />
              </IonCol>
            </IonRow>
            <IonRow className="value-row">
              <IonCol size="5">
                <h5>Chat Gruppe für Teilnehmerinnen</h5>
              </IonCol>
              <IonCol size="2" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-lock.svg" />
              </IonCol>
              <IonCol size="5" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-badge.svg" />
              </IonCol>
            </IonRow>
            <IonRow className="value-row">
              <IonCol size="5">
                <h5>Arbeitsblätter mit Zusammenfassungen und Übungen</h5>
              </IonCol>
              <IonCol size="2" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-lock.svg" />
              </IonCol>
              <IonCol size="5" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-badge.svg" />
              </IonCol>
            </IonRow>
            <IonRow className="value-row">
              <IonCol size="5">
                <h5>30+ leckere Rezepte für die Zyklusphasen</h5>
              </IonCol>
              <IonCol size="2" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-lock.svg" />
              </IonCol>
              <IonCol size="5" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-badge.svg" />
              </IonCol>
            </IonRow>
            <IonRow className="value-row">
              <IonCol size="5">
                <h5>Kurs "Zyklische Ernährung nach Ayurveda"</h5>
              </IonCol>
              <IonCol size="2" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-lock.svg" />
              </IonCol>
              <IonCol size="5" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-badge.svg" />
              </IonCol>
            </IonRow>
            <IonRow className="value-row">
              <IonCol size="5">
                <h5>Kurs "Gesunde Schwangerschaft"</h5>
              </IonCol>
              <IonCol size="2" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-lock.svg" />
              </IonCol>
              <IonCol size="5" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-badge.svg" />
              </IonCol>
            </IonRow>
            <IonRow className="value-row">
              <IonCol size="5">
                <h5>Einkaufsliste für deine Zyklusgesundheit</h5>
              </IonCol>
              <IonCol size="2" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-lock.svg" />
              </IonCol>
              <IonCol size="5" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-badge.svg" />
              </IonCol>
            </IonRow>
            <IonRow className="value-row">
              <IonCol size="5">
                <h5>PMS-Guide</h5>
              </IonCol>
              <IonCol size="2" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-lock.svg" />
              </IonCol>
              <IonCol size="5" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-badge.svg" />
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <div className="nalu">
          <div className="title ion-text-center">
            <h3>NALU Zyklus Flow ist geeignet <br/>für dich, wenn...</h3>
          </div>
          <div className="sec flex al-center">
            <IonIcon src="assets/imgs/icn-badge.svg" />
            <h4>...du deinen&nbsp;<strong>Zyklus auf nat&uuml;rliche Weise regulieren</strong>&nbsp;m&ouml;chtest</h4>
          </div>
          <div className="sec flex al-center">
            <IonIcon src="assets/imgs/icn-badge.svg" />
            <h4>...du&nbsp;<strong>Amenorrhoe, unregelm&auml;ssige Periode, PCOS oder starkes PMS&nbsp;</strong>in den Griff kriegen m&ouml;chtest</h4>
          </div>
          <div className="sec flex al-center">
            <IonIcon src="assets/imgs/icn-badge.svg" />
            <h4>...du deine&nbsp;<strong>Fruchtbarkeit st&auml;rken</strong>&nbsp;und dich auf eine&nbsp;<strong>gesunde Schwangerschaft vorbereiten</strong>&nbsp;m&ouml;chtest</h4>
          </div>
          <div className="sec flex al-center">
            <IonIcon src="assets/imgs/icn-badge.svg" />
            <h4>...du in&nbsp;<strong>Balance&nbsp;</strong>sein und mehr&nbsp;<strong>Energie&nbsp;</strong>haben m&ouml;chtest</h4>
          </div>
          <div className="sec flex al-center">
            <IonIcon src="assets/imgs/icn-badge.svg" />
            <h4>...dich mit deiner&nbsp;<strong>weiblichen Energie verbinden&nbsp;</strong>m&ouml;chtest</h4>
          </div>
        </div>

        <div className="slider ion-padding">
          <Swiper
            modules={[Pagination]}
            pagination={true}
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <div className="quote-holder">
                <img src="assets/imgs/quote1.svg" alt="" />
                <div className="flex al-center ion-padding-horizontal">
                  <img className="quote2" src="assets/imgs/quote2.svg" alt="" />
                  <h6 className="ion-text-wrap">
                  Nach wenigen Wochen bemerkte ich grosse körperliche Veränderungen und nach sechs Monaten ist mein Hormonhaushalt bereits so ausgeglichen, wie noch nie in meinem Leben als erwachsene Frau zuvor.
                  </h6>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="quote-holder">
                <img src="assets/imgs/quote1.svg" alt="" />
                <div className="flex al-center ion-padding-horizontal">
                  <img className="quote2" src="assets/imgs/quote2.svg" alt="" />
                  <h6 className="ion-text-wrap">
                  Fundierte Informationen multimedial verpackt. Kurzweilige Videos, Texte, Übungen und Online Sessions (Frauenkreise und Q&As). Das ganze Programm ist sehr kraftspendend, motivierend und inspirierend - wirklich jeder Frau zu empfehlen!
                  </h6>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="quote-holder">
                <img src="assets/imgs/quote1.svg" alt="" />
                <div className="flex al-center ion-padding-horizontal">
                  <img className="quote2" src="assets/imgs/quote2.svg" alt="" />
                  <h6 className="ion-text-wrap">
                  Der Kurs beinhaltet weit mehr als nur Theorie und gibt einem auch praktische Anleitungen und Übungen, um die Frau deiner Träume zu werden. Ich würde sagen, dass ich nun dank NALU auf dem besten Wege dazu bin. Danke vielmals.
                  </h6>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="title title2 ion-text-center">
          <h2 className="ion-text-wrap">
            In Partnerschaft mit der Frauenklinik des Universitätsspitals Bern als medizinische App entwickelt
          </h2>
        </div>

        <div className="logo-holder ion-text-center">
          <img src="assets/imgs/companylogo.png" alt="" />
        </div>
        <div className="ion-text-wrap ion-text-center ion-padding-vertical discount-description">
          <h3>Nur für kurze Zeit:<br/><strong>20% Einführungsrabatt</strong></h3>
        </div>
        <div className="packages">
          <IonRadioGroup>
            <IonItem lines="none">
              <IonLabel>
                <div className="first flex al-center jc-between">
                  <h3><s>500.-</s> 400.-</h3>
                  {/*<IonBadge className="ion-text-center">Spare 40.-</IonBadge>*/}
                </div>
                <p className="ion-text-wrap">
                Einmalige Zahlung​ mit Zugriff für 1 Jahr
                </p>
              </IonLabel>
              <IonRadio value={"first"} />
            </IonItem>
            <IonItem lines="none">
              <IonLabel>
                <div className="first">
                  <h3><s>45.-</s> 36.- / Monat</h3>
                </div>
                <p>12 monatliche Raten für Zugriff für 1 Jahr</p>
              </IonLabel>
              <IonRadio value={"second"} />
            </IonItem>
          </IonRadioGroup>
        </div>

        <div className="btn-holder ion-text-center ion-padding-vertical">
                <IonButton expand="block">Jetzt anmelden</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Membership;