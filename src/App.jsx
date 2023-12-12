import { useEffect, useState } from "react";
import {
  FaFolderOpen,
  FaUser,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaTag,
  FaAddressCard,
} from "react-icons/fa";
import { BsPinFill } from "react-icons/bs";
import axios from "axios";

function App() {
  const [tickets, setTickets] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://bio.contactek.com/bio/api_listado_base/"
      );
      const data = response.data;
      // console.log(data);
      setTickets(data[0].tickets);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex w-[95%] mx-auto">
      <div className="w-1/4 h-40 bg-red-500"></div>
      <div className="w-3/4">
        {tickets.map((ticket) => {
          // console.log(ticket);
          return (
            <div
              key={ticket.id}
              className="flex px-12 py-3 mb-[1px] items-center rounded-2xl justify-between"
              style={{ backgroundColor: ticket.color }}
            >
              <div className="flex-1">
                <div className="flex">
                  <span>{ticket.id}</span>
                  <span className="flex items-center">
                    <FaFolderOpen />
                    Abrir
                  </span>
                </div>

                <span className="flex items-center">
                  <FaUser /> {ticket.nombre_gestor}
                </span>
              </div>

              <div className="flex flex-col flex-1">
                <span className="flex items-center">
                  <FaTag /> {ticket.nombre_tipologia1}
                </span>
                <span>{ticket.Estado}</span>
              </div>

              <div className="flex flex-col flex-1">
                <span className="flex items-center">
                  <FaAddressCard /> {ticket.nombre_servicio}
                </span>
                <span>
                  Creada el: <span>{ticket.fecha_inicio}</span>
                </span>
              </div>

              <div className="flex flex-col flex-1">
                <span className="flex items-center">
                  <BsPinFill /> {ticket.nombre_tipologia2}
                </span>
                <span>
                  Creada el: <span>{ticket.fecha_actualizado}</span>
                </span>
              </div>

              <div className="flex flex-1 items-center justify-end gap-1">
                {ticket.canal_phone === "1" && (
                  <FaPhoneAlt className="text-2xl" />
                )}
                {ticket.canal_ws === "1" && <FaWhatsapp className="text-2xl" />}
                {ticket.canal_mail === "1" && (
                  <FaEnvelope className="text-2xl" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
