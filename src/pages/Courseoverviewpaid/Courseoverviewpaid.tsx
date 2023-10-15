import {
  IonAccordion,
  IonAccordionGroup,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonProgressBar,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  checkmarkCircle,
  lockClosedOutline,
  menuOutline,
  notificationsOutline,
} from "ionicons/icons";

import "./Courseoverviewpaid.scss";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import lock from "../../Images/lock.png"

const Courseoverviewpaid: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setIsLoading(true);
    try {
      axios
        .get(`https://app.mynalu.com/wp-json/nalu-app/v1/courses?lang=en`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setCourseData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <IonSpinner name="crescent"></IonSpinner>
          </div>
        </>
      ) : (
        <>
          <IonPage className="Courseoverviewpaid">
            <IonHeader className="ion-no-border">
              <IonToolbar>
                <IonButton color={"dark"} fill="clear">
                  <IonIcon icon={menuOutline} />
                </IonButton>

                <IonButtons slot="end">
                  <IonButton color="dark">
                    <IonIcon icon={notificationsOutline} />
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding-horizontal" fullscreen>
              <div className="the-title">
                <h3>Nalu Endo Flow</h3>
              </div>
              <div className="progress-holder">
                <p>Course Progress</p>
                <div className="flex al-center jc-between">
                  <IonProgressBar value={0.5}></IonProgressBar>
                  <h6>12%</h6>
                </div>
              </div>

              <div className="the-list">
              {courseData?.map((course) => (
  <div key={course.id}>
    <div className="resume-holder">
      <h3 >{course.title}</h3>
    </div>
    <IonAccordionGroup   multiple={false}>
  {course.items.map((module, moduleIndex) => (
    <IonAccordion className="first_accord" value={moduleIndex} key={moduleIndex}>
      <IonItem slot="header" lines="none">
        <IonLabel style={{"fontWeight":"600"}}>{module.title}</IonLabel>
      </IonItem>
      <div slot="content">
        {module?.items?.map((chapter, chapterIndex) => (
          <IonAccordionGroup key={chapterIndex} multiple={false}>
          <IonAccordion value={chapterIndex}>
            <IonItem slot="header" lines="inset">
              <IonLabel style={{ marginLeft: "10px","color":"#636363" }}>Chapter: {chapter.title}</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
            <IonAccordionGroup multiple={false}>
          <IonAccordion >
            <IonItem slot="header" lines="inset">
              <IonLabel style={{"color":"#636363" }}>Sub-Chapter: ------</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
            Sub-Chapter 1
            </div>
          </IonAccordion>
          <IonAccordion disabled={true}>
            <IonItem slot="header" lines="inset">
              <IonLabel style={{"color":"#636363" }}>Sub-Chapter: ------</IonLabel>
              <IonIcon
              src="assets/imgs/icn-lock.svg"
                  className="ion-accordion-toggle-icon custom-icon"
                  slot="end" ></IonIcon>
          {/* <IonIcon src="assets/imgs/icn-email.svg" slot="end"/> */}

               {/* <img src={lock} alt="" /> */}
            </IonItem>
            <div className="ion-padding" slot="content">
            Sub-Chapter 2
            </div>
          </IonAccordion>
          </IonAccordionGroup>
            </div>
          </IonAccordion>
        </IonAccordionGroup>
        
        ))}
      </div>
    </IonAccordion>
  ))}
</IonAccordionGroup>



  </div>
))}

</div>

                

              {/* <div className="resume-holder">
                <h3>NALU Stress Relief</h3>
              </div> */}
            </IonContent>
          </IonPage>
        </>
      )}
    </>
  );
};

export default Courseoverviewpaid;
