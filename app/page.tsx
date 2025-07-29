"use client";
import { useRef, useEffect, useState } from 'react';
import Image from "next/image";
import RotatingText from "./components/RotatingText/RotatingText";
import Lanyard from './components/Lanyard/Lanyard';
// import SplitText from "./components/SplitText/SplitText";
import BlurText from "./components/BlurText/BlurText";
import StarBorder from "./components/StarBorder/StarBorder";
import DarkVeil from './components/DarkVeil/DarkVeil';
// import TiltedCard from "./components/TiltedCard/TiltedCard";
// import GlassIcons from "./components/GlassIcons/GlassIcons";
import ScrollFloat from "./components/ScrollFloat/ScrollFloat";
import SpotlightCard from "./components/SpotlightCard/SpotlightCard";
import Beams from "./components/Beams/Beams";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";

import {
  SiLaravel,
  SiTailwindcss,
  SiVuedotjs,
  SiReact,
  SiFigma,
  SiNextdotjs,
  SiPhp,
  SiJavascript,
  SiTypescript,
  SiMysql,
  SiMongodb,
  SiGit,
  SiGithub,
} from 'react-icons/si';
import { FaPalette, FaCode, FaLaptopCode, FaExternalLinkAlt } from "react-icons/fa";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import * as THREE from 'three';


// 3D Floating Laptop Component
const FloatingLaptop = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.set(0, 2, 6);

    // Resize handler
    const resizeRenderer = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resizeRenderer();
    window.addEventListener('resize', resizeRenderer);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // Laptop Group
    const laptopGroup = new THREE.Group();

    // Base (Keyboard area)
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.4, roughness: 0.5 });
    const base = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.2, 2.2), baseMaterial);
    laptopGroup.add(base);

    // Keyboard
    const keyboard = new THREE.Mesh(
      new THREE.PlaneGeometry(2.6, 1.6),
      new THREE.MeshStandardMaterial({ color: 0x222222 })
    );
    keyboard.position.set(0, 0.11, 0.05);
    keyboard.rotation.x = -Math.PI / 2;
    laptopGroup.add(keyboard);

    // Screen frame
    const screenFrame = new THREE.Mesh(
      new THREE.BoxGeometry(3, 2, 0.1),
      new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.6, roughness: 0.4 })
    );
    screenFrame.position.set(0, 1.2, -1.05);
    screenFrame.rotation.x = -0.4;
    laptopGroup.add(screenFrame);

    // Screen (glow or content)
    const screenContent = new THREE.Mesh(
      new THREE.PlaneGeometry(2.6, 1.6),
      new THREE.MeshBasicMaterial({ color: 0x00ffff, opacity: 0.7, transparent: true })
    );
    screenContent.position.set(0, 1.2, -1.0);
    screenContent.rotation.x = -0.4;
    laptopGroup.add(screenContent);

    // Shadow plane (ground)
    const shadowPlane = new THREE.Mesh(
      new THREE.CircleGeometry(5, 32),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.2 })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.1;
    scene.add(shadowPlane);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < posArray.length; i++) {
      posArray[i] = (Math.random() - 0.5) * 12;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({ size: 0.05, color: 0x00ffff, transparent: true, opacity: 0.6 })
    );
    scene.add(particles);

    scene.add(laptopGroup);

    // Animate
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;
      laptopGroup.rotation.y = Math.sin(t * 0.4) * 0.4;
      laptopGroup.position.y = Math.sin(t * 0.8) * 0.15;
      screenContent.material.opacity = 0.5 + Math.sin(t * 2) * 0.3;
      particles.rotation.y = t * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resizeRenderer);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[320px] sm:h-[400px] md:h-[480px] lg:h-[520px]"
    />
  );
};


const items = [
  {
    icon: <SiLaravel className="text-red-500" size={24} />,
    label: 'Laravel',
    onClick: () => window.open('https://laravel.com', '_blank'),
  },
  {
    icon: <SiTailwindcss className="text-cyan-400" size={24} />,
    label: 'Tailwind',
    onClick: () => window.open('https://tailwindcss.com', '_blank'),
  },
  {
    icon: <SiVuedotjs className="text-green-400" size={24} />,
    label: 'Vue',
    onClick: () => window.open('https://vuejs.org', '_blank'),
  },
  {
    icon: <SiReact className="text-blue-400" size={24} />,
    label: 'React',
    onClick: () => window.open('https://react.dev', '_blank'),
  },
  {
    icon: <SiFigma className="text-purple-400" size={24} />,
    label: 'Figma',
    onClick: () => window.open('https://figma.com', '_blank'),
  },
  {
    icon: <SiNextdotjs className="text-white" size={24} />,
    label: 'Next.js',
    onClick: () => window.open('https://nextjs.org', '_blank'),
  },
  {
    icon: <SiPhp className="text-indigo-500" size={24} />,
    label: 'PHP',
    onClick: () => window.open('https://www.php.net', '_blank'),
  },
  {
    icon: <SiJavascript className="text-yellow-400" size={24} />,
    label: 'JavaScript',
    onClick: () => window.open('https://developer.mozilla.org/en-US/docs/Web/JavaScript', '_blank'),
  },
  {
    icon: <SiTypescript className="text-blue-500" size={24} />,
    label: 'TypeScript',
    onClick: () => window.open('https://www.typescriptlang.org', '_blank'),
  },
  {
    icon: <SiMysql className="text-orange-600" size={24} />,
    label: 'MySQL',
    onClick: () => window.open('https://www.mysql.com', '_blank'),
  },
  {
    icon: <SiMongodb className="text-green-600" size={24} />,
    label: 'MongoDB',
    onClick: () => window.open('https://www.mongodb.com', '_blank'),
  },
  {
    icon: <SiGit className="text-orange-500" size={24} />,
    label: 'Git',
    onClick: () => window.open('https://git-scm.com', '_blank'),
  },
  {
    icon: <SiGithub className="text-white" size={24} />,
    label: 'GitHub',
    onClick: () => window.open('https://github.com', '_blank'),
  },
];


const projects = [
  {
    title: "CMS Galeri Foto & Video",
    description: "Modern content management system for photo and video galleries with intuitive admin interface and responsive design.",
    image: "/assets/projects/project1.png",
    link: "http://kizarukaede.indonesiacentral.cloudapp.azure.com",
    tech: ["Laravel", "MySQL", "Bootstrap", "JavaScript"],
    type: "website"
  },
  {
    title: "PKKMB SV UNS 2024",
    description: "Official website for student orientation program featuring interactive timeline, registration system, and event management.",
    image: "/assets/projects/project2.png",
    link: "https://pkkmb-sv-uns.vercel.app/",
    tech: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    type: "website"
  },
  {
    title: "Bootcamp Management System",
    description: "Comprehensive learning management platform with course tracking, progress monitoring, and certification features.",
    image: "/assets/projects/project3.png",
    link: "https://sistemfinalproject-michael.vercel.app/",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    type: "website"
  },
  {
    title: "Perpustakaan Online",
    description: "Digital library system with book catalog, borrowing management, and user authentication for seamless library operations.",
    image: "/assets/projects/project4.png",
    link: "https://github.com/WageAriel/sipukon-laravel.git",
    tech: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    type: "code"
  }
];

const services = [
  {
    icon: <FaPalette className="text-cyan-400 text-6xl group-hover:text-cyan-300 transition-colors duration-300" />,
    title: "Web Designer",
    description: "Creating visually stunning and user-friendly interfaces with modern design principles and tools.",
    features: ["UI/UX Design", "Responsive Design", "Prototyping", "Brand Identity"]
  },
  {
    icon: <FaCode className="text-blue-400 text-6xl group-hover:text-blue-300 transition-colors duration-300" />,
    title: "Frontend Developer",
    description: "Building responsive and interactive user experiences using cutting-edge JavaScript frameworks.",
    features: ["React Development", "Vue.js", "TypeScript", "Performance Optimization"]
  },
  {
    icon: <FaLaptopCode className="text-green-400 text-6xl group-hover:text-green-300 transition-colors duration-300" />,
    title: "Full Stack Developer",
    description: "Developing complete web applications with both frontend and backend expertise.",
    features: ["API Development", "Database Design", "Cloud Deployment", "System Architecture"]
  }
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black">
      <Navbar />

      {/* Background Beams */}
      <div className="fixed right-0 top-0 left-0 bottom-0 h-full w-full z-0 pointer-events-none">
        <DarkVeil />
      </div>

      {/* Hero Section */}
      <section id="home" className="relative z-10 min-h-screen flex items-center justify-center pt-20">
        <div className="flex items-center justify-center w-full h-full">
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center text-center space-y-10">
              
              {/* Rotating Badge */}
              <Fade delay={200} triggerOnce>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    Ready for Job in
                  </span>
                  <RotatingText 
                    texts={['Web Design', 'Frontend Dev', 'UI/UX Design', 'React Dev']}
                    mainClassName="px-4 py-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-black rounded-xl text-lg sm:text-xl lg:text-2xl font-bold shadow-md"
                    staggerFrom="last" 
                    staggerDuration={0.025} 
                    initial={{ y: '100%', opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }} 
                    rotationInterval={3000} 
                  />
                </div>
              </Fade>

              {/* Headline + Subheadline */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-500 drop-shadow-md">
                  Hello, I'm Michael
                </h1>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-300">
                  Web Designer & Frontend Developer
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full mx-auto mt-2" />
              </div>

              {/* Description */}
              <BlurText
                text="I'm a passionate fresh graduate specializing in modern web development. With expertise in React, Vue.js, and Laravel, I create stunning, responsive websites that deliver exceptional user experiences. Let's build something amazing together!"
                delay={100}
                animateBy="words"
                direction="top"
                className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl leading-relaxed"
              />

              {/* CTA Buttons */}
              <Fade delay={800} triggerOnce>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <a href="/MICHAEL_JAMIE_CV.pdf" target="_blank" rel="noopener noreferrer">
                    <StarBorder 
                      className="hover:scale-105 transition-transform duration-300" 
                      color="cyan" 
                      speed="3s"
                    >
                      <span className="flex items-center gap-2">
                        Download CV
                        <FaExternalLinkAlt className="text-sm" />
                      </span>
                    </StarBorder>
                  </a>
                  <a 
                    href="#contact"
                    className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 rounded-xl font-semibold hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:scale-105"
                  >
                    Let's Talk
                  </a>
                </div>
              </Fade>

              {/* Tech Stack */}
              <Fade delay={1000} triggerOnce>
                <div className="text-center space-y-8 mt-12">
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-3">
                      <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400/50"></div>
                      <p className="text-sm text-cyan-400 font-semibold uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                        Tech Stack
                      </p>
                      <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400/50"></div>
                    </div>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto">
                      Technologies I work with to create amazing experiences
                    </p>
                  </div>
                  
                  {/* Linear tech stack layout */}
                  <div className="flex flex-wrap justify-center items-center gap-4 max-w-4xl mx-auto px-4">
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className="group relative"
                      >
                        {/* Animated glow background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md scale-110"></div>
                        
                        <button
                          onClick={item.onClick}
                          className="relative flex items-center gap-3 px-5 py-3 bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl hover:border-cyan-400/40 hover:bg-gray-800/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20 group"
                        >
                          {/* Icon container */}
                          <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-blue-600/30 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative p-2 bg-gray-800/60 border border-gray-700/60 rounded-lg group-hover:border-cyan-400/60 group-hover:bg-gray-700/60 transition-all duration-500">
                              <div className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                                {item.icon}
                              </div>
                            </div>
                          </div>
                          
                          {/* Label */}
                          <span className="text-sm font-medium text-gray-300 group-hover:text-cyan-200 transition-all duration-500 whitespace-nowrap">
                            {item.label}
                          </span>
                          
                          {/* Hover gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* Shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out rounded-xl"></div>
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className="flex justify-center mt-8">
                    <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-20 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="space-y-4">
            {/* Title with decorative elements */}
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400/50"></div>
              <p className="text-sm text-cyan-400 font-semibold uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                My Projects
              </p>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400/50"></div>
            </div>
            
            {/* Main heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-white mb-4">
              Latest Work & Projects
            </h2>
            
            {/* Description */}
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Showcasing my latest work in web development and design, 
              featuring modern technologies and creative solutions
            </p>
          </div>
        </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Fade key={index} delay={200 * index} triggerOnce>
                <SpotlightCard 
                  className="group hover:scale-[1.02] transition-all duration-500" 
                  spotlightColor="rgba(0, 229, 255, 0.15)"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700">
                    
                    {/* Project Image */}
                    <div className="relative overflow-hidden">
                      <Image 
                        src={project.image} 
                        alt={project.title} 
                        width={600} 
                        height={400}
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    {/* Project Info */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                          {project.title}
                        </h3>
                        <div className="flex gap-2">
                          {project.tech.slice(0, 2).map((tech, i) => (
                            <span key={i} className="px-2 py-1 bg-cyan-400/20 text-cyan-400 text-xs rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-gray-300 leading-relaxed">
                        {project.description}
                      </p>
                      
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-lg border border-gray-600">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {/* Action Button */}
                      <div className="pt-4">
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold rounded-xl hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25"
                        >
                          {project.type === 'code' ? 'View Code' : 'Live Demo'}
                          <FaExternalLinkAlt className="text-sm" />
                        </a>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 py-20 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400/50"></div>
              <p className="text-sm text-cyan-400 font-semibold uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
               Services
              </p>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400/50"></div>
            </div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive web development solutions tailored to your needs
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Slide key={index} direction="up" delay={200 * index} triggerOnce>
                <div className="group relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105">
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-center space-y-6">
                    <div className="flex justify-center mb-6">
                      {service.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-300 leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Features List */}
                    <div className="grid grid-cols-2 gap-2 pt-4">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                          <span className="text-sm text-gray-400">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Slide>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10">
        <Footer />
      </section>
    </div>
  );
}