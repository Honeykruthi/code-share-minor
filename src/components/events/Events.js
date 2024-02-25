// Events.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./events.css"; // Import your CSS file
import Navbar from "../navbar/Navbar2";
import Footer from "../footer/Footer";
import img1 from "./event_image/f.jpg";
import img2 from "./event_image/h.jpg";
import img3 from "./event_image/d.jpg";
import img4 from "./event_image/e.jpg";

// Sample data for events
const eventsData = [
  {
    id: 1,
    image: img1,
    heading: "IMA Camp",
    date: "January  5-20, 2023",
    location: "Indian military Academy",
    description: "Academy provided cadets with holistic orientation to life in IMA  with character-builind honor code.",
  },
  {
    id: 2,
    image: img3,
    heading: "Blood Donation Camp",
    date: "August 21-22, 2022",
    location: "Youth Training Center",
    description: "Intensive camp as part of Azadi ka amrit mahotsav by NCC cadets.",
  },
  {
    id: 3,
    image: img2,
    heading: " Weapon Training",
    date: "June 15-25, 2022",
    location: "CATC-55 Camp",
    description: "Weapon training and smoke bomb as part of Battle craft with exciting activities and training.",
  },
  {
    id: 4,
    image: img4,
    heading: "Swacchata Day",
    date: "October 1-2, 2022",
    location: "NIT Ground",
    description: "Shramdaan cleanliness drive as part of special Campaign.",
  },
  {
    id: 5,
    image: img1,
    heading: "NCC Recruitment",
    date: "December 8, 2023",
    location: " NIT Main Ground",
    description: "Recruitment activites and competitions for NCC cadets.",
  },
  {
    id: 6,
    image: img1,
    heading: "yoga Day",
    date: "June 21, 2023",
    location: "CATC Center",
    description: "Intensive Yoga training camp for NCC cadets.",
  },
];

// Sample data for upcoming camps
const campsData = [
  {
    id: 1,
    heading: "NCC Annual Parade",
    date: "June 15, 2024",
    location: "Parade Ground, City",
    description: "Join us for the annual NCC parade showcasing discipline and unity.",
  },
  {
    id: 2,
    heading: "NCC Leadership Workshop",
    date: "March 10, 2024",
    location: "NCC Training Center",
    description: "Enhance your leadership skills at our NCC leadership workshop.",
  },
  {
    id: 3,
    heading: "NCC Drill Workshop",
    date: "July 10, 2024",
    location: "NCC Training Ground",
    description: "Become perfect in drill.",
  },
  {
    id: 4,
    heading: "NCC Fitness Workshop",
    date: "March 10, 2024",
    location: "NITJ Training ground",
    description: "Build your stamina.",
  },
  {
    id: 5,
    heading: "NCC Lecture Workshop",
    date: "April 10, 2024",
    location: "WE-2 Class",
    description: "Preparation for B & C Certificate examination.",
  },
];

export { eventsData, campsData };

const Events = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const upcomingCampsGridRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHoveredIndex((prev) => (prev + 1) % eventsData.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const toggleHidden = () => {
      const hiddenCards = upcomingCampsGridRef.current.querySelectorAll('.upcoming-camp-card.hidden');

      hiddenCards.forEach(card => {
        card.classList.toggle('hidden');
      });
    };

    const handleAnimationIteration = () => {
      toggleHidden();
    };

    upcomingCampsGridRef.current.addEventListener('animationiteration', handleAnimationIteration);

    return () => {
      upcomingCampsGridRef.current.removeEventListener('animationiteration', handleAnimationIteration);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="upcoming-camps-container">
        <h1 className="upcoming-camps-title">Upcoming <span style={{ color: "black" }}> Events</span></h1>

        <div className="upcoming-camps-grid" ref={upcomingCampsGridRef}>
          <AnimatePresence>
            {campsData.map((camp) => (
              <motion.div
                key={camp.id}
                className="upcoming-camp-card"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <h2 className="camp-heading">{camp.heading}</h2>
                <p className="camp-date">Date: {camp.date}</p>
                <p className="camp-location">Location: {camp.location}</p>
                <p className="camp-description">{camp.description}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="events-container">
        <h1 className="events-title">
          NCC Training <span style={{ color: "black" }}>Camps</span>
        </h1>

        <div className="events-grid">
          <AnimatePresence>
            {eventsData.map((event, index) => (
              <motion.div
                key={event.id}
                className={`event-card ${index === hoveredIndex ? "hovered" : ""}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ x: index === hoveredIndex ? 0 : 20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <motion.img
                  src={event.image}
                  alt={`Event ${event.id}`}
                />
                <div className="event-details">
                  <h2 className="event-heading">{event.heading}</h2>
                  <p className="event-date">Date: {event.date}</p>
                  <p className="event-location">Location: {event.location}</p>
                  <button
                    className="view-more-button"
                    onClick={() => {
                      /*const windowWidth = 800;
                      const windowHeight = 800;
                      const left = window.screen.width / 2 - windowWidth / 2;
                      const top = window.screen.height / 2 - windowHeight / 2;
                      const newWindow = window.open("", "_blank", "width=800,height=800");
                      newWindow.document.write("<h1>Event Details</h1>");
                      // Assuming you want to send the first event's details
                      const firstEvent = eventsData[0];
                      newWindow.postMessage(firstEvent, window.location.origin);*/
                    }}
                  >
                    View More
                  </button>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Events;
