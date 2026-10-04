import OtherNewsCard from "@/app/components/homepage/OtherNewsCard";
import { ArticleType } from "@/app/page";



const CategoryDetailsPage = async ({params}: { params: Promise<{ categoryid: string }> }) => {
    const {categoryid}= await params;
    console.log(categoryid);

    const response =await fetch (`https://news-api-v2.vercel.app/api/category/${categoryid}`);
    const category = await response.json();
    const categoryDetails=category.data;
    // console.log(categoryDetails) ;

    return (
        <div className="mt-4">
            <h1 className="mb-4 border-b-2 border-red-700 pb-2 text-2xl font-bold text-neutral-900">{category.title}</h1>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {
                    categoryDetails.map((article:ArticleType)=> <OtherNewsCard key={article.id} article={article}/> )
                }
            </div>
        </div>
    );
};

export default CategoryDetailsPage;