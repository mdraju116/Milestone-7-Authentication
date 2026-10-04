
import MainNews from "./components/homepage/MainNews"
import OtherNewsCard from "./components/homepage/OtherNewsCard";


interface singleSectionType {
  title: string,
  curationId: string,
  count: number,
  articles: ArticleType[],
}

export interface ArticleType {
  id: string,
  title: string,
  description: string | null,
  link: string | null,
  imageUrl: string,
  imageAlt: string,
  category: string,
  type: string,
  isLive: boolean,
  firstPublished: string | null,
  lastPublished: string | null,
  source: string,
}




export default async function Home() {

  const response = await fetch("https://news-api-v2.vercel.app/api/news/sections");
  const newsData = await response.json();
  const newsSections = newsData.data;
  // console.log(newsSections)


  const mainNews = newsSections[0];
  const mainArticles: ArticleType[] = mainNews.articles; //only section 0
  // console.log(mainArticle);

  const otherNews = newsSections.slice(1).filter((section: singleSectionType) => section.count !== 1); //all other news except the MainNews and filtered by count
  // const otherArticles = otherNews.map((otherArticle: { articles: ArticleType[] }) => otherArticle.articles); //section 1 to n
  // console.log(otherArticles);



  return (
    <div className="">

      {/* hero section */}
      <div className="grid grid-cols-3 max-w-7xl mx-auto gap-10 mt-4 mb-10">

        {/* main news in hero leftside*/}
        <div className=" col-span-2 ">
          <MainNews mainArticles={mainArticles} />

          {/* others news in body*/}
          <div className="mt-10 grid gap-5">

            {
              otherNews.map((singleSection: singleSectionType) => (
                <div key={singleSection.curationId} className="py-4">

                  <h1 className="border-b-2  border-red-700 py-3 font-bold"> {singleSection.title}</h1>
                  
                  {/* news card */}
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {
                      singleSection.articles.map((article: ArticleType) => (
                        <OtherNewsCard key={article.id} article={article}/> 
                      ))
                    }
                    
                  </div>

                </div>
               ))
            }
          </div>

        </div>





        {/* most read in hero rightside */}
        <div className=" col-span-1 bg-green-600 p-10">
          <p>সর্বাধিক পঠিত</p>
        </div>

      </div>








    </div>
  );
}
