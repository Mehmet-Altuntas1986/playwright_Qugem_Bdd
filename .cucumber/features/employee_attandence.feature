
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
        Then I click lastName filter and fill with "test_attendance"
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



    Scenario Outline:120-122 verify the number of rows in the employee table should reflect the correct count.

        When verify Lines per page select button is functional and visible
        Then If click "<number_in_example>" in Lines Per Page
        Then I see the number of rows in employee table is not more than the "<number_in_example>"
        Then verify next_page button is visible and clickable
        Then I click employee_attendance next page button under rows , and verify number of rows are not more than "<number_in_example>"
        Then verify_previous page button is visible and clickable
        Then I click employee_attendance previous page button , and verify number of rows are not more than "<number_in_example>"

        Examples:the numbers in line per page in employee master data table
            | number_in_example |
            | 10                |
            | 25                |
            | 50                |

    @passed
    Scenario Outline:123-136 verify in official holiday days , attendance status edit is not functional
        Then I verify select month svg button is functional and I click it
        When I click the chosen "<month>"
        Then I see "<month>" becomes visible in select Box

        Then I click year svg button
        When I click the "<year>" in example
        Then verify "<year>" becomes visible in select Box

        When I click the id filter
        Then If fill with id nummer "<id>"
        Then I see first row has data like below:
            | id  | name   | lastname        |
            | 125 | Mehmet | test_attendance |
        Then click edit button in first row of employee attendance page
        Then verify "<name>" "<lastname>" is seen as page title
        Then verify if day is holiday ,"<attendence_status_box_in_day_of>" is not clickable and functional

        Examples:
            | id  | name   | lastname        | attendence_status_box_in_day_of | month    | year |
            | 125 | Mehmet | test_attendance | 1                               | November | 2024 |
            | 125 | Mehmet | test_attendance | 25                              | December | 2024 |
            | 125 | Mehmet | test_attendance | 26                              | December | 2024 |
            | 125 | Mehmet | test_attendance | 1                               | January  | 2025 |
            | 125 | Mehmet | test_attendance | 6                               | January  | 2025 |
            | 125 | Mehmet | test_attendance | 18                              | April    | 2025 |
            | 125 | Mehmet | test_attendance | 21                              | April    | 2025 |
            | 125 | Mehmet | test_attendance | 1                               | May      | 2025 |
            | 125 | Mehmet | test_attendance | 29                              | May      | 2025 |
            | 125 | Mehmet | test_attendance | 9                               | June     | 2025 |
            | 125 | Mehmet | test_attendance | 3                               | October  | 2025 |
            | 125 | Mehmet | test_attendance | 25                              | December | 2025 |
            | 125 | Mehmet | test_attendance | 26                              | December | 2025 |








