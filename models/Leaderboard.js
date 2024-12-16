class Leaderboard {
    constructor() {
        this.scores = [];
    }

    updateScore(userId, score) {
        const user = this.scores.find((entry) => entry.userId === userId);
        if (user) {
            user.score += score;
        } else {
            this.scores.push({ userId, score });
        }
    }

    getTopPlayers() {
        return this.scores.sort((a, b) => b.score - a.score).slice(0, 10);
    }
}

module.exports = Leaderboard;