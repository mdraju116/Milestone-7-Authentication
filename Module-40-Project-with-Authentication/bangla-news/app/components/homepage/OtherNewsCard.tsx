import { ArticleType } from "@/app/page";
import Image from "next/image";
import Link from "next/link";

interface ArticleProps{
    article:ArticleType
}

const OtherNewsCard = ({article}:ArticleProps) => {

    // console.log(singleArticle)

     const otherNewsDate = article.firstPublished
                            ? new Date(article.firstPublished).toLocaleDateString("bn-BD", { dateStyle: "full" })
                            : "";


    return (
        <div>

                <Link  href={`/news/${article.id}`}
                className="card bg-base-100 shadow-sm hover:shadow-md transition"
            >
                <figure>
                    <Image  src={article.imageUrl}  alt="first-news"   width={600}  height={600}
                        className="w-full"
                    />
                </figure>

                <div className="card-body">
                    <h1 className="text-red-800 font-medium"> {article.category} </h1>
                    <h2 className="card-title text-justify hover:text-red-700"> {article.title} </h2>
                    <p className="line-clamp-3 text-justify"> {article.description} </p>
                    <p className="text-gray-400 text-xs"> {otherNewsDate} </p>
                </div>
            </Link>
            
        </div>
    );
};

export default OtherNewsCard;