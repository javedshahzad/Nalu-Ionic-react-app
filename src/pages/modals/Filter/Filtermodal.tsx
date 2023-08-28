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
  IonToolbar,
} from "@ionic/react";

import "./Filtermodal.scss";
import { close } from "ionicons/icons";
import { useEffect, useState } from "react";

const Filtermodal: React.FC = () => {
  const [rangeValues, setRangeValues] = useState({ lower: 12, upper: 118 });


  const handleRangeChange = (event: CustomEvent) => {
    setRangeValues(event.detail.value);
  };

  useEffect(() => {
    setRangeValues({ lower: 12, upper: 118 });

  }, []);

  const [mediaItems, setmediaItems] = useState([
    { label: "Books", icon: "f1.svg", active: false, colSize: "4" },
    { label: "Movies", icon: "f2.svg", active: false, colSize: "4" },
    { label: "Articles", icon: "f3.svg", active: false, colSize: "4" },
    { label: "Pap", icon: "f4.svg", active: false, colSize: "4" },
  ]);

  const [recommendedItems, setrecommendedItems] = useState([
    { label: "Dr.Jorg Keckstein, MD", icon: "f5.svg", active: false, colSize: "6" },
    { label: "Alena Romanovic", icon: "f6.svg", active: false, colSize: "6" },
    { label: "NALU Community", icon: "f7.svg", active: false, colSize: "6" },
    { label: "NALU Team", icon: "f8.svg", active: false, colSize: "5" },
  ]);

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

    // Reset media items
    const resetMediaItems = mediaItems.map(item => ({ ...item, active: false }));
    setmediaItems(resetMediaItems);

    // Reset recommended items
    const resetRecommendedItems = recommendedItems.map(item => ({ ...item, active: false }));
    setrecommendedItems(resetRecommendedItems);
  };
  return (
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
                <IonIcon
                  slot="start"
                  src={
                    item.active
                      ? `assets/imgs/${item.icon.replace(".svg", "a.svg")}`
                      : `assets/imgs/${item.icon}`
                  }
                />
                <IonLabel>{item.label}</IonLabel>
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
                <IonCol size={item.colSize} key={index}>
                  <IonItem lines="none">
                    <IonIcon
                      slot="start"
                      src={
                        item.active
                          ? `assets/imgs/${item.icon.replace(
                              ".svg",
                              "a.svg"
                            )}`
                          : `assets/imgs/${item.icon}`
                      }
                    />
                    <IonLabel>{item.label}</IonLabel>
                    <IonCheckbox mode="md"
                      checked={item.active}
                      onIonChange={() => toggleRecommendedItemsActive(index)}
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
            max={130}
            value={rangeValues}
          >
            <IonLabel slot="start">0</IonLabel>
            <IonLabel slot="end">130</IonLabel>
          </IonRange>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            {[0, 30, 60, 90, 120, 130].map((value) => (
              <span key={value}>{value}</span>
            ))}
          </div>
        </div>

        <div className="btn-holder ion-text-center ion-padding-vertical">
          <IonButton expand="block">Apply</IonButton>
        </div>

        <div className="btn-holder2 ion-text-center">
          <IonButton expand="block" fill="outline" onClick={handleResetFilters}>
            Reset
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Filtermodal;
