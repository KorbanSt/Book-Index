edit = async function(app, tools) {
    app.post('/edit-quote', async (req, res) => {
        const {
          originalTitle,
          originalAuthor,
          index,
          newTitle,
          newAuthor,
          newQuote,
          newPeople
        } = req.body;
        if (
            !originalTitle || !originalAuthor ||
            newTitle === undefined || newAuthor === undefined ||
            newQuote === undefined || !Array.isArray(newPeople)
          ) {
            return res.status(400).json({ success: false, error: 'Invalid input.' });
          }

          const quoteDataPath = 'data/quotes.json'
          const quoteData = await tools.getJsonData(quoteDataPath);

          const book = quoteData.find(
            b => b.title === originalTitle && b.author === originalAuthor
          );
      
          if (!book || !book.quotes[index]) {
            return res.status(404).json({ success: false, error: 'Quote not found.' });
          }

              // If the book title or author changed, we may need to move the quote
    if (originalTitle !== newTitle || originalAuthor !== newAuthor) {
        // Remove the quote from the old book
        const removed = book.quotes.splice(index, 1)[0];
  
        // If the book has no more quotes, optionally remove it (or keep empty)
        // You can uncomment this if you want to clean up books with no quotes:
        // if (book.quotes.length === 0) {
        //   data.splice(data.indexOf(book), 1);
        // }
  
        // Check if the new book exists
        let targetBook = quoteData.find(
          b => b.title === newTitle && b.author === newAuthor
        );
  
        if (!targetBook) {
          // Create new book entry
          targetBook = {
            title: newTitle,
            author: newAuthor,
            quotes: []
          };
          quoteData.push(targetBook);
        }
  
        targetBook.quotes.push({
          quote: newQuote,
          people: newPeople
        });
      } else {
        // Otherwise just update the existing quote
        book.quotes[index] = {
          quote: newQuote,
          people: newPeople
        };
      }
      tools.saveJsonData(quoteDataPath, quoteData);
      res.json({ success: true });
    });
}

module.exports = edit;