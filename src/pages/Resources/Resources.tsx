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
  IonSpinner,
  IonToolbar,
  useIonViewDidEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import {
  add,
  informationCircleOutline,
  menuOutline,
  notificationsOutline,
  searchOutline,
} from "ionicons/icons";

import "./Resources.scss";
import { useEffect, useLayoutEffect, useState } from "react";
import Addrecmodal from "../modals/Addrec/Addrecmodal";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import axios from "axios";
import filter from "../../Images/filter.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Resources: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<string>("overview");
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterSelected, setIsFilterSelected] = useState(false);
  const [categoriesOverview, setCategoriesOverview] = useState([]);
  const [categoriesFavourites, setCategoriesFavourites] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categoryID, setCategoryID] = useState("");

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    Data();
  }, []);

  const Data = () => {
    if (localStorage.getItem("DATA")) {
      setActiveSegment("favourites");
      setCategoriesFavourites(JSON.parse(localStorage.getItem("DATA")));
    } else {
      getCategoriesOverview();
      getCategoriesFavourites();
      getRecommendations();
      setActiveSegment("overview");
    }
  };

  useIonViewDidEnter(() => {
    if (localStorage.getItem("DATA")) {
      setActiveSegment("favourites");
      setCategoriesFavourites(JSON.parse(localStorage.getItem("DATA")));
    } else {
    }
  });

  const navigateToNextPage = () => {
    if (!isFilterSelected) {
      history.push("/resourcedetail");
    }
  };

  const segmentChanged = (e: any) => {
    setActiveSegment(e.detail.value);
    if (e.detail.value === "overview") {
      getCategoriesOverview();
      getRecommendations();
      localStorage.removeItem("DATA");
    } else {
      getCategoriesFavourites();
      setIsFilterSelected(false);
      setCategoryID("");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const getCategoriesOverview = () => {
    setIsLoading(true);

    axios
      .get(`https://app.mynalu.com/wp-json/nalu-app/v1/parent-categories`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCategoriesOverview(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  const getCategoriesFavourites = () => {
    setIsLoading(true);

    axios
      .get(
        `https://app.mynalu.com/wp-json/nalu-app/v1/ressources?favourite=true`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setCategoriesFavourites(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  const getRecommendations = () => {
    setIsLoading(true);

    axios
      .get(
        `https://app.mynalu.com/wp-json/nalu-app/v1/ressources?featured=true&per_page=4`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setRecommendations(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  const getCategoryByID = (id) => {
    console.log(id);
    setCategoryID(id);
    if (!isFilterSelected) {
      setIsLoading(true);
    } // for first loading
    setIsFilterSelected(true);

    axios
      .get(`https://app.mynalu.com/wp-json/nalu-app/v1/ressources`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        params: {
          category_id: id,
        },
      })
      .then((response) => {
        console.log(response.data);
        setFiltered(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  const handleUpvote = async (is_upvoted, id, is_downvoted) => {
    let URL;
    if (is_upvoted) {
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/upvote?id=${id}&status=false}`;
    } else if (!is_upvoted && !is_downvoted) {
      // <-
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/upvote?id=${id}&status=true`;
    } else if (!is_upvoted && is_downvoted) {
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/downvote?id=${id}&status=false`;
    }

    try {
      const response = await axios.post(
        URL,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      console.log(response.data);
      if (
        (response.data.message = "Upvote added successfully") &&
        !isFilterSelected
      ) {
        axios
          .get(
            `https://app.mynalu.com/wp-json/nalu-app/v1/ressources?favourite=true`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            setCategoriesFavourites(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (
        (response.data.message = "Upvote added successfully") &&
        isFilterSelected
      ) {
        getCategoryByID(id);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDownvote = async (is_upvoted, id, is_downvoted) => {
    let URL;
    if (!is_downvoted && !is_upvoted) {
      // <-
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/downvote?id=${id}&status=true`;
    } else if (!is_downvoted && is_upvoted) {
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/upvote?id=${id}&status=false`;
    } else if (is_downvoted) {
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/downvote?id=${id}&status=false`;
    }

    try {
      const response = await axios.post(
        URL,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      if (
        (response.data.message = "Downvote removed successfully") &&
        !isFilterSelected
      ) {
        axios
          .get(
            `https://app.mynalu.com/wp-json/nalu-app/v1/ressources?favourite=true`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
              },
            }
          )
          .then((response) => {
            setCategoriesFavourites(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (
        (response.data.message = "Downvote removed successfully") &&
        isFilterSelected
      ) {
        getCategoryByID(categoryID);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSave = async (fav, id) => {
    let URL;
    if (fav) {
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/favourites?id=${id}&status=false`;
    } else {
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/favourites?id=${id}&status=true`;
    }
    try {
      const response = await axios.post(URL,{},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getFavouriteColor = (fav) => {
    if (fav) {
      return "filled";
    } else {
      return "not-filled";
    }
  };

  const navigateFilter = () => {
    history.push("/filter");
  };
  const setToastAndClose = (val) => {
    toast.success(val);
    setModalOpen(false);
  };
  const getResourceDetailsByID = (id) => {
    try {
      axios
        .get(`https://app.mynalu.com/wp-json/nalu-app/v1/ressources/${id}`)
        .then((response) => {
          console.log(response.data);
          history.push("/resourcedetail", {
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
  return (
    <>
      <ToastContainer autoClose={19000} />
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
          <IonPage className="Overview">
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
                <Addrecmodal onClose={(val) => setToastAndClose(val)} />
              </IonModal>
              {activeSegment === "overview" ? (
                <>
                  <div className="overview">
                    {!isFilterSelected ? (
                      <>
                        <div className="selector mtype">
                          <IonRadioGroup>
                            {categoriesOverview.map((item, index) => (
                              <IonItem
                                key={index}
                                lines="none"
                                onClick={() => getCategoryByID(item.id)}
                              >
                                <div className="icon-img">
                                  {item.icon_url ? (
                                    <img src={item.icon_url} alt={item.name} />

                                  ) : (
                                    "null"
                                  )}
                                </div>
                                <IonLabel>{item.name}</IonLabel>
                              </IonItem>
                            ))}
                          </IonRadioGroup>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {isFilterSelected ? (
                      <>
                        <div className="selector mtype">
                          <IonRadioGroup>
                            {filtered
                              .filter(
                                (item) =>
                                  item.category && item.category.length > 0
                              )
                              .map((item, index) => (
                                <IonItem
                                  key={index}
                                  lines="none"
                                  onClick={() => getCategoryByID(item.id)}
                                >
                                  <div className="icon-img">
                                    {item.category.map(
                                      (categoryItem, categoryIndex) => (
                                        <div key={categoryIndex}>
                                          {categoryItem.icon_url ? (
                                            <img
                                              src={categoryItem.icon_url}
                                              alt={categoryItem.name}
                                            />
                                          ) : (
                                            "nulp"
                                          )}
                                          <IonLabel>
                                            {categoryItem.name}
                                          </IonLabel>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </IonItem>
                              ))}
                          </IonRadioGroup>
                        </div>
                        <div className="the-list">
                          {filtered.map((card, index) => (
                            <div
                              className="resource-card"
                              key={index}
                              onClick={() => getResourceDetailsByID(card.id)}
                            >
                              <IonItem lines="none">
                                <div className="thumb" slot="start">
                                  {card?.thumbnail_url ? (
                                    <img
                                      style={{ borderRadius: "15px" }}
                                      src={card.thumbnail_url}
                                      alt=""
                                    />
                                  ) : (
                                    <img
                                      src="Not found"
                                      alt="Image not found"
                                    />
                                  )}
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
                                  <h5 className="ion-text-wrap">
                                    {card.title}
                                  </h5>
                                  <div className="btns-holder flex al-center jc-between">
                                    {/* <div
                                      onClick={() =>
                                        handleUpvote(
                                          card.is_upvoted,
                                          card.id,
                                          card.is_downvoted
                                        )
                                      } */}
                                    <div className="btn ion-activatable ripple-parent flex al-center">
                                      {card.is_upvoted ? (
                                        <IonIcon src="assets/imgs/like-unfilled.svg" />
                                      ) : (
                                        <IonIcon src="assets/imgs/like-filled.svg" />
                                      )}
                                      <h6>{card.upvotes_number}</h6>
                                    </div>
                                    {/* <div
                                      onClick={() =>
                                        handleDownvote(
                                          card.is_upvoted,
                                          card.id,
                                          card.is_downvoted
                                        )
                                      } */}
                                    <div className="btn ion-activatable ripple-parent flex al-center">
                                      {card.is_downvoted ? (
                                        <IonIcon src="assets/imgs/dislike-unfilled.svg" />
                                      ) : (
                                        <IonIcon src="assets/imgs/dislike-filled.svg"></IonIcon>
                                      )}
                                      <h6>{card.downvotes_number}</h6>
                                    </div>
                                    {/* <div
                                      onClick={() =>
                                        handleSave(card.favourite, card.id)
                                      } */}
                                      <div
                                      className="btn ion-activatable ripple-parent flex al-center"
                                    >
                                      {!card.favourite ? (
                                        <IonIcon src="assets/imgs/heart-unfilled.svg"></IonIcon>
                                      ) : (
                                        <IonIcon src="assets/imgs/heart-filled.svg" />
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
                    ) : (
                      <>
                        <div className="recommended">
                          <div className="title-holder">
                            <h3>Recommended</h3>
                          </div>
                          <IonRow>
                            {recommendations.map((item, index) => (
                              <IonCol size="6" key={index}>
                                <div
                                  className="rc-card ion-activatable ripple-parent"
                                  onClick={() =>
                                    getResourceDetailsByID(item.id)
                                  }
                                >
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
                                      <img src={item?.thumbnail_url} alt="" />
                                    )}

                                    <div className="btn ion-activatable ripple-parent flex al-center jc-center">
                                      {item.parent_category.map(
                                        (value, index) =>
                                          value.icon_url ? (
                                            <img
                                              key={index}
                                              src={value.icon_url}
                                              alt=""
                                            />
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
                    )}
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
                    <div className="selector mtype"></div>
                    <IonRadioGroup>
                      <IonItem
                        lines="none"
                        className="filter"
                        onClick={() => navigateFilter()}
                      >
                        <img
                          src={filter}
                          alt=""
                          style={{ marginRight: "5px" }}
                        />
                        <IonLabel>Filter</IonLabel>
                      </IonItem>
                    </IonRadioGroup>

                    <div className="the-list">
                      {categoriesFavourites.map((card, index) => (
                        <div className="resource-card" key={index}>
                          <IonItem
                            lines="none"
                            onClick={() => getResourceDetailsByID(card.id)}
                          >
                            <div className="thumb" slot="start">
                              {card?.thumbnail_url ? (
                                <img src={card.thumbnail_url} alt="" />
                              ) : (
                                <img src="Not found" alt="Image not found" />
                              )}
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
                                {/* <div
                                  onClick={() =>
                                    handleUpvote(
                                      card.is_upvoted,
                                      card.id,
                                      card.is_downvoted
                                    )
                                  } */}
                                <div className="btn ion-activatable ripple-parent flex al-center">
                                  {card.is_upvoted ? (
                                    <IonIcon src="assets/imgs/like-unfilled.svg" />
                                  ) : (
                                    <IonIcon src="assets/imgs/like-filled.svg" />
                                  )}
                                  <h6>{card.upvotes_number}</h6>
                                </div>
                                {/* <div
                                  onClick={() =>
                                    handleDownvote(
                                      card.is_upvoted,
                                      card.id,
                                      card.is_downvoted
                                    )
                                  } */}
                                <div className="btn ion-activatable ripple-parent flex al-center">
                                  {card.is_downvoted ? (
                                    <IonIcon src="assets/imgs/dislike-unfilled.svg" />
                                  ) : (
                                    <IonIcon src="assets/imgs/dislike-filled.svg"></IonIcon>
                                  )}
                                  <h6>{card.downvotes_number}</h6>
                                </div>
                                {/* <div
                                  onClick={() =>
                                    handleSave(card.favourite, card.id)
                                  } */}
                                  <div
                                  className="btn ion-activatable ripple-parent flex al-center"
                                >
                                  {!card.favourite ? (
                                    <IonIcon src="assets/imgs/heart-unfilled.svg"></IonIcon>
                                  ) : (
                                    <IonIcon src="assets/imgs/heart-filled.svg" />
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
        </>
      )}
    </>
  );
};

export default Resources;
