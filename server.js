const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

// Addon manifest
const manifest = {
    id: "community.hb-ufc-live",
    version: "1.0.0",
    name: "HB UFC Live",
    description: "Live UFC streams from KPK cities. Select your preferred stream from multiple options!",
    logo: "https://1000logos.net/wp-content/uploads/2017/06/Logo-UFC.png",
    types: ["tv"],
    resources: ["catalog", "meta", "stream"],
    catalogs: [
        {
            type: "tv",
            id: "hb-ufc-cities",
            name: "HB UFC Live Streams"
        }
    ]
};

// Banner/poster for the stream
const streamPoster = "https://upload.wikimedia.org/wikipedia/en/thumb/1/10/UFC_320_poster.jpg/250px-UFC_320_poster.jpg";

const builder = new addonBuilder(manifest);

// Define all stream options (KPK cities)
const streams = [
    {
        title: "Peshawar",
        url: "https://cdn11.myshopstore.cfd/live/cdn11/chunks.m3u8"
    },
    {
        title: "Abbottabad",
        url: "https://storage.googleapis.com/zxcvbunixetrong1/mux_video_ts/index-1.m3u8"
    },
    {
        title: "Mardan",
        url: "https://amottheinrich.s3.us-east-1.amazonaws.com/main3_240p30_01676.ts"
    },
    {
        title: "Swat",
        url: "https://cdn11.myshopstore.cfd/live/cdn11/chunks.m3u8"
    },
    {
        title: "Dir",
        url: "https://storage.googleapis.com/zxcvbunixetrong1/mux_video_ts/index-1.m3u8"
    },
    {
        title: "Kohat",
        url: "https://amottheinrich.s3.us-east-1.amazonaws.com/main3_240p30_01676.ts"
    }
];

// Catalog handler – returns a single meta item
builder.defineCatalogHandler(async () => {
    return { 
        metas: [
            {
                id: "hb:ufc-live",
                type: "tv",
                name: "HB UFC Live",
                poster: streamPoster,
                description: "Live UFC streams from KPK cities. Choose your preferred stream!"
            }
        ]
    };
});

// Meta handler – returns metadata for the single item
builder.defineMetaHandler(async ({ id }) => {
    if (id === "hb:ufc-live") {
        return {
            meta: {
                id: "hb:ufc-live",
                type: "tv",
                name: "HB UFC Live",
                poster: streamPoster,
                description: "Live UFC streams from KPK cities. Choose your preferred stream!"
            }
        };
    }
    return {};
});

// Stream handler – returns multiple stream options
builder.defineStreamHandler(async ({ id }) => {
    if (id === "hb:ufc-live") {
        return { streams };
    }
    return { streams: [] };
});

// Start the server on Render-ready port
const port = process.env.PORT || 7000;
serveHTTP(builder.getInterface(), { port });
console.log(`HB UFC Live addon running at port ${port}`);
