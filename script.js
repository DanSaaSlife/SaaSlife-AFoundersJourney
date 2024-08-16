const cards = {
    metric: [
        { name: "10% MRR Increase", effect: { mrr: 10 } },
        { name: "500 New Users", effect: { users: 500 } },
        { name: "Churn Rate Reduction", effect: { churn: -5 } },
        { name: "20% ARR Increase", effect: { arr: 20 } },
        { name: "Customer Satisfaction Boost", effect: { users: 100, churn: -10 } },
        { name: "Revenue from New Feature", effect: { mrr: 15 } }
    ],
    decision: [
        { name: "Hire New Developer", effect: { mrr: 15, users: 10 } },
        { name: "Expand Marketing Budget", effect: { users: 20, mrr: 5 } },
        { name: "Pivot Product", effect: { users: 30, mrr: -10 } },
        { name: "Acquire Competitor", effect: { arr: 10, users: 50 } },
        { name: "Launch New Feature", effect: { mrr: 15, users: 20 } },
        { name: "Improve UX", effect: { churn: -5, users: 10 } }
    ],
    event: [
        { name: "Market Boom", effect: { users: 50 } },
        { name: "VC Interest", effect: { arr: 20 } },
        { name: "Customer Referral Surge", effect: { users: 30 } },
        { name: "Industry Award", effect: { mrr: 20 } },
        { name: "Successful Webinar", effect: { users: 25 } },
        { name: "Competitor Launch", effect: { mrr: -20 } }
    ]
};

let round = 1;
let currentPlayer = 1;
const players = [
    { mrr: 100, users: 100, arr: 100, churn: 5 },
    { mrr: 100, users: 100, arr: 100, churn: 5 },
    // Add more players as needed
];

function drawCard() {
    const cardTypes = ['metric', 'decision', 'event'];
    const randomType = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    const card = cards[randomType][Math.floor(Math.random() * cards[randomType].length)];
    
    document.getElementById('card-display').innerHTML = `<p>${card.name}</p>`;
    resolveCard(card);
}

function resolveCard(card) {
    const player = players[currentPlayer - 1];
    if (card.effect.mrr) player.mrr += card.effect.mrr;
    if (card.effect.users) player.users += card.effect.users;
    if (card.effect.arr) player.arr += card.effect.arr;
    if (card.effect.churn) player.churn += card.effect.churn;

    updateStatus();
}

function updateStatus() {
    const player = players[currentPlayer - 1];
    document.getElementById('mrr').textContent = player.mrr;
    document.getElementById('users').textContent = player.users;
    document.getElementById('arr').textContent = player.arr;
    document.getElementById('churn-rate').textContent = player.churn + '%';
}

document.getElementById('draw-card').addEventListener('click', drawCard);
document.getElementById('end-turn').addEventListener('click', () => {
    currentPlayer = (currentPlayer % players.length) + 1;
    if (currentPlayer === 1) round++;
    document.getElementById('round-number').textContent = round;
    document.getElementById('current-player').textContent = currentPlayer;
    updateStatus();
});
