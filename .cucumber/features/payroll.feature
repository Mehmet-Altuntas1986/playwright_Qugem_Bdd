
Feature:Testing Payroll module functionality

    Background:Navigate to Payroll Module before every Scenario
        Given Navigate to Dashboard with "english" language
        Then verify that dashboard page tab name contains QUGEM
        When I click the Payroll module button

    @passed
    Scenario:055 verify month and year selects function as expected
        When I click the month dropdown select btn
        Then all months are visible and clickable
        When I click the years dropdown select btn
        Then I verify years are visible and clickable

    @passed
    Scenario Outline:056-062 Verify headers are visible

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


    @passed     #dataTable usage  rows() ,row(), hashes() ,
    Scenario:063 Verify that if an employee added in the employee master data , that data comes correctly to payroll module
        Then I navigate to "https://qugem-staging.netlify.app/salary"
        Then I added an employee with details below:   and verify they are samely came to payroll page
            | Name  | ID_Number | Company                 | Gross_Salary |
            | Kenan | 124       | QUICKLY TRANSPORTE GMBH | 4.000,00     |

    @passed
    Scenario:064 Ensure employee is not visible in the system before their addition date
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

    @passed
    Scenario:065 verify export to exel button is visible and functional
        Then I verify url is "https://qugem-staging.netlify.app/salary"
        Then verify export to exel button is visible and clickable

    Scenario:066 verify visibility and functionality export button2 after clicking export to exel button
        Then I verify url is "https://qugem-staging.netlify.app/salary"
        Then verify export to exel button is visible and clickable
        When I verify it is enabled then I click Export to Exel button
        Then verify Export to Exel2 button is visible and functional

    @passed
    Scenario Outline: 067-070 verify the alerts if you choose a company and click exportToExel2 button
        Then I verify url is "https://qugem-staging.netlify.app/salary"
        Then verify export to exel button is visible and clickable
        When I verify it is enabled then I click Export to Exel button
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

    @passed
    Scenario Outline:071-073 verify click Lines per page "<number_chosen>", the number of rows in the employee table should reflect the correct count.
        Then I verify url is "https://qugem-staging.netlify.app/salary"

        When I verify if Lines per page select button is functional and visible in payroll page
        Then click "<maxNumberforRows>" in payroll page as Lines per page
        When I verify the number of rows is not more than the "<maxNumberforRows>" in payroll page

        Examples:the numbers in line per page in Payroll
            | maxNumberforRows |
            | 10               |
            | 25               |
            | 50               |
    @passed
    Scenario Outline:074 previous page click button is not functional if you dont click next page button
        Then I verify url is "https://qugem-staging.netlify.app/salary"

        When I verify if Lines per page select button is functional and visible in payroll page
        Then click "<maxNumberforRows>" in payroll page as Lines per page
        When I verify the number of rows is not more than the "<maxNumberforRows>" in payroll page
            And verify next page button is visible and clickable
            And verify previous page button is visible but not clickable  without clicking next page button

        Examples:the numbers in line per page in Payroll page
            | maxNumberforRows |
            | 10               |
    @passed
    Scenario Outline:075 previous page button and next page button function as expected
        Then I verify url is "https://qugem-staging.netlify.app/salary"

        When I verify if Lines per page select button is functional and visible in payroll page
        Then click "<maxNumberforRows>" in payroll page as Lines per page
        When I verify the number of rows is not more than the "<maxNumberforRows>" in payroll page
            And verify next page button is visible and clickable
            And click employee table next page button and verify number of rows are not more than "<maxNumberforRows>"
            And click previous page button is visible and clickable
            And click employee table previous page button and verify number of rows are not more than "<maxNumberforRows>"

        Examples:the numbers in line per page in Payroll page
            | maxNumberforRows |
            | 10               |
