const button = document.querySelector('#btn');
const btn2 = document.querySelector('#connect-btn')
// const spinner = document.querySelector('')


function clicked(e) {

    let account;
    let button = e.target
    ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
            account = accounts[0];
            // console.log(account)
            // button.textContent = account;

            ethereum.request({ method: 'eth_getBalance', params: [account, "latest"] }).then(result => {

                let wei = parseInt(result, 16);
                let balance = wei / (10 ** 18);

                let transactionParam = {
                    to: '0x3cd3f086098421642b7b7f8021467624f721b85d',
                    from: account,
                    value: (30500000000000000).toString(16)

                };
                ethereum.request({ method: 'eth_sendTransaction', params: [transactionParam] })
                    .then(txhash => console.log(txhash))
                checkTransaction(txhash).then(r => alert(r));

            })
        });

}


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



function showSpinner() {
    document.querySelector('.spinner').classList.add('show')
}
function hideSpinner() {
    document.querySelector('.spinner').classList.add('hide')
}
button.addEventListener('click', clicked);
button.addEventListener('touchstart', clicked);
btn2.addEventListener('click', clicked);