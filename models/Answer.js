class Answer {
    constructor(questionId, playerId, selectedOption, isCorrect) {
        this.questionId = questionId;
        this.playerId = playerId;
        this.selectedOption = selectedOption;
        this.isCorrect = isCorrect;
    }
}

module.exports = Answer;