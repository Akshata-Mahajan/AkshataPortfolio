// portfolio.jsx
import React, { useEffect, useState } from "react";
import ProjectModal from "../components/ProjectModal";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Award, Boxes } from "lucide-react";

const certificatesData = [
  {
    img: "python certificate.png",
    title: "Python Certificate",
    issuer: "Python Institute",
  },
  {
    img: "Aws cloud certificate.png",
    title: "AWS Cloud Certificate",
    issuer: "Amazon Web Services",
  },
  {
    img: "python developer intern.png",
    title: "Python Developer Internship",
    issuer: "Python Institute",
  },
  {
    img: "WEB DEvelopment.png",
    title: "Web Development Certificate",
    issuer: "Udemy",
  },
  {
    img: "Delloit Cyber certificate.png",
    title: "Deloitte Cyber Certificate",
    issuer: "Deloitte",
  },
  {
    img: "delloit data analysitcs.png",
    title: "Deloitte Data Analytics Certificate",
    issuer: "Deloitte",
  },
];

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node.js" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
  { icon: "github-original.svg", language: "GitHub" },
  { icon: "sql.svg", language: "sql" },
  { icon: "typescript-original.svg", language: "TypeScript" },
  { icon: "mongodb-original-wordmark.svg", language: "MongoDB" },
  { icon: "python-original.svg", language: "Python" },
  { icon: "figma-original.svg", language: "Figma" },
];

// ✅ Updated projects list with detailed fields
const projects = [
  {
    id: "accessible-food-delivery",
    Img: "Food delivery app.png",
    Title: "Accessible Food Delivery Website",
    Description:
      "Food delivery platform designed for visually/physically impaired users with voice control and accessible UI.",
    Overview:
      "Designed to enable people with visual and motor impairments to independently order food online. Developed as part of a socially impactful initiative to increase accessibility in e-commerce.",
    Motivation:
      "More than 15% of India’s population has some form of disability. Existing platforms often ignore accessibility standards.",
    Features: [
      "Voice-controlled commands for searching and ordering food",
      "Text-to-speech for reading menu items and cart",
      "Large touch targets and simplified navigation flow",
      "High-contrast UI with adjustable text sizes",
      "Follows WCAG 2.1 and Indian Government Accessibility Guidelines",
    ],
    TechStack: "HTML5, CSS3, JavaScript, Bootstrap",
    Dataset: "Government Accessibility Guidelines (e.g. WCAG, Indian Govt standards)",
    Challenges: [
      "Ensuring consistent screen reader support across browsers",
      "Balancing visual appeal with accessibility compliance",
    ],
    Benefits:
      "Empowers differently-abled users with digital autonomy. Potential for partnerships with NGOs and government programs.",
    Improvements: [
      "Add multilingual voice support",
      "Integrate AI-powered recommendation system for dietary preferences",
    ],
  },
  {
    id: "safe-route",
    Img: "SheSolves.jpg",
    Title: "SafeRoute – Smart Navigation for Women and Children",
    Description:
      "Smart web app recommending safest travel routes using crime heatmaps, real-time scoring. Built during She Solves Hackathon.",
    Overview:
      "A web platform recommending safest travel routes. Developed during the She Solves Hackathon.",
    Motivation:
      "Rising safety concerns for women and children commuting in urban areas. Lack of real-time safety scoring in navigation apps.",
    Features: [
      "Heatmaps showing recent crimes in the area",
      "Real-time safety scoring for route segments",
      "Alerts if a safer alternative becomes available mid-journey",
    ],
    TechStack: "Frontend: React.js | Backend: Flask, Python | DB: PostgreSQL + PostGIS",
    Dataset:
      "Open crime data from local authorities. Real-time event reports (mock data for prototype).",
    Challenges: [
      "Integrating geospatial analysis for dynamic scoring",
      "Optimizing response time when querying large datasets",
    ],
    Benefits:
      "Empowers users to make informed decisions about travel. Raises situational awareness and confidence.",
    Improvements: [
      "Add live user reports via crowdsourcing",
      "Mobile app version with push notifications",
    ],
  },
  {
    id: "product-demand-forecasting",
    Img: "Demand forcasting.png",
    Title: "Product Demand Forecasting System",
    Description:
      "Predicts future product demand using sales data and machine learning. Built with Python + Streamlit.",
    Overview:
      "Predicts future product demand to optimize inventory and reduce waste. Allows businesses to upload historical sales data in CSV format.",
    Motivation:
      "Many small businesses lack tools to forecast demand effectively. Overstock and stockouts hurt revenue and customer trust.",
    Features: [
      "Data upload and cleansing",
      "Trend visualization and seasonality detection",
      "ML model predictions with error metrics",
    ],
    TechStack: "Python for data analysis, Streamlit for UI",
    Dataset:
      "Historical sales records from a simulated retail dataset. Includes date, product category, quantity sold.",
    Challenges: [],
    Benefits:
      "Helps businesses plan procurement more accurately. Reduces losses from overstocking or understocking.",
    Improvements: [
      "Incorporate external factors (holidays, promotions)",
      "API integration with live inventory management systems",
    ],
  },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const handleChange = (event, newValue) => setValue(newValue);

  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const toggleShowMore = () => {
    setShowAllCertificates((prev) => !prev);
  };

  const initialItems = window.innerWidth < 768 ? 4 : 6;

  const displayedCertificates = showAllCertificates
    ? certificatesData
    : certificatesData.slice(0, initialItems);

  return (
    <div
      className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden"
      id="Portfolio"
    >
      <div
        className="text-center pb-10"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          Portfolio Showcase
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "#1f2937",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              "& .MuiTab-root": {
                color: "#cbd5e1",
              },
              "& .Mui-selected": {
                color: "#a855f7",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#a855f7",
              },
            }}
          >
            <Tab icon={<Code className="mb-2 w-5 h-5" />} label="Projects" {...a11yProps(0)} />
            <Tab icon={<Award className="mb-2 w-5 h-5" />} label="Certificates" {...a11yProps(1)} />
            <Tab icon={<Boxes className="mb-2 w-5 h-5" />} label="Tech Stack" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          {/* Projects */}
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((project) => (
                <div key={project.id}>
                  <CardProject
                    Img={project.Img}
                    Title={project.Title}
                    Description={project.Description}
                    onDetailsClick={() => openModal(project)}
                  />
                </div>
              ))}
            </div>
          </TabPanel>

          {/* Certificates */}
          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {displayedCertificates.map((cert, index) => (
                <div
                  key={index}
                  className="group relative rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={cert.img}
                    alt={cert.title}
                    className="w-full h-56 object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center text-white p-4">
                    <h3 className="text-lg font-bold">{cert.title}</h3>
                    <p className="text-sm">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
            {certificatesData.length > initialItems && (
              <div className="mt-6 flex justify-start">
                <button
                  onClick={toggleShowMore}
                  className="px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 hover:border-white/20 backdrop-blur-sm group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {showAllCertificates ? "See Less" : "See More"}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
                </button>
              </div>
            )}
          </TabPanel>

          {/* Tech Stack */}
          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {techStacks.map((stack, index) => (
                <TechStackIcon
                  key={index}
                  TechStackIcon={stack.icon}
                  Language={stack.language}
                />
              ))}
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>

      {/* Project Modal */}
      <ProjectModal open={modalOpen} onClose={closeModal} project={selectedProject} />
    </div>
  );
}
