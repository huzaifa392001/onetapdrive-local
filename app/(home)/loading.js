import Image from "next/image";

export default function Loading() {
    return (
        <div className="loading-popup">
            <Image src={'/images/logo.webp'} width={450} height={100} alt="OneTap Logo" />
        </div>
    )
}
