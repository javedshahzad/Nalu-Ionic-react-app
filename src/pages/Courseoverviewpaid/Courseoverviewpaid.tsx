import {
  IonAccordion,
  IonAccordionGroup,
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
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import { menuOutline } from "ionicons/icons";

import "./Courseoverviewpaid.scss";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChapter,
  fetchNextChapter,
  fetchProgressNextChap,
} from "../../actions/courseActions";

const Courseoverviewpaid: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [misc, setMisc] = useState([]);

  const history = useHistory();
  const location = useLocation();

  let axiosCancelToken;

  useEffect(() => {
    // getData();

    return () => {
      if (axiosCancelToken) {
        axiosCancelToken.cancel("Component unmounted");
      }
    };
  }, [location.pathname]);

  const roles = JSON.parse(localStorage.getItem("roles")) || {};

  const fetchCourses = useSelector(
    (state: any) => state.courseReducer.getCourses
  );
  const fetchNextChapProgress = useSelector(
    (state: any) => state.courseReducer.getProgressNextChap
  );
  const fetchNextChap = useSelector(
    (state: any) => state.courseReducer.getChapter
  );

  useEffect(() => {
    setIsLoading(true);
    fetchCourses
      .then((result: any) => {
        const data = result;
        setCourseData(data);
        setIsLoading(false);
      })
      .catch((error: any) => {
        console.error("Error fetching courses", error);
      });
  }, [fetchCourses]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchNextChap;
        console.log("result", result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [courseData]);

  useEffect(() => {
    if (courseData && courseData.length > 0) {
      courseData.map((data, index) => {
        const urls = misc[index]?.next_chapter_link;
        dispatch<any>(fetchNextChapter(urls));
      });
    }
  }, [courseData]);

  let isPremium = false; // Default to false
  try {
    const roles = JSON.parse(localStorage.getItem("roles") || "{}");
    isPremium = Object.values(roles).includes("premium");
  } catch (e) {
    console.error("Error parsing roles from localStorage:", e);
  }

  // const getData = () => {
  //   setIsLoading(true);

  //   const jwtToken = localStorage.getItem("jwtToken");
  //   const headers = {
  //     Authorization: `Bearer ${jwtToken}`,
  //   };

  //   if (isPlatform("ios")) {
  //     // Use Cordova HTTP plugin for iOS
  //     HTTP.get(
  //       `${BASE_URL}/wp-json/nalu-app/v1/courses?lang=de`,
  //       {},
  //       headers
  //     )
  //       .then((response) => {
  //         const data = JSON.parse(response.data);
  //           setCourseData(data);
  //         setIsLoading(false);
  //       })
  //       .catch((error) => {
  //         if (error) {
  //           const status = error.status;

  //           if (status === 401 || status === 403 || status === 404) {
  //             // Unauthorized, Forbidden, or Not Found
  //             authService.logout();
  //             history.push("/onboarding");
  //           }
  //         }

  //         console.error(error);
  //         setIsLoading(false);
  //       });
  //   } else {
  //     // Use Axios for other platforms
  //     const source = axios.CancelToken.source();
  //     axiosCancelToken = source;

  //     axios
  //       .get(`${BASE_URL}/wp-json/nalu-app/v1/courses?lang=de`, {
  //         headers: headers,
  //         cancelToken: source.token,
  //       })
  //       .then((response) => {
  //       //   setCourseData(response.data);
  //         setIsLoading(false);
  //       })
  //       .catch((error) => {
  //         if (error.response) {
  //           const status = error.response.status;

  //           if (status === 401 || status === 403 || status === 404) {
  //             // Unauthorized, Forbidden, or Not Found
  //             authService.logout();
  //             history.push("/onboarding");
  //           }
  //         }

  //         console.error(error);
  //         setIsLoading(false);
  //       });
  //   }
  // };

  const dispatch = useDispatch();

  // let currentChapterId = null;

  const navigateToCourseInner = async (id: any) => {
    setCurrentChapterId(id);

    try {
      if (id === currentChapterId) {
        history.push("/tabs/tab1/courseinneroverview");
      }
      // else if(){

      // }
      else {
        await dispatch<any>(fetchChapter(id));
        history.push("/tabs/tab1/courseinneroverview");
      }
    } catch (error) {
      console.error("Error navigating to course inner:", error);
    } finally {
    }
  };

  const fetchData = async () => {
    const result = await fetchNextChapProgress;
    const data = await result;
    setMisc(data);
  };

  useEffect(() => {
    fetchData();
  }, [misc, dispatch, fetchNextChapProgress]);

  return (
    <>
      <IonPage className="Courseoverviewpaid">
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              backgroundColor: "#F8F5F2",
            }}
          >
            <IonSpinner name="crescent"></IonSpinner>
          </div>
        ) : (
          <>
            <IonHeader className="ion-no-border">
              <IonToolbar>
                <IonButtons slot="end">
                  <IonButton color="dark" onClick={() => history.push("/menu")}>
                    <IonIcon icon={menuOutline} />
                  </IonButton>
                </IonButtons>

                {/*<IonButtons slot="end">
                  <IonButton slot="end" fill="clear">
                    <NotificationBell />
                  </IonButton>
                </IonButtons>*/}
              </IonToolbar>
            </IonHeader>
            <IonContent
              className={`ion-padding-horizontal ${
                isPlatform("ios") ? "safe-padding" : ""
              }`}
              fullscreen
            >
              <div className="the-list">
                {courseData?.map((course, index) => (
                  <div key={course.id}>
                    <div className="the-title">
                      <h3>{course.title}</h3>
                    </div>
                    {course.id !== 866 && !isPremium && (
                      <div className="btn-holder ion-text-center ion-padding-vertical join-btn">
                        <IonButton
                          expand="block"
                          onClick={() => history.push("/membership")}
                        >
                          {course.title} beitreten
                        </IonButton>
                      </div>
                    )}

                    {misc[index] && (
                      <div className="progress-holder">
                        <p>Fortschritt</p>
                        <div className="flex al-center jc-between">
                          <IonProgressBar
                            value={misc[index]?.progress / 100}
                          ></IonProgressBar>
                          <h6>{misc[index]?.progress}%</h6>
                        </div>
                      </div>
                    )}
                    {misc[index]?.next_chapter_title && (
                      <div
                        className="resume-holder"
                        onClick={() => {
                          if (
                            !misc[index]?.protected ||
                            misc[index]?.preview ||
                            isPremium
                          ) {
                            navigateToCourseInner(misc[index]?.next_chapter_id);

                            console.log("index", index);
                          }
                        }}
                      >
                        <h3>Kurs fortsetzen</h3>
                        <IonItem button detail lines="none">
                          <IonLabel>{misc[index]?.next_chapter_title}</IonLabel>
                        </IonItem>
                      </div>
                    )}
                    <IonAccordionGroup
                      multiple={false}
                      className="course-content"
                    >
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
                                <IonAccordion value={chapterIndex}>
                                  <IonItem
                                    slot="header"
                                    lines="inset"
                                    onClick={() => {
                                      if (
                                        !chapter.items &&
                                        chapter.protected &&
                                        !isPremium &&
                                        !chapter.preview
                                      ) {
                                        history.push("/membership");
                                      } else if (
                                        !chapter.items &&
                                        (!chapter.protected ||
                                          chapter.preview ||
                                          isPremium)
                                      ) {
                                        navigateToCourseInner(chapter.id);
                                      }
                                    }}
                                  >
                                    <IonLabel
                                      style={{
                                        marginLeft: "10px",
                                        color: "#636363",
                                      }}
                                    >
                                      <div
                                        className="paragraph"
                                        dangerouslySetInnerHTML={{
                                          __html: `${chapter.title}`,
                                        }}
                                      ></div>
                                    </IonLabel>
                                    {!chapter.items && (
                                      <IonIcon
                                        src={
                                          chapter.protected &&
                                          !isPremium &&
                                          !chapter.preview
                                            ? "assets/imgs/icn-lock.svg"
                                            : "assets/imgs/right-arrow.svg"
                                        }
                                        slot="end"
                                        size="small"
                                        className="ion-accordion-toggle-icon no-rotation"
                                      />
                                    )}
                                  </IonItem>
                                  {chapter?.items && (
                                    <div className="ion-padding" slot="content">
                                      {chapter?.items?.map(
                                        (sub_chapter, sub_chapter_index) => (
                                          <IonItem
                                            key={sub_chapter_index}
                                            lines="inset"
                                            onClick={() => {
                                              if (
                                                sub_chapter.protected &&
                                                !isPremium &&
                                                !sub_chapter.preview
                                              ) {
                                                history.push("/membership");
                                              } else if (
                                                !sub_chapter.items &&
                                                (!sub_chapter.protected ||
                                                  sub_chapter.preview ||
                                                  isPremium)
                                              ) {
                                                navigateToCourseInner(
                                                  sub_chapter.id
                                                );
                                              }
                                            }}
                                          >
                                            <IonLabel
                                              style={{ color: "#636363" }}
                                            >
                                              {sub_chapter.title}
                                            </IonLabel>
                                            <IonIcon
                                              src={
                                                sub_chapter.items
                                                  ? "assets/imgs/right-arrow.svg"
                                                  : sub_chapter.protected &&
                                                    !isPremium &&
                                                    !sub_chapter.preview
                                                  ? "assets/imgs/icn-lock.svg"
                                                  : "assets/imgs/right-arrow.svg"
                                              }
                                              className="ion-accordion-toggle-icon custom-icon custom_icon"
                                              slot="end"
                                            ></IonIcon>
                                          </IonItem>
                                        )
                                      )}
                                    </div>
                                  )}
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
          </>
        )}
      </IonPage>
    </>
  );
};

export default Courseoverviewpaid;
