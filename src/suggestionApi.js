const SAMPLE_DATA = [
    'r/memes',
    'r/funny',
    'r/aww',
    'r/dogPics',
    'r/spacePorn',
    'r/AMA',
    'r/askReddit',
    'r/animalsBeingDerps',
    'r/costco',
    'r/DiWhy',
    'r/wholesome',
]

export async function getSuggestions(query) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const userSearch = query.toLowerCase();

    return SAMPLE_DATA.filter((data) => data.toLowerCase().includes(userSearch));
};
