import { FaEnvelope, FaBellSlash, FaFilter, FaPlus } from "react-icons/fa";
import Tickets from "../components/Tickets";
import InfoTickets from "../components/InfoTickets";
import { MdCached } from "react-icons/md";
import useContactek from "../hooks/useContactek";

const ListadoTickets = () => {
  const {
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
  } = useContactek();

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

        {infoTickets?.map((info, id) => (
          <InfoTickets key={id} info={info} />
        ))}

        {tickets.map((ticket) => (
          <Tickets key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default ListadoTickets;
