var http = require("http")

function onNavigatingTo(args) {
    var page = args.object;

    setInterval(() => {
        getValues()
    }, 5000)

    // Get values last 24h
    function getValues(){
        http.getJSON("https://api.bitcointrade.com.br/v1/public/BTC/ticker")
        .then(res => {
            console.log(JSON.stringify(res))
            page.getViewById('heghValue').text = 'R$ ' + res.data.high
            page.getViewById('lowValue').text = 'R$ ' + res.data.low
            page.getViewById('sellOfert').text = 'R$ ' + res.data.sell
            page.getViewById('dateLast').text = 'Ultima atualização: ' + res.data.date
        })
        .catch(err => {
            console.log('Erro')
        })
    }

}




exports.onNavigatingTo = onNavigatingTo;