import { useState } from "react";
import "./Hamburger.css";

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);

// react မှာ boolean တွေ ကို render လုပ်လို့မရဘူး
  return (
    <>
      <p>Click on the Menu Icon to transform it to "X":</p>

      <div
        className={`container ${isOpen ? "change" : ""}`}
        onClick={()=>{setIsOpen(!isOpen)}}// false => true
      >
        <div className="bar bar1" style={{ backgroundColor: "red" }}></div>
        <div className="bar bar2" style={{ backgroundColor: "green" }}></div>
        <div className="bar bar3" style={{ backgroundColor: "blue" }}></div>
      </div>
    

     <button onClick={()=>setIsOpen(!isOpen)}>False/True</button>
     <h1 style={{color:"red"}}>{isOpen.toString()}</h1>
    {/*<h2>{true}</h2>*/}
     {/* <h2>{undefined}</h2>*/}
    </>
  );
}