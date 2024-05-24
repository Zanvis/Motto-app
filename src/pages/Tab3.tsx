import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, IonItem, IonLabel, IonRouterOutlet, setupIonicReact, IonContent, IonGrid, IonRow, IonCol, IonList, IonInput, IonItemSliding, IonItemOptions, IonItemOption, IonToast, IonReorderGroup, IonReorder } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useEffect, useState } from 'react';
setupIonicReact();

const Tab3: React.FC = () => {
    const [favoriteQuotes, setFavoriteQuotes] = useState<string[]>([]);
    const [lang, setLang] = useState('polish');
    const langStorage = localStorage.getItem('lang');
    // const [translations, setTranslations] = useState<{ [key: string]: string }>({
    //     'Ulubione motta': 'Favourite mottos',
    //     'Usuń': 'Delete'
    // });
    const [lastDeletedQuote, setLastDeletedQuote] = useState<string | null>(null); // Add state for the last deleted quote
    const [showDeleteToast, setShowDeleteToast] = useState(false); // Add state for the toast
    useEffect(()=>{
        if(langStorage!= null){
            setLang(langStorage);
        }
    }, [langStorage]);

    // function translate(text: string): string{
    //     if (lang == 'polish')
    //         return text;
    //     else if(lang == 'english')
    //         return translations[text] || text;
    //     return text;
    // }
        // if(lang == 'polish'){
        //     if(text == 'Ulubione motta')
        //         return 'Ulubione motta';
        //     else if(text == 'Usuń')
        //         return 'Usuń';
        // }
        // else{
        //     if(text == 'Ulubione motta')
        //         return 'Favourite mottos';
        //     else if(text == 'Usuń')
        //         return 'Delete';
        // }
        // return text;
    
    useEffect(() => {
        const storedQuotes = JSON.parse(localStorage.getItem('favoriteQuotes') || '[]');
        setFavoriteQuotes(storedQuotes);
        // console.log(storedQuotes);
    }, []);

    const handleDelete = (quote: string) => {
        // Set the last deleted quote
        setLastDeletedQuote(quote);
        // Remove the quote from the favorites list
        const updatedQuotes = favoriteQuotes.filter((q) => q !== quote);
        setFavoriteQuotes(updatedQuotes);
        localStorage.setItem('favoriteQuotes', JSON.stringify(updatedQuotes));

        setShowDeleteToast(true);
    };

    const handleUndo = () => {
        if (lastDeletedQuote) {
            // Add the last deleted quote back to the favorites
            const updatedQuotes = [...favoriteQuotes, lastDeletedQuote];
            setFavoriteQuotes(updatedQuotes);
            localStorage.setItem('favoriteQuotes', JSON.stringify(updatedQuotes));
        }

        // Clear the last deleted quote and hide the toast
        setLastDeletedQuote(null);
        setShowDeleteToast(false);
    };

    const handleReorder = (event: CustomEvent) => {
        const reorderedQuotes = event.detail.complete(favoriteQuotes);
        setFavoriteQuotes([...reorderedQuotes]);
        localStorage.setItem('favoriteQuotes', JSON.stringify(reorderedQuotes));
    };

    return (
    <IonApp>
        <IonContent>
            <div style={{ marginTop: '10px', marginBottom: '10px' }} className="ion-text-center">
                <IonLabel style={{ fontSize: '30px', fontWeight: 'bold' }} className="ion-text-wrap">{localStorage.getItem('favmotto')}</IonLabel>
            </div>
            <IonList style={{padding: '0px'}}>
                <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
                {favoriteQuotes.map((quote, index) => (
                    <IonItemSliding key={index}>
                        <IonItem>
                            <IonLabel className="ion-text-wrap">{quote}</IonLabel>
                            <IonReorder slot="end"></IonReorder>
                        </IonItem>
                        <IonItemOptions>
                            <IonItemOption color="danger" onClick={() => handleDelete(quote)}>{localStorage.getItem('delete')}</IonItemOption>
                        </IonItemOptions>
                    </IonItemSliding>
                ))}
                </IonReorderGroup>
            </IonList>
        </IonContent>
        <IonToast
                isOpen={showDeleteToast} // Control the visibility of the toast
                onDidDismiss={() => setShowDeleteToast(false)} // Hide the toast when dismissed
                message={localStorage.getItem('message') || 'Quote deleted'} // Message to display
                animated={true}
                buttons={[
                {
                    text: localStorage.getItem('undo') || 'Undo',
                    role: 'warning',
                    handler: handleUndo,
                },
                {
                    text: localStorage.getItem('dismiss') || 'Dismiss',
                    role: 'cancel',
                },
                ]}
                duration={3000} // Duration in milliseconds
                position="bottom"
                positionAnchor="footer"
            />
        <div id='footer'></div>
    </IonApp>
    );
};
export default Tab3;
