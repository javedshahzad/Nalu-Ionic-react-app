import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRange,
  IonRow,
  IonSpinner,
  IonToolbar,
} from "@ionic/react";

import "./Filtermodal.scss";
import { close } from "ionicons/icons";
import { useEffect, useState } from "react";
import axios from "axios";

const Filtermodal: React.FC = () => {
  const [rangeValues, setRangeValues] = useState({ lower: null, upper: null });
  const [apiRangeValues, setAPIRangeValues] = useState({ lower: null, upper: null });

  const [menuType, setMenuType] = useState([]);
  const [filterValues, setFilterValues] = useState("");
  const [mediaItems, setmediaItems] = useState([]);
  const [recommendedItems, setrecommendedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [votes, setVotes] = useState([]);

  const handleRangeChange = (event: CustomEvent) => {
    setRangeValues(event.detail.value);
  };

  useEffect(() => {
    getValues();
  }, []);

  const getValues = () => {
    setIsLoading(true);

    axios
      .get(`https://app.mynalu.com/wp-json/nalu-app/v1/filter-values?lang=en`)
      .then((response) => {
        console.log(response.data);
        setFilterValues(response.data);
        type CategoryObject = {
          name: string;
          icon_url: string | null;
        };

        const categoryArray = Object.entries(response.data.category).map(
          ([id, category]: [string, CategoryObject]) => ({
            id: parseInt(id),
            name: category.name,
            icon_url: category.icon_url,
            active: false,
          })
        );
        setmediaItems(categoryArray);

        const names = getFullNames(response.data.authorities);
        console.log(names);
        setrecommendedItems(names);

        setAPIRangeValues({
          lower: response.data.upvotes_min,
          upper: response.data.upvotes_max,
        });

        setRangeValues({
          lower: response.data.upvotes_min,
          upper: response.data.upvotes_max,
        });

        setIsLoading(false);
        //         const generatedValues = [];
        // for (let i = response.data.upvotes_min; i <= response.data.upvotes_max; i += 1) {
        //   generatedValues.push(i);
        // }
        // setVotes(generatedValues);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  const toggleMediaItemsActive = (index) => {
    const updatedItems = mediaItems.map((item, i) => {
      if (i === index) {
        return { ...item, active: !item.active };
      }
      return item;
    });
    setmediaItems(updatedItems);
  };

  const toggleRecommendedItemsActive = (index) => {
    const updatedItems = recommendedItems.map((item, i) => {
      if (i === index) {
        return { ...item, active: !item.active };
      }
      return item;
    });
    setrecommendedItems(updatedItems);
  };

  const handleResetFilters = () => {
    // Reset range values
    setRangeValues({ lower: 0, upper: 0 });

    getValues();
  };

  const getFullNames = (authoritiesObj) => {
    const fullNames = [];

    for (const authority in authoritiesObj) {
      if (Object.prototype.hasOwnProperty.call(authoritiesObj, authority)) {
        const {
          title_prefix,
          first_name,
          middle_name,
          last_name,
          title_suffix,
          category,
          icon_url,
        } = authoritiesObj[authority];

        // Construct the full name based on available parts
        let fullName = "";
        if (title_prefix) fullName += title_prefix + " ";
        if (first_name) fullName += first_name + " ";
        if (middle_name) fullName += middle_name + " ";
        if (last_name) fullName += last_name + " ";
        if (title_suffix) fullName += title_suffix;

        const imageUrl = category?.[0]?.icon_url || icon_url;

        fullNames.push({
          name: fullName.trim(),
          icon_url: imageUrl,
          active: false,
        });
      }
    }
    return fullNames;
  };

  const activeLabels = mediaItems
    .filter((item) => item.active)
    .map((item) => item.name);

  const activeRecommendations = recommendedItems
    .filter((item) => item.active)
    .map((item) => item.name);

  const handleFilters = async () => {
    const data = {
      activeLabels,
      activeRecommendations,
      rangeValues,
    };
    console.log(data);

    // try {
    //   const response = await axios.post(`https://app.mynalu.com/wp-admin/edit.php?post_type=nalu_ressources`, data);
    //   console.log("Response:",response);
    //   if(response.status === 200){

    //     // naviagtion
    //     // history.push("/tabs/tab1")
    //   }
    // } catch (error) {
    //   console.log('Error', error.response.data.message);
    //   // setErrorMessage("Invalid email or password. Please try again.")
    // }
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
            }}
          >
            <IonSpinner name="crescent"></IonSpinner>
          </div>
        </>
      ) : (
        <>
          <IonPage className="Filtermodal">
            <IonHeader className="ion-no-border">
              <IonToolbar>
                <IonButtons slot="start">
                  <IonButton>
                    <IonIcon icon={close} />
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding-horizontal" fullscreen>
              <div className="main-title">
                <h1>Filters</h1>
              </div>

              <div className="section ">
                <div className="title">
                  <h3>Media Type</h3>
                </div>

                <div className="selector mtype">
                  {mediaItems.map((item, index) => (
                    <IonItem lines="none" key={index}>
                      <div className="img_div">
                        {item.icon_url ? (
                          <img
                            src={item.icon_url}
                            alt={item.name}
                            className="icon-img"
                          />
                        ) : null}
                      </div>
                      <IonLabel>{item.name}</IonLabel>
                      <IonCheckbox
                        mode="md"
                        checked={item.active}
                        onIonChange={() => toggleMediaItemsActive(index)}
                      />
                    </IonItem>
                  ))}
                </div>
              </div>

              <div className="section">
                <div className="title">
                  <h3>Recommended by</h3>
                </div>

                <div className="selector">
                  <IonRow>
                    {recommendedItems.map((item, index) => (
                      <IonCol size="6" key={index}>
                        <IonItem lines="none">
                          <div className="img_div">
                            {item.icon_url ? (
                              <img
                                src={item.icon_url}
                                alt={item.name}
                                className="icon-img"
                              />
                            ) : null}
                          </div>
                          <IonLabel>{item.name}</IonLabel>
                          <IonCheckbox
                            mode="md"
                            checked={item.active}
                            onIonChange={() =>
                              toggleRecommendedItemsActive(index)
                            }
                          />
                        </IonItem>
                      </IonCol>
                    ))}
                  </IonRow>
                </div>
              </div>

              <div className="section ">
                <div className="title flex al-center jc-between ion-padding-horizontal">
                  <h3>Upvotes</h3>
                  <p>
                    {rangeValues.lower}-{rangeValues.upper}
                  </p>
                </div>

                <IonRange
                  onIonChange={handleRangeChange}
                  aria-label="Dual Knobs Range"
                  dualKnobs={true}
                  max={apiRangeValues.upper}
                  value={rangeValues}
                >
                  <IonLabel slot="start"> {rangeValues.lower}</IonLabel>
                  <IonLabel slot="end"> {rangeValues.upper}</IonLabel>
                </IonRange>
              </div>

              <div className="btn-holder ion-text-center ion-padding-vertical">
                <IonButton expand="block" onClick={() => handleFilters()}>
                  Apply
                </IonButton>
              </div>

              <div className="btn-holder2 ion-text-center">
                <IonButton
                  expand="block"
                  fill="outline"
                  onClick={handleResetFilters}
                >
                  Reset
                </IonButton>
              </div>
            </IonContent>
          </IonPage>
        </>
      )}
    </>
  );
};

export default Filtermodal;
