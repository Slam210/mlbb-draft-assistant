"use state"
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <div className="hero">
            <div className="background">
                <Image
                    src="/images/homeimg2.jpg"
                    alt="Background home page image - mlbb art"
                    fill
                    priority
                    className="img"
                />
                <div className="overlay" />
            </div>
            <div className="content">
                <h1>Dominate the Battlefield</h1>
                <h2>Craft your winning strategy with our Draft Assistance tool. Analyze team compositions, counter picks, and maximize your chances of victory</h2>
                <Link href="/draft" className="cta">Draft Assistance</Link>
            </div>
        </div>
    );
}
