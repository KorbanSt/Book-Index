display = async function(app, tools) {
    app.get('/quotes', async (req, res) => {
        const quoteFilePath = 'data/quotes.json';
        const data = await tools.getJsonData(quoteFilePath);
        res.json(data);
    });
}

module.exports = display;