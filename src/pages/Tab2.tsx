import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, IonItem, IonLabel, IonRouterOutlet, setupIonicReact, IonContent, IonGrid, IonRow, IonCol, IonIcon, IonFab, IonFabButton, IonFabList, IonTextarea} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { heart, language, play } from 'ionicons/icons';
import './Tab1.css';
// import ConfettiExplosion from 'react-confetti-explosion';
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import Heart from './heartanimation.json'
setupIonicReact();

const Tab2: React.FC = () => {
    const [quote, setQuote] = useState('');
    const [lang, setLang] = useState('polish');
    // const [isConfettiExploding, setIsConfettiExploding] = useState(false);
    const langStorage = localStorage.getItem('lang');
    const heartRef = useRef<LottieRefCurrentProps>(null);
    // const [translations, setTranslations] = useState<{ [key: string]: string }>({
    //     'Motto na każdą chwilę': 'Motto for every moment',
    //     'Wciśnij!': 'Click!',
    //     'Dodaj do ulubionych': 'Add to favourites'
    // });

    useEffect(()=>{
        if(langStorage!= null){
            setLang(langStorage);
        }
    }, [langStorage]);

    const start = async () => {
        if(lang == 'polish'){
            try {
                const response = await fetch('/assets/data2.json');
                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
                const data = await response.json();

                const rand = Math.floor(Math.random() * 184);
                setQuote(data['text'][rand]);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        else if(lang == 'english'){
            try {
                const response = await fetch('/assets/data2-english.json');
                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
                const data = await response.json();

                const rand = Math.floor(Math.random() * 184);
                setQuote(data['text'][rand]);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const addToFavourites = () =>{
        if (quote !== '') {
            const storedQuotes = JSON.parse(localStorage.getItem('favoriteQuotes') || '[]');
            if (!storedQuotes.includes(quote)) {
                storedQuotes.push(quote);
                localStorage.setItem('favoriteQuotes', JSON.stringify(storedQuotes));
            }
        } 
        // setIsConfettiExploding(true);
        heartRef.current?.play();
        heartRef.current?.play();
        setTimeout(() => {
            heartRef.current?.stop();
        }, 2500);
    }

    // function translate(text: string): string{
    //     if (lang == 'polish')
    //         return text;
    //     else if(lang == 'english')
    //         return translations[text] || text;
    //     return text;
    // }
        // if(lang == 'polish'){
        //     if(text == 'Motto na każdą chwilę')
        //         return 'Motto na każdą chwilę';
        //     else if(text == 'Wciśnij!')
        //         return 'Wciśnij!';
        //     else if(text == 'Dodaj do ulubionych')
        //         return 'Dodaj do ulubionych';
        // }
        // else{
        //     if(text == 'Motto na każdą chwilę')
        //         return 'Motto for every moment';
        //     else if(text == 'Wciśnij!')
        //         return 'Click!';
        //     else if(text == 'Dodaj do ulubionych')
        //         return 'Add to favourites';
        // }
        // return text;
    return (
    <IonApp>
        <IonContent>
            <IonGrid className="ion-text-center">
            <IonRow>
            <IonCol size="12">
                <div className="ion-padding">
                {/* This empty div pushes content down */}
                </div>
                <div className="ion-padding">
                {/* This empty div pushes content down */}
                </div>
                <div className="ion-padding">
                {/* This empty div pushes content down */}
                </div>
                <div className="ion-padding">
                {/* This empty div pushes content down */}
                </div>
                <div className="ion-padding">
                {/* This empty div pushes content down */}
                </div>
                <div className="ion-padding">
                {/* This empty div pushes content down */}
                </div>
                <div style={{marginTop: '20px'}}>
                    <IonLabel style={{fontSize: '25px', fontWeight: 'bold'}}>{localStorage.getItem('motto2')}</IonLabel>
                </div>
            </IonCol>
            </IonRow>
            <IonRow>
            <IonCol size="12">
                <div style={{marginTop: '5px'}} className="ion-padding">
                <IonButton onClick={start}>{localStorage.getItem('button')}</IonButton>
                </div>
            </IonCol>
            </IonRow>
            <IonRow>
            <IonCol size="12">
                <IonItem className="ion-text-center">
                <IonLabel style={{ fontSize: '18px' }} className="ion-text-wrap">{quote}</IonLabel>
                </IonItem>
            </IonCol>
            </IonRow>
                <IonItem className='itemWithButton' lines="none" color="#222428" style={{ marginTop: '10px' }}>
                    <IonLabel style={{fontSize: '18px', marginLeft: '12.7%'}}>{localStorage.getItem('fav')}:</IonLabel>
                    <Lottie style={{position: 'absolute', right: '0px', left: '160px', marginTop: '3px'}} onClick={addToFavourites} lottieRef={heartRef} autoplay={false} loop={false} animationData={Heart} />
                </IonItem>
        </IonGrid>
        </IonContent>
    </IonApp>
    );
};
export default Tab2;
