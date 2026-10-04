
import { ArticleType } from "@/app/page";
import Image from "next/image";
import Link from "next/link";

interface MainNewsProps {
    mainArticles: ArticleType[]
}


const MainNews = ({  mainArticles }: MainNewsProps) => {
    // const firstNews = mainArticle[0];
    // const restNews = mainArticle.slice(1);
    // console.log(firstNews)
    const [firstNews, ...restNews] = mainArticles

    const firstNewsDate = firstNews.firstPublished
                            ? new Date(firstNews.firstPublished).toLocaleDateString("bn-BD", { dateStyle: "full" })
                            : "";
                            


    return (
        <div className="grid grid-cols-2 gap-4 ">

            {/* First News */}
            <Link  href={`/news/${firstNews.id}`}
                className="card bg-base-100 shadow-sm hover:shadow-md transition"
            >
                <figure>
                    <Image  src={firstNews.imageUrl}  alt="first-news"   width={600}  height={600}
                        className="w-full"
                    />
                </figure>

                <div className="card-body">
                    <h1 className="text-red-800 font-medium"> {firstNews.category} </h1>
                    <h2 className="card-title text-justify hover:text-red-700"> {firstNews.title} </h2>
                    <p className="line-clamp-3 text-justify"> {firstNews.description} </p>
                    <p className="text-gray-400 text-xs"> {firstNewsDate} </p>
                </div>
            </Link>


            {/* Rest News */}
            <div className="card bg-base-100 shadow-sm">
                <ul className="h-full">

                    {restNews.slice(0, 5).map((news, index) => (
                        <li key={news.id}
                            className={
                                index !== restNews.slice(0, 5).length - 1
                                    ? "border-b border-base-300"
                                    : ""
                            }
                        >
                            <Link  href={`/news/${news.id}`} className="block p-4 hover:bg-base-200 transition" >
                                <h1 className="text-red-800  text-sm mb-1"> {news.category} </h1>
                                <h2 className="text-sm font-medium leading-5 text-justify hover:text-red-700"> {news.title} </h2>
                            </Link>
                        </li>
                    ))}

                </ul>
            </div>

        </div>
    );
};

export default MainNews;