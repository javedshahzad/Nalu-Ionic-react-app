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
          <h2>Get Full Access with a NALU Membership</h2>
        </div>
        <div className="section sec1">
          <IonGrid>
            <IonRow className="header-row">
              <IonCol size="5">
                <h4>Key Features</h4>
              </IonCol>
              <IonCol size="2">
                <h4>Free</h4>
              </IonCol>
              <IonCol size="5" className="ion-text-center">
                <h4>NALU Membership</h4>
              </IonCol>
            </IonRow>
            <IonRow className="value-row">
              <IonCol size="5">
                <h5>Esse ipsum</h5>
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
                <h5>Esse ipsum</h5>
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
                <h5>Esse ipsum</h5>
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
                <h5>Esse ipsum</h5>
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
                <h5>Esse ipsum</h5>
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
        <div className="section sec2">
          <IonGrid>
            <IonRow className="header-row">
              <IonCol size="6">
                <h4>Advanced Support</h4>
              </IonCol>
              <IonCol size="2"></IonCol>
              <IonCol size="5" className="ion-text-center"></IonCol>
            </IonRow>
            <IonRow className="value-row">
              <IonCol size="5">
                <h5>Esse ipsum</h5>
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
                <h5>Esse ipsum</h5>
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
                <h5>Esse ipsum</h5>
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

        <div className="options">
          <div className="title">
            <h3>Choose Your Option</h3>
          </div>

          <div className="the-list">
            <IonRadioGroup>
            <IonItem lines="none">
              <div className="thumb" slot="start">
                <img src="assets/imgs/opt1.png" alt="" />
              </div>
              <IonLabel>
                <h4>Endo Flow</h4>
                <p className="ion-text-wrap">
                  Ipsum deserunt incididunt deserunt
                </p>
              </IonLabel>
              <IonRadio value="Endo"></IonRadio>
            </IonItem>
            <IonItem lines="none">
              <div className="thumb" slot="start">
                <img src="assets/imgs/opt2.png" alt="" />
              </div>
              <IonLabel>
                <h4>Cycle Flow</h4>
                <p className="ion-text-wrap">
                  Ipsum deserunt incididunt deserunt
                </p>
              </IonLabel>
              <IonRadio value="Cycle"></IonRadio>
            </IonItem>
            <IonItem lines="none">
              <div className="thumb" slot="start">
                <img src="assets/imgs/opt3.png" alt="" />
              </div>
              <IonLabel>
                <h4>Harmonise Flow</h4>
                <p className="ion-text-wrap">
                  Ipsum deserunt incididunt deserunt
                </p>
              </IonLabel>
              <IonRadio value="Harmonise"></IonRadio>
            </IonItem>
            </IonRadioGroup>
          
          </div>
        </div>

        <div className="nalu">
          <div className="title">
            <h3>NALU Endo Flow is for you if....</h3>
          </div>
          <div className="sec flex al-center">
            <IonIcon src="assets/imgs/icn-badge.svg" />
            <h4>....... You are this</h4>
          </div>
          <div className="sec flex al-center">
            <IonIcon src="assets/imgs/icn-badge.svg" />
            <h4>....... You are this</h4>
          </div>
          <div className="sec flex al-center">
            <IonIcon src="assets/imgs/icn-badge.svg" />
            <h4>....... You are this</h4>
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
                    I have worked on myself a lot with your program so that
                    after 3.5 years I finally ovulated again and got my cycle
                    back.
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
                    I have worked on myself a lot with your program so that
                    after 3.5 years I finally ovulated again and got my cycle
                    back.
                  </h6>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
          </Swiper>
        </div>

        <div className="title title2 ion-text-center">
          <h2 className="ion-text-wrap">
            Develop with the University <br /> Hospital of Bern Switzerland{" "}
            <br /> as a medical product
          </h2>
        </div>

        <div className="logo-holder ion-text-center">
          <img src="assets/imgs/companylogo.png" alt="" />
        </div>

        <div className="packages">
          <IonRadioGroup>
            <IonItem lines="none">
              <IonLabel>
                <div className="first flex al-center jc-between">
                  <h3>CHF 500</h3>
                  <IonBadge className="ion-text-center">Save CHF 40.</IonBadge>
                </div>
                <p className="ion-text-wrap">
                  One time payment with 1 year of live sessions
                </p>
              </IonLabel>
              <IonRadio value={"first"} />
            </IonItem>
            <IonItem lines="none">
              <IonLabel>
                <div className="first">
                  <h3>CHF 45 / Month</h3>
                </div>
                <p>12 monthly installments</p>
              </IonLabel>
              <IonRadio value={"second"} />
            </IonItem>
          </IonRadioGroup>
        </div>

        <div className="btn-holder ion-text-center ion-padding-vertical">
                <IonButton expand="block">Mark as Done</IonButton>
              </div>
      </IonContent>
    </IonPage>
  );
};

export default Membership;
