import Bg from "../images/fondo.jpg";
import UserPhoto from "../images/profile.svg";

const Login = () => {
  return (
    <div className="flex">
      <div className="w-2/3">
        <img
          src={Bg}
          alt=""
          className="h-screen object-cover object-left-top"
        />
      </div>

      <div className="w-1/3 flex justify-center items-center">
        <form className="w-80 flex flex-col items-center gap-5">
          <img src={UserPhoto} alt="Logo User" width={100} />

          <h2 className="uppercase text-5xl">Bienvenido</h2>

          <div className="flex flex-col w-full gap-4">
            <input
              type="text"
              placeholder="Usuario"
              name="usuario"
              className="border-b-2 py-3 focus:outline-none"
            />

            <input
              type="text"
              placeholder="Contraseña"
              name="contraseña"
              className="border-b-2 py-3 focus:outline-none"
            />
          </div>

          <button className="uppercase bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-3xl py-3 w-full font-bold">
            Confirme
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
