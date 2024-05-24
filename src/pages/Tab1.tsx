import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, IonItem, IonLabel, IonRouterOutlet, setupIonicReact, IonContent, IonGrid, IonRow, IonCol, IonIcon, IonFab, IonFabButton, IonFabList} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useEffect, useRef, useState } from 'react';
import { language } from 'ionicons/icons';
// import ConfettiExplosion from 'react-confetti-explosion';
// import Heart from 'react-animated-heart';
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import Heart from './heartanimation.json'
import './Tab1.css';
setupIonicReact();

const Tab1: React.FC = () => {
    const [quote, setQuote] = useState('');
    const [date, setDate] = useState(() => new Date());
    const [dayOfYearToday, setDayOfYearToday] = useState(() => {
    return dayOfYear(date);
    });
    const [lang, setLang] = useState('polish');
    // const [isConfettiExploding, setIsConfettiExploding] = useState(false);
    const heartRef = useRef<LottieRefCurrentProps>(null);
    // const [translations, setTranslations] = useState<{ [key: string]: string }>({
    //     'Motto na dzień': 'Motto for the day',
    //     'Wciśnij!': 'Click!',
    //     'Dodaj do ulubionych': 'Add to favourites'
    // });
    const langStorage = localStorage.getItem('lang');
    // const [isClick, setClick] = useState(false);
    useEffect(()=>{
        if(langStorage!= null){
            setLang(langStorage);
        }
    }, [langStorage]);

    function dayOfYear(date: Date) {
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);

        return Math.floor((date.getTime() - firstDayOfYear.getTime()) / millisecondsPerDay);
    }
    
    const start = async () => {
        if(lang == 'polish')
            try {
                const response = await fetch('/assets/data.json');
                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
                const data = await response.json();

                setQuote(data['text'][dayOfYearToday])
            } catch (error) {
                console.error('Error:', error);
            }
        else if(lang == 'english'){
            try {
                const response = await fetch('/assets/data-english.json');
                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
                const data = await response.json();

                setQuote(data['text'][dayOfYearToday])
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
        heartRef.current?.play();
        setTimeout(() => {
            heartRef.current?.stop();
        }, 2500);
        // setIsConfettiExploding(true);
        // setClick(!isClick); 
    }

    // function translate(text: string): string{
    //     if (lang == 'polish')
    //         return text;
    //     else if(lang == 'english')
    //         return translations[text] || text;
    //     return text;
    // }

        // if(lang == 'polish'){
        //     if(text == 'Motto na dzień')
        //         return 'Motto na dzień';
        //     else if(text == 'Wciśnij!')
        //         return 'Wciśnij!';
        //     else if(text == 'Dodaj do ulubionych')
        //         return 'Dodaj do ulubionych';
        // }
        // else{
        //     if(text == 'Motto na dzień')
        //         return 'Motto for the day';
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
                    {/* <IonButton>
                        <IonIcon slot='icon-only' icon={language}></IonIcon>
                    </IonButton> */}
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
                        <IonLabel style={{fontSize: '25px', fontWeight: 'bold'}}>{localStorage.getItem('motto')}</IonLabel>
                    </div>
                </IonCol>
                </IonRow>
                <IonRow>
                <IonCol size="12">
                    <div style={{ marginTop: '5px' }} className="ion-padding">
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
                    {/* <div className="confetti-explosion">
                        {isConfettiExploding && (
                            <ConfettiExplosion force={0.6} particleCount={80} duration={4000} width={1000} onComplete={() => setIsConfettiExploding(false)}/>
                        )}
                    </div> */}
                {/* <IonItem lines="none" color="#222428" style={{ marginTop: '55px' }}>
                    <IonLabel style={{fontSize: '18px', marginLeft: '12.7%'}}>{localStorage.getItem('fav')}:</IonLabel>
                        <IonButton onClick={addToFavourites} fill="clear" style={{ marginRight: '13.5%' }} className="big-button">
                            <IonIcon size="large" aria-hidden="true" slot="icon-only" src="/assets/heart-svgrepo-com.svg"></IonIcon>
                        </IonButton>
                </IonItem> */}
                <IonItem className='itemWithButton' lines="none" color="#222428" style={{ marginTop: '10px' }}>
                    <IonLabel style={{fontSize: '18px', marginLeft: '12.7%'}}>{localStorage.getItem('fav')}:</IonLabel>
                    <Lottie style={{position: 'absolute', right: '0px', left: '160px', marginTop: '3px'}} onClick={addToFavourites} lottieRef={heartRef} autoplay={false} loop={false} animationData={Heart} />
                </IonItem>
            </IonGrid>
            </IonContent>
        </IonApp>
    );
};
export default Tab1;
