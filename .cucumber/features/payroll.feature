
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

    Scenario:065 verify visibility and functionality export button2 after clicking export to exel button
        Then I verify url is "https://qugem-staging.netlify.app/salary"
        Then verify export to exel button is visible and clickable
        When I click Export to Exel button
        Then verify Export to Exel2 button is visible and functional


    Scenario Outline: 066-069 verify the alerts if you choose a company and click exportToExel2 button
        Then I verify url is "https://qugem-staging.netlify.app/salary"
        Then verify export to exel button is visible and clickable
        When I click Export to Exel button
        Then I click company selection svg button
        Then I choose a "<Company>" and verify it is visible and clickable
        Then I click "<Company>"
        Then I click ExportToExel2 button
        Then I verify "<alert>"

        Examples:
            | Company                     | alert                                 |
            | QUICK BAU & TRANSPORTE GMBH | Bitte berechnen Sie zuerst alle Löhne |
            | QUICK IMMOTRANS GMBH        | Bitte berechnen Sie zuerst alle Löhne |
            | QUICK PLT GMBH              | Bitte berechnen Sie zuerst alle Löhne |
            | QUICKLY TRANSPORTE GMBH     | Bitte berechnen Sie zuerst alle Löhne |

    @only
    Scenario Outline:070-072 verify click Lines per page "<number_chosen>", the number of rows in the employee table should reflect the correct count.
        Then I verify url is "https://qugem-staging.netlify.app/salary"

        When I verify if Lines per page select button is functional and visible in payroll page
        When click "<max_number_for_rows>" in payroll page as Lines per page
        And I verify the number of rows is not more than the "<max_number_for_rows>" in payroll page 
        And verify next page button is visible and clickable
        And click employee table next page button and verify number of rows are not more than "<max_number_for_rows>"
        And click previous page button is visible and clickable
        And click employee table previous page button , and verify number of rows are not more than "<max_number_for_rows>"

        Examples:the numbers in line per page in employee master data table
            | max_number_for_rows |
            | 10                  |
            | 25                  |
            | 50                  |