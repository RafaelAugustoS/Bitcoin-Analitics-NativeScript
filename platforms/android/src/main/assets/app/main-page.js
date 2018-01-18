var http = require("http")
var view = require("ui/core/view");

function onNavigatingTo(args) {
    var page = args.object;
    page.actionBarHidden = true
    getValues()
    oferts(page)
    

    // Get values last 24h
    function getValues(){
        http.getJSON("https://api.bitcointrade.com.br/v1/public/BTC/ticker")
        .then(res => {
            page.getViewById('sellOfert').text =  formatReal(res.data.sell)
        })
        .catch(err => {
            console.log('Erro')
        })
    }

    function oferts(page){
        http.getJSON('https://api.bitcointrade.com.br/v1/public/BTC/orders')
        .then(res => {
            page.bindingContext = res.data
            var listView1 = view.getViewById(page, "listView1");
        })
        .catch(err => {
            console.log('Erro')
        })
    }

    function formatReal(int){
        return int.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
    }

}


exports.onNavigatingTo = onNavigatingTo;