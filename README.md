Country Capital Quiz:
---------------------

This project is a React-based quiz application that tests users on their knowledge of country capitals. Users can enter their name, select an avatar, and then answer multiple-choice questions about the capitals of different countries.

Technologies Used:
-------------------
React: A JavaScript library for building user interfaces.
Axios: A promise-based HTTP client for making requests to the REST Countries API.
REST Countries API: Provides information about countries, such as names, capitals, and currencies.
CSS: For styling the application.
React Confetti: For adding celebratory confetti effects on achieving high scores.
React Use: For handling the window size to display confetti correctly.

Approach Taken:
---------------
Component Structure

App Component: The main component that manages the state and renders either the PlayerForm or the Quiz component based on whether the player has been set.
PlayerForm Component: Handles user input for player details, such as name and avatar selection.
Quiz Component: Manages the quiz flow, including displaying questions, handling answers, and showing results.
Question Component: Renders individual questions and manages the selection and validation of answers.
Result Component: Displays the user's score and a congratulatory message along with confetti for high scores.
Data Fetching and Handling
Data Fetching: The App component fetches country data from the REST Countries API and processes it to create quiz questions.
Question Generation: The fetched country data is filtered, shuffled, and then used to generate multiple-choice questions. Each question includes the correct capital and three random incorrect options.

State Management
-----------------
App Component State:
quizQuestions: Stores the quiz questions.
loading: Indicates if the data is being loaded.
player: Stores the player's information.
Quiz Component State:
currentQuestionIndex: Tracks the current question number.
score: Tracks the player's score.
showResult: Indicates whether to display the result screen.

Usage Instructions :
--------------------
Start the Application: When the application loads, enter your name and select an avatar on the player form.
Begin the Quiz: After submitting the player form, the quiz starts with the first question.
Answer Questions: Click on the option that you believe is the correct capital for the given country. You will receive feedback on whether your choice was correct or not.
View Results: After answering all questions, view your score and see a message based on your performance.
Restart Quiz: Click the "Restart Quiz" button to start a new quiz with different questions.


link to live site:
------------------

https://jazzy-quokka-672b25.netlify.app/

No Unsolved problems.