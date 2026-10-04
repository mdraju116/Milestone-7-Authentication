
import { ArticleType } from "@/app/page";
import Link from "next/link";
import MainNewsCard from "./MainNewsCard";

interface MainNewsProps {
    mainArticles: ArticleType[]
}


const MainNews = ({  mainArticles }: MainNewsProps) => {
    // const firstNews = mainArticle[0];
    // const restNews = mainArticle.slice(1);
    // console.log(firstNews)
    const [firstNews, ...restNews] = mainArticles

   


    return (
        <div className="grid grid-cols-2 gap-4 ">

            {/* First News as card-item*/}  
            <MainNewsCard firstNews={firstNews} />

            

            {/* Rest News as list-item*/}
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
                            <Link  href={`/news-details/${news.id}`} className="block p-4 hover:bg-base-200 transition" >
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