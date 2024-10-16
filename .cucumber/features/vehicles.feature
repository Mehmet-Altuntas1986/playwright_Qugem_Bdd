
Feature: Vehicles Module functionality

    Background:cfbdc
        Given Navigate to Dashboard with "english" language
        Then verify that dashboard page tab name contains QUGEM
        When click to Vehicles module
        Then delete if a vehicle is added for test purpose ,Vehicle plate is "TE ST 3000"

    Scenario Outline:Adding a vehicle and verifying alert message that shows the vehicle is added
        Then click add vehicle button
        Then fill in the input boxes of "<Plate>" , "<Brand>" , "<Model>","<type>","<Year_of_construction>" "<Year_of_the_purchase>" , "<current_kilometer>" and "<purchase_price>"
        Then click save changes in vehicles edit page
        Then verify alert message text is "Vehicle was added successfully.."

        Examples:
            | Plate      | Brand    | Model | type | Year_of_construction | Year_of_the_purchase | current_kilometer | purchase_price |
            | TE ST 3000 | Mercedes | A3    | LKW  | 2012                 | 2015                 | 100000            | 20000          |


Scenario Outline:Adding a vehicle and verifying added vehicle is seen if we use filters and the data is seen in vehicle list page
        Then click add vehicle button
        Then fill in the input boxes of "<Plate>" , "<Brand>" , "<Model>","<type>","<Year_of_construction>" "<Year_of_the_purchase>" , "<current_kilometer>" and "<purchase_price>"
        Then click save changes in vehicles edit page
        Then verify alert message text is "Vehicle was added successfully.."
        

        Examples:
            | Plate      | Brand    | Model | type | Year_of_construction | Year_of_the_purchase | current_kilometer | purchase_price |
            | TE ST 3000 | Mercedes | A3    | LKW  | 2012                 | 2015                 | 100000            | 20000          |