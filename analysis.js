const nameAnalysisTexts = require('./nameAnalysisTexts')

let analysis = {
     hash(name, gender) {
        let person = name + ' ' + gender;
        let asciiSum = 0;

        let conversation = 22;

        for(var i = 0; i < person.length; i++){
            asciiSum += person[i].charCodeAt();
        }

        return asciiSum % conversation
    }
}

module.exports = analysis;