import { createActivity } from "../api/activities";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function NewActivity() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [error, setError] = useState();

  return (
    <div>
      <h3> Create a new Activity</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await createActivity(name, description);
          console.log("Awaiting createActivity", result);

          if (result.name === "error") {
            setError(result.detail);
          } else {
            navigate("/activities");
          }
        }}
      >
        {error && <h5>{error}</h5>}
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
        <Button variant="warning" type="submit">
          {" "}
          Submit
        </Button>
      </form>
    </div>
  );
}
