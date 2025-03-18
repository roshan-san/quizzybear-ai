import { Link } from "react-router-dom";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import CTAButton from "./CTAButton";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="font-poppins dark:bg-darkbg relative w-full flex p-5 shadow-md z-5 justify-between items-center">
      <Link to="/" className="flex gap-x-3 items-center">
        <img
          src={
            "/src/assets/bear.png"
          }
          alt="QuizzyBearAI"
          className="h-10 pointer-events-none"
        />
        <p className="dark:text-darkmodetext font-semibold bg-gradient-to-t text-transparent bg-clip-text from-cta to-hovercta text-lg">
          QuizzyBearAI
        </p>
      </Link>
      <div className="hidden pr-10 md:flex items-center gap-x-10 font-medium">
        
        <Link
          to="/mcq"
          className="flex gap-x-3 items-center hover:text-cta transition-all"
        >
          MCQs
        </Link>

        <Link
          to="/multiplayer"
          className="flex gap-x-3 items-center hover:text-cta transition-all"
        >
          MultiPlayer
        </Link>

      </div>

      <div className="md:hidden flex gap-x-5 items-center">

        <RxHamburgerMenu
          onClick={() => setOpen(true)}
          className="md:hidden text-xl cursor-pointer text-cta dark:text-darkmodetext transition-all"
        />
      </div>

      <div
        className={`bg-animatedWaveDark bg-cover bg-no-repeat h-screen w-full text-xl md:text-lg fixed top-0 right-0 z-50 bg-white dark:bg-darkbg pb-6 text-center shadow-md ${
          open ? "translate-x-0" : "translate-x-[100%]"
        } transition-all duration-500`}
      >
        <div className="flex justify-between items-center pt-5 px-5 lg:px-10 mb-14">
          <div
            onClick={() => {
              navigate("/");
              setOpen(false);
            }}
            className="flex items-center gap-x-2 cursor-pointer"
          >
            <img
              src={
                "/src/assets/bear.png"
              }
              className="h-10 pointer-events-none"
            />
            <p className="text-lg text-white font-semibold  pr-2">Quizzer AI</p>
          </div>
          <RxCross2
            onClick={() => setOpen(false)}
            className="cursor-pointer text-2xl text-white"
          />
        </div>
        <div className="px-8 mt-14 text-2xl flex flex-col items-center gap-y-5">
          <img
            src={
              "src/assets/bear.png"
            }
            className="w-40 pointer-events-none"
          />
          <p className="font-medium text-white w-[70%]">
            Hey! QuizzyBear is ready to quiz you!
          </p>
          <div className="mt-5 flex flex-col items-center gap-y-8">
            <CTAButton
              text={"Multiple Choice"}
              onClick={() => {
                navigate("/mcq");
                setOpen(false);
              }}
              className="text-lg w-52 bg-hovercta"
            />

            <CTAButton
              text={"MultiPlayer"}
              onClick={() => {
                navigate("/multiplayer");
                setOpen(false);
              }}
              className="text-lg w-52 bg-hovercta"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
