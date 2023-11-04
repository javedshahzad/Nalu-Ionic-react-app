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
  menuOutline,
  notificationsOutline,
} from "ionicons/icons";

import "./Courseoverviewpaid.scss";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from 'react-router';
import NotificationBell from "../../components/NotificationBell";

const Courseoverviewpaid: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const history = useHistory();

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

  const navigateToCourseInner = (id)=>{
history.push('/tabs/tab2/courseinneroverview',{
    course_id:id
})
  }
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
                <IonButton color={"dark"} fill="clear" onClick={() => history.push('/menu')}>
                  <IonIcon icon={menuOutline} />
                </IonButton>

                <IonButtons slot="end">
            {/*<IonButton slot="end" fill="clear">
              <NotificationBell />
             </IonButton>*/}
          </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding-horizontal" fullscreen>
              <div className="the-list">
                {courseData?.map((course) => (
                  <div key={course.id}>
                    {course?.progress && (
                      <div className="progress-holder">
                        <p>Course Progress</p>
                        <div className="flex al-center jc-between">
                          <IonProgressBar
                            value={course.progress / 100}
                          ></IonProgressBar>
                          <h6>{course.progress}</h6>
                        </div>
                      </div>
                    )}
                    {course?.next_chapter?.title && (
                      <div className="resume-holder" 
                      onClick={()=> navigateToCourseInner(course.next_chapter.id)}
                      >
                        <h3>Resume Course</h3>
                        <IonItem button detail lines="none">
                          <IonLabel>{course?.next_chapter?.title}</IonLabel>
                        </IonItem>
                      </div>
                    )}

                    <div className="the-title">
                      <h3>{course.title}</h3>
                    </div>
                    <IonAccordionGroup multiple={false}>
                      {course.items.map((module, moduleIndex) => (
                        <IonAccordion
                          className="first_accord"
                          value={moduleIndex}
                          key={moduleIndex}
                        >
                          <IonItem slot="header" lines="none">
                            <IonLabel style={{ fontWeight: "600" }}>
                              {module.title}
                            </IonLabel>
                          </IonItem>
                          <div slot="content">
                            {module?.items?.map((chapter, chapterIndex) => (
                              <IonAccordionGroup
                                key={chapterIndex}
                                multiple={false}
                              >
                                {/* <IonAccordion value={chapterIndex} disabled={!chapter.preview}> */}
                                <IonAccordion value={chapterIndex}>

                                  <IonItem slot="header" lines="inset">
                                    <IonLabel
                                      style={{
                                        marginLeft: "10px",
                                        color: "#636363",
                                      }}
                                    >
                                      Chapter: {chapter.title}
                                    </IonLabel>
                                    {/* {
                                      !chapter.preview && (
                                        <IonIcon
                                                    src={"assets/imgs/icn-lock.svg"}
                                                    className="ion-accordion-toggle-icon custom-icon"
                                                    slot="end"
                                                  ></IonIcon>
                                      )
                                    } */}
                                  </IonItem>
                                  <div className="ion-padding" slot="content">
                                    {chapter?.items?.map(
                                      (sub_chapter, sub_chapter_index) => (
                                        <IonAccordionGroup
                                          key={sub_chapter_index}
                                          multiple={false}
                                        >
                                          <IonAccordion
                                            value={sub_chapter_index}
                                            disabled={
                                              sub_chapter.protected &&
                                              !sub_chapter.preview
                                            }
                                          >
                                            <IonItem
                                              slot="header"
                                              lines="inset"
                                            >
                                              <IonLabel
                                                style={{ color: "#636363" }}
                                              >
                                                {sub_chapter.title}
                                              </IonLabel>
                                              <IonIcon
                                                src={
                                                  sub_chapter.protected &&
                                                  !sub_chapter.preview
                                                    ? "assets/imgs/icn-lock.svg"
                                                    : "assets/imgs/right-arrow.svg"
                                                }
                                                className="ion-accordion-toggle-icon custom-icon"
                                                slot="end"
                                              ></IonIcon>
                                            </IonItem>
                                          </IonAccordion>
                                        </IonAccordionGroup>
                                      )
                                    )}
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
            </IonContent>
          </IonPage>
        </>
      )}
    </>
  );
};

export default Courseoverviewpaid;
