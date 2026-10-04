
import Link from "next/link";

interface MostReads{
    id:string,
    title:string,
}

const MostRead = async() => {

    const response = await fetch("https://news-api-v2.vercel.app/api/news/most-read");
    const newsdata = await response.json();
    const mostreads:MostReads[] = newsdata.data;


    return (
        <div className="card bg-base-100 shadow-sm hover:shadow-md transition space-y-3 p-3">
            <h1 className="mb-3 text-lg font-bold text-neutral-900">সর্বাধিক পঠিত</h1>

            <div className="space-y-3">
                {
                    mostreads.map((most,index)=>(
                        <Link key={most.id}  href={"/article/ckqxnrwx10ydt"}   className="flex gap-3 group ">
                            <p className="text-xl font-bold text-red-700/70 group-hover:text-red-700">{index+1}</p>
                            <h1 className="font-semibold text-sm leading-snug text-neutral-900 group-hover:text-red-700" > {most.title} </h1>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default MostRead;