import Image from "next/image";

const NewsDetailsPage = async ({ params }: { params: Promise<{ newsid: string }> }) => {

    const { newsid } = await params;

    const response = await fetch(`https://news-api-v2.vercel.app/api/article/${newsid}`)
    const news = await response.json();
    const newsDetails = news.data;
    console.log(newsDetails)

    // https://news-api-v2.vercel.app/api/article/cqrm9070z91vo
    
    return (
        <article className="mx-auto max-w-3xl px-4 py-10 ">
            {/* Category */}
            <p className="mb-3 text-sm font-semibold text-red-700">
                {newsDetails.topics?.[0]?.name}
            </p>

            {/* Title */}
            <h1 className="text-3xl font-bold leading-snug text-neutral-900 sm:text-4xl ">
                {newsDetails.title}
            </h1>

            <div className="text-justify">
                {/* Description */}
                <p className="mt-4 text-lg leading-relaxed text-neutral-600">
                    {newsDetails.description.blocks[0].model.blocks[0].model.text}
                </p>

                {/* Author + Date + Word Count */}
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-neutral-200 py-3 text-sm text-neutral-500">
                    <span className="font-medium text-neutral-700">
                        {newsDetails.byline?.[0]?.name}
                    </span>

                    <span>
                        {newsDetails.firstPublished &&
                            new Date(newsDetails.firstPublished).toLocaleDateString("bn-BD", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}{" "}
                        এ{" "}
                        {newsDetails.firstPublished &&
                            new Date(newsDetails.firstPublished).toLocaleTimeString("bn-BD", {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                            })}
                    </span>

                    <span>{newsDetails.wordCount} শব্দ</span>
                </div>

                {/* Article Body */}
                <div className="mt-8 space-y-6">
                    {newsDetails.body.map(
                        (
                            item: {
                                type: string;
                                text?: string;
                                url?: string;
                                width?: number;
                                height?: number;
                                caption?: string | null;
                                altText?: string;
                            },
                            index: number
                        ) => {
                            if (item.type === "text") {
                                return (
                                    <p
                                        key={index}
                                        className="text-lg leading-8 text-neutral-800"
                                    >
                                        {item.text}
                                    </p>
                                );
                            }

                            if (item.type === "subheading") {
                                return (
                                    <h2
                                        key={index}
                                        className="pt-4 text-2xl font-bold text-neutral-900"
                                    >
                                        {item.text}
                                    </h2>
                                );
                            }

                            if (item.type === "image") {
                                return (
                                    <figure key={index}>
                                        <Image
                                            src={item.url!}
                                            alt={item.altText || ""}
                                            width={item.width || 800}
                                            height={item.height || 450}
                                            className="h-auto w-full"
                                        />

                                        {item.caption && (
                                            <figcaption className="mt-2 text-sm text-neutral-500">
                                                {item.caption}
                                            </figcaption>
                                        )}
                                    </figure>
                                );
                            }

                            return null;
                        }
                    )}
                </div>

            </div>


        </article>
    );
};

export default NewsDetailsPage;