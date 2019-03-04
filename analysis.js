const nameAnalysisTexts = require('./nameAnalysisTexts')

let analysis = {
     hash(name, gender) {
        let person = name + ' ' + gender;
        let asciiSum = 0;

        const phrase = nameAnalysisTexts.Phrases.length;
        const phrase2 = nameAnalysisTexts.Phrases2.length;

        for(var i = 0; i < person.length; i++){
            asciiSum += person[i].charCodeAt();
        }

        console.log(`asciisum ${asciiSum}`);
        console.log(`phrase ${phrase}, phrase2 ${phrase2}`);
        return [asciiSum % phrase, asciiSum % phrase2 ];
    }
}

module.exports = analysis;