remove = async function(app, tools) {
    app.post('/remove-quote', async (req, res) => {
        const { bookTitle, author, quoteIndex } = req.body;
        const quoteFilePath = 'data/quotes.json';
        const quoteData = await tools.getJsonData(quoteFilePath);

        // Find the book by title and author
        const book = quoteData.find(b => b.title === bookTitle && b.author === author);

        if (!book || book.quotes.length <= quoteIndex) {
          return res.json({ success: false, message: 'Quote not found.' });
        }

        // Remove the quote by index
        const removedQuote = book.quotes.splice(quoteIndex, 1);

        const removedFilePath = 'data/removedQuotes.json'
        const removedQuoteData = await tools.getJsonData(removedFilePath);
        removedQuoteData.push({"title":book.title, "data":removedQuote});
        await tools.saveJsonData(removedFilePath, removedQuoteData);

        // Save the updated quote data
        await tools.saveJsonData(quoteFilePath, quoteData);

        return res.json({ success: true, message: 'Quote removed successfully' });
      });

}

module.exports = remove;