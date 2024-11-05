
Feature:Testing Navigation Success with valid and invalid credentials

  Background:
    Given  Navigate to Login Page
  @passed
  Scenario:002-verify user logs In, Navigates to Dashboard, and Logs Out

    Then Enter a valid email
    Then Enter a valid password
    Then Click the login button after choosing english language
      And  Verify that user is now on the Dasboard Page url after clicking login
    Then verify that dashboard page tab name contains QUGEM
    Then Click the sign out button and verify you are in sign in page again

  @failed
  Scenario Outline:003-004 verify user cannot login with invalid passwords and valid email
    Then Enter a valid email
    Then Enter an invalid "<password>"
    Then Click the login button with "english" language
      And  Verify that user is not on the Dasboard Page because login is not successfull
      And  verify user gets right alert warning if invalid password and valid email used in right language

    Examples:
      | password |
      | 123txt_  |
      | 1234567  |

  @passed
  Scenario Outline:005-007 verify user cannot login with a short password less than 6 characters
    Then Enter a valid email
    Then Enter an invalid "<shortpassword>"
    Then choose the "<langauge>" in loginPage
    Then verify login button is functional
    Then press enter button on keyboard
    And verify that user gets an alert for pasword and alert is in right language "<alert>"


    Examples:
      | shortpassword | langauge | alert                               |
      | wd32          | english  | Must be at least 6 characters long  |
      | 12345         | türkish  | En az 6 karakter olmalıdır          |
      | abc           | german   | Muss mindestens 6 Zeichen lang sein |

