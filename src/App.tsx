import {
  Home,
  NotFound,
  MCQQuiz,
  SocketPage,
} from "./pages";
import { useQuery } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { axiosInstance } from "./utils/axios";
import { SyncLoader } from "react-spinners";
import { Navbar } from "./components";
import { Typewriter } from "react-simple-typewriter";
import { Toaster } from "react-hot-toast";
import { useDarkMode } from "./context/DarkModeContext";

function App() {
  const { data, isLoading } = useQuery({
    queryKey: ["check"],
    queryFn: () => {
      return axiosInstance.get("/");
    },
    refetchInterval: 10000,
    retry: 10,
  });

  const { isDarkMode } = useDarkMode();

  return (
    <div className="dark:bg-darkbg dark:text-darkmodetext">
      <Toaster
        toastOptions={{
          style: {
            background: isDarkMode ? "#333" : "#fff",
            color: isDarkMode ? "#fff" : "#000",
          },
        }}
      />

      {isLoading && (
        <div className="h-screen w-full flex flex-col gap-y-10 justify-center items-center">
          <SyncLoader
            color={"#C4A484"}
            loading={isLoading}
            size={65}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <p className="bg-gradient-to-br ml-3 text-transparent bg-clip-text from-cta to-hovercta font-medium text-xl">
            <Typewriter
              words={[
                "Make AI Quizzes on your fav topic",
                "Compete with friends",
              ]}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </p>
        </div>
      )}

      {data?.data && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mcq" element={<MCQQuiz />} />
            <Route path="/multiplayer" element={<SocketPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
