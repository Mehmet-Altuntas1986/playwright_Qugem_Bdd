

Feature:Employee Master Data Module functionality
   
    Background: Navigation to the Employee Master Data module and the removal of employees with the surname 'tester' or 'developer' were added for testing purposes.
        Given Navigate to Dashboard with "english" language
        Then verify that dashboard page tab name contains QUGEM
        When I click the Employee_Master_data module
        When I select "GESAMT FIRMEN" using the company selection button, and choose "All" using the client selection button"
        When I delete if in any row, surname column text is tester or developer
        Then verify if you write tester or developer in filter surname, row1 is invisible
        Then I delete all filter sections to start every test Scenario with a clear filter



    Scenario Outline: Verify Employee First Name Filter Functionality
        Given I verify that the Employees table title is visible
        Then I verify that the "company" and "client" selection buttons are visible and functional
        Then I enter "<firstNameInFilter>" in the employee search field
        When verify the employee name "<firstNameInFilter>" should be visible in the first row of the table
        Then I delete the Filter input
        Then verify "<firstNameInFilter>" should not be in the first row

        Examples:
            | firstNameInFilter |
            | Gyulyustan        |


    Scenario: Verify Visibility and Clickability of Company Dropdown Elements
        When I click the company dropdown
        Then all companies in dropdown are visible and clickable


    Scenario: Verify Visibility and Clickability of Client Companies Dropdown Elements
        When I click the client companies dropdown button
        Then I see client companies are visible and clickable

@timeout:90000
    Scenario Outline: Add and Delete Employees with Valid Data
        When I click the employee add button
        Then I click active check button
        Then I fill "<firstName>" "<LastName>" "<Emp_Id>"  "<tax_id>"  "<grosSalary>"
        When I fill soc_no "123456789123" _postcode "71254" _holidayNumYearly "20" _travelFare "120" _fixed_allowance "100" _dispacher "ali sorumlu" _adress "musik str 10"
        Then I see there is current date visible in entry date input box before I edit
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


@timeout:90000
    Scenario Outline: Adding one personal with acceptable data and verifying employee saved and employee data is seen in employee master data page

        When I click the employee add button
        Then I click active check button
        Then I fill "<firstName>" "<LastName>" "<Emp_Id>"  "<tax_id>"  "<grosSalary>"
        When I fill soc_no "123456789123" _postcode "71254" _holidayNumYearly "20" _travelFare "120" _fixed_allowance "100" _dispacher "ali sorumlu" _adress "musik str 10"
        Then I see there is current date visible in entry date input box before I edit
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


    Scenario Outline: Attempt to Add an Employee with a Duplicate Employee ID

        When I click the employee add button
        Then I click active check button
        Then I fill "<firstName>" "<LastName>" "<Emp_Id>"  "<tax_id>"  "<grosSalary>"
        When I fill soc_no "123456789123" _postcode "71254" _holidayNumYearly "20" _travelFare "120" _fixed_allowance "100" _dispacher "ali sorumlu" _adress "musik str 10"
        Then I see there is current date visible in entry date input box before I edit
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




        Examples: Kenan with ID 123 added to the system prior to this test, attempt to add again with the same ID.

            | firstName | LastName | Emp_Id | tax_id | grosSalary |
            | Mehmet    | tester   | 123    | 23454  | 3000       |
            | Ersan     | tester   | 123    | 34356  | 3000       |





    Scenario Outline: Attempt to Add an Employee with a Duplicate Tax ID

        When I click the employee add button
        Then I click active check button
        Then I fill "<firstName>" "<LastName>" "<Emp_Id>"  "<tax_id>"  "<grosSalary>"
        When I fill soc_no "123456789123" _postcode "71254" _holidayNumYearly "20" _travelFare "120" _fixed_allowance "100" _dispacher "ali sorumlu" _adress "musik str 10"
        Then I see there is current date visible in entry date input box before I edit
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



    Scenario Outline: As a user, if I click Lines per page "<number_chosen>", the number of rows in the employee table should reflect the correct count.
        When I check if Lines per page select button is functional and visible
        Then I click "<number_chosen>" employee choose in Lines Per Page
        Then I verify the number of rows in employee table is not more than the "<number_chosen>"
        Then I verify next page button is visible and clickable
        Then I click employee table next page button , and verify number of rows are not more than "<number_chosen>"
        Then I click previous page button is visible and clickable
        Then I click employee table previous page button , and verify number of rows are not more than "<number_chosen>"

        Examples:the numbers in line per page in employee master data table
            | number_chosen |
            | 10            |
            | 25            |
            | 50            |

@timeout:90000
    Scenario Outline: Add an employee with name contain numbers
        When I click the employee add button
        Then I click active check button
        Then I fill "<firstName>" "<LastName>" "<Emp_Id>"  "<tax_id>"  "<grosSalary>"
        When I fill soc_no "123456789123" _postcode "71254" _holidayNumYearly "20" _travelFare "120" _fixed_allowance "100" _dispacher "ali sorumlu" _adress "musik str 10"
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


        Examples: Names with numbers or completely numeric values representing names

            | firstName  | LastName | Emp_Id | tax_id | grosSalary |
            | Mehmet1235 | tester   | 300    | 7345   | 3000       |
            | Ersan1234  | tester   | 301    | 86573  | 3000       |
            | 1234567    | tester   | 302    | 98564  | 3000       |


    Scenario Outline: verify employee id cant have alphabetic characters

        When I click the employee add button
        Then I verify employee id input does not accept alphabetic values: "<id_no>" and "<warning_message>"


        Examples:if employee id is alphabetic

            | id_no  | warning_message                        |
            | abc    | employeeNumber must be a `number` type |
            | 123abc | employeeNumber must be a `number` type |


    Scenario: verify employee id can be a so long number
        Then I navigate to "https://qugem-staging.netlify.app/employee"
        Then I find an existing employee with filter , name is "mehmet" and lastname is "Abusoglu"
        Then I click edit button
        Then I fill employee id with a very long numeric value "123456789098765432181234"
        Then I click save changes
        Then verify we dont see an alert employee "was updated successfully"



    Scenario: verify necessary input box fields warns you if you dont fill and click save
        When I click the employee add button
        Then I click save changes
        Then verify if adress is not filled , warning message is "This field is required"
        Then verify if Postal Code is not filled , warning message is "This field is required"
        Then verify if First Name is not filled , warning message is "This field is required"
        Then verify if Last Name is not filled , warning message is "This field is required"
        Then verify if adress is not filled , warning message is "This field is required"


    Scenario Outline: verify social security number cannot be less or more than _12_ characters
        When I click the employee add button
        Then I fill social security number "<values>"
        Then I click save changes
        Then I verify social security number cannot be less or more than _12_ characters :"<warning_message>"

        Examples:
            | values                  | warning_message                        |
            | 1234567                 | Must be at least 12 characters long    |
            | 123sdfsadfsdgfsdgdgsedg | Cannot be more than 12 characters long |



    Scenario Outline:verify Tax_id field cannot be more than 11 characters long and only accepts numeric value
        When I click the employee add button
        Then I fill tax_id input box with :"<values>"
        Then I click save changes
        Then I verify tax cannot be more than _11_ characters long or accepts alphaphetic characters : "<warning_message>"

        Examples:
            | values                      | warning_message                        |
            | 123456789123456789123456789 | Cannot be more than 11 characters long |
            | 1234abcd                    | Cast to Number failed for value        |












