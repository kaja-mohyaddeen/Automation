
class PageObject {
  // Dropdowns
  dayDropdown = "#catid";
  dayOption = "#catid-dropdown .multiselect-option";
  cageDropdown = '.multiselect [aria-placeholder="Filter on mat"]';
  cageOption = ".multiselect-option";
  searchBtn = "#findMatchesForm > .sc-btn-primary";

  // Match data
  matchRow = ".match-row";
  matchNumber = ".number";
  participant = ".participant";
  club = ".club";
  categoryRow = ".category-row";

  // Pagination
  nextBtn = "ul.pagination li a[rel='next']";
}

export default new PageObject();
