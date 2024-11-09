
Feature:Employee attendance module functionality
    Background:
        Given Navigate to Dashboard with "english" language
        Then click module button: "employee_attendance_btn"
        Then verify page Title "Employee Attendance" is visible

    Scenario Outline:087-098 Scenario Outline name:verify Employee Attendance page month select svg button is functional and month are visible and working as expected
        Then I verify select month svg button is functional and I click it
        Then I verify all "<month>" are visible and clickable
        When I click the chosen "<month>"
        Then I see "<month>" becomes visible in select Box

        Examples:
            | month     |
            | January   |
            | February  |
            | March     |
            | April     |
            | May       |
            | June      |
            | July      |
            | August    |
            | September |
            | October   |
            | November  |
            | December  |


    Scenario Outline:099-102 verify Employee Attendance page year select svg button is functional and years are visible and working as expected
        Then I verify select year svg button is functional
        Then I click year svg button
        Then I verify "<year>" is visible and clickable in example
        When I click the "<year>" in example
        Then verify "<year>" becomes visible in select Box


        Examples:
            | year |
            | 2024 |
            | 2023 |
            | 2022 |
            | 2025 |


    Scenario Outline:103-110 Employee Attendance Status Visibility
        Then the "<Status Code>" should be visible on the page

        Examples:
            | Status Code      |
            | Vacation         |
            | Sick Leave       |
            | Extra Holiday    |
            | Present          |
            | New / Cancelled  |
            | Half Day         |
            | Official Holiday |
            | Unpaid Vacation  |

    Scenario:111 verify id filter is working as expected
        When I click the id filter
        Then If fill with id nummer "125"
        Then I see in the first row employee data is visible like this:
            | id  | name   | surname         | company                 |
            | 125 | Mehmet | test_attendance | QUICKLY TRANSPORTE GMBH |


    Scenario:112 verify name and lastName filters are working as expected
        Then I click the name filter and fill with "Mehmet"
        Then I click lastNmae filter and fill with "test_attendance"
        Then I see in the first row employee data is visible like this:
            | id  | name   | surname         | company                 |
            | 125 | Mehmet | test_attendance | QUICKLY TRANSPORTE GMBH |

    Scenario:113 verify employee attendance edit button is functional
        When I click the id filter
        Then If fill with id nummer "125"
        Then I verify employee attendance edit button is visible and clickable


    Scenario Outline:114-118 verify attendance titles are visible after click edit attendance button
        When I click the id filter
        Then If fill with id nummer "125"
        Then I verify employee attendance edit button is visible and clickable
        Then click edit button in first row of employee attendance page

        Then I verify the "<attendance_titles>" are visible

        Examples:
            | attendance_titles           |
            | Employee ID                 |
            | Current holiday entitlement |
            | Used leave days             |
            | Remaining leave             |
            | Sick leave                  |


   
    Scenario Outline:119 verify chosen employee name and surname goes to attendance edit page as title correctly
        When I click the id filter
        Then If fill with id nummer "<id>"
        Then I see first row has data like below:
            | id  | name   | lastname        |
            | 125 | Mehmet | test_attendance |
        Then click edit button in first row of employee attendance page
        Then verify "<name>" "<lastname>" is seen as page title

        Examples:
            | id  | name   | lastname        |
            | 125 | Mehmet | test_attendance |


    







