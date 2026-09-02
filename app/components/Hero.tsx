
import Image from "next/image";
import Button from "./Button";
import { ArrowRight } from "lucide-react";
import { banksImgs, imageUrls } from "../utils";
import SearchBox from "./SearchBox";

export default function Hero() {
    return (
        <section className="w-full min-h-screen relative flex justify-end pr-80 items-center bg-linear-to-br  from-[#F3F0DF] to-80% to-[#DDE3C1]">

            <div className="w-[900px] h-screen relative ">
                <Image
                    src={'/hero.png'}
                    fill
                    alt="hero-image"
                    className="object-contain object-bottom"
                />
            </div>
            <div className="w-fit absolute top-0 translate-y-[15%] left-0 p-10 ">
                <div className="w-fit uppercase text-xs font-montserrat font-medium text-primary bg-[#b0cca65a] rounded-full px-6 py-2">Your financial growth partner</div>
                <h1 className="font-bricolage text-6xl py-5 font-medium text-primary">
                    Smart choices <br /> today, <span className="text-gold">stronger <br /> tomorrow.</span>
                </h1>
                <div className="w-20 bg-gold h-1 rounded-full mb-5"></div>
                <p className="font-montserrat font-medium text-black/70 pb-5">
                    Explore the best credit cards, loans and financial <br /> products tailored to your needs. <br /> Compare, apply and grow with confidence.
                </p>
                <Button
                    key='explore-product'
                    text="Explore Products"
                    link="#our-products"
                    extraClasses="bg-primary text-white hover:bg-gold transition-all duration-300"
                    icon={<ArrowRight size={20} />}
                />
                <div className="flex items-center gap-3 w-fit rounded-full px-4 py-5 mx-auto md:mx-0 ">
                    <div
                        className="relative flex items-center"
                        style={{ width: `${imageUrls.length * 20 + 20}px`, height: '32px' }}
                    >
                        {imageUrls.map((src, i) => (
                            <div
                                key={i}
                                className="absolute top-0 rounded-full border-2 border-white overflow-hidden"
                                style={{ left: `${i * 20}px`, width: 32, height: 32, zIndex: i }}
                            >
                                <Image
                                    src={src}
                                    alt="Customer avatar"
                                    width={32}
                                    height={32}
                                    className="w-auto h-auto object-cover object-top"
                                />
                            </div>
                        ))}
                        {/* green tick */}
                        <div
                            className="absolute top-1 flex items-center justify-center rounded-full bg-green-500 border-2 border-white"
                            style={{ left: `${imageUrls.length * 20 + 4}px`, width: 18, height: 18, zIndex: imageUrls.length }}
                        >
                            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-black text-xs font-montserrat">Trusted by <span className="text-primary font-bold text-sm">2L+</span> happy customers</p>

                </div>

                <div className="w-100 h-fit">
                    <SearchBox />
                </div>
            </div>

            <div className="w-full absolute bottom-0 left-0 flex justify-end px-10  -translate-y-5  z-10 ">
                <div className="bg-white/50 shadow-lg px-10 py-4 rounded-xl">
                    <h4 className="text-center text-primary font-montserrat text-sm font-medium  pb-2">Our Banking Partners</h4>
                    <div className="flex gap-5">
                        {banksImgs.map((src) => (
                            <Image
                                key={src.split('.')[0]}
                                src={src}
                                alt='bank-logos'
                                width={80}
                                height={40}
                                className="object-cover w-30 h-15"
                            />
                        ))}
                    </div>
                    
                </div>
            </div>
        </section>
    )
}