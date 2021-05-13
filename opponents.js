const opponents = [
    "Fredrik Ahnell",
    "Christoffer Bolin",
    "Mette Hellemarck",
    "Nils Hollmer",
    "Stefan Liström",
    "Hatem Mohi El Din",
    "Sebastion Noring",
    "Linnea Olofsson",
    "Heidi Patja",
];

const thesis = [
    "Fredrik Ahnell & Sebastion Noring",
    "Christoffer Bolin & Mette Hellemarck",
    "Nils Hollmer",
    "Stefan Liström",
    "Hatem Mohi El Din",
    "Linnea Olofsson & Heidi Patja",
];

function getMatches(parings, thesis, opponents) {
    let thesisCopy = thesis.slice();
    let opponentsCopy = opponents.slice();
    let originalLength = opponentsCopy.length;

    for (let i = 0; i < originalLength; i++) {
        let opponent = getOpponent(
            thesisCopy, opponentsCopy
        );

        if (!parings[thesisCopy[opponent.tIndex]]) {
            parings[thesisCopy[opponent.tIndex]] = [];
        }

        parings[thesisCopy[opponent.tIndex]].push(
            opponent.name
        );

        thesisCopy.splice(opponent.tIndex, 1);
        opponentsCopy.splice(opponent.oIndex, 1);
    }

    return parings;
}

function getOpponent(thesis, opponents) {
    let thesisIndex = Math.floor(
        Math.random() * thesis.length
    );

    let opponentIndex = Math.floor(
        Math.random() * opponents.length
    );

    if (thesis[thesisIndex].includes(
            opponents[opponentIndex]
        )
    ) {
        return getOpponent(thesis, opponents);
    }

    return {
        name: opponents[opponentIndex],
        tIndex: thesisIndex,
        oIndex: opponentIndex,
    };
}

(function IIFE() {
    let firstRound = [];
    let secondRound = opponents.slice();

    for (let i = 0; i < thesis.length; i++) {
        let randomIndex = Math.floor(
            Math.random() * secondRound.length
        );

        firstRound.push(secondRound[randomIndex]);
        secondRound.splice(randomIndex, 1);
    }

    let firstParings = getMatches(
        {}, thesis.slice(), firstRound
    );
    let secondParings = getMatches(
        firstParings, thesis.slice(), secondRound
    );

    console.log(secondParings);
})();
