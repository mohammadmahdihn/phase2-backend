class Question {
    constructor(id, text, options, correctOption, difficulty, category, relatedQuestions, creatorId) {
        this.id = id;
        this.text = text;
        this.options = options;
        this.correctOption = correctOption;
        this.difficulty = difficulty;
        this.category = category;
        this.relatedQuestions = relatedQuestions;
        this.creatorId = creatorId;
    }
}

module.exports = Question;