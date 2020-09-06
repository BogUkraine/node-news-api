module.exports.feedShow = (feed) => {
    return {
        source      : {
            name : feed.source.name,
        },
        author      : feed.author,
        title       : feed.title,
        description : feed.description,
        content     : feed.content,
        publishedAt : feed.publishedAt,
        url         : feed.url
    }
}