add = async function(app, tools) {
        app.post('/submit-quote', async (req, res) => {
        const { bookTitle, author, quote, quotedBy } = req.body;
        const quoteFilePath = 'data/quotes.json';
        const quoteData = await tools.getJsonData(quoteFilePath);

        let book = quoteData.find(b => b.title === bookTitle && b.author === author);

        if (book) {
            let duplicate = book.quotes.find(q => 
                q.quote === quote &&
                JSON.stringify(q.people) === JSON.stringify(quotedBy)
            );

            if (duplicate) {
                return res.json({ success: false, message: 'Quote already in library' });
            }

            book.quotes.push({ quote, people: quotedBy });
        } else {
            quoteData.push({
                title: bookTitle,
                author,
                quotes: [{ quote, people: quotedBy }]
            });
        }

        await tools.saveJsonData(quoteFilePath, quoteData);
        return res.json({ success: true, message: 'Quote added successfully' });
    });
}

module.exports = add;