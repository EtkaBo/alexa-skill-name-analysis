

function hash(name, gender) {
    let person = name + ' ' + gender;
    let asciiSum = 0;

    let conversation = 1;

    for(var i = 0; i < person.length; i++){
        asciiSum += person[i].charCodeAt();
    }

    return asciiSum % conversation
}