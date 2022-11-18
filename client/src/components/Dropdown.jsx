// import { useState, useEffect } from "react";
// import { DropdownButton } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import DropdownItem from "react-bootstrap/esm/DropdownItem";
// import { useNavigate } from "react-router-dom";
// import { fetchActivities } from "../api/activities";
// import { createRA } from "../api/ra";
// import styles from "../styles/MyRoutines.module.css";
// import "./Dropdown.css";
// function Dropdown() {
//   const navigate = useNavigate();
//   const [activities, setActivities] = useState([]);
//   const [routine_id, setRoutine] = useState("");
//   const [activity_id, setActivity] = useState("");
//   const [duration, setDuration] = useState("");
//   const [count, setCount] = useState("");

//   useEffect(() => {
//     async function getActivities() {
//       const info = await fetchActivities();
//       setActivities(info);
//       console.log("info:", info);
//     }
//     getActivities();
//   }, []);
//   console.log("activity_id: ", activity_id);
//   return (
//     <>
//       {" "}
//       <h3>Dropdown Edition</h3>
//       <form
//         className={styles.dropdown}
//         onSubmit={async (e) => {
//           e.preventDefault();
//           const activity_id = e.target[0].value;
//           const result = await createRA(
//             routine_id,
//             activity_id,
//             duration,
//             count
//           );
//           console.log("Awaiting createRA", result);
//           window.location.reload(true);
//         }}
//       >
//         <select>
//           {activities?.map((activity) => {
//             return <option value={activity.id}>{activity.name}</option>;
//           })}
//         </select>
//         ;<label>Duration</label>
//         <input
//           type="text"
//           placeholder="duration"
//           value={duration}
//           onChange={(e) => {
//             setDuration(e.target.value);
//           }}
//         />
//         <label>Count</label>
//         <input
//           type="text"
//           placeholder="count"
//           value={count}
//           onChange={(e) => {
//             setCount(e.target.value);
//           }}
//         />
//         <Button variant="warning" type="submit">
//           Submit
//         </Button>
//       </form>
//     </>
//   );
// }

// export default Dropdown;
