import router from "next/dist/client/router";
import { useState } from "react";
import { Firebase } from "../libs/firebase";
import Loading from "./loading";

const Sidebar = () => {
  const fire = new Firebase();
  const [color, setColor] = useState("bg-gray-100");
  const [button, setButton] = useState("bg-greenDDTV");
  const [text, setText] = useState("text-gray-900");
  const [buttonHover, setButtonHover] = useState("bg-green-900");
  return (
    <aside className="w-80 h-screen bg-gray shadow-md w-fulll hidden sm:block">
      <div className={`flex flex-col justify-between h-screen p-4 ${color}`}>
        <div className="text-sm space-y-2">
          <div
            className={`${button} flex justify-between items-center text-white p-2 rounded-lg mt-2 cursor-pointer hover:${buttonHover}`}
          >
            Logs
            <span className="w-4 h-4 rounded-full text-white text-center font-normal text-xs">
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm121.2 231.8l-143 141.8c-4.7 4.7-12.3 4.6-17-.1l-82.6-83.3c-4.7-4.7-4.6-12.3.1-17L99.1 285c4.7-4.7 12.3-4.6 17 .1l46 46.4 106-105.2c4.7-4.7 12.3-4.6 17 .1l28.2 28.4c4.7 4.8 4.6 12.3-.1 17z"
                ></path>
              </svg>
            </span>
          </div>

          <div
            className={`${button} flex justify-between items-center text-white p-2 rounded-lg mt-2 cursor-pointer hover:${buttonHover}`}
          >
            Maps &amp; Data
            <span className="w-4 h-4 rounded-full text-white text-center font-normal text-xs">
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 288 512"
              >
                <path
                  fill="currentColor"
                  d="M112 316.94v156.69l22.02 33.02c4.75 7.12 15.22 7.12 19.97 0L176 473.63V316.94c-10.39 1.92-21.06 3.06-32 3.06s-21.61-1.14-32-3.06zM144 0C64.47 0 0 64.47 0 144s64.47 144 144 144 144-64.47 144-144S223.53 0 144 0zm0 76c-37.5 0-68 30.5-68 68 0 6.62-5.38 12-12 12s-12-5.38-12-12c0-50.73 41.28-92 92-92 6.62 0 12 5.38 12 12s-5.38 12-12 12z"
                ></path>
              </svg>
            </span>
          </div>
          <div
            className={`${button} flex justify-between items-center text-white p-2 rounded-lg mt-2 cursor-pointer hover:${buttonHover}`}
          >
            <span>Reports</span>
            <span className="w-4 h-4 rounded-full text-white text-center font-normal text-xs">
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M511.988 288.9c-.478 17.43-15.217 31.1-32.653 31.1H424v16c0 21.864-4.882 42.584-13.6 61.145l60.228 60.228c12.496 12.497 12.496 32.758 0 45.255-12.498 12.497-32.759 12.496-45.256 0l-54.736-54.736C345.886 467.965 314.351 480 280 480V236c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v244c-34.351 0-65.886-12.035-90.636-32.108l-54.736 54.736c-12.498 12.497-32.759 12.496-45.256 0-12.496-12.497-12.496-32.758 0-45.255l60.228-60.228C92.882 378.584 88 357.864 88 336v-16H32.666C15.23 320 .491 306.33.013 288.9-.484 270.816 14.028 256 32 256h56v-58.745l-46.628-46.628c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0L141.255 160h229.489l54.627-54.627c12.498-12.497 32.758-12.497 45.256 0 12.496 12.497 12.496 32.758 0 45.255L424 197.255V256h56c17.972 0 32.484 14.816 31.988 32.9zM257 0c-61.856 0-112 50.144-112 112h224C369 50.144 318.856 0 257 0z"
                ></path>
              </svg>
            </span>
          </div>
          <div
            className={`${button} flex justify-between items-center text-white p-2 rounded-lg mt-2 cursor-pointer hover:${buttonHover}`}
          >
            Users
            <span className="w-4 h-4 rounded-full text-white text-center font-normal text-xs">
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path
                  fill="currentColor"
                  d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"
                ></path>
              </svg>
            </span>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => {
                setColor("bg-gray-900");
                setButton("!bg-orange-500");
                setText("text-white");
                setButtonHover("!bg-orange-700");
                // save?
                fire.saveColor([
                  "bg-gray-900",
                  "!bg-orange-500",
                  "text-white",
                  "!bg-orange-700",
                ]);
              }}
              className={`${text}`}
            >
              Orange
            </button>
            <button
              onClick={() => {
                setColor("bg-gray-100");
                setButton("!bg-greenDDTV");
                setText("text-black");
                setButtonHover("!bg-green-800");
              }}
              className={`${text}`}
            >
              Default
            </button>
          </div>
          <div className="flex">
            <div className="">
              <p className="inline-flex text-md font-normal">
                <img
                  className="w-8 h-8 ml-1 rounded-full"
                  src={
                    (fire.photoUrl() as string)
                      ? (fire.photoUrl() as string)
                      : (fire.defaultPhotoUrl() as string)
                  }
                  alt={fire.userName() as string}
                />
                <span className={`font-bold ml-2 mt-1.5 ${text}`}>
                  {fire.userName() ? fire.userName() : "Anonyme"}
                </span>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-3 text-white bg-red-500 rounded-lg cursor-pointer text-center text-sm max-w-xs">
          <button
            className="rounded inline-flex items-center"
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            <Loading message="" />
            <span className="font-semibold">Bug: Please reload.</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
