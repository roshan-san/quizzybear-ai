import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios";
import { MCQ } from "@/components";
import { SyncLoader } from "react-spinners";
import { GoUpButton, InputBox } from "../components";
import { useDarkMode } from "../context/DarkModeContext";

const MCQQuiz = () => {
  const { isDarkMode } = useDarkMode();

  const [searchTerm, setSearchTerm] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [questions, setQuestions] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);

  const [inputError, setInputError] = useState(0);
  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["getMCQQuestions", searchTerm, difficulty],
    queryFn: () => {
      return axiosInstance.post("/getMCQs", {
        topic: searchTerm,
        difficulty: difficulty,
      });
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: 60 * 1000 * 10,
    enabled: false,
  });
  useEffect(() => {
    if (data?.data?.questions?.length > 0) {
      setCorrectCount(0);
      setQuestions(data?.data?.questions);
    }
  }, [data?.data]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleClick = () => {
    setInputError(0);
    let search = searchTerm?.replaceAll(" ", "");

    if (search?.length == 0) {
      setInputError(1);
      return;
    } else if (searchTerm?.length > 50) {
      setInputError(2);
      return;
    }

    refetch();
  };

  return (
    <div
      className="bg-animatedWaveDark bg-no-repeat bg-cover font-poppins min-h-screen"
    >
      <InputBox
        buttonText={"Generate MCQs"}
        difficulty={difficulty}
        handleClick={handleClick}
        inputError={inputError}
        isFetching={isFetching}
        isLoading={isLoading}
        questions={questions}
        searchTerm={searchTerm}
        setDifficulty={setDifficulty}
        setSearchTerm={setSearchTerm}
        title={"MCQ Quiz"}
        text={"Your MCQs are ready!"}
      />

      {!isLoading && questions?.length > 0 && (
        <>
          <p className="text-center mt-10 text-white px-2">
            Note : Questions & answers are created using AI and may be
            incorrect.
          </p>

          <div className="flex flex-wrap gap-5 justify-center py-10">
            {questions?.map((item) => {
              return (
                <MCQ
                  key={item?.question}
                  question={item?.question}
                  answer={item?.answer}
                  options={item?.options}
                  setCount={setCorrectCount}
                />
              );
            })}
          </div>
        </>
      )}

      {(error || data?.data?.questions.length == 0) && (
        <p className="text-center font-medium text-xl text-white drop-shadow-lg">
          Uh oh! Couldn't create questions about "{searchTerm}". Maybe try a
          different topic?
        </p>
      )}

      {isLoading && (
        <div className="mt-12 flex justify-center items-center">
          <SyncLoader
            color={"#ffffff"}
            loading={isLoading}
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      {!isLoading && questions?.length > 0 && (
        <div className="flex justify-center">
          <p className="font-medium bg-white dark:bg-darkbg dark:border-2 dark:border-white w-[95%] rounded-xl text-center border-2 p-5 text-lg md:text-2xl flex justify-center items-center gap-x-5">
            Your Score : <span className="text-hovercta">{correctCount}</span> /{" "}
            {questions?.length}
          </p>
        </div>
      )}

      {!isLoading && questions?.length > 0 && (
        <GoUpButton />
      )}
    </div>
  );
};

export default MCQQuiz;
