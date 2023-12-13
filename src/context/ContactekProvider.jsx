import { useState, useEffect, createContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const ContateckContext = createContext();

const ContactekProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [infoTickets, setInfoTickets] = useState([]);
  const [changeColorServicio, setChangeColorServicio] = useState(false);
  const [servicios, setServicios] = useState([]);

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
      title: mensaje,
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
    <ContateckContext.Provider
      value={{
        handleAlert,
        fetchData,
        servicios,
        changeColorServicio,
        handleServicio,
        checkTicketGestor,
        handleMisTickets,
        checkTicketSinAtender,
        handleTicketsSinAtender,
        handleFechaInicio,
        handleFechaFin,
        infoTickets,
        tickets,
      }}
    >
      {children}
    </ContateckContext.Provider>
  );
};

export { ContactekProvider };
export default ContateckContext;
