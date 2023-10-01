import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
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
  IonToolbar,
} from "@ionic/react";
import {
  add,
  menuOutline,
  notificationsOutline,
  searchOutline,
} from "ionicons/icons";

import "./Journal.scss";
import { useEffect, useState } from "react";
import Addrecmodal from "../modals/Addrec/Addrecmodal";
import { useHistory } from "react-router";
import NotificationBell from "../../components/NotificationBell";

const Journal: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<string>("overview");

  const history = useHistory();

  const navigateToNextPage = () => {
    history.push("/resourcedetail"); // Navigate to the "/next" route
  };

  useEffect(() => {
    setActiveSegment("overview");
  }, []);
  const segmentChanged = (e: any) => {
    console.log(activeSegment);
    setActiveSegment(e.detail.value);
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <IonPage className="Journal">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color={"dark"}>
              <IonIcon icon={menuOutline} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton color="dark">
              <IonIcon icon={searchOutline} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton slot="end" fill="clear">
              <NotificationBell />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSegment
            mode="md"
            onIonChange={(e) => segmentChanged(e)}
            value={activeSegment as any}
          >
            <IonSegmentButton value={"overview"}>
              <IonLabel>Overview</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value={"favourites"}>
              <IonLabel>Favourites</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonModal
          isOpen={modalOpen}
          className="modaaal"
          onDidDismiss={handleModalClose}
        >
          <Addrecmodal onClose={() => setModalOpen(false)} />
        </IonModal>
        {activeSegment === "overview" ? (
          <div className="overview">
            <div className="btn-slider">
              <IonButton fill="clear">
                <div className="flexd">
                  <IonIcon src="assets/imgs/ov1.svg" />
                  <p> Recipes</p>
                </div>
              </IonButton>
              <IonButton fill="clear">
                <div className="flexd">
                  <IonIcon src="assets/imgs/ov2.svg" />
                  <p>Media</p>
                </div>
              </IonButton>
              <IonButton fill="clear">
                <div className="flexd" style={{ paddingTop: "14px" }}>
                  <IonIcon src="assets/imgs/ov3.svg" />
                  <p className="ion-text-wrap">
                    Contact Points <br /> & Providers
                  </p>
                </div>
              </IonButton>
              <IonButton fill="clear">
                <div className="flexd">
                  <IonIcon src="assets/imgs/ov4.svg" />
                  <p className="ion-text-wrap">Cost Coverage</p>
                </div>
              </IonButton>
              <IonButton fill="clear">
                <div className="flexd">
                  <IonIcon src="assets/imgs/ov5.svg" />
                  <p className="ion-text-wrap">Emergency Plan</p>
                </div>
              </IonButton>
            </div>

            <div className="recommended">
              <div className="title-holder">
                <h3>Recommended</h3>
              </div>
              <IonRow>
                <IonCol size="6">
                  <div
                    className="rc-card ion-activatable ripple-parent"
                    onClick={() => navigateToNextPage()}
                  >
                    <IonRippleEffect />
                    <div className="img-holder">
                      <img src="assets/imgs/rc1.svg" alt="" />

                      <div className="btn ion-activatable ripple-parent flex al-center jc-center ">
                        <img src="assets/imgs/rcicn.svg" alt="" />
                      </div>
                    </div>

                    <h4>Movie: Nicht die Regel</h4>
                  </div>
                </IonCol>
                <IonCol size="6">
                  <div
                    className="rc-card ion-activatable ripple-parent"
                    onClick={() => navigateToNextPage()}
                  >
                    <IonRippleEffect />
                    <div className="img-holder">
                      <img src="assets/imgs/rc2.png" alt="" />

                      <div className="btn ion-activatable ripple-parent flex al-center jc-center ">
                        <img src="assets/imgs/rc2.svg" alt="" />
                      </div>
                    </div>

                    <h4 className="ion-text-wrap">Choclet Spice Cake</h4>
                  </div>
                </IonCol>
                <IonCol size="6">
                  <div
                    className="rc-card ion-activatable ripple-parent"
                    onClick={() => navigateToNextPage()}
                  >
                    <IonRippleEffect />
                    <div className="img-holder">
                      <img src="assets/imgs/rc3.png" alt="" />

                      <div className="btn ion-activatable ripple-parent flex al-center jc-center ">
                        <img src="assets/imgs/rcicn.svg" alt="" />
                      </div>
                    </div>

                    <h4 className="ion-text-wrap">
                      Article: Statement about non-invasive diagnostic tests
                    </h4>
                  </div>
                </IonCol>
                <IonCol size="6">
                  <div
                    className="rc-card ion-activatable ripple-parent"
                    onClick={() => navigateToNextPage()}
                  >
                    <IonRippleEffect />
                    <div className="img-holder">
                      <img src="assets/imgs/rc4.png" alt="" />

                      <div className="btn ion-activatable ripple-parent flex al-center jc-center ">
                        <img src="assets/imgs/rc3icn.svg" alt="" />
                      </div>
                    </div>

                    <h4 className="ion-text-wrap">
                      Endometriosis Centre Lenzburg, SWizerland
                    </h4>
                  </div>
                </IonCol>
              </IonRow>
            </div>

            <div className="add-recommendation ion-text-center">
              <IonButton onClick={() => setModalOpen(true)}>
                <IonIcon icon={add} />
              </IonButton>
              <h4>Add Recommendation</h4>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Journal;
