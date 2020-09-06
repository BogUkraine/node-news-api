module.exports.feedShow = (feed) => {
    return {
        id          : feed.id,
        source      : {
            id   : feed.source.id,
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