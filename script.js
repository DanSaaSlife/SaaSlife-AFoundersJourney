const cards = {
    metric: [
        { name: "10% MRR Increase", effect: { mrr: 0.1 } },
        { name: "500 New Users", effect: { users: 500 } },
        { name: "Churn Rate Reduction", effect: { churn: -1 } },
        { name: "20% ARR Increase", effect: { arr: 0.2 } },
        { name: "Customer Satisfaction Boost", effect: { users: 100, churn: -2 } },
        { name: "Revenue from New Feature", effect: { mrr: 0.15 } }
    ],
    decision: [
        { name: "Hire New Developer", effect: { mrr: 0.15, users: 10 } },
        { name: "Expand Marketing Budget", effect: { users: 200, mrr: 0.05 } },
        { name: "Pivot Product", effect: { users: 300, mrr: -0.1 } },
        { name: "Acquire Competitor", effect: { arr: 0.1, users: 50 } },
        { name: "Launch New Feature", effect: { mrr: 0.15, users: 20 } },
        { name: "Improve UX", effect: { churn: -5, users: 10 } }
    ],
    event: [
        { name: "Market Boom", effect: { users: 50 } },
        { name: "VC Interest", effect: { arr: 0.2 } },
        { name: "Customer Referral Surge", effect: { users: 30 } },
        { name: "Industry Award", effect: { mrr: 0.2 } },
        { name: "Successful Webinar", effect: { users: 25 } },
        { name: "Competitor Launch", effect: { mrr: -0.2 } }
    ]
};

let round = 1;
let currentPlayerIndex = 0;
let players = [];

function setupPlayers(event) {
    event.preventDefault();
    
    const company1 = document.getElementById('company1').value;
    const company2 = document.getElementById('company2').value;
    
    players.push({ name: company1, mrr: 1000, users: 100, arr: 1000, churn: 5 });
    players.push({ name: company2, mrr: 1000, users: 100, arr: 1000, churn: 5 });
    
    document.getElementById('company-names-form').style.display = 'none';
    document.getElementById('status').style.display = 'block';
    document.getElementById('card-area').style.display = 'block';
    document.getElementById('end-turn').style.display = 'block';

    updateStatus();
}

function drawCard() {
    const cardTypes = ['metric', 'decision', 'event'];
    const randomType = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    const card = cards[randomType][Math.floor(Math.random() * cards[randomType].length)];

    document.getElementById('card-display').textContent = `Card Drawn: ${card.name}`;
    
    const player = players[currentPlayerIndex];

    if (card.effect.mrr) player.mrr += player.mrr * card.effect.mrr;
    if (card.effect.users) player.users += card.effect.users;
    if (card.effect.arr) player.arr += player.arr * card.effect.arr;
    if (card.effect.churn) player.churn += card.effect.churn;

    updateStatus();
}

function updateStatus() {
    const player = players[currentPlayerIndex];
    document.getElementById('current-player').textContent = player.name;
    document.getElementById('mrr').textContent = player.mrr.toFixed(2);
    document.getElementById('users').textContent = player.users;
    document.getElementById('arr').textContent = player.arr.toFixed(2);
    document.getElementById('churn-rate').textContent = player.churn + '%';
}

function endTurn() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;

    if (currentPlayerIndex === 0) {
        round++;
        document.getElementById('round-number').textContent = round;
        
        if (round > 10) {
            endGame();
            return;
        }
    }

    updateStatus();
}

function endGame() {
    document.getElementById('card-area').style.display = 'none';
    document.getElementById('end-turn').style.display = 'none';
    document.getElementById('status').style.display = 'none';
    
    let highestArr = 0;
    let winner = '';

    players.forEach(player => {
        if (player.arr > highestArr) {
            highestArr = player.arr;
            winner = player.name;
        }
    });

    document.getElementById('winner-message').textContent = `Congratulations, ${winner}! You have the highest ARR of $${highestArr.toFixed(2)} and have won the game!`;
    document.getElementById('end-message').style.display = 'block';
}

document.getElementById('company-names-form').addEventListener('submit', setupPlayers);
document.getElementById('draw-card').addEventListener('click', drawCard);
document.getElementById('end-turn').addEventListener('click', endTurn);
