import { useState } from "react"

const product = {
  name: "James",
  age: 45,
}

export default function IsLogin() {
  const [isSignIn, setIsSign] = useState(false)

  return (
    <div>
      <h1>Hello</h1>
      <button style={{border:"1px solid green"}} onClick={() => setIsSign(!isSignIn)}>
        {isSignIn ? "Hide Detail" : "Show Detail"}
      </button>
      {isSignIn && <h2>{product.name}</h2>}

      <br /><br />
      <button disabled={!isSignIn} onClick={() => alert("clicked!")}
        style={{border:"1px solid green"}}>
        Testing Disable
      </button>
    </div>
  )
}