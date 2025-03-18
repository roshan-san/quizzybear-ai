import { useEffect, useState } from "react";
import { SiTicktick } from "react-icons/si";
import { ImCross } from "react-icons/im";
import PropTypes from "prop-types";

const MCQ = ({
  question,
  answer,
  options,
  setCount,
  reason,
  showAnswer = true,
  allowReSelection = false,
}) => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!allowReSelection && selected == String(answer)) {
      setCount((prev) => prev + 1);
    }
  }, [selected, answer, allowReSelection, setCount]);

  return (
    <div className="font-poppins w-full border-2 p-4 max-w-[95%] shadow-xl rounded-lg bg-white dark:bg-secondarydarkbg">
      <span className="font-medium">Q . {question}</span>

      <div className="flex flex-col gap-y-3 mt-5">
        {options?.map((option, index) => {
          return (
            <button
              key={option}
              disabled={!allowReSelection && selected != null}
              onClick={() => {
                setSelected(String(option));
              }}
              className={`w-full px-4 border-2 ${
                !selected && "dark:border-darkmodetext"
              } p-2 gap-3 flex items-center rounded text-left transition-all
                ${selected == option && "border-cta dark:text-white"} 
                ${
                  showAnswer &&
                  selected &&
                  (answer == option
                    ? "bg-green-100 dark:bg-green-800 dark:bg-opacity-50 dark:text-white"
                    : "bg-red-100 dark:bg-red-700 dark:bg-opacity-50 dark:text-white")
                }
                ${
                  showAnswer &&
                  selected &&
                  selected != option &&
                  (answer == option
                    ? "border-green-100 dark:border-green-700"
                    : "border-red-100 dark:border-red-700")
                }`}
            >
              <p>
                {!selected ? (
                  index + 1 + "."
                ) : showAnswer && answer == option ? (
                  <SiTicktick className="text-green-500" />
                ) : (
                  showAnswer && <ImCross className="text-red-500" />
                )}
                {!showAnswer && selected && index + 1 + "."}
              </p>
              <p>{String(option)}</p>
            </button>
          );
        })}
      </div>

      {reason && selected && <p className="mt-4 px-1">{reason}</p>}
    </div>
  );
};

MCQ.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
  options: PropTypes.array,
  setCount: PropTypes.func,
  reason: PropTypes.string,
  showAnswer: PropTypes.bool,
  allowReSelection: PropTypes.bool,
};

export default MCQ;
