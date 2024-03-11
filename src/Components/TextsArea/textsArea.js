import { useEffect, useState } from "react"
import { useChat } from "../../Context/chatContext"
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { Text } from "../Texts/text";

export const TextsArea = () =>{
    const [texts,setTexts] = useState([])
    const {data} = useChat();

    useEffect(() => {
        const unSub= onSnapshot(doc(db,"chats",data.chatId), (doc)=>{
            doc.exists() && setTexts(doc.data().messages)
        })
        return () => {
           unSub();
        };
    }, [data.chatId]);
   
    return(
        <>
            {texts.map((t)=>(
                <Text text={t}/>
            ))}
        </>
    )
}