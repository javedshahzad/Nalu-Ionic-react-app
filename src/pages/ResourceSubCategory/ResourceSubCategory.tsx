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
  arrowBack,
  informationCircleOutline,
  menuOutline,
  notificationsOutline,
  searchOutline,
} from "ionicons/icons";

import "./ResourceSubCategory.scss";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import axios from "axios";
import filter from "../../Images/filter.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image_not_found from "../../Images/image-not-found.png";
import { previousPaths } from "media-icons";
import { useParams } from "react-router-dom";

export interface r_id {
  resource_sub_id: string
}
const ResourceSubCategory: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<string>("overview");
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterSelected, setIsFilterSelected] = useState(false);
  const [categoriesOverview, setCategoriesOverview] = useState([]);
  const [categoriesFavourites, setCategoriesFavourites] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const [categoryID, setCategoryID] = useState(null);

  const history = useHistory();
  const {resource_sub_id} : any = useParams();
  const location = useLocation();

  // const { filteredData, subCategory, parent_id } = (location?.state || {}) as {
  //   filteredData: any;
  //   subCategory: any;
  //   parent_id: any;
  // };
  const [filtered, setFiltered] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [parentId, setParentId] = useState(resource_sub_id);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [categoryIds, setCategoryIds] = useState([]);

  useEffect(() => {
    // setFiltered(filteredData);
    // setSubCategories(subCategory);
    // setParentId(parent_id);
    // console.log(id)
    getParentCategoryByID(resource_sub_id)
  }, [resource_sub_id]);

  useEffect(() => {
    getCategoryByID(categoryIds);
  }, [categoryIds]);


  const getParentCategoryByID = (id) => {
    setIsLoading(true);
    // setCategoryID(id);

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
        setFiltered(response.data.ressources,);
        setSubCategories(response.data.sub_categories);
        // setParentId(parent_id);

        // history.push(`/tabs/tab4/resourcesubcateggory/${id}`, {
        //   filteredData: response.data.ressources,
        //   subCategory: response.data.sub_categories,
        //   parent_id: id,
        // });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        history.push(`/tabs/tab4`);
      });
  };

  const getCategoryByID = (ids) => {
    if(ids.length > 0){
    setIsCategoryLoading(true);
    // setCategoryID(id);
    setIsFilterSelected(true);

    axios
      .get(`https://app.mynalu.com/wp-json/nalu-app/v1/ressources`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        params: {
          category_id: ids.toString(),
        },
      })
      .then((response) => {
        setFiltered(response.data.ressources);
        // setSubCategories(response.data.sub_categories)
        setIsCategoryLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsCategoryLoading(false);
      });
    }
  };

  const addToArr = (id) => {
    // setCategoryIds((prev)=> Array.from(new Set ([... prev,id])))

    if (categoryIds.includes(id)) {
      const data = categoryIds.filter((val) => {
        return val !== id;
      });
      console.log(data)
      if(data.length === 0){
    getParentCategoryByID(resource_sub_id)

      }
      setCategoryIds(data);
    } else {
      setCategoryIds((prev) => [...prev, id]);
    }
  };

  // const handleUpvote = async (is_upvoted: any, id: any, is_downvoted: any) => {
  //   let URL: string;
  //   if (is_upvoted) {
  //     URL = `https://app.mynalu.com/wp-json/nalu-app/v1/upvote?id=${id}&status=false}`;
  //   } else {
  //     // <-
  //     URL = `https://app.mynalu.com/wp-json/nalu-app/v1/upvote?id=${id}&status=true`;
  //   }

  //   try {
  //     const response = await axios.post(
  //       URL,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     if (
  //       response.data.message === "Upvote handled successfully" ||
  //       response.data.message === "Downvote removed successfully" ||
  //       response.data.message === "Upvote removed successfully"
  //     ) {
  //       getCategoryByID(parentId);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const handleDownvote = async (
  //   is_upvoted: any,
  //   id: any,
  //   is_downvoted: any
  // ) => {
  //   let URL: string;
  //   if (is_downvoted) {
  //     // <-
  //     URL = `https://app.mynalu.com/wp-json/nalu-app/v1/downvote?id=${id}&status=false`;
  //   } else {
  //     URL = `https://app.mynalu.com/wp-json/nalu-app/v1/upvote?id=${id}&status=true`;
  //   }
  //   // else if (is_downvoted) {
  //   //   URL = `https://app.mynalu.com/wp-json/nalu-app/v1/downvote?id=${id}&status=false`;
  //   // }

  //   try {
  //     const response = await axios.post(
  //       URL,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  //         },
  //       }
  //     );
  //     if (
  //       response.data.message === "Downvote removed successfully" ||
  //       response.data.message === "Downvote added successfully" ||
  //       response.data.message === "Upvote removed successfully"
  //     ) {
  //       getCategoryByID(parentId);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const handleSave = async (fav: any, id: any) => {
  //   let URL: string;
  //   if (fav) {
  //     URL = `https://app.mynalu.com/wp-json/nalu-app/v1/favourites?id=${id}&status=false`;
  //   } else {
  //     URL = `https://app.mynalu.com/wp-json/nalu-app/v1/favourites?id=${id}&status=true`;
  //   }
  //   try {
  //     const response = await axios.post(
  //       URL,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     if ((response.data.message = "Post added to favourites successfully")) {
  //       getCategoryByID(parentId);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const navigateFilter = () => {
  //   setCategoryID(null);
  //   history.push("/filter");
  // };

  const getResourceDetailsByID = (id: any) => {
    setIsCategoryLoading(true);

    try {
      axios
        .get(`https://app.mynalu.com/wp-json/nalu-app/v1/ressources/${id}`)
        .then((response) => {
          console.log(response.data);
          history.push("/tabs/tab4/resourcedetail", {
            data: response.data,
            // resource_id: id
          });
          setIsCategoryLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsCategoryLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsCategoryLoading(false);
    }
  };
  return (
    <>
      <IonPage className="ResourceSubCategory">
        {isLoading ? (
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
        ) : (
          <>
            <IonHeader className="ion-no-border">
              <IonToolbar>
                <IonButtons slot="start">
                  <IonBackButton
                    color="dark"
                    text={""}
                    defaultHref="/tabs/tab4"
                  />
                </IonButtons>
                {/*<IonButtons slot="end">
                  <IonButton color="dark">
                    <IonIcon icon={searchOutline} />
                  </IonButton>
                </IonButtons>
                <IonButtons slot="end">
                  <IonButton color="dark">
                    <IonIcon icon={notificationsOutline} />
                  </IonButton>
              </IonButtons>*/}
              </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding" fullscreen>
              <div className="Resources">
                <div className="selector mtype">
                  <IonRadioGroup>
                    {/*<IonItem
                        lines="none"
                        onClick={navigateFilter}
                      >
                        <div>
                          <img
                            src={filter}
                            alt=""
                            style={{ marginRight: "5px" }}
                          />
                        </div>
                        <IonLabel>Filter</IonLabel>
                      </IonItem>*/}

                    {subCategories?.map((item, index) => (
                        <IonItem
                          key={index}
                          lines="none"
                          className={`img_div ${
                            categoryIds.includes(item.id)
                              ? "selected"
                              : "non_selected"
                          }`}
                          onClick={() => {
                            addToArr(item.id);
                          }}
                        >
                          <div className="icon_img">
                            {item?.icon_url ? (
                              <div
                                className={`icon__ ${
                                  categoryID === item.id
                                    ? "blackIcon"
                                    : "blackIcon"
                                }`}
                                dangerouslySetInnerHTML={{
                                  __html: item.svg_url,
                                }}
                              />
                            ) : null}
                          </div>
                          <IonLabel style={{ marginLeft: "10px" }}>
                            {item.name}
                          </IonLabel>
                        </IonItem>
                      )
                    )}
                  </IonRadioGroup>
                </div>

                <div className="the-list">
                  {isCategoryLoading ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "50vh",
                      }}
                    >
                      <IonSpinner name="crescent"></IonSpinner>
                    </div>
                  ) : (
                    filtered?.map((card, index) => (
                        <div className="resource-card" key={index}>
                          <IonItem
                            lines="none"
                            onClick={() => history.push(`/tabs/tab4/resourcedetail/${card.id}`)}
                          >
                            <div className="thumb" slot="start">
                              {card?.thumbnail_url ? (
                                <img src={card.thumbnail_url} alt="" />
                              ) : (
                                <span />
                              )}
                            </div>

                            <IonLabel>
                              <div className="first flex al-center">
                                <h3>{card?.title}</h3>
                              </div>
                              <div className="second flex al-center">
                              </div>
                              <h5 className="ion-text-wrap">
                                {card?.description}
                              </h5>
                            </IonLabel>
                          </IonItem>
                        </div>
                      )
                    )
                  )}
                </div>
              </div>
            </IonContent>
          </>
        )}
      </IonPage>
    </>
  );
};

export default ResourceSubCategory;
