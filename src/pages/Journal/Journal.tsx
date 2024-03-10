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
  isPlatform,
} from "@ionic/react";
import {
  add,
  informationCircleOutline,
  menuOutline,
  notificationsOutline,
  searchOutline,
} from "ionicons/icons";

import "./Journal.scss";
import { useEffect, useLayoutEffect, useState } from "react";
import Addrecmodal from "../modals/Addrec/Addrecmodal";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { HTTP } from "@awesome-cordova-plugins/http";

import heart from "../../Images/heart.svg";
import h_outline from "../../Images/heart-outline.svg";
import thumbs_up from "../../Images/thumbs-up.svg";
import thumbs_up_outline from "../../Images/thumbs-up-outline.svg";
import thumbs_down from "../../Images/thumbs-down.svg";
import thumbs_down_outline from "../../Images/thumbs-down-outline.svg";
import filter from "../../Images/filter.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotificationBell from "./../../components/NotificationBell";
import authService from "../../authService";

const Journal: React.FC = () => {
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
  const dataReceivedAsString = new URLSearchParams(location.search).get("data");

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
  const getCategoriesOverview = async () => {
    setIsLoading(true);

    const jwtToken = localStorage.getItem("jwtToken");
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
    };

    if (isPlatform("ios")) {
      // Use Cordova HTTP plugin for iOS
      try {
        const response = await HTTP.get(
          `https://staging.app.mynalu.com/wp-json/nalu-app/v1/parent-categories`,
          {},
          headers
        );
        const data = JSON.parse(response.data);
        console.log(data);
        setCategoriesOverview(data);
      } catch (error) {
        if (error) {
          const status = error.status;

          if (status === 401 || status === 403 || status === 404) {
            // Unauthorized, Forbidden, or Not Found
            authService.logout();
            history.push("/onboarding");
          }
        }
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Use Axios for other platforms
      try {
        const response = await axios.get(
          `https://staging.app.mynalu.com/wp-json/nalu-app/v1/parent-categories`,
          { headers }
        );
        console.log(response.data);
        setCategoriesOverview(response.data);
      } catch (error) {
        if (error.response) {
          const status = error.response.status;

          if (status === 401 || status === 403 || status === 404) {
            // Unauthorized, Forbidden, or Not Found
            authService.logout();
            history.push("/onboarding");
          }
        }
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const getCategoriesFavourites = async () => {
    setIsLoading(true);

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    };

    try {
      let response;
      if (isPlatform("ios")) {
        response = await HTTP.get(
          `https://staging.app.mynalu.com/wp-json/nalu-app/v1/ressources?favourite=true`,
          {},
          headers
        );
        response = JSON.parse(response.data);
      } else {
        response = await axios.get(
          `https://staging.app.mynalu.com/wp-json/nalu-app/v1/ressources?favourite=true`,
          { headers }
        );
      }
      console.log(response);
      setCategoriesFavourites(response.ressources);
    } catch (error) {
      if (error) {
        const status = error.status;

        if (status === 401 || status === 403 || status === 404) {
          // Unauthorized, Forbidden, or Not Found
          authService.logout();
          history.push("/onboarding");
        }
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getRecommendations = async () => {
    setIsLoading(true);

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    };

    try {
      let response;
      if (isPlatform("ios")) {
        response = await HTTP.get(
          `https://staging.app.mynalu.com/wp-json/nalu-app/v1/ressources?featured=true&per_page=4`,
          {},
          headers
        );
        response = JSON.parse(response.data);
      } else {
        response = await axios.get(
          `https://staging.app.mynalu.com/wp-json/nalu-app/v1/ressources?featured=true&per_page=4`,
          { headers }
        );
      }
      console.log(response);
      setRecommendations(response.ressources);
    } catch (error) {
      if (error) {
        const status = error.status;

        if (status === 401 || status === 403 || status === 404) {
          // Unauthorized, Forbidden, or Not Found
          authService.logout();
          history.push("/onboarding");
        }
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getCategoryByID = async (id) => {
    setIsLoading(true);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    };

    try {
      let response;
      if (isPlatform("ios")) {
        response = await HTTP.get(
          `https://staging.app.mynalu.com/wp-json/nalu-app/v1/ressources`,
          { category_id: id },
          headers
        );
        response = JSON.parse(response.data);
      } else {
        response = await axios.get(
          `https://staging.app.mynalu.com/wp-json/nalu-app/v1/ressources`,
          {
            params: { category_id: id },
            headers,
          }
        );
      }
      console.log(response);
      setFiltered(response.data);
    } catch (error) {
      if (isPlatform("ios")) {
        if (error) {
          const status = error.status;

          if (status === 401 || status === 403 || status === 404) {
            // Unauthorized, Forbidden, or Not Found
            authService.logout();
            history.push("/onboarding");
          }
        }
      } else {
        if (error.response) {
          const status = error.response.status;

          if (status === 401 || status === 403 || status === 404) {
            // Unauthorized, Forbidden, or Not Found
            authService.logout();
            history.push("/onboarding");
          }
        }
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleUpvote = async (is_upvoted, id, is_downvoted) => {
    let URL;
    if (is_upvoted) {
      URL = `https://staging.app.mynalu.com/wp-json/nalu-app/v1/upvote?id=${id}&status=false`;
    } else if (!is_upvoted && !is_downvoted) {
      URL = `https://staging.app.mynalu.com/wp-json/nalu-app/v1/upvote?id=${id}&status=true`;
    } else if (!is_upvoted && is_downvoted) {
      URL = `https://staging.app.mynalu.com/wp-json/nalu-app/v1/downvote?id=${id}&status=false`;
    }

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    };

    try {
      let response;
      if (isPlatform("ios")) {
        response = await HTTP.post(URL, {}, headers);
        response.data = JSON.parse(response.data);
      } else {
        response = await axios.post(URL, {}, { headers });
      }
      console.log(response.data);

      // Refresh categories and recommendations based on the response
      if (response.data.message === "Upvote added successfully") {
        if (!isFilterSelected) {
          getCategoriesFavourites();
        } else {
          getCategoryByID(categoryID);
        }
      }
    } catch (error) {
      if (isPlatform("ios")) {
        if (error) {
          const status = error.status;

          if (status === 401 || status === 403 || status === 404) {
            // Unauthorized, Forbidden, or Not Found
            authService.logout();
            history.push("/onboarding");
          }
        }
      } else {
        if (error.response) {
          const status = error.response.status;

          if (status === 401 || status === 403 || status === 404) {
            // Unauthorized, Forbidden, or Not Found
            authService.logout();
            history.push("/onboarding");
          }
        }
      }
      console.error(error);
    }
  };
  const handleDownvote = async (is_upvoted, id, is_downvoted) => {
    let URL;
    if (!is_downvoted && !is_upvoted) {
      URL = `https://staging.app.mynalu.com/wp-json/nalu-app/v1/downvote?id=${id}&status=true`;
    } else if (!is_downvoted && is_upvoted) {
      URL = `https://staging.app.mynalu.com/wp-json/nalu-app/v1/upvote?id=${id}&status=false`;
    } else if (is_downvoted) {
      URL = `https://staging.app.mynalu.com/wp-json/nalu-app/v1/downvote?id=${id}&status=false`;
    }

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    };

    try {
      let response;
      if (isPlatform("ios")) {
        response = await HTTP.post(URL, {}, headers);
        response.data = JSON.parse(response.data);
      } else {
        response = await axios.post(URL, {}, { headers });
      }
      console.log(response.data);

      // Refresh categories and recommendations based on the response
      if (response.data.message === "Downvote removed successfully") {
        if (!isFilterSelected) {
          getCategoriesFavourites();
        } else {
          getCategoryByID(categoryID);
        }
      }
    } catch (error) {
      if (isPlatform("ios")) {
        if (error) {
          const status = error.status;

          if (status === 401 || status === 403 || status === 404) {
            // Unauthorized, Forbidden, or Not Found
            authService.logout();
            history.push("/onboarding");
          }
        }
      } else {
        if (error.response) {
          const status = error.response.status;

          if (status === 401 || status === 403 || status === 404) {
            // Unauthorized, Forbidden, or Not Found
            authService.logout();
            history.push("/onboarding");
          }
        }
      }
      console.error(error);
    }
  };
  const handleSave = async (fav, id) => {
    let URL;
    if (fav) {
      URL = `https://staging.app.mynalu.com/wp-json/nalu-app/v1/favourites?id=${id}&status=false`;
    } else {
      URL = `https://staging.app.mynalu.com/wp-json/nalu-app/v1/favourites?id=${id}&status=true`;
    }

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    };

    try {
      let response;
      if (isPlatform("ios")) {
        response = await HTTP.post(URL, {}, headers);
        response.data = JSON.parse(response.data);
      } else {
        response = await axios.post(URL, {}, { headers });
      }
      console.log(response.data);

      // Refresh the favourites based on the response
      getCategoriesFavourites();
    } catch (error) {
      if (isPlatform("ios")) {
        if (error) {
          const status = error.status;

          if (status === 401 || status === 403 || status === 404) {
            // Unauthorized, Forbidden, or Not Found
            authService.logout();
            history.push("/onboarding");
          }
        }
      } else {
        if (error.response) {
          const status = error.response.status;

          if (status === 401 || status === 403 || status === 404) {
            // Unauthorized, Forbidden, or Not Found
            authService.logout();
            history.push("/onboarding");
          }
        }
      }
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
  const getResourceDetailsByID = async (id) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    };

    try {
      let response;
      if (isPlatform("ios")) {
        // Use Cordova HTTP plugin for iOS
        const cordovaResponse = await HTTP.get(
          `https://staging.app.mynalu.com/wp-json/nalu-app/v1/ressources/${id}`,
          {},
          headers
        );
        response = JSON.parse(cordovaResponse.data);
      } else {
        // Use Axios for other platforms
        const axiosResponse = await axios.get(
          `https://staging.app.mynalu.com/wp-json/nalu-app/v1/ressources/${id}`,
          { headers }
        );
        response = axiosResponse.data;
      }

      console.log(response);
      history.push("/tabs/tab3/resourcedetail", {
        data: response,
      });
    } catch (error) {
      if (isPlatform("ios")) {
        if (error) {
          const status = error.status;

          if (status === 401 || status === 403 || status === 404) {
            // Unauthorized, Forbidden, or Not Found
            authService.logout();
            history.push("/onboarding");
          }
        }
      } else {
        if (error.response) {
          const status = error.response.status;

          if (status === 401 || status === 403 || status === 404) {
            // Unauthorized, Forbidden, or Not Found
            authService.logout();
            history.push("/onboarding");
          }
        }
      }
      console.error(error);
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
              backgroundColor: "#F8F5F2",
            }}
          >
            <IonSpinner name="crescent"></IonSpinner>
          </div>
        </>
      ) : (
        <>
          <IonPage className="Journal">
            <IonHeader className="ion-no-border">
              <IonToolbar>
                <IonButtons slot="start">
                  <IonButton
                    color={"dark"}
                    onClick={() => history.push("/menu")}
                  >
                    <IonIcon icon={menuOutline} />
                  </IonButton>
                </IonButtons>
                {/*<IonButtons slot="end">
                  <IonButton color="dark">
                    <IonIcon icon={searchOutline} />
                  </IonButton>
                </IonButtons>
                <IonButtons slot="end">
                <IonButton slot="end" fill="clear">
                  <NotificationBell />
                </IonButton>
                </IonButtons>*/}
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
            <IonContent
              fullscreen
              className={`${isPlatform("ios") ? "safe-padding" : ""}`}
            >
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
                    <div className="selector mtype">
                      <IonRadioGroup>
                        {categoriesOverview.map((item, index) => (
                          <IonItem
                            key={index}
                            lines="none"
                            className={`img_div ${
                              categoryID === item.id
                                ? "selected"
                                : "non_selected"
                            }`}
                            onClick={() => getCategoryByID(item.id)}
                          >
                            <div>
                              {item.icon_url ? (
                                <img
                                  src={item.icon_url}
                                  alt={item.name}
                                  className="icon-img custom-icon"
                                />
                              ) : (
                                ""
                              )}
                            </div>
                            <IonLabel>{item.name}</IonLabel>
                          </IonItem>
                        ))}
                      </IonRadioGroup>
                    </div>
                    {isFilterSelected ? (
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
                                    <div
                                      onClick={() =>
                                        handleUpvote(
                                          card.is_upvoted,
                                          card.id,
                                          card.is_downvoted
                                        )
                                      }
                                      className="btn ion-activatable ripple-parent flex al-center"
                                    >
                                      {card.is_upvoted ? (
                                        <IonIcon src={thumbs_up}></IonIcon>
                                      ) : (
                                        <IonIcon
                                          src={thumbs_up_outline}
                                        ></IonIcon>
                                      )}
                                      <h6>{card.upvotes_number}</h6>
                                    </div>
                                    <div
                                      onClick={() =>
                                        handleDownvote(
                                          card.is_upvoted,
                                          card.id,
                                          card.is_downvoted
                                        )
                                      }
                                      className="btn ion-activatable ripple-parent flex al-center"
                                    >
                                      {card.is_downvoted ? (
                                        <IonIcon src={thumbs_down}></IonIcon>
                                      ) : (
                                        <IonIcon
                                          src={thumbs_down_outline}
                                        ></IonIcon>
                                      )}
                                      <h6>{card.downvotes_number}</h6>
                                    </div>
                                    <div
                                      onClick={() =>
                                        handleSave(card.favourite, card.id)
                                      }
                                      className="btn ion-activatable ripple-parent flex al-center"
                                    >
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
                  <IonContent
                    className={`ion-padding ${
                      isPlatform("ios") ? "safe-padding" : ""
                    }`}
                    fullscreen
                  >
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
                          <IonItem lines="none">
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
                                <div
                                  onClick={() =>
                                    handleUpvote(
                                      card.is_upvoted,
                                      card.id,
                                      card.is_downvoted
                                    )
                                  }
                                  className="btn ion-activatable ripple-parent flex al-center"
                                >
                                  {card.is_upvoted ? (
                                    <IonIcon src={thumbs_up}></IonIcon>
                                  ) : (
                                    <IonIcon src={thumbs_up_outline}></IonIcon>
                                  )}
                                  <h6>{card.upvotes_number}</h6>
                                </div>
                                <div
                                  onClick={() =>
                                    handleDownvote(
                                      card.is_upvoted,
                                      card.id,
                                      card.is_downvoted
                                    )
                                  }
                                  className="btn ion-activatable ripple-parent flex al-center"
                                >
                                  {card.is_downvoted ? (
                                    <IonIcon src={thumbs_down}></IonIcon>
                                  ) : (
                                    <IonIcon
                                      src={thumbs_down_outline}
                                    ></IonIcon>
                                  )}
                                  <h6>{card.downvotes_number}</h6>
                                </div>
                                <div
                                  onClick={() =>
                                    handleSave(card.favourite, card.id)
                                  }
                                  className="btn ion-activatable ripple-parent flex al-center"
                                >
                                  {!card.favourite ? (
                                    <IonIcon
                                      className={`heart-icon ${getFavouriteColor(
                                        card.favourite
                                      )}`}
                                      src={h_outline}
                                    ></IonIcon>
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
        </>
      )}
    </>
  );
};

export default Journal;
