import { useState } from "react";


export default function PromiseLesson() {

    const [status, setStatus ] = useState("Hello")


    function runPromise(){
        const promise = new Promise((resolve)=>{
            setStatus("Pending");

            setTimeout(()=>{
                resolve("Done")
            },3000)
        })

        promise.then((result)=>{
            console.log(result)
            setStatus("Fulfiled")
        })

    }
  return (
    <div>
      <h2>Promise Lesson : {status} </h2>
      <button onClick={runPromise}>Start Promise</button>
    </div>
  )
}
