import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, IonItem, IonLabel, IonRouterOutlet, setupIonicReact, IonContent, IonGrid, IonRow, IonCol, IonTabs, IonTabBar, IonIcon, IonTabButton, IonFab, IonFabButton, IonFabList} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useEffect, useRef, useState } from 'react';
import { sunny, reload, heart, language } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
setupIonicReact();

const App: React.FC = () => {
  const [lang, setLang] = useState('polish');
  const langStorage = localStorage.getItem('lang');
  const [translations, setTranslations] = useState<{ [key: string]: string }>({
    'Codzienne': 'Every day',
    'Na każdą chwilę': 'For every moment',
    'Ulubione': 'Favourites'
  });
  
  useEffect(()=>{
      if(langStorage!= null){
          setLang(langStorage);
      }
  }, [langStorage]);

  function translate(text: string): string{
    if (lang == 'polish')
      return text;
    else if(lang == 'english')
      return translations[text] || text;
    return text;
  }
    // if(lang == 'polish'){
    //     if(text == 'Codzienne')
    //         return 'Codzienne';
    //     else if(text == 'Na każdą chwilę')
    //         return 'Na każdą chwilę';
    //     else if(text == 'Ulubione')
    //         return 'Ulubione';
    // }
    // else{
    //     if(text == 'Codzienne')
    //         return 'Every day';
    //     else if(text == 'Na każdą chwilę')
    //         return 'For every moment';
    //     else if(text == 'Ulubione')
    //         return 'Favourites';
    // }
    // return text;

  useEffect(()=>{
    if(!langStorage || langStorage=='')
      setPolish();
  },[]);

  const setPolish = () =>{
    setLang('polish');
    localStorage.setItem('lang', 'polish');
    localStorage.setItem('button', 'Wciśnij!');
    localStorage.setItem('motto', 'Motto na dziś');
    localStorage.setItem('fav', 'Dodaj do ulubionych');
    localStorage.setItem('button2', 'Wciśnij!');
    localStorage.setItem('motto2', 'Motto na każdą chwilę');
    localStorage.setItem('fav2', 'Dodaj do ulubionych');
    localStorage.setItem('favmotto', 'Ulubione motta');
    localStorage.setItem('delete', 'Usuń');
    localStorage.setItem('dismiss', 'Ukryj');
    localStorage.setItem('undo', 'Przywróć');
    localStorage.setItem('message', 'Motto usunięte');
  }

  const setEnglish = () =>{
    setLang('english');
    localStorage.setItem('lang', 'english');
    localStorage.setItem('button', 'Click!');
    localStorage.setItem('motto', 'Motto for the day');
    localStorage.setItem('fav', 'Add to favourites');
    localStorage.setItem('motto2', 'Motto for every moment');
    localStorage.setItem('favmotto', 'Favourite mottos');
    localStorage.setItem('delete', 'Delete');
    localStorage.setItem('dismiss', 'Dismiss');
    localStorage.setItem('undo', 'Undo');
    localStorage.setItem('message', 'Quote deleted');
  }

  return (
    <IonApp>
      <IonFab style={{marginTop: '30px', position: 'absolute', right: '0px'}} slot="fixed" vertical="top" horizontal="end" edge={true}>
          <IonFabButton size="small">
              <IonIcon icon={language}></IonIcon>
          </IonFabButton>
          <IonFabList side="bottom">
              <IonFabButton onClick={setPolish}>
                  <IonIcon src='/assets/flag-pl-svgrepo-com.svg'></IonIcon>
              </IonFabButton>
              <IonFabButton onClick={setEnglish}>
                  <IonIcon src='/assets/united-kingdom-uk-svgrepo-com.svg'></IonIcon>
              </IonFabButton>
          </IonFabList>
      </IonFab>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tab1">
              <Tab1 />
            </Route>
            <Route exact path="/">
              <Redirect to="/tab1" />
            </Route>
            <Route exact path="/tab2">
              <Tab2 />
            </Route>
            <Route exact path="/tab3">
              <Tab3 />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1">
              <IonIcon aria-hidden="true" icon={sunny}/>
              <IonLabel>{translate('Codzienne')}</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon aria-hidden="true" icon={reload}/>
              <IonLabel>{translate('Na każdą chwilę')}</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tab3">
              <IonIcon aria-hidden="true" icon={heart}/>
              <IonLabel>{translate('Ulubione')}</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};
export default App;
