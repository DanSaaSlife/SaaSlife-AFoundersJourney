const cards = {
    metric: [
        {
            name: "10% MRR Increase",
            effect: { mrr: 0.1 },
            description: "Your marketing efforts have paid off! Your MRR has increased by 10%."
        },
        {
            name: "500 New Users",
            effect: { users: 500 },
            description: "A successful campaign brought in 500 new users."
        },
        {
            name: "Churn Rate Reduction",
            effect: { churn: -1 },
            description: "Improved customer service has reduced your churn rate by 1%."
        },
        {
            name: "20% ARR Increase",
            effect: { arr: 0.2 },
            description: "A key partnership has led to a 20% increase in your ARR."
        },
        {
            name: "Customer Satisfaction Boost",
            effect: { users: 100, churn: -2 },
            description: "Happy customers! You gained 100 users and reduced churn by 2%."
        },
        {
            name: "Revenue from New Feature",
            effect: { mrr: 0.15 },
            description: "Your new feature is a hit! MRR increased by 15%."
        }
    ],
    decision: [
        {
            name: "Hire New Developer",
            effect: { mrr: 0.15, users: 10 },
            description: "Hiring a skilled developer has increased your MRR by 15% and added 10 users."
        },
        {
            name: "Expand Marketing Budget",
            effect: { users: 200, mrr: 0.05 },
            description: "Increased marketing spend brought in 200 new users and a 5% MRR boost."
        },
        {
            name: "Pivot Product",
            effect: { users: 300, mrr: -0.1 },
            description: "Pivoting your product added 300 users but temporarily reduced MRR by 10%."
        },
        {
            name: "Acquire Competitor",
            effect: { arr: 0.1, users: 50 },
            description: "Acquiring a competitor added 50 users and increased ARR by 10%."
        },
        {
            name: "Launch New Feature",
            effect: { mrr: 0.15, users: 20 },
            description: "Your new feature launch added 20 users and increased MRR by 15%."
        },
        {
            name: "Improve UX",
            effect: { churn: -1, users: 100 },
            description: "Improved user experience reduced churn by 1% and added 100 users."
        },
        {
            name: "Customer Support Upgrade",
            effect: { mrr: 0.1, churn: -2 },
            description: "Upgraded customer support increased MRR by 10% and reduced churn by 2%."
        },
        {
            name: "Optimize Infrastructure",
            effect: { arr: 0.2, users: 5 },
            description: "Optimizing infrastructure increased ARR by 20% and added 5 users."
        },
        {
            name: "Raise Series A Funding",
            effect: { mrr: 0.3, users: 25 },
            description: "Raised Series A funding increased MRR by 30% and added 25 users."
        },
        {
            name: "Partnership with Key Player",
            effect: { arr: 0.15, users: 40 },
            description: "Partnership with a key player increased ARR by 15% and added 40 users."
        }
    ],
    event: [
        {
            name: "Market Boom",
            effect: { users: 50 },
            description: "The market is booming! You gained 50 new users."
        },
        {
            name: "VC Interest",
            effect: { arr: 0.2 },
            description: "Venture capital interest increased your ARR by 20%."
        },
        {
            name: "Customer Referral Surge",
            effect: { users: 30 },
            description: "A referral surge added 30 new users to your platform."
        },
        {
            name: "Industry Award",
            effect: { mrr: 0.2 },
            description: "You won an industry award! MRR increased by 20%."
        },
        {
            name: "Successful Webinar",
            effect: { users: 25 },
            description: "A successful webinar brought in 25 new users."
        },
        {
            name: "Competitor Launch",
            effect: { mrr: -0.2 },
            description: "A competitor's launch decreased your MRR by 20%."
        },
        {
            name: "Customer Churn Spike",
            effect: { users: -30 },
            description: "A churn spike caused you to lose 30 users."
        },
        {
            name: "Economic Downturn",
            effect: { arr: -0.1 },
            description: "An economic downturn decreased your ARR by 10%."
        },
        {
            name: "Security Breach",
            effect: { churn: 2, mrr: -0.1 },
            description: "A security breach increased churn by 2% and decreased MRR by 10%."
        },
        {
            name: "Key Employee Resignation",
            effect: { mrr: -0.1, users: -10 },
            description: "A key employee resigned, decreasing MRR by 10% and losing 10 users."
        },
        {
            name: "Industry Regulation Change",
            effect: {},
            description: "An industry regulation change had no immediate effect, but the next decision card effect is doubled."
        },
        {
            name: "Tech Conference",
            effect: {},
            description: "You attended a tech conference. Players trade one card with each other."
        }
    ]
};

let players = [];
let currentPlayerIndex = 0;
let round = 1;

function setupPlayers(event) {
    event.preventDefault();
    const company1 = document.getElementById('company1').value;
    const company2 = document.getElementById('company2').value;
    // Add more players if necessary

    players = [
        { name: company1, mrr: 1000, users: 100, arr: 1000, churn: 5 },
        { name: company2, mrr: 1000, users: 100, arr: 1000, churn: 5 },
        // Add more players if necessary
    ];

    document.getElementById('player-setup').style.display = 'none';
    document.getElementById('status').style.display = 'block';
    document.getElementById('card-area').style.display = 'block';
    document.getElementById('end-turn').style.display = 'block';

    updateStatus();
}

function drawCard() {
    const randomType = ['metric', 'decision', 'event'][Math.floor(Math.random() * 3)];
    const card = cards[randomType][Math.floor(Math.random() * cards[randomType].length)];

    document.getElementById('card-display').textContent = `Card Drawn: ${card.name}`;
    document.getElementById('card-details').textContent = card.description;
    
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
    
    let highestRevenue = 0;
    let winner = '';

    const results = players.map(player => {
        const totalRevenue = player.mrr * 12 + player.arr;
        if (totalRevenue > highestRevenue) {
            highestRevenue = totalRevenue;
            winner = player.name;
        }

        return `
            <p>${player.name} - Total Revenue: $${totalRevenue.toFixed(2)}, Total Users: ${player.users}, Churn Rate: ${player.churn}%</p>
        `;
    }).join('');

    document.getElementById('final-results').innerHTML = results;
    document.getElementById('winner-message').textContent = `Congratulations, ${winner}! You have the highest total revenue of $${highestRevenue.toFixed(2)} and have won the game!`;
    document.getElementById('end-message').style.display = 'block';
}

function restartGame() {
    players = [];
    currentPlayerIndex = 0;
    round = 1;
    
    document.getElementById('player-setup').style.display = 'block';
    document.getElementById('status').style.display = 'none';
    document.getElementById('card-area').style.display = 'none';
    document.getElementById('end-turn').style.display = 'none';
    document.getElementById('end-message').style.display = 'none';
    document.getElementById('company-names-form').reset();
}

document.getElementById('company-names-form').addEventListener('submit', setupPlayers);
document.getElementById('draw-card').addEventListener('click', drawCard);
document.getElementById('end-turn').addEventListener('click', endTurn);
document.getElementById('restart-game').addEventListener('click', restartGame);
