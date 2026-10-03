
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"
import { GoDotFill } from "react-icons/go";


interface LatestHeadline {
    id: string,
    title: string
}

const Marquee = async () => {
    const response = await fetch("https://news-api-v2.vercel.app/api/news/?limit=10");
    const latestNews = await response.json();
    const headlines: LatestHeadline[] = latestNews.data;


    return (
        <div className="bg-red-700 text-white flex ">

            <div className="flex max-w-7xl mx-auto px-4">

                <div className="bg-red-800 py-1 px-5  ">
                    সর্বশেষ
                </div>

                <MarqueeText direction="right" duration={10} className="py-1">
                    {
                        headlines.map((headline) =>
                            <span key={headline.id}>
                                <span>{headline.title} </span>
                                <span className="mx-2">•</span>  {/* dot emoji */}
                            </span>
                        )
                    }
                </MarqueeText>
            </div>

        </div>
    );
};

export default Marquee;