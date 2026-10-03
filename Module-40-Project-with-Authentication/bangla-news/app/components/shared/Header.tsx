import Image from "next/image";
import logo from "@/public/logo.webp"

const Header = () => {
    const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" })

    return (
        <div className="px-24 flex justify-between items-center mt-5">

            <div className="flex gap-3 max-width-6xl mx-auto ">
                <Image src={logo} alt="logo" width={50} height={50}></Image>

                <div className="space-y-1">
                    <h1 className="text-red-700 font-bold text-2xl ">Bangla News 24</h1>
                    <p className="text-gray-600 text-xs">{date}</p>

                </div>
            </div>
            <div className="flex gap-2">

                <button className="btn ">সাইন ইন</button>
                <button className="btn bg-red-700 text-white">সাইন আপ</button>

            </div>



        </div>
    );
};

export default Header;