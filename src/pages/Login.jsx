import { useState } from "react";
import Bg from "../images/fondo.jpg";
import UserPhoto from "../images/profile.svg";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({
    usuario: "",
    clave: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://bio.contactek.com/bio/api_login/"
      );

      console.log(response.data);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="flex">
      <div className="w-2/3">
        <img
          src={Bg}
          alt="bgLogin"
          className="h-screen object-cover object-left-top"
        />
      </div>

      <div className="w-1/3 flex justify-center items-center">
        <form
          className="w-80 flex flex-col items-center gap-5"
          onSubmit={handleLogin}
        >
          <img src={UserPhoto} alt="Logo User" width={100} />
          <h2 className="uppercase text-5xl">Bienvenido</h2>
          <div className="flex flex-col w-full gap-4">
            <input
              type="text"
              placeholder="Usuario"
              name="usuario"
              className="border-b-2 py-3 focus:outline-none"
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Contraseña"
              name="clave"
              className="border-b-2 py-3 focus:outline-none"
              onChange={handleChange}
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
