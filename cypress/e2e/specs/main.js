import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import pageObject from "../pages/page_object.po";

Given("I visit {string}", (url) => { cy.visit(url); });

Then("I extract the data", () => {
    let eventCode = "YW25";
    const days = ["Day 1", "Day 2", "Day 3", " Day 4", "Day 5", "Day 6", "Day 7"];
    const cages = ["Cage 1", "Cage 2", "Cage 3", "Cage 4", " Cage 5"];
    let allData = [];
    let streamData = [];

    function processPage(eventCode, day, cage) {

        cy.get(pageObject.matchRow).each(($row) => {
            const matchNumber = $row.find(pageObject.matchNumber).text().trim();
            const categoryText = $row.prev(pageObject.categoryRow).text().trim();
            const weight = categoryText.match(/(\d+(?:\.\d+)?\s?kg)/i)?.[0] || "";
            const participants = [];

            $row.find(pageObject.participant).each((i, el) => {
                const name = Cypress.$(el).clone().children().remove().end().text().trim();
                const club = Cypress.$(el).find(pageObject.club).text().trim().replace("Team", "");
                participants.push({ name, club });
            });

            const [p1, p2] = participants;
            const tags = [weight, p1?.name, p1?.club, p2?.name, p2?.club].filter(Boolean).join(", ");
            const dayCode = day.replace("Day ", "D");
            const cageCode = cage.replace("Cage ", "C");
            const streamTitle = `${eventCode.trim()}_${dayCode.trim()}${cageCode.trim()}_${matchNumber.split("-")[1]?.trim()}_${p1?.name} (${p1?.club?.trim()}) vs ${p2?.name} (${p2?.club?.trim()})`;
            
            allData.push({ eventCode, day, weight, cage, matchNumber, participants, tags, });
            streamData.push({ streamTitle, tags, });
        });

        cy.get("body").then(($body) => {
            if ($body.find(pageObject.nextBtn).length > 0) {
                cy.wrap($body.find(pageObject.nextBtn)).click({ force: true });
                cy.wait(1000);
                processPage(eventCode, day, cage);
            }
        });
    }

    days.forEach((day) => {
        cy.get(pageObject.dayDropdown).click();
        cy.contains(pageObject.dayOption, day).click();

        cages.forEach((cage) => {
            cy.get(pageObject.cageDropdown).click();
            cy.contains(pageObject.cageOption, cage).click();
            cy.get(pageObject.searchBtn).click();
            cy.wait(1000);
            processPage(eventCode, day, cage);
        });
    });

    cy.then(() => {
        cy.writeFile("cypress/fixtures/matches.json", allData, { flag: "w", });
        cy.writeFile("cypress/fixtures/streams.json", streamData, { flag: "w", });
        // Then I use online tool to convert JSON to Excel.
    });
});