
Feature:Employee attendance module functionality
    Background:
        Given Navigate to Dashboard with "english" language
        Then click module button: "employee_attendance_btn"
        Then verify page Title "Employee Attendance" is visible

    Scenario Outline: Scenario Outline name:verify Employee Attendance page month select svg button is functional and month are visible and working as expected
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

    @only
    Scenario Outline: verify Employee Attendance page year select svg button is functional and years are visible and working as expected
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


