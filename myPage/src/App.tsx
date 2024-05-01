import {SiTypescript, SiTailwindcss, SiFirebase} from "react-icons/si";
import {
  FaHtml5,
  FaCss3Alt,
  FaFigma,
  FaAngular,
  FaLinkedin,
  FaGithub,
  FaSlack,
  FaReact,
  FaVuejs,
} from "react-icons/fa";
import {BsFiletypeScss} from "react-icons/bs";
import {BiLogoVuejs} from "react-icons/bi";
import {IoLogoJavascript} from "react-icons/io5";
import {FaUnity} from "react-icons/fa6";
import {MdOutgoingMail} from "react-icons/md";
import {CgAtlasian} from "react-icons/cg";
import {SiStyledcomponents} from "react-icons/si";
import "./App.css";
import {useEffect, useState} from "react";

function App() {
  const [, setCurrentSection] = useState("intro");
  const sections = ["intro", "portfolio", "experience", "about"];
  const [scrollPosition, setScrollPosition] = useState(0);
  const [buttonPositions, setButtonPositions] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".hidden");

      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementPosition < windowHeight * 0.95) {
          element.classList.add("show");
        }
      });

      const scrollPercentage =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;
      const maxScrollbarPosition =
        window.innerHeight * 0.8 -
        (document.querySelector(".scrollbar-thumb")?.clientHeight || 0);
      const newScrollPosition = Math.min(
        Math.max((scrollPercentage / 100) * maxScrollbarPosition, 0),
        maxScrollbarPosition
      );
      setScrollPosition(newScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    calculateButtonPositions();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (section: string) => {
    setCurrentSection(section);
    const element = document.getElementById(section);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
      calculateButtonPositions();
    }
  };

  const calculateButtonPositions = () => {
    const newButtonPositions: {[key: string]: number} = {};
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        const scrollPercentage =
          (element.offsetTop /
            (document.body.scrollHeight - window.innerHeight)) *
          100;
        const maxScrollbarPosition =
          window.innerHeight * 0.8 -
          (document.querySelector(".scrollbar-thumb")?.clientHeight || 0);
        const newScrollPosition = Math.min(
          Math.max((scrollPercentage / 100) * maxScrollbarPosition, 0),
          maxScrollbarPosition
        );
        newButtonPositions[section] = newScrollPosition;
      }
    });
    setButtonPositions(newButtonPositions);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const portfolioBlocks = document.querySelectorAll(".portfolioBlock");
      portfolioBlocks.forEach((portfolioBlock: Element) => {
        const block = portfolioBlock as HTMLElement;
        const rect = block.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = mouseX - centerX;
        const distanceY = mouseY - centerY;
        const tiltX = (distanceY / centerY) * 5;
        const tiltY = (-distanceX / centerX) * 5;

        if (
          mouseX >= rect.left &&
          mouseX <= rect.right &&
          mouseY >= rect.top &&
          mouseY <= rect.bottom
        ) {
          requestAnimationFrame(() => {
            block.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

            block.style.background = `radial-gradient(circle at ${
              mouseX - rect.left
            }px ${
              mouseY - rect.top
            }px,  rgba(51, 179, 174, 0.7), transparent 60%)`;

            block.style.boxShadow = "0 0 10px rgba(0, 0, 0, 1)";
          });
        } else {
          block.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg)";
          block.style.background = "#0f1114";
          block.style.boxShadow = "none";
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="sidebar">
        {sections.map((section) => (
          <button
            key={section}
            className="scrollButton"
            onClick={() => scrollToSection(section)}
            style={{top: `${buttonPositions[section] + 20}px`}}
          >
            {section}
          </button>
        ))}
        <div
          className="scrollbar"
          style={{top: `${scrollPosition}px`}}
        >
          <div className="scrollbar-thumb" />
        </div>
      </div>
      <div
        id="intro"
        className="content"
      >
        <div className="intro">
          <div className="introBlok">
            <img
              src="./images/img0.jpg"
              alt=""
              className="introImg"
            />
          </div>
          <div className="introBlok">
            <h1 className="introHeader">
              Hello there, <b>I&apos;m Martin</b> a <b>Front-end developer</b>
            </h1>
            <p>
              I enjoy creating user-friendly websites with focus on great
              design, clean code and <b>bold</b> innovations, I&apos;m here to
              bring your digital ideas to reality.
            </p>
            <div className="buttonWrapper">
              <button className="buttonStyle">
                Contact me <MdOutgoingMail className="buttonIcon" />
              </button>
              <button className="linkedIn">
                <FaLinkedin className="linkedInButton" />
              </button>
            </div>
          </div>
        </div>
        <div className="about">
          <h1
            id="portfolio"
            className="hidden generalHeader"
          >
            Portfolio
          </h1>
          <div className="myPortfolio">
            <div
              key="portfolioBlock0"
              className="portfolioBlockContainer hidden"
            >
              <div
                id="portfolioBlock"
                className="portfolioBlock"
              >
                <img
                  src="./images/img1.jpg"
                  alt=""
                  className="portfolioImg"
                />
                <h2>Na Myte</h2>
                <p>
                  Website for Restaurant Na Mýtě based in Tábor, Czech Republic.
                </p>
                <h2>Used technologies:</h2>
                <div className="iconDiv">
                  <FaHtml5 className="icon" />
                  <FaCss3Alt className="icon" />
                  <FaReact className="icon" />
                  <SiTypescript className="icon" />
                  <BsFiletypeScss className="icon" />
                  <FaGithub className="icon" />
                  <SiFirebase className="icon" />
                </div>
              </div>
            </div>
            <div
              key="portfolioBlock1"
              className="portfolioBlockContainer hidden"
            >
              <div
                id="portfolioBlock"
                className="portfolioBlock"
              >
                <img
                  src="./images/img1.jpg"
                  alt=""
                  className="portfolioImg"
                />
                <h2>Trip Planner</h2>
                <p>
                  Website for trip planning and note making for places you want
                  to visit.
                </p>
                <h2>Used technologies:</h2>
                <div className="iconDiv">
                  <FaHtml5 className="icon" />
                  <FaCss3Alt className="icon" />
                  <BiLogoVuejs className="icon" />
                  <SiTypescript className="icon" />
                  <SiTailwindcss className="icon" />
                  <FaGithub className="icon" />
                </div>
              </div>
            </div>
            <div
              key="portfolioBlock2"
              className="portfolioBlockContainer hidden"
            >
              <div
                id="portfolioBlock"
                className="portfolioBlock"
              >
                <img
                  src="./images/img2.jpg"
                  alt=""
                  className="portfolioImg"
                />
                <h2>TellMe</h2>
                <p>
                  Website to keep track of what TV-series and movies you want to
                  watch or look up information about.
                </p>
                <h2>Used technologies:</h2>
                <div className="iconDiv">
                  <FaHtml5 className="icon" />
                  <FaCss3Alt className="icon" />
                  <BiLogoVuejs className="icon" />
                  <IoLogoJavascript className="icon" />
                  <SiStyledcomponents className="icon" />
                  <FaGithub className="icon" />
                  <SiFirebase className="icon" />
                </div>
              </div>
            </div>
            <div
              key="portfolioBlock3"
              className="portfolioBlockContainer hidden"
            >
              <div
                id="portfolioBlock"
                className="portfolioBlock"
              >
                <img
                  src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg"
                  alt=""
                  className="portfolioImg"
                />
                <h2>RedditIdea</h2>
                <p>Rogue-like shooter with top-down view</p>
                <h2>Used technologies:</h2>
                <div className="iconDiv">
                  <FaUnity className="icon" />
                  <FaGithub className="icon" />
                </div>
              </div>
            </div>
          </div>
          <button className="githubButton hidden">
            See my GitHub
            <FaGithub className="buttonIcon" />
          </button>
        </div>
        <div className="myExperience">
          <h1
            id="experience"
            className="generalHeader hidden"
          >
            Other experience
          </h1>
          <div className="experienceWrapper">
            <div className="experienceDiv hidden">
              <div>
                <h2>Lentii</h2>
              </div>
              <div>
                <p>
                  Work here on 6 months long internship. Worked on bugfixing and
                  main page structure.
                </p>
                <p>Technologies i worked with:</p>
                <FaHtml5 className="icon" />
                <FaCss3Alt className="icon" />
                <FaAngular className="icon" />
                <SiTypescript className="icon" />
                <SiTailwindcss className="icon" />
                <CgAtlasian className="icon" />
                <FaFigma className="icon" />
                <FaSlack className="icon" />
              </div>
            </div>
          </div>
          <div className="experienceWrapper2">
            <div className="experienceDiv hidden">
              <div>
                <h2>Bachelor project</h2>
              </div>
              <div>
                <p></p>
                <p>
                  A back-office system for start-up company Shouter to aid their
                  support team.
                </p>
                <p>Technologies i worked with:</p>
                <FaHtml5 className="icon" />
                <FaCss3Alt className="icon" />
                <FaVuejs className="icon" />
                <SiTypescript className="icon" />
                <SiStyledcomponents className="icon" />
              </div>
            </div>
          </div>
        </div>
        <div
          id="about"
          className="about"
        >
          <div className="aboutMe">
            <h1 className="generalHeader hidden">About me</h1>
            <p className="hidden">
              I am 24 year old guy from Tábor, Czech Republic who likes
              technologies and so on a whim I decided to study software
              engeneering in Denmark because I hated drilling and Danish
              universities seems quite project driven which peaked my interest.
              So here I am
            </p>
          </div>
          <div className="about">
            <h2 className="hidden">My Hobbies</h2>
            <div className="myPortfolio">
              <div
                key="portfolioBlock4"
                className="portfolioBlockContainer hidden"
              >
                <div
                  id="portfolioBlock"
                  className="portfolioBlock"
                >
                  <img
                    src="./images/img2.jpg"
                    alt=""
                    className="portfolioImg"
                  />
                  <h2>Technologies</h2>
                  <p>
                    My main interest are mobile phones, laptops and connected
                    technologies together with smart home and of course AI and
                    Programming.
                  </p>
                </div>
              </div>
              <div
                key="portfolioBlock5"
                className="portfolioBlockContainer hidden"
              >
                <div
                  id="portfolioBlock"
                  className="portfolioBlock"
                >
                  <img
                    src="./images/img3.jpg"
                    alt=""
                    className="portfolioImg"
                  />
                  <h2>TV-Series and Movies </h2>
                  <p>
                    My favorite genres are Fantasy, Sci-fy together with Mystery
                    and Drama. I also watch a lot of Anime and Yotube. I&apos;m
                    not much of a Horror fan.
                  </p>
                </div>
              </div>
              <div
                key="portfolioBlock6"
                className="portfolioBlockContainer hidden"
              >
                <div
                  id="portfolioBlock"
                  className="portfolioBlock"
                >
                  <img
                    src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg"
                    alt=""
                    className="portfolioImg"
                  />
                  <h2>Traveling</h2>
                  <p>
                    For now I mostly visited just Europe countries. My dream is
                    to travel through eastern asia especially Japan.
                  </p>
                </div>
              </div>
              <div
                key="portfolioBlock7"
                className="portfolioBlockContainer hidden"
              >
                <div
                  id="portfolioBlock"
                  className="portfolioBlock"
                >
                  <img
                    src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg"
                    alt=""
                    className="portfolioImg"
                  />
                  <h2>Calisthenics</h2>
                  <p>
                    As my job is mostly sitting behind computer. I find
                    calisthenics an intersting way to keep my body from becoming
                    stiff like wood.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
