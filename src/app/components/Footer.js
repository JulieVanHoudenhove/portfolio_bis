"use client";

import Image from 'next/image';
import Link from "next/link";

const Footer = () => {
    const slides = [
        { text: "Disponible pour du freelance", imgSrc: "/images/swiper_star.svg" },
    ];

    const numOfSlides = 12;

    return (
        <>
            <div className="slider">
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
            <footer id="footer" className="flex flex-col items-center bg-cream">
                <h2 className="font-yipes text-xl lg:text-2xl px-16 lg:px-32 py-16 lg:py-32 text-center">Comment puis-je vous aider ?</h2>
                <div className="flex flex-col gap-4 items-start w-full px-16 lg:px-32 pb-20">
                    <p className="text-2xs lg:text-xs max-w-[739px]">Prête à vous accompagner dans vos projets web ! Si vous avez des questions ou souhaitez discuter, contactez-moi par email ou via mes réseaux sociaux.</p>
                    <Link href="mailto:julie.vanhoudenhove@gmail.com" className="font-bold text-xs underline hover:opacity-70 transition flex gap-2">Écrivez-moi un email !<Image src="/images/open_in_new.svg" width={24} height={24} alt="Icône d'ouverture dans un nouvel onglet" /></Link>
                </div>
                <div className="w-full border-t border-dark"></div>
                <div className="w-full grid grid-cols-12 justify-items-center lg:justify-items-start items-center gap-4 px-16 lg:px-32 py-14">
                    <p className="text-xs col-span-12 lg:col-span-5">© Julie VH - 2024</p>
                    <Link className="col-span-12 lg:col-span-2 justify-self-center" href="/"><Image height={62} width={42} src="/images/double_stars.svg" alt="deux étoiles" /></Link>
                    <div className="text-xs col-span-12 lg:col-span-5 lg:justify-end flex flex-col items-center lg:flex-row gap-2 w-full">
                        <Link href="/mentions-legales" className="font-bold text-xs underline hover:opacity-70 transition"><h2>Mentions Légales</h2></Link>
                        <p className="hidden lg:block">-</p>
                        <Link href="/plan-du-site" className="font-bold text-xs underline hover:opacity-70 transition"><h2>Plan du site</h2></Link>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
