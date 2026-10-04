/* 

import Link from "next/link";

interface Navitems {
    slug: string,
    title: string,
    topicId: string | null,
    url: string,
    scrapable: boolean
}

const Navbar = async () => {

    const res = await fetch("https://news-api-v2.vercel.app/api/categories");
    const categories = await res.json();
    const data: Navitems[] = categories.data;
    const filteredItems = data.filter((item) => item.scrapable); //get all whose scrapable=true 


    return (
        // <div className="container px-24 mx-auto mt-4 ">

            <div className=" flex justify-center gap-4 mt-5 font-medium">
                <Link href={"/"} className=" hover:bg-blue-400 hover:text-white p-1 rounded">হোম</Link>
                {
                    filteredItems.map((item, index) => (
                        <Link href={item.slug} key={index} className=" hover:bg-green-500 hover:text-white p-1 rounded">{item.title}</Link>
                    ))
                }
            </div>

        // </div>
    );
};

export default Navbar;

*/