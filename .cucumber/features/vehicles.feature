#this feature is flaky if we use parallel test
@mode:serial  
Feature: Vehicles Module functionality

    Background:Before each test, delete the vehicle added for test purpose and make all tests independent to each other

        Given Navigate to Dashboard with "english" language
        Then verify that dashboard page tab name contains QUGEM
        When click to Vehicles module
        Then delete if a vehicle is added for test purpose ,Vehicle plate is "TE ST 3000"


    Scenario Outline:034_Adding a vehicle and verifying alert message that shows the vehicle is added
        Then click add vehicle button
        Then fill in the input boxes of "<Plate>" , "<Brand>" , "<Model>","<type>","<Year_of_construction>" "<Year_of_the_purchase>" , "<current_kilometer>" and "<purchase_price>"
        When click save changes in vehicles edit page
        Then verify alert message text is "Vehicle was added successfully.."

        Examples:
            | Plate      | Brand    | Model | type | Year_of_construction | Year_of_the_purchase | current_kilometer | purchase_price |
            | TE ST 3000 | Mercedes | A3    | LKW  | 2012                 | 2015                 | 100000            | 20000          |



    Scenario Outline:035_Adding a vehicle and verifying added vehicle data is seen if we use filters and the data is seen in vehicle list page

        Then click add vehicle button
        Then fill in the input boxes of "<Plate>" , "<Brand>" , "<Model>","<type>","<Year_of_construction>" "<Year_of_the_purchase>" , "<current_kilometer>" and "<purchase_price>"
        When click save changes in vehicles edit page
        Then verify alert message text is "Vehicle was added successfully.."
        Then verify you are in Vehicle Details Page
        Then verify the data is visible "<Plate>" , "<Brand>" , "<Model>","<type>","<Year_of_construction>" "<Year_of_the_purchase>" , "<current_kilometer>" and "<purchase_price>"


        Examples:
            | Plate      | Brand    | Model | type | Year_of_construction | Year_of_the_purchase | current_kilometer | purchase_price |
            | TE ST 3000 | Mercedes | A3    | LKW  | 2012                 | 2015                 | 50000             | 10000          |




    Scenario Outline: 036_add a vehicle ,then verify its data comes to filter table correctly
        Then click add vehicle button
        Then fill in the input boxes of "<Plate>" , "<Brand>" , "<Model>","<type>","<Year_of_construction>" "<Year_of_the_purchase>" , "<current_kilometer>" and "<purchase_price>"
        When click save changes in vehicles edit page
        Then verify alert message text is "Vehicle was added successfully.."
        Then I navigate to vehicles Module "https://qugem-staging.netlify.app/auto"
        Then I write in the filter "<Plate>"
        Then I verify "<Plate>" , "<Brand>" , "<Model>" and "<type>" of the vehicle is visible

        Examples:
            | Plate      | Brand    | Model | type     | Year_of_construction | Year_of_the_purchase | current_kilometer | purchase_price |
            | TE ST 3000 | Mercedes | A5    | Sprinter | 2015                 | 2016                 | 100000            | 20000          |


    Scenario Outline:037_verify driver is empty and status is idle if you did not assign any driver to the Vehicle
        Then click add vehicle button
        Then fill in the input boxes of "<Plate>" , "<Brand>" , "<Model>","<type>","<Year_of_construction>" "<Year_of_the_purchase>" , "<current_kilometer>" and "<purchase_price>"
        When click save changes in vehicles edit page
        Then verify alert message text is "Vehicle was added successfully.."
        Then I navigate to vehicles Module "https://qugem-staging.netlify.app/auto"
        Then I write in the filter "<Plate>"
        Then I verify vehicle has no driver and the status of vehicle is idle in Vehicle List Page
            | driver | status |
            |        | Idle   |

        Examples:
            | Plate      | Brand    | Model | type     | Year_of_construction | Year_of_the_purchase | current_kilometer | purchase_price |
            | TE ST 3000 | Mercedes | A5    | Sprinter | 2015                 | 2016                 | 100000            | 20000          |


    Scenario Outline:038_verify if you click usage after adding a vehicle , you see plate, name of vehicle and model of the vehicle
        Then click add vehicle button
        Then fill in the input boxes of "<Plate>" , "<Brand>" , "<Model>","<type>","<Year_of_construction>" "<Year_of_the_purchase>" , "<current_kilometer>" and "<purchase_price>"
        When click save changes in vehicles edit page
        Then verify alert message text is "Vehicle was added successfully.."
        Then I navigate to vehicles Module "https://qugem-staging.netlify.app/auto"
        Then I write in the filter "<Plate>"
        Then I click usage button
        Then I see the "<Plate>", "<Brand>", and "<Model>" of the vehicle before assigning a driver to the vehicle.
        Then I verify there are header like below:
            | Nr | Driver | Start Date | End Date | Start Kilometer | End Kilometer | Distance |


        Examples:
            | Plate      | Brand    | Model | type     | Year_of_construction | Year_of_the_purchase | current_kilometer | purchase_price |
            | TE ST 3000 | Mercedes | A5    | Sprinter | 2015                 | 2016                 | 100000            | 20000          |



    Scenario Outline: 039_Verify added drivers BY clicking usage button and filling input boxes
        Then click add vehicle button
        Then fill in the input boxes of "<Plate>" , "<Brand>" , "<Model>","<type>","<Year_of_construction>" "<Year_of_the_purchase>" , "<current_kilometer>" and "<purchase_price>"
        When click save changes in vehicles edit page
        Then verify alert message text is "Vehicle was added successfully.."
        Then I navigate to vehicles Module "https://qugem-staging.netlify.app/auto"
        Then I write in the filter "<Plate>"
        Then I click usage button
        Then I see the "<Plate>", "<Brand>", and "<Model>" of the vehicle before assigning a driver to the vehicle.
        Then I verify there are header like below:
            | Nr | Driver | Start Date | End Date | Start Kilometer | End Kilometer | Distance |

        Then I click add button and fill the input boxes with the data below:
            | driver1       | driver2           | Start_Date | start_km |
            | Robert Slomka | Miroslav Kiisyov  | 2024-12-18 | 55000    |
            



        Examples:
            | Plate      | Brand    | Model | type     | Year_of_construction | Year_of_the_purchase | current_kilometer | purchase_price |
            | TE ST 3000 | Mercedes | A5    | Sprinter | 2015                 | 2016                 | 100000            | 20000          |

