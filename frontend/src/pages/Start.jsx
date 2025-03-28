/*import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
return (
    <div>
        <div className='bg-cover bg-center bg-[url(https://i.pinimg.com/736x/d5/8d/65/d58d65b1d8fd366d6d4ba7fe81af4194.jpg)] h-screen pt-8 flex justify-between flex-col w-full'>
            <img className='w-16 ml-8 invert' src="https://d2az9qivg16qd4.cloudfront.net/s3fs-public/Uber_Logo_Black_CMYK_Logo.png"></img>
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'>Get Started with Mr.Parker</h2>
                <Link to='/user-login' className=' flex items-center justify-center w-full bg-black text-white py-3 rounded-xl mt-4'>Continue</Link>
            </div>
        </div>
    </div>
)
}

export default Start
*/

import React from 'react'
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom";
import GettingStartedImage from "../assets/gettingstarted.jpg";
import Locationimg from "../assets/india.jpg";
import Getstarted from "../assets/getstarted.jpg";
import Securityimg from "../assets/sec.jpg";
import Welcomeimg from "../assets/wel.jpg";


export default function LandingPage() {
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [letterIndex, setLetterIndex] = useState(0)
  const [animationComplete, setAnimationComplete] = useState(false)
  const appName = "Mr.Parker"

  // Slides content
  const slides = [
    {
      title: "Welcome to Mr.Parker",
      description: "A parking management system that connects users with parking assistants.",
      style: { 
        backgroundImage: `url(${Welcomeimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        paddingTop: "2rem",
      },
      textStyle: {
        position: "absolute",
        top:'-13%',
        left: "5%",
        textAlign: "left",
      },
      animation: "fade-right",
    },
    {
      title: "Real-Time Parking",
      description: "Create parking requests, confirm parks, and complete handovers with real-time updates.",
      style: { 
        backgroundImage: `url(${GettingStartedImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        paddingTop: "2rem",
      },
      textStyle: {
        position: "absolute",
        top:'30%',
        right: "5%",
        textAlign: "right",
      },
      animation: "fade-left",
    },
    {
      title: "Location Services",
      description: "Leveraging Location Maps for geocoding, distance calculation, and location suggestions.",
      style: { 
        backgroundImage: `url(${Locationimg})`,
        backgroundSize: "115% 120%",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        paddingTop: "2rem",
        overflow: "hidden",
      },
      textStyle: {
        position: "absolute",
        top:'7%',
        right: "5%",
        textAlign: "right",
      },
      animation: "fade-up",
    },
    {
      title: "Secure Authentication",
      description: "JWT-based authentication with token blacklisting for secure user management.",
      style: { 
        backgroundImage: `url(${Securityimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        paddingTop: "2rem",
      },
      animation: "fade-down",
    },
    {
      title: "Get Started Today",
      description: "Join Mr.Parker and experience hassle-free parking management.",
      style: { 
        backgroundImage: `url(${Getstarted})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        paddingTop: "2rem",
      },
      animation: "zoom",
    },
  ]

  // Handle intro animation
  useEffect(() => {
    if (letterIndex < appName.length) {
      const timer = setTimeout(() => {
        setLetterIndex(letterIndex + 1)
      }, 30)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setAnimationComplete(true)
        setTimeout(() => {
          setLoading(false)
        })
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [letterIndex])

  // Auto-slide functionality
  useEffect(() => {
    if (!loading) {
      const interval = setInterval(() => {
        if (currentSlide < slides.length - 1) {
          setCurrentSlide(currentSlide + 1)
        }
      }, 8000)
      return () => clearInterval(interval)
    }
  }, [currentSlide, loading, slides.length])

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const getAnimationVariant = (animation) => {
    switch (animation) {
      case "fade-right":
        return {
          hidden: { opacity: 0, x: 100 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
        }
      case "fade-left":
        return {
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
        }
      case "fade-up":
        return {
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }
      case "fade-down":
        return {
          hidden: { opacity: 0, y: -100 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }
      case "zoom":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
        }
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.8 } },
        }
    }
  }

  return (
    <div className="bg-white text-white min-h-screen overflow-hidden">
      {loading ? (
        <div className="flex items-center justify-center h-screen bg-white">
          <AnimatePresence>
            {!animationComplete ? (
              <motion.div
                className="text-5xl md:text-7xl font-bold text-center quicksand"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  x: "-45vw",
                  y: "-40vh",
                  scale: 0.5,
                  transition: { duration: 40 },
                }}
              >
                {appName.split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={index <= letterIndex ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    className="inline-block text-black"
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="absolute top-4 left-4 text-xl  flex items-center "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="mr-2">Mr.Parker</span>
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
      ) : (
        <div className="relative h-screen font-mono">
          
          <motion.div
            className="absolute top-4 left-4 z-50 text-xl font-bold flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="mr-2 quicksand">Mr.Parker</span>
          </motion.div>

          
          <div className="h-full relative overflow-hidden">
            {slides.map((slide, index) => (
              <motion.div
                key={index}
                className={`absolute inset-0 h-full w-full flex flex-col items-center justify-center px-6 ${
                  index === currentSlide ? "z-10" : "z-0"
                }`}
                initial="hidden"
                animate={index === currentSlide ? "visible" : "hidden"}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                transition={{ duration: 0.5 }}
                style={slide.style || {}}
              >
                
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-b ${slide.bgColor}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  
                  <div className="absolute inset-0 overflow-hidden">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/5"
                        style={{
                          width: Math.random() * 300 + 50,
                          height: Math.random() * 300 + 50,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: 0.1,
                          scale: 1,
                          x: Math.random() * 100 - 50,
                          y: Math.random() * 100 - 50,
                        }}
                        transition={{
                          duration: Math.random() * 10 + 10,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>

                
                <motion.div style={slide.textStyle || {}}  className=" z-10 max-w-3xl mt-56 " variants={getAnimationVariant(slide.animation)}>
                  <h2 className="text-3xl md:text-5xl font-bold ">{slide.title}</h2>
                  <p className="text-lg md:text-xl text-white-300 mb-8">{slide.description}</p>

                  {index === slides.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className='mt-80 ml-3 font-bold'
                    >
                      <Link
                        to="/user-login"
                        className="font-bold inline-block font-Roboto bg-white text-black  py-4 px-4 rounded-xl text-xl transition-transform hover:scale-105"
                      >
                        Get Started with Mr.Parker
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          
          <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? "bg-white w-6" : "bg-white/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          
          {currentSlide > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {currentSlide < slides.length - 1 && (
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}


{/*
import React from 'react';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ParkingSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const appName = "Mr.Parker";

  // Slides content
  const slides = [
    {
      title: "Welcome to Mr.Parker",
      description: "A parking management system that connects users with parking assistants.",
      bgColor: "from-purple-900 to-black",
      animation: "fade-right",
    },
    {
      title: "Real-Time Parking",
      description: "Create parking requests, confirm parks, and complete handovers with real-time updates.",
      bgColor: "from-blue-900 to-black",
      animation: "fade-left",
    },
    {
      title: "Location Services",
      description: "Leveraging Google Maps for geocoding, distance calculation, and location suggestions.",
      bgColor: "from-indigo-900 to-black",
      animation: "fade-up",
    },
    {
      title: "Secure Authentication",
      description: "JWT-based authentication with token blacklisting for secure user management.",
      bgColor: "from-violet-900 to-black",
      animation: "fade-down",
    },
    {
      title: "Get Started Today",
      description: "Join Mr.Parker and experience hassle-free parking management.",
      bgColor: "from-fuchsia-900 to-black",
      animation: "zoom",
    },
  ];

  // Handle intro animation
  useEffect(() => {
    if (letterIndex < appName.length) {
      const timer = setTimeout(() => {
        setLetterIndex(letterIndex + 1);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setAnimationComplete(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [letterIndex]);

  // Auto-slide functionality
  useEffect(() => {
    if (!loading) {
      const interval = setInterval(() => {
        if (currentSlide < slides.length - 1) {
          setCurrentSlide(currentSlide + 1);
        }
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [currentSlide, loading, slides.length]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const getAnimationVariant = (animation) => {
    switch (animation) {
      case "fade-right":
        return {
          hidden: { opacity: 0, x: 100 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
        };
      case "fade-left":
        return {
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
        };
      case "fade-up":
        return {
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        };
      case "fade-down":
        return {
          hidden: { opacity: 0, y: -100 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        };
      case "zoom":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.8 } },
        };
    }
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
      {loading ? (
        <div className="flex items-center justify-center h-screen bg-black">
          <AnimatePresence>
            {!animationComplete ? (
              <div className="relative flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    duration: 1.5
                  }}
                  className="mb-16"
                >
                  <ParkingSquare size={96} className="text-blue-500" />
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(59, 130, 246, 0.5)",
                        "0 0 40px rgba(59, 130, 246, 0.3)",
                        "0 0 20px rgba(59, 130, 246, 0.5)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
                
                <motion.div
                  className="text-6xl md:text-8xl font-bold tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  {appName.split("").map((letter, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={index <= letterIndex ? {
                        opacity: 1,
                        y: 0,
                        color: letter === "M" || letter === "P" ? "#3B82F6" : "#FFFFFF"
                      } : { opacity: 0, y: 20 }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: [0.43, 0.13, 0.23, 0.96]
                      }}
                      className="inline-block relative"
                    >
                      {letter}
                      {(letter === "M" || letter === "P") && (
                        <motion.div
                          className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-300"
                          initial={{ scaleX: 0 }}
                          animate={index <= letterIndex ? { scaleX: 1 } : { scaleX: 0 }}
                          transition={{
                            duration: 0.8,
                            delay: index * 0.1 + 0.3,
                            ease: [0.43, 0.13, 0.23, 0.96]
                          }}
                        />
                      )}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            ) : (
              <motion.div
                className="absolute top-4 left-4 text-xl font-bold flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
              >
                <ParkingSquare className="text-blue-500" />
                <span className="font-mono">Mr.Parker</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="relative h-screen">
          <motion.div
            className="absolute top-4 left-4 z-50 text-xl font-bold flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ParkingSquare className="text-blue-500" />
            <span className="font-mono">Mr.Parker</span>
          </motion.div>

          <div className="h-full relative overflow-hidden">
            {slides.map((slide, index) => (
              <motion.div
                key={index}
                className={`absolute inset-0 h-full w-full flex flex-col items-center justify-center px-6 ${
                  index === currentSlide ? "z-10" : "z-0"
                }`}
                initial="hidden"
                animate={index === currentSlide ? "visible" : "hidden"}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-b ${slide.bgColor}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/5"
                        style={{
                          width: Math.random() * 300 + 50,
                          height: Math.random() * 300 + 50,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: 0.1,
                          scale: 1,
                          x: Math.random() * 100 - 50,
                          y: Math.random() * 100 - 50,
                        }}
                        transition={{
                          duration: Math.random() * 10 + 10,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>

                <motion.div className="z-10 max-w-3xl text-center" variants={getAnimationVariant(slide.animation)}>
                  <h2 className="text-3xl md:text-5xl font-bold mb-6">{slide.title}</h2>
                  <p className="text-lg md:text-xl text-gray-300 mb-8">{slide.description}</p>

                  {index === slides.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <Link
                        to="/user-login"
                        className="inline-block bg-blue-500 text-white font-bold py-4 px-8 rounded-xl text-lg transition-transform hover:scale-105 hover:bg-blue-600"
                      >
                        Get Started with Mr.Parker
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? "bg-blue-500 w-6" : "bg-white/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {currentSlide > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {currentSlide < slides.length - 1 && (
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

*/}