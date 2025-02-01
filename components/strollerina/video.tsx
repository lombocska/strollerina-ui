import { Suspense } from "react";


export function Video({ link }: { link: string }) {
    return (
        //   <video width="320" height="240" controls preload="none">
        //     <source src={link} type="video/mp4" />
        //     <track
        //       src={link}
        //       kind="subtitles"
        //       srcLang="en"
        //       label="English"
        //     />
        //     Your browser does not support the video tag.
        //   </video>
        <Suspense fallback={<p>Loading video...</p>}>
            <h2 className="text-2xl from-black to-stone-500 bg-clip-text text-strollerina_green-100 mt-10 mb-5">
                Video
            </h2>
            <div className="video-container">

                <iframe
                    // allowfullscreen
                    // width="560" height="315" 
                    src={link}
                    title="YouTube video player"
                    // frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                // referrerpolicy="strict-origin-when-cross-origin" 
                />
            </div>
        </Suspense>

    )
}