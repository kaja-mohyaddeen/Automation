## 🚀 How to Run

1. Install dependencies
Make sure you’ve run

	

		npm install

2. Run Cypress tests
	
	Start Cypress with either of these commands:

	    npx cypress open    # Interactive mode
	    (or)
	    npx cypress run     # Headless mode

3. Check exported results
	
	After the tests finish, the Excel file will be created inside the cypress/downloads/ folder.

	Filenames are automatically generated with today’s date, for example:
			

		test-results_2025-09-10.xlsx
		report_2025-09-11.xlsx
	
	📂 Output Location

	All Excel reports will be saved in:

	    cypress/downloads/

## 📊 Match & Stream Data

This project uses two JSON files to manage fight event information.

1. **matches.json**

	Contains detailed match information.

	Event details (code, day, cage, match number)

	Participants with name and club

	Tags for search and linking
	
	Example:

	    {
	      "eventCode": "YW25",
	      "day": "Day 3",
	      "weight": "48 kg",
	      "classVar": "Youth B",
	      "cage": "Cage 3",
	      "matchNumber": "3 - 35",
	      "participants": [
	        { "name": "Josef Moosa", "club": "South Africa" },
	        { "name": "Ceejay Fenton", "club": "England" }
	      ],
	      "tags": "48 kg, Youth B, Josef Moosa, South Africa, Ceejay Fenton, England"
	    }
---
2. **streams.json**
	
	Contains streaming details for each fight.

	streamTitle → Full title of the stream

	tags → Keywords (weight, class, fighters, country)

	Example:

	    {
	      "streamTitle": "YW25_D3C3_27_Abdulla Kamiev (Kazakhstan) vs ANTHONY BASSIL (Lebanon)",
	      "tags": "48 kg, Youth B, Abdulla Kamiev, Kazakhstan, ANTHONY BASSIL, Lebanon"
	    }
----
