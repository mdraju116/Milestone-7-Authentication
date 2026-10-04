
import MainNews from "./components/homepage/MainNews"

export interface MainArticleType {
  id: string,
  title: string,
  description: string,
  link: string,
  imageUrl: string,
  imageAlt: string,
  category: string,
  type: string,
  isLive: boolean,
  firstPublished: string,
  lastPublished: string,
  source: string,
}

export default async function Home() {

  const response = await fetch("https://news-api-v2.vercel.app/api/news/sections");
  const newsData = await response.json();
  const newsSections = newsData.data;
  // console.log(newsSections)
  const mainNews =newsSections[0];
  const mainArticle:MainArticleType[] = mainNews.articles;
  // console.log(mainArticle);


  return (
    <div className="mt-4 mb-10">

      <div className="grid grid-cols-3 max-w-7xl mx-auto gap-10">

        {/* main news */}
        <div className=" col-span-2 ">
           <MainNews  mainArticle={mainArticle} />
        </div>


        {/* most read */}
        <div className=" col-span-1 bg-red-600 p-10">

        </div>
      </div>


    </div>
  );
}
