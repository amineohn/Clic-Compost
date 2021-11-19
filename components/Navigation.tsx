import React from "react";
import Link from "next/link";

const Navigation = () => {
  return (
    <>
      <nav className=" bottom-0 w-full flex flex-wrap items-center justify-between px-2 py-3 bg-gray-900 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="flex flex-grow justify-center items-center">
            <ul className="flex flex-row list-none lg:ml-auto justify-center items-center">
              <li className="nav-item"></li>
              <li className="nav-item">
                <svg
                  className="fab fa-facebook-square text-lg leading-lg text-white opacity-90 w-4 h-4 m-auto"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M320 33.9c-10.5-1.2-21.2-1.9-32-1.9-99.8 0-187.8 50.8-239.4 128H320V33.9zM96 192H30.3C11.1 230.6 0 274 0 320h96V192zM352 39.4V160h175.4C487.2 99.9 424.8 55.9 352 39.4zM480 320h96c0-46-11.1-89.4-30.3-128H480v128zm-64 64v96h128c17.7 0 32-14.3 32-32v-96H411.5c2.6 10.3 4.5 20.9 4.5 32zm32-192H128v128h49.8c22.2-38.1 63-64 110.2-64s88 25.9 110.2 64H448V192zM0 448c0 17.7 14.3 32 32 32h128v-96c0-11.1 1.9-21.7 4.5-32H0v96zm288-160c-53 0-96 43-96 96v96h192v-96c0-53-43-96-96-96z"
                  ></path>
                </svg>
                <Link href="/">
                  <span className="ml-2 px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    Home
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <svg
                  className="fab fa-facebook-square text-lg leading-lg text-white opacity-90 w-4 h-4 m-auto"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M444.52 3.52L28.74 195.42c-47.97 22.39-31.98 92.75 19.19 92.75h175.91v175.91c0 51.17 70.36 67.17 92.75 19.19l191.9-415.78c15.99-38.39-25.59-79.97-63.97-63.97z"
                  ></path>
                </svg>
                <Link href="/collect">
                  <span className="ml-2 px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    Collecte
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <svg
                  className="fab fa-facebook-square text-lg leading-lg text-white opacity-90 w-4 h-4 m-auto"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M128 160h320v192H128V160zm400 96c0 26.51 21.49 48 48 48v96c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48v-96c26.51 0 48-21.49 48-48s-21.49-48-48-48v-96c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48v96c-26.51 0-48 21.49-48 48zm-48-104c0-13.255-10.745-24-24-24H120c-13.255 0-24 10.745-24 24v208c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24V152z"
                  ></path>
                </svg>
                <Link href="/tickets">
                  <span className="ml-2 px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    Tickets
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
