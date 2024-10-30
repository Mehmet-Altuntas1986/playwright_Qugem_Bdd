
Feature:Testing Payroll module functionality

    Background:Navigate to Payroll Module before every Scenario
        Given Navigate to Dashboard with "english" language
        Then verify that dashboard page tab name contains QUGEM
        When I click the Payroll module button


    Scenario:054 verify month and year selects function as expected

        When I click the month dropdown select btn
        Then all months are visible and clickable
        When I click the years dropdown select btn
        Then I verify years are visible and clickable


    Scenario Outline:055-061 Verify headers are visible

        Then I verify table column "<headers>" are visible
        Examples:
            | headers      |
            | Employee ID  |
            | First Name   |
            | Last Name    |
            | Client       |
            | Company      |
            | Gross salary |
            | Net salary   |


    #dataTable usage  rows() ,row(), hashes() ,
    Scenario:062 Verify that if an employee added in the employee master data , that data comes correctly to payroll module
        Then I navigate to "https://qugem-staging.netlify.app/salary"
        Then I added an employee with details below:   and verify they are samely came to payroll page
            | Name  | ID_Number | Company                 | Gross_Salary |
            | Kenan | 124       | QUICKLY TRANSPORTE GMBH | 4.000,00     |



    Scenario:063 Ensure employee is not visible in the system before their addition date
        Then I navigate to "https://qugem-staging.netlify.app/employee"
        Then I see employee details:
            | id  | name  | lastName     | entry_month | entry_year |
            | 124 | Kenan | payroll_test | October     | 2024       |

        Then Then I navigate to "https://qugem-staging.netlify.app/salary"
        Then I click "<month>" and "<year_chosen>" and search with employee "<id>"
        Then I verify employee is not seen in table if you choose a date before addition date

        Examples: a date chosen before employee addition date to see visibilty of employee in table of payroll
            | month     | year_chosen | id  |
            | September | 2024        | 124 |


    Scenario:064 verify export to exel button is visible and functional
        Then I verify url is "https://qugem-staging.netlify.app/salary"
        Then verify export to exel button is visible and clickable
@only
    Scenario:065 verify visibility and functionality export button2 after clicking export to exel button
        Then I verify url is "https://qugem-staging.netlify.app/salary"
        Then verify export to exel button is visible and clickable
        When I click Export to Exel button
        Then verify Export to Exel2 button is visible and functional

