"use client"
import 'swiper/css'
import 'swiper/css/effect-cards'
import { Swiper, SwiperSlide } from "swiper/react";
import { BackgroundRadialRight } from "../BackgroundRadialRight";
import { MotionTransition } from "../MotionTransition";
import { Reveal } from "../Reveal";
import { Controller  } from "swiper/modules";
import { dataCards } from "./ChooseYourCards.data";
import Image from "next/image";

export function ChooseYourCards() {
    return (
        <div className="relative px-6 py-20 md:py-64" id="carros">
            <BackgroundRadialRight />
            <div className="block max-w-5xl mx-auto md:grid md:grid-cols-2">
                <Reveal>
                    <h2 className="text-5xl font-semibold">Elige el automobil que más
                        <span className="block degradedBlue bg-blueLight">se adapta a tus necesidades</span>
                    </h2>
                </Reveal>
                <div className="px-5">
                    <MotionTransition>
                        <Swiper
                            effect={"Fade"}
                            grabCursor={true}
                            modules={[Controller ]}
                        >
                            {dataCards.map(({ image, id }) => (
                                <SwiperSlide key={id}>
                                    <Image src={image} alt="car Card" width="400" height="300" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </MotionTransition>
                </div>
            </div>
        </div>
    )
}
