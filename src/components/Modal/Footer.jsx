import React from "react";
import ThemeModal from "./Modal/ThemeModal";
import { Mail, Support, Code, Discord, X } from "../assets/icons/FooterIcons";
import Guide from "./Footer/Guide";
import SoundModal from "./Modal/SoundModal";
import "./Footer/Footer.css";

const Footer = () => {
  return (
    <>
      <div
        className="text-center
      bg-primary 
      flex flex-col justify-end mx-auto
      lg:max-w-[1240px] 
      px-0 sm:px-5 md:px-10 lg:px-10
      "
      >
        <section className="stk">
          <Guide />

          <div className="max-w-[1152px] flex align-center justify-center items-center mx-auto gap-3 px-2 py-2 text-secondary ">
            <div className="flex flex-1 align-center items-center mt-2 gap-4 text-[12px] font-semibold text-center flex-wrap">
              <div className="flex flex-row gap-1 ">
                <Mail props="fill-iconstext w-4 h-4" />
                <p className="text-iconstext">Contact</p>
              </div>
              <div className="flex flex-row gap-1">
                <Support props="fill-iconstext w-4 h-4" />
                <p className="text-iconstext">Support</p>
              </div>

              <a
                href="https://github.com/miguelrodriguezp99/typing-web"
                className="flex flex-row gap-1 group "
                target="_blank"
                rel="noreferrer"
              >
                <Code props="fill-iconstext w-4 h-4 group-hover:fill-iconstext-hover transition-all duration-300" />
                <p className="text-iconstext group-hover:text-iconstext-hover transition-all duration-300">
                  Github
                </p>
              </a>

              <div className="flex flex-row gap-1">
                <Discord props="fill-iconstext w-4 h-4" />
                <p className="text-iconstext">Discord</p>
              </div>
              <a
                href="https://twitter.com/miguelrguez99"
                className="flex flex-row gap-1 group"
                target="_blank"
                rel="noreferrer"
              >
                <X
                  props="fill-iconstext w-3.5 h-3.5 mt-0.1 group-hover:fill-iconstext-hover transition-all duration-300"
                  color="fill-iconstext group-hover:fill-iconstext-hover"
                />
                <p className="text-iconstext group-hover:text-iconstext-hover transition-all duration-300">
                  Twitter
                </p>
              </a>
            </div>

            <section className="flex flex-wrap gap-3 mt-2 right-0 justify-end">
              <ThemeModal />
              <SoundModal />
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default Footer;
