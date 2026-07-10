const readline = require('readline');

const scenarios = [
  {
    title: 'Missing Variable Assignment',
    description: 'A welcome message is failing because a variable is used before it has a value.',
    error: 'ReferenceError: userName is not defined',
    options: [
      'Check whether the variable is declared before it is used',
      'Delete the message and try again later',
      'Ignore the error and keep going'
    ],
    correct: 1,
    feedback: 'Correct! The bug happens because the variable was never created before the code used it.'
  },
  {
    title: 'Typo in a Property Name',
    description: 'The app is trying to read a user profile field, but the property name is spelled incorrectly.',
    error: 'TypeError: Cannot read properties of undefined (reading \'name\')',
    options: [
      'Check the object property name and fix the typo',
      'Restart the application',
      'Add extra spaces to the code'
    ],
    correct: 1,
    feedback: 'Correct! A small typo in the property name caused the app to look for the wrong value.'
  },
  {
    title: 'Wrong Comparison Operator',
    description: 'A login rule is not working because the code uses the wrong comparison operator.',
    error: 'The app says everyone is under 18 even when they are older.',
    options: [
      'Use the correct comparison operator for the check',
      'Change the error message',
      'Delete the age check completely'
    ],
    correct: 1,
    feedback: 'Correct! The comparison logic needed to be fixed so the rule behaves properly.'
  },
  {
    title: 'Misspelled Function Name',
    description: 'A helper function is called with the wrong name, so the program cannot find it.',
    error: 'TypeError: fetchProfile is not a function',
    options: [
      'Check the function name and use the same spelling',
      'Copy the code into a new file',
      'Comment out the call and hope it works'
    ],
    correct: 1,
    feedback: 'Correct! The function name was misspelled, so the program could not call it.'
  },
  {
    title: 'Wrong File Path',
    description: 'The app is trying to read a file, but the path points to the wrong location.',
    error: 'ENOENT: no such file or directory, open \'data.json\'',
    options: [
      'Verify the file path and make sure the file exists',
      'Guess a new file name',
      'Ignore the missing file'
    ],
    correct: 1,
    feedback: 'Correct! The problem was a missing or incorrect file path.'
  }
];

function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

async function runGame() {
  const rl = createInterface();
  console.log('Welcome to the Bug Fix Assistant Simulator!');
  console.log('You will see a bug, choose the best debugging action, and build your score.');
  console.log('');

  let score = 0;

  for (let index = 0; index < scenarios.length; index += 1) {
    const scenario = scenarios[index];

    console.log(`Scenario ${index + 1} of ${scenarios.length}`);
    console.log(`Bug: ${scenario.title}`);
    console.log(`What the app says: ${scenario.error}`);
    console.log(`Hint: ${scenario.description}`);
    console.log('Choose the best action:');

    scenario.options.forEach((option, optionIndex) => {
      console.log(`${optionIndex + 1}. ${option}`);
    });

    let choice = '';
    while (!['1', '2', '3'].includes(choice)) {
      choice = await askQuestion(rl, 'Enter 1, 2, or 3: ');
      if (!['1', '2', '3'].includes(choice)) {
        console.log('Please enter 1, 2, or 3.');
      }
    }

    const selectedOption = Number(choice);
    if (selectedOption === scenario.correct) {
      score += 1;
      console.log('Correct! ' + scenario.feedback);
    } else {
      console.log('Not quite. ' + scenario.feedback);
    }

    console.log(`Score: ${score}/${index + 1}`);
    console.log('');
  }

  console.log('Final Summary');
  console.log('-------------');
  console.log(`You finished the game with a score of ${score}/${scenarios.length}.`);

  if (score === scenarios.length) {
    console.log('Amazing work! You spotted every bug.');
  } else if (score >= scenarios.length / 2) {
    console.log('Nice job! You are getting better at debugging.');
  } else {
    console.log('Keep practicing. Every bug you fix helps you learn.');
  }

  rl.close();
}

runGame().catch((error) => {
  console.error('Something went wrong:', error);
  process.exit(1);
});
