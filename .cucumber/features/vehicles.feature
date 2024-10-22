<<<<<<< HEAD
#this feature is flaky if we use parallel test 
# @mode:serial
  
=======
#this feature is flaky if we use parallel test
@mode:serial @retry:1
>>>>>>> 1223ca66ede00c7a0d59360116903c910a0112d8
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


    Scenario Outline: verify driver is empty and status is idle if you did not assign any driver to the Vehicle
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

@only
    Scenario Outline: verify if you click usage after adding a vehicle , you see plate, name of vehicle and model of the vehicle
        Then click add vehicle button
        Then fill in the input boxes of "<Plate>" , "<Brand>" , "<Model>","<type>","<Year_of_construction>" "<Year_of_the_purchase>" , "<current_kilometer>" and "<purchase_price>"
        When click save changes in vehicles edit page
        Then verify alert message text is "Vehicle was added successfully.."
        Then I navigate to vehicles Module "https://qugem-staging.netlify.app/auto"
        Then I write in the filter "<Plate>"
        Then I click usage button
        Then I see the "<Plate>", "<Brand>", and "<Model>" of the vehicle before assigning a driver to the vehicle.
<<<<<<< HEAD
        Then I verify there are header like below:
            | Nr | Driver | Start Date | End Date | Start Kilometer | End Kilometer | Distance |
=======


>>>>>>> 1223ca66ede00c7a0d59360116903c910a0112d8
        Examples:
            | Plate      | Brand    | Model | type     | Year_of_construction | Year_of_the_purchase | current_kilometer | purchase_price |
            | TE ST 3000 | Mercedes | A5    | Sprinter | 2015                 | 2016                 | 100000            | 20000          |

<<<<<<< HEAD


    Scenario Outline: 039_Verify added drivers by clicking usage button and filling input boxes
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
            | driver1       | driver2          | Start_Date | start_km |
            | Robert Slomka | Miroslav Kiisyov | 2024-12-18 | 55000    |
        Examples:
            | Plate      | Brand    | Model | type     | Year_of_construction | Year_of_the_purchase | current_kilometer | purchase_price |
            | TE ST 3000 | Mercedes | A5    | Sprinter | 2015                 | 2016                 | 100000            | 20000          |


    Scenario Outline: 040_Verify vehicle edit in vehicle Details page works as expected
        Then click add vehicle button
        Then fill in the input boxes of "<Plate>" , "<Brand>" , "<Model>","<type>","<Year_of_construction>" "<Year_of_the_purchase>" , "<current_kilometer>" and "<purchase_price>"
        When click save changes in vehicles edit page
        Then verify alert message text is "Vehicle was added successfully.."
        Then verify the actual page url contains this part of the URL "https://qugem-staging.netlify.app/auto/details/"
        Then click edit button in vehicle details page
        Then change Brand to "Toyota"
        Then change Model to "X40"
        Then click save changes button in vehicle details page
        Then verify the actual page url contains this part of the URL "https://qugem-staging.netlify.app/auto/details/"
        Then verify the changed row headers have values in vehicle details page like below:
            | Brand  | Model |
            | Toyota | X40   |
        Then I navigate to vehicles Module "https://qugem-staging.netlify.app/auto"
        Then I write in the filter "<Plate>"
        Then I verify first row with "<Plate>" has Brand name "Toyota" and Model name "X40"

        Examples:
            | Plate      | Brand    | Model | type | Year_of_construction | Year_of_the_purchase | current_kilometer | purchase_price |
            | TE ST 3000 | Mercedes | A3    | LKW  | 2012                 | 2015                 | 100000            | 20000          |


    Scenario Outline: 041_ verify we cannot add drivers if they are not found in employee master data
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
            | Robert Robert | Miroslav Miroslav | 2024-12-18 | 55000    |

        Then verify the actual page url contains this part of the URL "https://qugem-staging.netlify.app/auto"
        Then I write in the filter "<Plate>"
        Then I verify first row with "<Plate>" has Brand name "<Brand>" and Model name "<Model>"
        Then verify vehicle status is not "Idle"
        Then verify driver names are correctly visible in the first row:
            | driver1       | driver2           |
            | Robert Robert | Miroslav Miroslav |


        Examples:
            | Plate      | Brand    | Model | type     | Year_of_construction | Year_of_the_purchase | current_kilometer | purchase_price |
            | TE ST 3000 | Mercedes | A5    | Sprinter | 2015                 | 2016                 | 100000            | 20000          |



=======
>>>>>>> 1223ca66ede00c7a0d59360116903c910a0112d8
