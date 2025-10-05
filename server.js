const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

// Addon manifest
const manifest = {
    id: "community.hb-ufc-live",
    version: "1.0.0",
    name: "HB UFC Live",
    description: "TV-ready HB UFC addon with live streams by KPK cities.",
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

// Banner/poster for all streams
const streamPoster = "https://upload.wikimedia.org/wikipedia/en/thumb/1/10/UFC_320_poster.jpg/250px-UFC_320_poster.jpg";

const builder = new addonBuilder(manifest);

// Static channel list – 6 KPK cities
const channels = [
    {
        id: "hb:peshawar",
        type: "tv",
        name: "Peshawar Stream",
        poster: streamPoster,
        url: "https://cdn11.myshopstore.cfd/live/cdn11/chunks.m3u8"
    },
    {
        id: "hb:abbottabad",
        type: "tv",
        name: "Abbottabad Stream",
        poster: streamPoster,
        url: "https://storage.googleapis.com/zxcvbunixetrong1/mux_video_ts/index-1.m3u8"
    },
    {
        id: "hb:mardan",
        type: "tv",
        name: "Mardan Stream",
        poster: streamPoster,
        url: "https://amottheinrich.s3.us-east-1.amazonaws.com/main3_240p30_01676.ts"
    },
    {
        id: "hb:swat",
        type: "tv",
        name: "Swat Stream",
        poster: streamPoster,
        url: "https://cdn11.myshopstore.cfd/live/cdn11/chunks.m3u8"
    },
    {
        id: "hb:dir",
        type: "tv",
        name: "Dir Stream",
        poster: streamPoster,
        url: "https://storage.googleapis.com/zxcvbunixetrong1/mux_video_ts/index-1.m3u8"
    },
    {
        id: "hb:kohat",
        type: "tv",
        name: "Kohat Stream",
        poster: streamPoster,
        url: "https://amottheinrich.s3.us-east-1.amazonaws.com/main3_240p30_01676.ts"
    }
];

// Catalog handler – returns all channels
builder.defineCatalogHandler(async () => {
    return { metas: channels };
});

// Meta handler – returns metadata for each channel
builder.defineMetaHandler(async ({ id }) => {
    const meta = channels.find(c => c.id === id) || {};
    return { meta };
});

// Stream handler – returns actual stream URL
builder.defineStreamHandler(async ({ id }) => {
    const channel = channels.find(c => c.id === id);
    if (channel) {
        return {
            streams: [
                {
                    title: channel.name,
                    url: channel.url
                }
            ]
        };
    }
    return { streams: [] };
});

// Start the server
serveHTTP(builder.getInterface(), { port: 7000 });
console.log("HB UFC Live addon running at http://localhost:7000");
