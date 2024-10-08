

Feature:Employee Master Data Module functionality

    Background: Navigation to the Employee Master Data module and the removal of employees with the surname 'tester' or 'developer' were added for testing purposes.
        Given Navigate to Dashboard with "english" language
        Then verify that dashboard page tab name contains QUGEM
        Then I click the Employee_Master_data module
        Then I select "GESAMT FIRMEN" using the company selection button, and choose "All" using the client selection button"
        Then I delete if in any row, surname column text is tester or developer
        Then verify if you write tester or developer in filter surname, row1 is invisible
        Then I delete all filter sections to start every test Scenario with a clear filter



    Scenario Outline: Filter employee by first name in Employee Master Data and verify it is in the first row
            And I verify that the Employees table title is visible
            And I verify that the "company" and "client" selection buttons are visible and functional
            And I enter "<firstNameInFilter>" in the employee search field
        Then verify the employee name "<firstNameInFilter>" should be visible in the first row of the table
        Then I delete the Filter input
            And verify "<firstNameInFilter>" should not be in the first row

        Examples:
            | firstNameInFilter |
            | Gyulyustan        |


    Scenario: testing visibilty and clickably of the all dropdown elements of company with a loop
        When I click the company dropdown
        Then all companies in dropdown are visible and clickable


    Scenario: testing visibilty and clickably of the all dropdown elements of client companies with a loop
        When I click the client companies dropdown button
        Then I see client companies are visible and clickable


    Scenario Outline: Adding personals with acceptable data and deleting them
        Then I click the employee add button
            And I click active check button
        When I fill "<firstName>" "<LastName>" "<Emp_Id>"  "<tax_id>"  "<grosSalary>"
            And I fill soc_no "123456789123" _postcode "71254" _holidayNumYearly "20" _travelFare "120" _fixed_allowance "100" _dispacher "ali sorumlu" _adress "musik str 10"
        #Then I see there is current date visible in entry date input box before I edit
        Then I see exit date input box is not functional because personal active button is checked
        Then I see netSalary input box is still empty
        Then I click company and choose option quickly transporte gmbh
        Then I click Role and choose option LKW Fahrer
        Then I click Client and choose option Hermes
        Then I click Wage Type and choose option Full_Time
        Then I click Tax Class and choose option 3
        Then I click Health insurance choose Ikk Classic
        Then I click Child allowance and choose 2
        Then I click Chirch Tax and choose evangelishe kirchensteuer
        Then I check buttons of meal allowance taxed_night surcharge_hourly Temp_meal allowance_night surcharge 40_ travel Fahre
        Then I choose payment Type
        Then I see if I filled correctly , calculate salary button becomes functional
        Then I click save changes

        Then I verify the alert says "Employee was added successfully"
        Then I wait for the Url "https://qugem-staging.netlify.app/employee/"
        Then I use no filter and write "<Emp_Id>" and verify it brings to the first row employee "<firstName>" and "<LastName>"
        Then I find the added employee delete button and click it
        Then I verify the alert text "Are you sure you want to permanently delete?" and click yes in alert
        Then I see an alert info message "Employee was deleted successfully"


        Examples:

            | firstName | LastName | Emp_Id | tax_id | grosSalary |
            | Mehmet    | tester   | 1234   | 12323  | 3000       |
            | Ersan     | tester   | 4321   | 12324  | 3000       |


    Scenario Outline: Adding one personal with acceptable data and verifying employee saved and employee data is seen in employee master data page

        Then I click the employee add button
            And I click active check button
        When I fill "<firstName>" "<LastName>" "<Emp_Id>"  "<tax_id>"  "<grosSalary>"
            And I fill soc_no "123456789123" _postcode "71254" _holidayNumYearly "20" _travelFare "120" _fixed_allowance "100" _dispacher "ali sorumlu" _adress "musik str 10"
        #Then I see there is current date visible in entry date input box before I edit
        Then I see exit date input box is not functional because personal active button is checked
        Then I see netSalary input box is still empty
        Then I click company and choose option quickly transporte gmbh
        Then I click Role and choose option LKW Fahrer
        Then I click Client and choose option Hermes
        Then I click Wage Type and choose option Full_Time
        Then I click Tax Class and choose option 3
        Then I click Health insurance choose Ikk Classic
        Then I click Child allowance and choose 2
        Then I click Chirch Tax and choose evangelishe kirchensteuer
        Then I check buttons of meal allowance taxed_night surcharge_hourly Temp_meal allowance_night surcharge 40_ travel Fahre
        Then I choose payment Type
        Then I see if I filled correctly , calculate salary button becomes functional
        Then I click save changes

        Then I verify the alert says "Employee was added successfully"
        Then I wait for the Url "https://qugem-staging.netlify.app/employee/"
        Then I use no filter and write "<Emp_Id>" and verify it brings to the first row employee "<firstName>" and "<LastName>"
        Then I verify client firma shoud be "Hermes"
        Then I verify company should be "QUICKLY TRANSPORTE GMBH"
        Then I verify role is "LKW Fahrer"
        Then I verify employee status is "Active"
        Then I verify new added emnployee edit button is visible and clickable
        Then I click edit button
        When I click the calculate salary button
        Then I can see netSalary of the new employee
        Then I click save changes again after edition of the employee
        Then I see an alert with text : name surname "was updated successfully"


        Examples:

            | firstName | LastName | Emp_Id | tax_id | grosSalary |
            | Mehmet    | tester   | 200    | 12323  | 3000       |
            | Ersan     | tester   | 201    | 12324  | 3000       |


    Scenario Outline:Try to add a new employee with an employee id , another employee has it already

        Then I click the employee add button
            And I click active check button
        When I fill "<firstName>" "<LastName>" "<Emp_Id>"  "<tax_id>"  "<grosSalary>"
            And I fill soc_no "123456789123" _postcode "71254" _holidayNumYearly "20" _travelFare "120" _fixed_allowance "100" _dispacher "ali sorumlu" _adress "musik str 10"
        #Then I see there is current date visible in entry date input box before I edit
        Then I see exit date input box is not functional because personal active button is checked
        Then I see netSalary input box is still empty
        Then I click company and choose option quickly transporte gmbh
        Then I click Role and choose option LKW Fahrer
        Then I click Client and choose option Hermes
        Then I click Wage Type and choose option Full_Time
        Then I click Tax Class and choose option 3
        Then I click Health insurance choose Ikk Classic
        Then I click Child allowance and choose 2
        Then I click Chirch Tax and choose evangelishe kirchensteuer
        Then I check buttons of meal allowance taxed_night surcharge_hourly Temp_meal allowance_night surcharge 40_ travel Fahre
        Then I choose payment Type
        Then I see if I filled correctly , calculate salary button becomes functional
        Then I click save changes

        Then I verify the alert warns "Es existiert bereits ein Mitarbeiter mit dieser Nummer!"
        Then I navigate to "https://qugem-staging.netlify.app/employee"
        Then verify that with same "<Emp_Id>" new employee cannot be added




        Examples: Kenan withId 123 added to system before this test , try to add again with the same id again

            | firstName | LastName | Emp_Id | tax_id | grosSalary |
            | Kenan     | withId   | 123    | 12345  | 3000       |
            | Mehmet    | tester   | 123    | 23454  | 3000       |
            | Ersan     | tester   | 123    | 34356  | 3000       |





    Scenario Outline: Try to add a new employee with an tax Id which another employee has it already

        Then I click the employee add button
            And I click active check button
        When I fill "<firstName>" "<LastName>" "<Emp_Id>"  "<tax_id>"  "<grosSalary>"
            And I fill soc_no "123456789123" _postcode "71254" _holidayNumYearly "20" _travelFare "120" _fixed_allowance "100" _dispacher "ali sorumlu" _adress "musik str 10"
        #Then I see there is current date visible in entry date input box before I edit
        Then I see exit date input box is not functional because personal active button is checked
        Then I see netSalary input box is still empty
        Then I click company and choose option quickly transporte gmbh
        Then I click Role and choose option LKW Fahrer
        Then I click Client and choose option Hermes
        Then I click Wage Type and choose option Full_Time
        Then I click Tax Class and choose option 3
        Then I click Health insurance choose Ikk Classic
        Then I click Child allowance and choose 2
        Then I click Chirch Tax and choose evangelishe kirchensteuer
        Then I check buttons of meal allowance taxed_night surcharge_hourly Temp_meal allowance_night surcharge 40_ travel Fahre
        Then I choose payment Type
        Then I see if I filled correctly , calculate salary button becomes functional
        Then I click save changes

        Then I navigate to "https://qugem-staging.netlify.app/employee"
        Then I use no filter and write "<Emp_Id>" and verify it brings to the first row employee "<firstName>" and "<LastName>"
        Then I should not see the new employee added using another employee tax id  "<firstName>" "<LastName>" added to system

        Examples: this tax id belongs to another employee (Kenan withId 123) too, let's see if new employee is added in this case

            | firstName | LastName | Emp_Id | tax_id | grosSalary |
            | Mehmet    | tester   | 52     | 12345  | 3000       |



    Scenario Outline: Scenario Outline name:As a user , if I click Lines per page "<number_chosen>" 10, 25 and 50 , number of the rows in employee table it should bring correctly
        When I check if Lines per page select button is functional and visible
        Then I click "<number_chosen>" employee choose in Lines Per Page
            And I verify the number of rows in employee table is not more than the "<number_chosen>"
        Then I verify next page button is visible and clickable
        Then I click employee table next page button , and verify number of rows are not more than "<number_chosen>"
        Then I click previous page button is visible and clickable
        Then I click employee table previous page button , and verify number of rows are not more than "<number_chosen>"

        Examples:the numbers in line per page in employee master data table
            | number_chosen |
            | 10            |
            | 25            |
            | 50            |

    @only
    Scenario Outline: add an employee , name and surname has numbers
        Then I click the employee add button
            And I click active check button
        When I fill "<firstName>" "<LastName>" "<Emp_Id>"  "<tax_id>"  "<grosSalary>"
            And I fill soc_no "123456789123" _postcode "71254" _holidayNumYearly "20" _travelFare "120" _fixed_allowance "100" _dispacher "ali sorumlu" _adress "musik str 10"
        #Then I see there is current date visible in entry date input box before I edit
        Then I see exit date input box is not functional because personal active button is checked
        Then I see netSalary input box is still empty
        Then I click company and choose option quickly transporte gmbh
        Then I click Role and choose option LKW Fahrer
        Then I click Client and choose option Hermes
        Then I click Wage Type and choose option Full_Time
        Then I click Tax Class and choose option 3
        Then I click Health insurance choose Ikk Classic
        Then I click Child allowance and choose 2
        Then I click Chirch Tax and choose evangelishe kirchensteuer
        Then I check buttons of meal allowance taxed_night surcharge_hourly Temp_meal allowance_night surcharge 40_ travel Fahre
        Then I choose payment Type
        Then I see if I filled correctly , calculate salary button becomes functional
        Then I click save changes
        Then I verify the alert says "Employee was added successfully"
        Then I wait for the Url "https://qugem-staging.netlify.app/employee/"
        Then I dont see , if  "<firstName>" "<LastName>" appears in the employee table with numbers


        Examples:

            | firstName  | LastName | Emp_Id | tax_id | grosSalary |
            | Mehmet1235 | tester   | 300    | 7345   | 3000       |
            | Ersan1234  | tester   | 301    | 86573  | 3000       |
            | 1234567    | tester   | 302    | 98564  | 3000       |
