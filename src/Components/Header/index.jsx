import React, { useContext, useRef, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../Helpers/Context";
import gsap from "gsap";

const Header = () => {
  const navCircle = useRef();
  const navigate = useNavigate();

  const lang = useContext(Context)[0];
  const setLang = useContext(Context)[1];
  const position = useContext(Context)[2];
  const setPosition = useContext(Context)[3];

  const [exPos, setExPos] = useState();

  useEffect(() => {
    window.localStorage.setItem("NAV_POSITION", JSON.stringify(position));
    window.localStorage.setItem("SITE_LANGUAGE", JSON.stringify(lang));

    let positionLocalStorage = JSON.parse(
      window.localStorage.getItem("NAV_POSITION")
    );
    switch (positionLocalStorage) {
      case "References":
        if (exPos) {
          gsap.fromTo(
            // ["#references", "#particles"],
            "main",
            {
              transform: "translateX(-100%)",
            },
            {
              transform: "translateX(0)",
            }
          );
        }
        setExPos("References");
        gsap.to(navCircle.current, {
          left: "1.5%",
          transform: "none",
          onComplete: () => {
            navigate("/references");
          },
        });
        break;
      case "Home":
        if (exPos == "References") {
          gsap.fromTo(
            // ["#home", "#particles"],
            "main",
            {
              transform: "translateX(100%)",
            },
            { transform: "translateX(0)" }
          );
        } else if (exPos == "WebDev") {
          gsap.fromTo(
            // ["#home", "#particles"],
            "main",
            {
              transform: "translateX(-100%)",
            },
            { transform: "translateX(0)" }
          );
        }
        setExPos("Home"),
          gsap.to(navCircle.current, {
            left: "50%",
            transform: "translateX(-50%)",
            onComplete: () => {
              navigate("/");
            },
          });
        break;
      case "WebDev":
        if (exPos) {
          gsap.fromTo(
            // ["#webdev", "#particles"],
            "main",
            {
              transform: "translateX(100%)",
            },
            {
              transform: "translateX(0)",
            }
          );
        }
        setExPos("WebDev"),
          gsap.to(navCircle.current, {
            left: "66%",
            transform: "none",
            onComplete: () => {
              navigate("/webdev");
            },
          });
        break;
    }
  }, [position, lang]);

  function setLanguage(lng) {
    setLang(lng);
  }
  function setAnimDirection() {
    switch (position) {
      case "References":
        return gsap.to(
          // ["#references", "#particles"],
          "main",
          {
            transform: "translateX(-100%)",
            onComplete: () => {
              setPosition("Home");
            },
          }
        );

      case "WebDev":
        return gsap.to(
          // ["#webdev", "#particles"],
          "main",
          {
            transform: "translateX(100%)",
            onComplete: () => {
              setPosition("Home");
            },
          }
        );
    }
  }

  return (
    <>
      <header className="container flex justify-end mx-auto mt-4">
        <nav className="absolute left-1/2 -translate-x-1/2 bg-dark border border-light/50 rounded-full">
          <ul className="flex">
            <li className="h-6 relative nav-after">
              <NavLink
                onClick={(event) => {
                  event.preventDefault();
                  gsap.to(navCircle.current, {
                    left: "1.5%",
                    transform: "none",
                  });
                  gsap.to(
                    // ["#home", "#webdev", "#particles"],
                    "main",
                    {
                      transform: "translateX(100%)",
                      onComplete: () => {
                        setPosition("References");
                      },
                    }
                  );
                }}
                to="/references"
                className="first inline-block max-w-[1.5rem] overflow-hidden opacity-0">
                References
              </NavLink>
            </li>
            <li className="h-6 relative nav-after">
              <NavLink
                onClick={(event) => {
                  event.preventDefault();
                  gsap.to(navCircle.current, {
                    left: "50%",
                    transform: "translateX(-50%)",
                  }),
                    setAnimDirection();
                }}
                to="/"
                className="inline-block max-w-[1.5rem] overflow-hidden opacity-0">
                Home
              </NavLink>
            </li>
            <li className="h-6 relative nav-after">
              <NavLink
                onClick={(event) => {
                  event.preventDefault();
                  gsap.to(navCircle.current, {
                    left: "66%",
                    transform: "none",
                  }),
                    gsap.to(
                      // ["#home", "#references", "#particles"],
                      "main",
                      {
                        transform: "translateX(-100%)",
                        onComplete: () => {
                          setPosition("WebDev");
                        },
                      }
                    );
                }}
                to="/webdev"
                className="inline-block max-w-[1.5rem] overflow-hidden opacity-0">
                WebDev
              </NavLink>
            </li>
          </ul>
          <div
            ref={navCircle}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-light rounded-full pointer-events-none"></div>
        </nav>
        <ul className="flex">
          <li className="pr-3 border-r border-r-light">
            <a
              onClick={() => {
                setLanguage("de");
              }}
              href="#">
              de
            </a>
          </li>
          <li className="pl-3">
            <a
              onClick={() => {
                setLanguage("en");
              }}
              href="#">
              en
            </a>
          </li>
        </ul>
      </header>
    </>
  );
};

export default Header;
