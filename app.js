const http = require('http');
const numberList = [];
const getRandomInt = () => Math.floor(Math.random() * Math.floor(999));

const requestHandler = (request, response) => {
    const topicDetails = {
        "noOfIntegers" : numberList.length,
        "integerList": numberList
    }
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(JSON.stringify(topicDetails));
    response.end();
}

const server = http.createServer(requestHandler);
const io = require('socket.io')(server);

io.on('connection', function (client) {
    client.emit('numberStream', numberList);
});


server.listen(5000, () => {
    setInterval(() => {
        const newNumber = getRandomInt();
        io.emit('continueIntegers', newNumber);
        numberList.push(newNumber)
    }, 2000)
});