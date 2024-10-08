"use client";

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {useEffect, useLayoutEffect, useState} from 'react';
import Header from "@/app/components/Header";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import ProjectCard from "@/app/components/ProjectCard";
import SkillCard from "@/app/components/SkillCard";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const [skillsData, setSkillsData] = useState([]);
    const [skillsBisData, setSkillsBisData] = useState([]);
    const [projects, setProjects] = useState([]);
    const [skillsLoaded, setSkillsLoaded] = useState(false);
    const [skillsBisLoaded, setSkillsBisLoaded] = useState(false);


    useEffect(() => {
        const fetchSkills = async () => {
            const response = await fetch('/data/skills.json');
            const data = await response.json();
            setSkillsData(data);
            setSkillsLoaded(true);
        };

        const fetchSkillsBis = async () => {
            const response = await fetch('/data/skills_bis.json');
            const data = await response.json();
            setSkillsBisData(data);
            setSkillsBisLoaded(true);
        };

        const fetchProjects = async () => {
            const response = await fetch('/data/projects.json');
            const data = await response.json();
            setProjects(data);
        };

        fetchSkills();
        fetchSkillsBis();
        fetchProjects();

        gsap.fromTo(".about-image.hidden-on-load",
            { opacity: 0, x: -100 },
            { opacity: 1, x: 0, duration: 1.5, ease: "power3.out", onStart: function() {
                document.querySelector(".about-image").classList.remove("hidden-on-load");
            }}
        );

        gsap.fromTo(".about-text.hidden-on-load > *",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", stagger: 0.3, onStart: function() {
                document.querySelector(".about-text").classList.remove("hidden-on-load");
            }}
        );
    }, []);

    useEffect(() => {
        gsap.fromTo(".projects-title",
            { opacity: 0, y: -20 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: "#projets",
                    start: "top 80%",
                    end: "top 60%",
                    toggleActions: "play none none reverse"
                }
            }
        );
        if (projects.length > 0) {
            gsap.utils.toArray('.project-card').forEach((card, index) => {
                gsap.fromTo(card,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            toggleActions: "play none none reverse",
                        }
                    }
                );
            });
        }
    }, [projects]);

    useLayoutEffect(() => {
        if (!skillsLoaded) return;
        if (!skillsBisLoaded) return;

        const titles = document.querySelectorAll('.skills-title');
        titles.forEach(title => {
            title.style.opacity = '0';
            title.style.transform = 'translateY(-20px)';
        });

        gsap.fromTo(".skills-title",
            { opacity: 0, y: -20 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".skills-title",
                    start: "top 80%",
                    end: "top 60%",
                    toggleActions: "play none none reverse"
                }
            }
        );
        if (skillsData.length > 0 || skillsBisData.length > 0) {
            const skillCards = gsap.utils.toArray('.skill-card');

            gsap.fromTo(skillCards,
                { opacity: 0, y: -50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".skills-content",
                        start: "top 80%",
                        end: "top 40%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        }
    }, [skillsLoaded, skillsBisLoaded]);

    const slides = [
        { text: "Web Developer", imgSrc: "/images/swiper_star.svg" },
        { text: "Mobile App Developer", imgSrc: "/images/swiper_star.svg" },
        { text: "Front-end developer", imgSrc: "/images/swiper_star.svg" },
        { text: "Creative Developer", imgSrc: "/images/swiper_star.svg" },
    ];

    const numOfSlides = 12;

    return (
        <main>
            <Header background={"blue-pattern"} />
            <section id="a_propos" className="about-section lg:h-[95vh] flex justify-center items-center px-14 lg:px-0 pt-[152px] gap-8 bg-blue-pattern">
                <div className="flex flex-col-reverse lg:flex-row gap-8">
                    <div className="about-image hidden-on-load relative flex justify-center lg:block pt-12 lg:pt-0 pb-32 lg:pb-0 ml-0 lg:ml-40">
                        <Image className="rounded-3xl" src="/images/julie.webp" width={327} height={432} alt="Julie Van Houdenhove" />
                        <Image className="absolute bottom-[60px] -left-12 lg:bottom-8 lg:-left-1/2" src="/images/old_pc_side.gif" width={306} height={206} alt="un vieux PC en 3D" />
                    </div>
                    <div className="about-text hidden-on-load flex flex-col gap-6 items-start text-white">
                        <h1 className="font-yipes text-xl lg:text-2xl">Julie <br />Van Houdenhove</h1>
                        <div className="flex flex-col gap-4">
                            <h2 className="text-sm lg:text-md font-medium">Développeuse web</h2>
                            <p className="text-2xs lg:text-xs max-w-[739px]">Étudiante en développement web, je suis aussi développeuse frontend en alternance. J’aime relever des défis techniques et donner vie à des projets web à la fois élégants et fonctionnels.</p>
                        </div>
                        <Link target="_blank" href="/pdf/CV_Julie_VAN_HOUDENHOVE.pdf" className="about-text hidden-on-load font-bold text-2xs lg:text-xs underline hover:opacity-70 transition flex gap-2">Téléchargez mon CV sans hésiter !<Image src="/images/open_in_new_white.svg" width={24} height={24} alt="Icône d'ouverture dans un nouvel onglet" /></Link>
                        <div className="about-text hidden-on-load flex gap-4">
                            <img src="/images/computer.svg" className="w-[55px] sm:w-full" alt="Icône d'ordinateur" />
                            <img src="/images/laptop.svg" className="w-[55px] sm:w-full" alt="Icône d'ordinateur portable" />
                            <img src="/images/phone.svg" className="w-[55px] sm:w-full" alt="Icône de smartphone" />
                            <img src="/images/tablet.svg" className="w-[55px] sm:w-full" alt="Icône de tablette" />
                        </div>
                    </div>
                </div>
            </section>
            <section id="a_propos">
                <div className="slider-home">
                    <div className="slide-track">
                        {Array.from({ length: numOfSlides }).map((_, index) => {
                            const slide = slides[index % slides.length];
                            return (
                                <div className="slide" key={index}>
                                    <img className="p-2" src={slide.imgSrc} alt="étoile" />
                                    <p className="font-yipes font-sm px-6 py-1 text-white">{slide.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <section id="projets" className="flex flex-col items-center bg-cream">
                <h2 className="projects-title hidden-on-load font-yipes text-xl lg:text-2xl py-16 lg:py-36">Projets</h2>
                {projects.length > 0 ? (
                    projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} id={index + 1} className="project-card hidden-on-load" />
                    ))
                ) : (
                    <p>Loading projects...</p>
                )}
                <div className="h-16 lg:h-40 w-full border-t border-dark project-card hidden-on-load"></div>
            </section>
            <section id="competences" className="flex flex-col items-center bg-blue-pattern">
                <h2 className="skills-title hidden-on-load font-yipes text-xl lg:text-2xl text-white pt-16 lg:pt-36">Compétences</h2>
                <div className="skills-content flex flex-col items-center lg:pt-16 lg:pb-16 px-16 lg:px-32">
                    <main className="w-full grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 flex-wrap py-16 gap-9">
                        {skillsData.map((skill) => (
                            <SkillCard key={skill.name} skill={skill} className="skill-card hidden-on-load" />
                        ))}
                    </main>
                    <div className="border-t border-white w-full skill-card"></div>
                    <main className="w-full grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 py-16 gap-9">
                        {skillsBisData.map((skill) => (
                            <SkillCard key={skill.name} skill={skill} className="skill-card hidden-on-load" />
                        ))}
                    </main>
                </div>
            </section>
            <section id="contact">
                <Footer />
            </section>
        </main>
    );
}
