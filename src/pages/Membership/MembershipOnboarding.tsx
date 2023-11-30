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
  IonSpinner,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { HTTP } from '@awesome-cordova-plugins/http';
import axios from 'axios';

import "./Membership.scss";

const Membership: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<string>('raten');
  const [userGoals, setUserGoals] = useState<string[]>([]);
  const [isDiscountActive, setIsDiscountActive] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
      const today = new Date();
      const discountEndDate = new Date('2023-12-25');
      if (today > discountEndDate) {
          setIsDiscountActive(false);
      }
  }, []);

  useEffect(() => {
    fetchUserGoals();
  }, []);

  const fetchUserGoals = async () => {
    setIsLoading(true);
    try {
      let response;
      const url = 'https://app.mynalu.com/wp-json/nalu-app/v1/user-goal';
      const headers = { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` };
  
      if (isPlatform('ios')) {
        const cordovaResponse = await HTTP.get(url, {}, headers);
        response = { data: JSON.parse(cordovaResponse.data) };
      } else {
        response = await axios.get(url, { headers });
      }
  
      if (!response.data) {
        throw new Error('Network response was not ok');
      }
  
      setUserGoals(response.data.goals);
      setIsLoading(false);
    } catch (error) {
      console.error('There has been a problem with fetching the user goals:', error);
      setIsLoading(false);
    }
  };

  const handleRadioButtonChange = (value: string) => {
    setSelectedPackage(value);
  };

  const handleButtonClick = () => {
    let url = '';
  
    if (userGoals.includes('endometriosis')) {
      url = selectedPackage === 'einmal' ? 'https://www.mynalu.com/bestellung/endo-flow/' : 'https://www.mynalu.com/bestellung/endo-flow-raten/';
    } else {
      url = selectedPackage === 'einmal' ? 'https://www.mynalu.com/bestellung/zyklus-flow/' : 'https://www.mynalu.com/bestellung/zyklus-flow-raten/';
    }
  
    if (url) {
      window.open(url, '_system');
    }
  }; 
  
  if (isLoading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#F8F5F2",
      }}>
        <IonSpinner name="crescent"></IonSpinner>
      </div>
    );
  }

  return (
    <IonPage className="Membership">
      <IonContent className="ion-padding-horizontal" fullscreen>
        <div className="title ion-text-center">
          <h2>
            {userGoals.includes('endometriosis') ? (
              "Mit NALU zur Schmerzlinderung und zu mehr Wohlbefinden bei Endometriose"
            ) : userGoals.includes('amenorrhea') ? (
              "Mit NALU eine regelmässige Periode erhalten"
            ) : (
              "Mit NALU deinen Zyklus harmonisieren"
            )}
          </h2>
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
                <h5>
                   {userGoals.includes('endometriosis') ? (
                    "Kursbestandteil Verstehe Endometriose"
                     ) : userGoals.includes('amenorrhea') ? (
                    "Kursbestandteil Verstehe deinen weiblichen Zyklus"
                  ) : (
                    "Kursbestandteil Verstehe deinen weiblichen Zyklus"
                  )}
                </h5>
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
                <h5>
                   {userGoals.includes('endometriosis') ? (
                    "Kompletter NALU Endo Flow Online Kurs mit Übungen für weniger Schmerzen und mehr Wohlbefinden"
                     ) : userGoals.includes('amenorrhea') ? (
                    "Kompletter NALU Zyklus Flow Online Kurs mit Übungen für eine regelmässige Periode"
                  ) : (
                    "Kompletter NALU Zyklus Flow Online Kurs mit Übungen zur Harmonisierung des Zyklus"
                  )}
                </h5>
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
                <h5>
                  {userGoals.includes('endometriosis') ? (
                    "Monatliche Live Q&A Sessions (mit Ärzt:innen & zert. Coaches) während 1 Jahr"
                     ) : userGoals.includes('amenorrhea') ? (
                    "Monatliche Live Q&A Sessions während 1 Jahr"
                  ) : (
                    "Monatliche Live Q&A Sessions während 1 Jahr"
                  )}
                </h5>
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
                <h5>Zyklus Journal mit Personalisierung</h5>
              </IonCol>
              <IonCol size="2" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-lock.svg" />
              </IonCol>
              <IonCol size="5" className="ion-text-center">
                <IonIcon src="assets/imgs/icn-badge.svg" />
              </IonCol>
            </IonRow>
            {userGoals.includes('endometriosis') ? (
              ""
            ) : (
              <div>
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
            </div>
            )}
            
          </IonGrid>
        </div>

        <div className="nalu">
          <div className="title ion-text-center">
            <h3>
              {userGoals.includes('endometriosis') ? (
                "NALU Endo Flow ist geeignet "
              ) : (
                "NALU Zyklus Flow ist geeignet "
              )}
              <br/>für dich, wenn...
            </h3>
          </div>
          {userGoals.includes('endometriosis') ? (
            <div>
              <div className="sec flex al-center">
                <IonIcon src="assets/imgs/icn-badge.svg" />
                <h4>...du deine&nbsp;<strong>Schmerzen mit Endometriose reduzieren</strong>&nbsp;m&ouml;chtest</h4>
              </div>
              <div className="sec flex al-center">
                <IonIcon src="assets/imgs/icn-badge.svg" />
                <h4>...du deine&nbsp;<strong>Lebensqualität für mehr Wohlbefinden verbessern</strong>&nbsp;m&ouml;chtest</h4>
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
          ) : userGoals.includes('amenorrhea') ? (
            <div>
              <div className="sec flex al-center">
                <IonIcon src="assets/imgs/icn-badge.svg" />
                <h4>...du deine&nbsp;<strong>Periode auf nat&uuml;rliche Weise regulieren</strong>&nbsp;m&ouml;chtest</h4>
              </div>
              <div className="sec flex al-center">
                <IonIcon src="assets/imgs/icn-badge.svg" />
                <h4>...du&nbsp;<strong>funktionelle Amenorrhoe</strong>in den Griff kriegen m&ouml;chtest</h4>
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
          ) : (
            <div>
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
          )}
        </div>

        
        {userGoals.includes('endometriosis') ? (
            <div>
              <div className="title title2 ion-text-center">
                <h2 className="ion-text-wrap">
                  In Partnerschaft mit Ärzt:innen und Therapeutinnen des Universitätsspitals Inselspital Bern als medizinische App entwickelt
                </h2>
              </div>
              <div className="logo-holder ion-text-center">
                <img src="assets/imgs/companylogo.png" alt="" />
              </div>
            </div>
          ) : userGoals.includes('amenorrhea') ? (
            <div>
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
                  In Partnerschaft mit Ärzt:innen und Therapeutinnen des Universitätsspitals Inselspital Bern als medizinische App entwickelt
                </h2>
              </div>
              <div className="logo-holder ion-text-center">
                <img src="assets/imgs/companylogo.png" alt="" />
              </div>
            </div>
          ) : (
            <div>
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
            </div>
          )}
        

        {isDiscountActive ?
          <div className="ion-text-wrap ion-text-center ion-padding-vertical discount-description">
            <h3>Nur für kurze Zeit:<br/><strong>20% Einführungsrabatt</strong></h3>
          </div>
         : 
          ""
        }

        <div className="packages">
          <IonRadioGroup value={selectedPackage} onIonChange={e => handleRadioButtonChange(e.detail.value)}>
            <IonItem lines="none">
              <IonLabel>
                <div className="first flex al-center jc-between">
                  {isDiscountActive ? <h3><s>45.-</s> 37.- / Monat</h3> : <h3>45.- / Monat</h3>}
                </div>
                <p>12 monatliche Raten mit Zugriff für 1 Jahr</p>
              </IonLabel>
              <IonRadio value={"raten"} />
            </IonItem>
            <IonItem lines="none">
              <IonLabel>
                <div className="second flex al-center jc-between">
                  {isDiscountActive ? <h3><s>500.-</s> 400.-</h3> : <h3>500.-</h3>}
                  {isDiscountActive ? <IonBadge className="ion-text-center">Spare 144.-</IonBadge> : <IonBadge className="ion-text-center">Spare 40.-</IonBadge>}
                </div>
                <p className="ion-text-wrap">
                Einmalige Zahlung​ mit Zugriff für 1 Jahr
                </p>
              </IonLabel>
              <IonRadio value={"einmal"} />
            </IonItem>
          </IonRadioGroup>
        </div>

        <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton expand="block" onClick={handleButtonClick}>Jetzt NALU Mitglied werden</IonButton>
        </div>
        <div className="bottom-btn">
          <IonButton expand="block" routerLink="/tabs/tab1" fill="clear" color="dark"><h3>Ich bin noch nicht bereit und möchte mich später entscheiden.<br/><br/><span>Weiter zur App</span></h3></IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Membership;