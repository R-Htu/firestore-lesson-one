
import { useState,useEffect } from "react";

export default function SetTime(){
    const [count,setCount] = useState(0)
    useEffect(()=>{
        const interval = setInterval(()=>{
           setCount((prev)=>{
            if(prev >=5){
                clearInterval(interval)// stop at count 5
                console.log('Interval stopped')
            }
            console.log(`Count: ${prev}`)
            prev++;
           }) 
        },1000)
//count 1,2,3
        return ()=> clearInterval(interval)// cleanup when the component unmounts/disappeared
    },[])
    return(
        <div>
            <h1>Count: {count}</h1>
        </div>
    )

}