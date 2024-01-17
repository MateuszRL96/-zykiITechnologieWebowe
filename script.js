
async function fetchData(){
    const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c20d5d78dcmsh7559f2b703e84d4p16a954jsn1b1dd0cc1421',
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        displayCoinsTable(result.data.coins);
        displayStatsData(result.data.stats);
    } catch (error) {
        console.error(error);
    }
}

fetchData();

const mainDiv = document.getElementById("main");
/*
function displayCoinsTable(coins){
    mainDiv.innerHTML += '<ul>';
    coins.forEach(coin => {
        mainDiv.innerHTML += `
        <li> ${coin.name}, ${coin.symbol}</li>`
    });
   
    mainDiv.innerHTML += '/<ul>';
}
*/

function displayStatsTable(stats){
    mainDiv.innerHTML = `
        <table id="statsTable">
            <thead>
                <th>MarkedCap</th>
                <th>Gainers vs Losers</th>
                <th>Trading volume</th>
                <th>BTC dominance</th>
                <th>All coins</th>
            </thead>
            <tbody id="statsData">

            </tbody>
        </table>`
        ;
    coinsDataElement = document.getElementById("statsData");

    coins.forEach(stat => {
        coinsDataElement.innerHTML += `
        <tr>
            <td>${stat.totalMarketCap}</td>
            <td>${stat.totalMarkets}</td>
            <td>${stat.total24hVolume}</td>
            <td>${stat.totalExchanges}</td>
            <td>${stat.totalCoins}</td>
        </tr>
        `
    });
  
}

function displayCoinsTable(coins){
    mainDiv.innerHTML = `
        <table id="coinsTable">
            <thead>
                <th>Rank</th>
                <th>Coind</th>
                <th>Price</th>
                <th>24h Change</th>
            </thead>
            <tbody id="coinsData">

            </tbody>
        </table>`
        ;
    coinsDataElement = document.getElementById("coinsData");

    coins.forEach(coin => {
        coinsDataElement.innerHTML += `
        <tr id="${coin.uuid}">
            <td>${coin.rank}</td>
            <td> <img src="${coin.iconUrl}" alt="icon of ${coin.name}">  ${coin.name} ${coin.symbol}</td>
            <td class="${setColor(coin.change)}">${coin.price}</td>
            <td class="${setColor(coin.change)}">${coin.change}</td>
        </tr>
        `
    });
  
}



function setColor(change){
    change = parseFloat(change);
    if (change > 0){
        return "textGreen";
    }
    else if(change < 0){
        return "textRed";
    }
    else return "";
}