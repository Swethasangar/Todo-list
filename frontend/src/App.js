import { useEffect, useState } from "react";
import axios from "axios";

function Todo() {
  const [input, setinput] = useState("");
  const [activity, setactivity] = useState([]);

  const handlechange = (eve) => {
    setinput(eve.target.value);
  };

  const added = () => {
    axios.post("http://localhost:5000/addactivity", { newactivity: input });
    setactivity([...activity, { name: input }]);
    setinput("");
  };

  useEffect(function () {
    axios.get("http://localhost:5000/activitylist").then((data) => {
      setactivity(data.data);
      //  console.log(data.data)
    });
  }, []);

  const deleteActivity = (id) => {
    axios.post(`http://localhost:5000/deleteactivity`, { id })
      .then(() => {
        setactivity((prevActivities) => prevActivities.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting activity:", err);
      });
  };

  return (
    <>
      <section className="container">
        <h1 className="text-center font-medium text-xl p-1">TODO</h1>
        <input
          className="rounded-lg border border-black outline-none ml-8 mt-4 p-1"
          type="text"
          placeholder="Enter Your List"
          value={input}
          onChange={handlechange}
        ></input>
        <button
          onClick={added}
          className="border border-black cursor-pointer w-14 ml-5 p-1 rounded-lg"
        >
          Add
        </button>
        {activity.map((items) => {
          return (
            <div
              key={items._id}
              className="flex shadow-lg m-2 justify-between ml-5 mr-5 mt-4 p-1"
            >
              <p className="p-1">{items.name}</p>
              <button
                className="rounded-xl border border-black p-1 w-14"
                onClick={() => {
                  deleteActivity(items._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </section>
    </>
  );
}
export default Todo;
