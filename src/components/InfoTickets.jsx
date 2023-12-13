const InfoTickets = ({ info }) => {
  const { total, propios, completados, alertas, pendientes } = info;
  return (
    <div className="flex justify-between items-center text-blue-500 font-bold">
      <div>
        <span className="text-xl">
          Tickets: <span className="text-black">{total}</span>
        </span>
      </div>

      <div className="flex gap-10">
        <span>
          Mis tickets: <span className="text-black">{propios}</span>
        </span>

        <span>
          Completados: <span className="text-black">{completados}</span>
        </span>

        <span>
          Alertas: <span className="text-black">{alertas}</span>
        </span>

        <span>
          Tickets sin Atender: <span className="text-black">{pendientes}</span>
        </span>
      </div>
    </div>
  );
};

export default InfoTickets;
