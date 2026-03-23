import { useState } from "react";

export default function Player() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleClick() {
    setSubmitted(true);
  }

  return (
    <section id="player">
      <h2>Welcome {submitted ? name : "unknown entity"}</h2>
      <p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleClick} >Set Name</button>
      </p>
    </section>
  );
}
