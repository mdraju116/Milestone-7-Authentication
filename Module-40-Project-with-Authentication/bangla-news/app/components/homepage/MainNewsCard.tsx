import { ArticleType } from "@/app/page";
import Image from "next/image";

interface FirstNewsProps{
    firstNews:ArticleType
}

const MainNewsCard = ({firstNews}:FirstNewsProps) => {

     const firstNewsDate = firstNews.firstPublished
                            ? new Date(firstNews.firstPublished).toLocaleDateString("bn-BD", { dateStyle: "full" })
                            : "";
                            
    return (
        <div>
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
        </div>
    );
};

export default MainNewsCard;