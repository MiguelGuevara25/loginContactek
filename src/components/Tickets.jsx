import {
  FaFolderOpen,
  FaUser,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaTag,
  FaAddressCard,
  FaCalendarAlt,
} from "react-icons/fa";
import { BsPinFill } from "react-icons/bs";
import { IoAlertCircleOutline, IoOpenOutline } from "react-icons/io5";
import useContactek from "../hooks/useContactek";

const Tickets = ({ ticket }) => {
  const { handleAlert } = useContactek();

  const {
    alerta,
    id,
    nombre_gestor,
    nombre_tipologia1,
    color,
    Estado,
    nombre_servicio,
    fecha_inicio,
    nombre_tipologia2,
    fecha_actualizado,
    canal_phone,
    canal_ws,
    canal_mail,
    mensaje,
  } = ticket;

  return (
    <div
      className="flex px-12 py-3 mb-[1px] items-center rounded-2xl justify-between relative"
      style={{ backgroundColor: color }}
    >
      {alerta === "1" && (
        <IoAlertCircleOutline
          className="text-2xl absolute right-2 top-2 cursor-pointer"
          onClick={() => handleAlert(mensaje)}
        />
      )}

      <div className="flex-1">
        <div className="flex gap-2">
          <span className="font-bold text-xl">{id}</span>
          <span className="flex items-center gap-1 cursor-pointer">
            <FaFolderOpen />
            Abrir
          </span>
        </div>

        <span className="flex items-center gap-1">
          <FaUser /> {nombre_gestor}
        </span>
      </div>

      <div className="flex flex-col flex-1">
        <span className="flex items-center gap-1">
          <FaTag /> {nombre_tipologia1}
        </span>

        <span className="flex items-center gap-1">
          <IoOpenOutline /> {Estado}
        </span>
      </div>

      <div className="flex flex-col flex-1">
        <span className="flex items-center gap-1">
          <FaAddressCard /> {nombre_servicio}
        </span>

        <div>
          <span className="flex items-center gap-1">
            <FaCalendarAlt /> Creada el:
          </span>

          <span>{fecha_inicio}</span>
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-1">
        <span className="flex items-center">
          <BsPinFill /> {nombre_tipologia2}
        </span>

        <div>
          <span className="flex items-center gap-1">
            <FaCalendarAlt /> Actualizada:
          </span>

          <span>{fecha_actualizado}</span>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-1">
        {canal_phone === "1" && <FaPhoneAlt className="text-2xl" />}
        {canal_ws === "1" && <FaWhatsapp className="text-2xl" />}
        {canal_mail === "1" && <FaEnvelope className="text-2xl" />}
      </div>
    </div>
  );
};

export default Tickets;
