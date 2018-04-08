const builder = require('botbuilder');
const _ = require('lodash');

const sites = ["F01", "F02", "F03", "F04", "F05", "F06", "F07", "F08", "F09", "F10", "A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10", "A11", "A12", "A13", "A14", "S01", "S02", "S03", "S04", "S05", "S06", "H01", "H02", "H03", "H04", "H05", "H06", "H07", "H08", "H09", "H10", "H11", "H12", "H13", "R01", "R02", "R03", "R04", "R05", "R06"]

const sitesName = {
    F01: "TIVOLI GARDEN",
    F02: "NATIONAL AQUARIUM DENMARK: DEN BLÅ PLANET",
    F03: "CASINO COPENHAGEN",
    F04: "EXPERIMENTARIUM",
    F05: "ZOOLOGICAL MUSEUM (THE NATURAL HISTORY MUSEUM OF DENMARK)",
    F06: "COPENHAGEN ZOO",
    F07: "FALKONERGÅRDEN",
    F08: "H.C. ANDERSEN FAIRY-TALE HOUSE",
    F09: "TYCHO BRAHE PLANETARIUM",
    F10: "CIRCUS MUSEUM",
    A01: "DANISH ARCHITECTURE CENTER",
    A02: "GL HOLTEGAARD",
    A03: "KUNSTHAL CHARLOTTENBORG",
    A04: "AMBER MUSEUM COPENHAGEN",
    A05: "ARKEN MUSEUM OF MODERN ART",
    A06: "BREDE WORKS",
    A07: "DANISH ARCHITECTURE CENTRE",
    A08: "DEN FRIE CENTRE OF CONTEMPORARY ART",
    A09: "DESIGN MUSEUM DANMARK",
    A10: "GLYPTOTEKET",
    A11: "J.F. WILLUMSENS MUSEUM",
    A12: "KUNSTHAL CHARLOTTENBORG",
    A13: "KØS MUSEUM OF ART IN PUBLIC SPACES",
    A14: "LOUISIANA MUSEUM OF MODERN ART",
    S01: "CANAL TOUR COPENHAGEN",
    S02: "VISIT CARLSBERG",
    S03: "BAADFARTEN - BOAT TOURS",
    S04: "CHURCH OF OUR SAVIOUR",
    S05: "COPENHAGEN TRAIN TOURS",
    S06: "THE NETTO BOATS",
    H01: "THE NATIONAL MUSEUM",
    H02: "BAKKEHUSET",
    H03: "ESRUM ABBEY AND MØLLEGÅRD",
    H04: "FREDERIKSSUND MUSEUM",
    H05: "HELSINGØR TOWN MUSEUM",
    H06: "THE VICTORIAN HOME",
    H07: "CITY HALL TOWER",
    H08: "GEOLOGICAL MUSEUM",
    H09: "KAREN BLIXEN MUSEUM",
    H10: "KØGE MUSEUM",
    H11: "LEJRE LAND OF LEGENDS",
    H12: "LEJRE MUSEUM",
    H13: "M/S MARITIME MUSEUM OF DENMARK",
    R01: "ROSENBORG CASTLE",
    R02: "AMALIENBORG",
    R03: "CHRISTIANSBORG",
    R04: "KRONBORG CASTLE",
    R05: "FREDERIKSBORG CASTLE",
    R06: "JÆGERSPRIS CASTLE"
}

module.exports = [
    // Prompt user to enter the name of the city they want to visit
    (session) => {
        session.userData.site = [];
        session.userData.siteWithScore = [];

        session.userData.site.push(_.sample(sites));

        builder.Prompts.choice(session, sitesName[session.userData.site[session.userData.site.length - 1]], "🤩|🤮", {
            listStyle: builder.ListStyle.button
        });
    },
    (session, results) => {
        session.userData.siteWithScore.push({
            site: session.userData.site[session.userData.site.length - 1],
            score: 1 - results.response.index,
            like: results.response.index ? false : true
        });

        session.userData.site.push(_.sample(sites));

        builder.Prompts.choice(session, sitesName[session.userData.site[session.userData.site.length - 1]], "🤩|🤮", {
            listStyle: builder.ListStyle.button
        });
    },
    (session, results) => {
        session.userData.siteWithScore.push({
            site: session.userData.site[session.userData.site.length - 1],
            score: 1 - results.response.index,
            like: results.response.index ? false : true
        });

        session.userData.site.push(_.sample(sites));

        builder.Prompts.choice(session, sitesName[session.userData.site[session.userData.site.length - 1]], "🤩|🤮", {
            listStyle: builder.ListStyle.button
        });
    },
    (session, results) => {
        session.userData.siteWithScore.push({
            site: session.userData.site[session.userData.site.length - 1],
            score: 1 - results.response.index,
            like: results.response.index ? false : true
        });

        session.userData.site.push(_.sample(sites));

        builder.Prompts.choice(session, sitesName[session.userData.site[session.userData.site.length - 1]], "🤩|🤮", {
            listStyle: builder.ListStyle.button
        });
    },
    (session, results) => {
        session.userData.siteWithScore.push({
            site: session.userData.site[session.userData.site.length - 1],
            score: 1 - results.response.index,
            like: results.response.index ? false : true
        });

        session.userData.site.push(_.sample(sites));

        builder.Prompts.choice(session, sitesName[session.userData.site[session.userData.site.length - 1]], "🤩|🤮", {
            listStyle: builder.ListStyle.button
        });
    },
    (session, results) => {
        session.userData.siteWithScore.push({
            site: session.userData.site[session.userData.site.length - 1],
            score: 1 - results.response.index,
            like: results.response.index ? false : true
        });

        console.log(_.filter(session.userData.siteWithScore, ['like', true]));
    },

];