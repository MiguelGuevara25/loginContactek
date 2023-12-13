import { useEffect, useState } from "react";
import { FaEnvelope, FaBellSlash, FaFilter, FaPlus } from "react-icons/fa";
import { MdCached } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
import Tickets from "./components/Tickets";
import InfoTickets from "./components/InfoTickets";

function App() {
  const [tickets, setTickets] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [infoTickets, setInfoTickets] = useState([]);
  const [changeColorServicio, setChangeColorServicio] = useState(false);

  //!Filtros y ID
  const [checkTicketGestor, setCheckTicketGestor] = useState(false);
  const [checkTicketSinAtender, setCheckTicketSinAtender] = useState(false);
  const [idServicioGlobal, setIdServicioGlobal] = useState("0");
  const [fechaInicioGlobal, setFechaInicioGlobal] = useState("");
  const [fechaFinGlobal, setFechaFinGlobal] = useState("");

  const fetchData = async () => {
    try {
      const responseTickets = await axios.get(
        "https://bio.contactek.com/bio/api_listado_base/"
      );

      const responseServicios = await axios.get(
        "https://bio.contactek.com/bio/api_listado_servicio/"
      );

      const dataTickets = responseTickets.data;
      const dataServicios = responseServicios.data;

      setInfoTickets(dataTickets);
      setTickets(dataTickets[0].tickets);
      setServicios(dataServicios);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAlert = (mensaje) => {
    Swal.fire({
      icon: "warning",
      text: mensaje,
      timer: 2000,
    });
  };

  const handleServicio = async (id) => {
    try {
      const response = await axios.get(
        `https://bio.contactek.com/bio/api_listado_base/?id=${id}&mt=0&gestor=elabarca&sa=0&fdesde=&fhasta=&busqueda=`
      );

      const data = response.data;
      setInfoTickets(data);
      setTickets(data[0].tickets);
    } catch (error) {
      console.log(error);
    }
    setChangeColorServicio(id);
    setCheckTicketGestor(false);
    setCheckTicketSinAtender(false);
    setFechaInicioGlobal("");
    setFechaFinGlobal("");
    setIdServicioGlobal(id);
  };

  const handleMisTickets = async () => {
    setCheckTicketGestor(!checkTicketGestor);
    const url = `https://bio.contactek.com/bio/api_listado_base/?id=${idServicioGlobal}&mt=${
      checkTicketGestor ? "0" : "1"
    }&gestor=elabarca&sa=${
      checkTicketSinAtender ? "1" : "0"
    }&fdesde=${fechaInicioGlobal}&fhasta=${fechaFinGlobal}&busqueda=`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      setInfoTickets(data);
      setTickets(data[0].tickets);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTicketsSinAtender = async () => {
    setCheckTicketSinAtender(!checkTicketSinAtender);
    const url = `https://bio.contactek.com/bio/api_listado_base/?id=${idServicioGlobal}&mt=${
      checkTicketGestor ? "1" : "0"
    }&gestor=elabarca&sa=${
      checkTicketSinAtender ? "0" : "1"
    }&fdesde=${fechaInicioGlobal}&fhasta=${fechaFinGlobal}&busqueda=`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      setInfoTickets(data);
      setTickets(data[0].tickets);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFechaInicio = async (e) => {
    const fechaInicio = e.target.value.split("-").join("");
    setFechaInicioGlobal(fechaInicio);

    const url = `https://bio.contactek.com/bio/api_listado_base/?id=${idServicioGlobal}&mt=${
      checkTicketGestor ? "1" : "0"
    }&gestor=elabarca&sa=${
      checkTicketSinAtender ? "1" : "0"
    }&fdesde=${fechaInicio}&fhasta=${fechaFinGlobal}&busqueda=`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      setInfoTickets(data);
      setTickets(data[0].tickets);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFechaFin = async (e) => {
    const fechaFin = e.target.value.split("-").join("");
    setFechaFinGlobal(fechaFin);

    const url = `https://bio.contactek.com/bio/api_listado_base/?id=${idServicioGlobal}&mt=${
      checkTicketGestor ? "1" : "0"
    }&gestor=elabarca&sa=${
      checkTicketSinAtender ? "1" : "0"
    }&fdesde=${fechaInicioGlobal}&fhasta=${fechaFin}&busqueda=`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      setInfoTickets(data);
      setTickets(data[0].tickets);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-10 w-[95%] mx-auto">
      <div className="w-1/4">
        <div className="flex flex-col gap-0.5">
          {servicios.map((servicio) => {
            const { id, nombre } = servicio;
            return (
              <div
                key={id}
                className={`${
                  changeColorServicio === id ? "bg-blue-700" : "bg-blue-500"
                } text-white hover:bg-blue-400 cursor-pointer pl-5 py-3 font-bold uppercase rounded-xl`}
                onClick={() => handleServicio(id)}
              >
                <span>{nombre}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-3/4">
        <div className="flex justify-between">
          <input type="text" placeholder="Buscar..." />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checkTicketGestor}
              onChange={handleMisTickets}
            />
            <span>Mis Tickets</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checkTicketSinAtender}
              onChange={handleTicketsSinAtender}
            />
            <span>Tickets sin atender</span>
          </div>

          <div>
            <div className="flex items-center gap-1">
              <span className="flex-1">Desde: </span>
              <input type="date" onChange={handleFechaInicio} />
            </div>

            <div className="flex items-center gap-1">
              <span className="flex-1">Hasta: </span>
              <input type="date" onChange={handleFechaFin} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MdCached className="text-2xl" />
            <FaBellSlash className="text-2xl" />
            <FaFilter className="text-2xl" />
            <FaPlus className="text-2xl" />
            <FaEnvelope className="text-2xl" />
          </div>
        </div>

        {infoTickets.map((info, id) => (
          <InfoTickets key={id} info={info} />
        ))}

        {tickets.map((ticket) => (
          <Tickets key={ticket.id} ticket={ticket} handleAlert={handleAlert} />
        ))}
      </div>
    </div>
  );
}

export default App;
