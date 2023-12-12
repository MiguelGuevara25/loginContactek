import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tickets, setTickets] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://bio.contactek.com/bio/api_listado_base/"
      );
      const data = response.data;
      setTickets(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex">
      <div className="w-1/4 h-40 bg-red-500">
        {tickets.map((info) => {
          info.tickets.map((ticket) => {
            console.log(ticket);
          });
        })}
      </div>
      <div className="w-3/4 h-40 bg-green-500"></div>
    </div>
  );
}

export default App;
