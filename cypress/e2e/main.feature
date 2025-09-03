Feature: SCRAPE DATA
    
    Scenario: scrape data from IMMAF
        Given I visit 'https://immaf.smoothcomp.com/en/event/24391/schedule/matchlist'
        Then I extract the data