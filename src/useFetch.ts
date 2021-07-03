import {useEffect, useState} from "react";

interface Room {
    id: number,
    name: string,
    lastMessage?: string | undefined
}

const useFetch = ( url: string ) => {
    const [data, setData ] = useState< any >();

    useEffect( () => {
        setTimeout(async () => {
            fetch(url)
                .then( res => {
                    if ( !res.ok ){
                        throw Error('Could not fetch data for this resource');
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                })
                .catch( err => {

                })
        }, 1000 );
    }, [ url ]);

    return data ;

};


export default useFetch;