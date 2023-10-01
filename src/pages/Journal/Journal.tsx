import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRippleEffect,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
} from "@ionic/react";
import {
  add,
  informationCircleOutline,
  menuOutline,
  notificationsOutline,
  searchOutline,
} from "ionicons/icons";

import "./Journal.scss";
import { useEffect, useState } from "react";
import Addrecmodal from "../modals/Addrec/Addrecmodal";
import { useHistory } from "react-router";
import axios from "axios";

import heart from "../../Images/heart.svg";
import h_outline from "../../Images/heart-outline.svg"

const Journal: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<string>("overview");
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterSelected, setIsFilterSelected] = useState(false);
  const [categoriesOverview, setCategoriesOverview] = useState([]);
  const [categoriesFavourites, setCategoriesFavourites] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [id, setID] = useState();



  const history = useHistory();
  const resourceCards = [
    {
      title: "Nicht die Regel",
      iconSrc: "assets/imgs/rc1.png",
      recommendedBy: "Recommended by Dr.Jorg Keckstein, MD",
      description:
        "Nicht die regel handelt von drei Frauen, die uber ihr Leben mit Endometriose erzahlen.",
    },
    {
      title: "Veniam exerci",
      iconSrc: "assets/imgs/r2.png",
      recommendedBy: "Sponsored",
      description:
        "Eiusmod enim et dolor in velit mollit velit Commodo laborum eiusmod aute ex.Laboris nisi ipsum occaecat officia nulla",
    },
    {
      title: "Nisi ullamco ad",
      iconSrc: "assets/imgs/r3.png",
      recommendedBy: "Recommended by NALU Community",
      description:
        "Magna eu officia sit ipsum consectetur velit amet pariatur in sit tempor velit. Ex non est nostrud dolor ad officia. Volupt",
    },
    {
      title: "Consequat dol",
      iconSrc: "assets/imgs/r4.png",
      recommendedBy: "Recommended by Alena Romanovic, Pshycology",
      description:
        "Duis laborum fugiat aliqua ad nulla elit dolor duis aliquip commodo anim. Officia irsure",
    },
  ];
  useEffect(() => {
    setActiveSegment("overview");
    getCategoriesOverview();
    getCategoriesFavourites();
    getRecommendations();
  }, []);

  const navigateToNextPage = () => {
    history.push("/resourcedetail"); // Navigate to the "/next" route
  };

  const segmentChanged = (e: any) => {
    console.log(activeSegment);
    setActiveSegment(e.detail.value);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const getCategoriesOverview = () => {
    setIsLoading(true);

    axios
      .get(`https://app.mynalu.com/wp-json/nalu-app/v1/parent-categories`)
      .then((response) => {
        console.log(response.data);
        setCategoriesOverview(response.data);

        //setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  const getCategoriesFavourites = () => {
    axios
      .get(
        `https://app.mynalu.com/wp-json/nalu-app/v1/ressources?favourite=true`
      )
      .then((response) => {
        console.log(response.data);
        setCategoriesFavourites(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getRecommendations = () => {
    axios
      .get(
        `https://app.mynalu.com/wp-json/nalu-app/v1/ressources?featured=true&per_page=4`
      )
      .then((response) => {
        console.log(response.data);
        setRecommendations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getCategoryByID = (id) => {
    setID(id);

    axios
    .get(`https://app.mynalu.com/wp-json/nalu-app/v1/ressources`, {
      params: {
        category_id: id,
      },
    })
      .then((response) => {
        console.log(response.data);
        setFiltered(response.data);
        setIsFilterSelected(true)
      })
      .catch((error) => {
        console.log(error);
      });
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
            <IonButton color="dark">
              <IonIcon icon={notificationsOutline} />
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
          <>
             <div className="overview">
            <div className="btn-slider">
              {categoriesOverview.map((item, index) => (
                <IonButton fill="clear" key={index}>
                  <div 
                    className={`img_div ${id === item.id ? 'selected' : 'non_selected'}`}
                    onClick={()=>getCategoryByID(item.id)}>
                    {item.icon_url ? (
                      <img
                        src={item.icon_url}
                        alt={item.name}
                        className="icon-img custom-icon"
                      />
                    ) : (
                      ""
                    )}
                    <p>{item.name}</p>
                  </div>
                </IonButton>
              ))}
            </div>
            {
              isFilterSelected?
              <>
              <div className="the-list">
                {filtered.map((card, index) => (
                  <div
                    className="resource-card"
                    key={index}
                    onClick={() => navigateToNextPage()}
                  >
                    <IonItem lines="none">
                      <div className="thumb" slot="start">
                        <img src={"assets/imgs/rc1.png"} alt="" />
                      </div>

                      <IonLabel>
                        <div className="first flex al-center">
                          <h3>{card.title}</h3>
                          <IonIcon src="assets/imgs/moviesm.svg" />
                        </div>
                        <div className="second flex al-center">
                          <IonIcon icon={informationCircleOutline} />
                          <p className="ion-text-wrap">
                            {card?.authority?.title}
                          </p>
                        </div>
                        <h5 className="ion-text-wrap">{card.title}</h5>
                        <div className="btns-holder flex al-center jc-between">
                          <div className="btn ion-activatable ripple-parent flex al-center">
                            <IonIcon src="assets/imgs/icn-like.svg" />
                            <h6>{card.upvotes_number}</h6>
                          </div>
                          <div className="btn ion-activatable ripple-parent flex al-center">
                            <IonIcon src="assets/imgs/icn-dislike.svg" />
                            <h6>{card.downvotes_number}</h6>
                          </div>
                          <div className="btn ion-activatable ripple-parent flex al-center">
                            {!card.favourite ? (
                              <IonIcon src={h_outline}></IonIcon>
                            ) : (
                              <IonIcon src={heart}></IonIcon>
                            )}
                            <h6>Save</h6>
                          </div>
                        </div>
                      </IonLabel>
                    </IonItem>
                  </div>
                ))}
              </div>
              </>
              :
              <>
           <div className="recommended">
              <div className="title-holder">
                <h3>Recommended</h3>
              </div>
              <IonRow>
                {recommendations.map((item, index) => (
                  <IonCol size="6" key={index}>
                    <div className="rc-card ion-activatable ripple-parent">
                      <IonRippleEffect />
                      <div className="img-holder">
                        {item.icon_url ? (
                          <svg width="16" height="16">
                            <image
                              href={item.icon_url}
                              x="0"
                              y="0"
                              height="16"
                              width="16"
                            />
                          </svg>
                        ) : (
                          <img src="assets/imgs/rc1.svg" alt="" />
                        )}

                        <div className="btn ion-activatable ripple-parent flex al-center jc-center">
                          {item.parent_category.map((value, index) =>
                            value.icon_url ? (
                              <img key={index} src={value.icon_url} alt="" />
                            ) : (
                              <p key={index}>null</p>
                            )
                          )}
                        </div>
                      </div>

                      <h4>{item.title}</h4>
                    </div>
                  </IonCol>
                ))}
              </IonRow>
            </div>
              </>
            }
            <div className="add-recommendation ion-text-center">
              <IonButton onClick={() => setModalOpen(true)}>
                <IonIcon icon={add} />
              </IonButton>
              <h4>Add Recommendation</h4>
            </div>
          </div>
           
          </>
        ) : (
          <div className="Resources">
            <IonContent className="ion-padding" fullscreen>
              <div className="selector mtype">
                <IonRadioGroup>
                  <IonItem lines="none">
                    <IonIcon slot="start" src="assets/imgs/f1.svg" />
                    <IonLabel>Books</IonLabel>
                    <IonRadio value="books"></IonRadio>
                  </IonItem>

                  <IonItem lines="none">
                    <IonIcon slot="start" src="assets/imgs/f2.svg" />
                    <IonLabel>Movies</IonLabel>
                    <IonRadio value="Movies"></IonRadio>
                  </IonItem>

                  <IonItem lines="none">
                    <IonIcon slot="start" src="assets/imgs/f3.svg" />
                    <IonLabel>Articles</IonLabel>
                    <IonRadio value="Articles"></IonRadio>
                  </IonItem>

                  <IonItem lines="none">
                    <IonIcon slot="start" src="assets/imgs/f4.svg" />
                    <IonLabel>Pap</IonLabel>
                    <IonRadio value="Pap"></IonRadio>
                  </IonItem>
                </IonRadioGroup>
              </div>
              <div className="the-list">
                {categoriesFavourites.map((card, index) => (
                  <div
                    className="resource-card"
                    key={index}
                    onClick={() => navigateToNextPage()}
                  >
                    <IonItem lines="none">
                      <div className="thumb" slot="start">
                        <img src={"assets/imgs/rc1.png"} alt="" />
                      </div>

                      <IonLabel>
                        <div className="first flex al-center">
                          <h3>{card.title}</h3>
                          <IonIcon src="assets/imgs/moviesm.svg" />
                        </div>
                        <div className="second flex al-center">
                          <IonIcon icon={informationCircleOutline} />
                          <p className="ion-text-wrap">
                            {card?.authority?.title}
                          </p>
                        </div>
                        <h5 className="ion-text-wrap">{card.title}</h5>
                        <div className="btns-holder flex al-center jc-between">
                          <div className="btn ion-activatable ripple-parent flex al-center">
                            <IonIcon src="assets/imgs/icn-like.svg" />
                            <h6>{card.upvotes_number}</h6>
                          </div>
                          <div className="btn ion-activatable ripple-parent flex al-center">
                            <IonIcon src="assets/imgs/icn-dislike.svg" />
                            <h6>{card.downvotes_number}</h6>
                          </div>
                          <div className="btn ion-activatable ripple-parent flex al-center">
                            {!card.favourite ? (
                              <IonIcon src={h_outline}></IonIcon>
                            ) : (
                              <IonIcon src={heart}></IonIcon>
                            )}
                            <h6>Save</h6>
                          </div>
                        </div>
                      </IonLabel>
                    </IonItem>
                  </div>
                ))}
              </div>
            </IonContent>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Journal;
