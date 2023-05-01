/**
  * Set up a WebSocket server using socket.io
  *
  * @param {Object} server - The HTTP server to use for the WebSocket server
  * @param {Object} http - The Node.js http module to make HTTP requests
  */
const socket = (server, http) => {
    const io = require("socket.io")(server, {
        cors: {
          origin: "*",  
        },
    });
    
    let users = [];

    /**
      * Fetch the latest exchange rates for all currencies from an external API
      * 
      * @async
      * @private
      * @returns {Promise<Object>} An object containing the latest exchange rates for all currencies
      */
    const fetchCurrencies = () => {
        var headers = {
            "apikey": `${process.env.CURRENCY_API_KEY}`
        };

        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: headers
        };

        return new Promise((resolve, reject) => {
            const req = http.request("http://api.apilayer.com/exchangerates_data/latest?&base=TRY", requestOptions, res => {
              let data = '';
              res.on('data', chunk => {
                data += chunk;
              });
              res.on('end', () => {
                const result = JSON.parse(data);
                resolve(result);
              });
            });
            
            req.on('error', error => {
              console.error("SOCKET ➤ Currency API error", error);
              reject(error);
            });
            
            req.end();
        });

    }

    /**
      * Fetch the latest exchange rate for a specific currency from an external API
      * 
      * @async
      * @private
      * @param {String} symbol - The symbol for the currency to fetch the exchange rate for
      * @returns {Promise<Object>} An object containing the latest exchange rate for the specified currency
      */
    const fetchCurrency = (symbol) => {
        var headers = {
            "apikey": `${process.env.CURRENCY_API_KEY}`
        };

        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: headers
        };

        return new Promise((resolve, reject) => {
            const req = http.request(`http://api.apilayer.com/exchangerates_data/latest?symbols=${symbol}&base=TRY`, requestOptions, res => {
              let data = '';
              res.on('data', chunk => {
                data += chunk;
              });
              res.on('end', () => {
                const result = JSON.parse(data);
                resolve(result);
              });
            });
            
            req.on('error', error => {
              console.error("SOCKET ➤ Currency API error", error);
              reject(error);
            });
            
            req.end();
        });

    }

    /**
      * Handle WebSocket connections, disconnections, etc
      * 
      * @param {Object} socket - The socket object representing the WebSocket connection
      */
    io.on("connection", (socket) => {
        socket.on("add-new-user", (newUserId) => {
          if (!users.find((user) => user.userId === newUserId)) {
            users.push({ userId: newUserId, socketId: socket.id });
            console.log("SOCKET ➤ New user connected");
          }
          io.emit("get-users", users);
        });

        socket.on("currencies", async () => {
            const currencies = await fetchCurrencies();
            // console.log(currencies);
            io.emit("get-currencies", currencies);
        });

        socket.on("currency", async (data) => {
            const currencies = await fetchCurrency(data);
            // console.log(currencies);
            io.emit("get-currency", currencies);
        });

        socket.on("disconnect", () => {
            users = users.filter((user) => user.socketId !== socket.id);
            console.log("SOCKET ➤ User disconnected");
            io.emit("get-users", users);
        });
    });
}

module.exports = socket;