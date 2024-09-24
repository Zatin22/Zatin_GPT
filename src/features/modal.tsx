import { useState } from "react"
import { FaArrowDown } from "react-icons/fa6"
import { HiArrowPathRoundedSquare } from "react-icons/hi2"
import { LuSendHorizonal } from "react-icons/lu"

interface ModalProps {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [regenerateInput, setRegenerateInput] = useState("");

  const DUMMY_RESPONSE = `Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.`;


  function closeModal() {
    setIsOpen(false);
  }

  const handleOverlayClick = () => {
    isOpen ? closeModal() : null;
  }

  const placeholderElement = document.querySelector(
    ".msg-form__placeholder",
  ) as HTMLDivElement;

  const handleInsert = () => {
    closeModal();
    placeholderElement.style.display = "none";

    const textarea = document.querySelector(
      ".msg-form__contenteditable",
    ) as HTMLTextAreaElement;

    textarea.children[0].innerHTML = DUMMY_RESPONSE;
    setIsGenerated(false);
    setUserInput("");
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center align-center inset-0 bg-black/25"
          onClick={handleOverlayClick}>
          {!isGenerated ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center justify-center self-center bg-gray-50 p-5 w-[45rem] h-fit rounded-xl">
              <input
                type="text"
                name="prompt"
                placeholder="Your prompt"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full focus:ring-0 focus:border-gray-300 border border-gray-200 placeholder:text-gray-400 mb-6 text-gray-500 rounded-lg font-medium text-xl p-3"
              />
              <button
                onClick={() => {
                  setIsGenerated(true)
                }}
                disabled={!userInput}
                className="flex items-center justify-around self-end bg-blue-500 text-white px-3 py-2.5 w-40 cursor-pointer rounded-lg">
                <LuSendHorizonal className="text-2xl" />

                <p className="text-xl font-medium">Generate</p>
              </button>
            </div>
          ) : (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center justify-center self-center bg-gray-50 p-5 w-[45rem] h-fit rounded-xl gap-5">
              {/* chats */}
              <div className="flex flex-col gap-10 text-xl">
                <p className="px-3 py-3.5 text-slate-500 bg-slate-200 rounded-lg self-end w-[70%]">
                  {userInput}
                </p>
                <p className="px-3 py-3.5 text-slate-500 bg-blue-200 rounded-lg self-start w-[70%]">
                  {DUMMY_RESPONSE}
                </p>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  name="prompt"
                  placeholder="Your prompt"
                  value={regenerateInput}
                  onChange={(e) => setRegenerateInput(e.target.value)}
                  className="w-full focus:ring-0 focus:border-gray-300 border border-gray-200 placeholder:text-gray-400 mb-6 text-gray-500 rounded-lg font-medium text-xl px-3 py-4"
                />
              </div>
              <div className="flex items-center gap-5 self-end">
                <button
                  onClick={() => handleInsert()}
                  className="flex items-center justify-around self-end bg-white text-gray-500 p-3 w-32 rounded-lg border border-gray-500">
                  <FaArrowDown className="text-xl" />

                  <p className="text-xl font-medium">Insert</p>
                </button>
                <button className="flex items-center justify-around self-end bg-blue-500 text-white p-3 w-40 rounded-lg">
                  <HiArrowPathRoundedSquare className="text-xl" />

                  <p className="text-xl font-medium">Regenerate</p>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Modal