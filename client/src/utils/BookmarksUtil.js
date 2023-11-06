const bookmarksUtil = [];

for (let i = 1; i <= 100; i++) {
    bookmarksUtil.push({
        number: i,
        image: `https://storage.googleapis.com/great-read-bucket/Compressed/${i}.jpg`
    });
}

export default bookmarksUtil;