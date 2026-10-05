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
        <div className="h-full min-w-0">

                <Link  href={`/news-details/${article.id}`}
                  className="card bg-base-100 shadow-sm hover:shadow-md transition h-full min-w-0"
                >
                    <figure>
                        <Image  src={article.imageUrl}  alt={article.imageAlt}   width={600}  height={400}
                            className="w-full h-48 object-cover"
                        />
                    </figure>

                    <div className="card-body">
                        <h1 className="text-xs font-semibold text-red-700"  > {article.category} </h1>
                        <h2 className="mt-1 font-semibold leading-snug text-neutral-900 group-hover:text-red-700"  > {article.title} </h2>
                        <p className="mt-1 line-clamp-2 text-sm text-neutral-600"  > {article.description} </p>
                        <p className="mt-2 text-xs text-neutral-400"  > {otherNewsDate} </p>
                    </div>
               </Link>
            
        </div>
    );
};

export default OtherNewsCard;