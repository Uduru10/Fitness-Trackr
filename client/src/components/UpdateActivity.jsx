import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { editActivity } from "../api/activities";

export default function UpdateActivity() {
  const { activityId } = useParams();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");

  return (
    <div>
      <h3>Change Activity</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const result = await editActivity(description, +activityId);
          console.log("Awaiting editActivity", result);
          navigate("/");
        }}
      >
        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
