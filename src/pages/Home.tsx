import { useNavigate } from "react-router-dom";
import { CTAButton } from "../components";
import { useDarkMode } from "../context/DarkModeContext";

const Home = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className={`${
        isDarkMode ? "bg-animatedWaveDark" : "bg-animatedWave"
      }  font-poppins pb-10 bg-cover bg-no-repeat min-h-screen pt-10 px-5`}
    >
      
      <p className="text-white drop-shadow-lg  font-bold text-2xl text-center mt-10">
        Hey! Meet Quizzy Bear - your friendly neighbourhood AI Quiz Bear.
      </p>
      <p className="text-white drop-shadow-lg font-medium text-lg text-center mt-8">
        Want a challenge? Give him a topic and he&apos;ll quiz you as best as he
        can!
      </p>
      <p className="text-white drop-shadow-2xl mt-10 text-xl font-semibold text-center">
        Challenge Modes:
      </p>

      <div className="flex flex-wrap justify-center items-center gap-8 pt-8">

        <CTAButton
          text={"SinglePlayer"}
          className="w-52 hover:scale-105"
          onClick={() => {
            navigate("/mcq");
          }}
        />

        <CTAButton
          text={"MultiPlayer"}
          className="w-52 hover:scale-105"
          onClick={() => {
            navigate("/multiplayer");
          }}
        />
      </div>
    </div>
  );
};

export default Home;
