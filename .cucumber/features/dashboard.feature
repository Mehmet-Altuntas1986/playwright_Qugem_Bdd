

Feature:Main Page Modules and their functionality

  Background:

    Given Navigate to Dashboard with "english" language
    Then verify that dashboard page tab name contains QUGEM

  Scenario:004_navigation to Dashboard Module

      And verify DashBoard Module Button is visible and is Clickable
    Then click the Dashboard module
      And verify the URL of the dashboard should be "https://qugem-staging.netlify.app/"
      And I should see the message "Hello, welcome to the QUGEM homepage."


  Scenario:005_navigation to Employee_Master_data module
    Then verify Employee_Master_Data module button is visible and is Clickable

    Then click the Employee_Master_data module
      And verify the URL of the Employee_Master_data module should be "https://qugem-staging.netlify.app/employee"

  Scenario:006_navigation to Employee_Attendance module
    Then verify Employee_Attendance Module Button is visible and is Clickable
    Then click the Employee_Attendance module
      And verify the URL of the Employee_Master_data module module should be "https://qugem-staging.netlify.app/employee/attendance"



  Scenario:007_navigation to Payroll module
    Then verify Payroll Module Button is visible and is clickable
    Then click the Payroll module
      And verify the URL of the Employee_Master_data module module should be "https://qugem-staging.netlify.app/salary"


  Scenario:008_navigation to Vehicles module
    Then verify Vehicles Module Button is visible and is clickable
    Then click the Vehicles module
      And verify the URL of the Employee_Master_data module module should be "https://qugem-staging.netlify.app/auto"



  Scenario:009_navigation to Admin_Users module
    Then verify Admin Module Button is visible and is clickable
    Then click the Admin Module
    Then verify Users module button is visible and clickable
      And click the Users Module
      And verify the URL of the Users module should be "https://qugem-staging.netlify.app/admin/users"

  Scenario:010_navigation to Admin_Options module
      And verify Admin Module Button is visible and is clickable
    Then click the Admin Module
    Then verify Options module button is visible and clickable
      And click the Options Module
      And verify the URL of the Options module should be "https://qugem-staging.netlify.app/admin/options"


  Scenario:011_navigation to Admin_Holidays module
      And verify Admin Module Button is visible and is clickable
    Then click the Admin Module
    Then verify Holidays module button is visible and clickable
      And click the Holidays Module
      And verify the URL of the Holidays module should be "https://qugem-staging.netlify.app/admin/holidays"

  Scenario:012_navigation to Admin_Payout_amounts module
      And verify Admin Module Button is visible and is clickable
    Then click the Admin Module
    Then verify Payout_amounts module button is visible and clickable
      And click the Payout_amounts Module
      And verify the URL of Payout_amounts module should be "https://qugem-staging.netlify.app/admin/payoutAmounts"


  Scenario:013_navigation to Quickly_Gmbh module
    Then verify Quickly_Gmbh Module Button is visible and is clickable
    Then click the Quickly_Gmbh Module
    And verify new opened Tab title contains "Quickly Transporte GmbH"
    And verify the Quickly_Gmbh URL should be "https://quicklygmbh.de/"


  Scenario:014_navigation to Kinesis GPS module
    Then verify Kinesis GPS Module Button is visible and is clickable
    Then click the Kinesis GPS Module
    And verify new opened Tab contains "Radius Velocity"
    And verify the URL should contain "https://www.velocityfleet.com/"


  Scenario:015_click module
    Then click module "admin_btn"
