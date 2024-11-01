import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native';
import { StatusBar } from "react-native";

export default function App() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      image: require('./img/crocodile.jpg'),
      question: 'What animal is this?',
      options: ['Monkey', 'Giraffe', 'Crocodile'],
      correctAnswer: 2,
    },
    {
      image: require('./img/tiger.jpg'),
      question: 'What animal is this?',
      options: ['Bear', 'Tiger', 'Wolf'],
      correctAnswer: 1,
    },
    {
      image: require('./img/elephant.jpg'),
      question: 'What animal is this?',
      options: ['Kangaroo', 'Elephant', 'Koala'],
      correctAnswer: 1,
    },
    {
      image: require('./img/turtle.jpg'),
      question: 'What animal is this?',
      options: ['Cow', 'Rocket', 'Turtle'],
      correctAnswer: 2,
    },
    {
      image: require('./img/peacock.jpg'),
      question: 'What animal is this?',
      options: ['Worm', 'Peacock', 'Fly'],
      correctAnswer: 1,
    },
  ];

  const submitAnswers = () => {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      const correctAnswer = questions[i].options[questions[i].correctAnswer];
      if (selectedAnswers[i] === questions[i].correctAnswer) {
        score++;
      }
    }
    let feedback;
    if (score >= 4) {
      feedback = 'Well done! You scored a perfect score!';
    } else if (score >= 2) {
      feedback = 'Good job! You scored above average.';
    } else {
      feedback = 'You can do better next time. Better luck next time!';
    }
    Alert.alert('Quiz Results', `You scored ${score} out of ${questions.length}! ${feedback}`);
    resetQuiz();
  };


  const resetQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestion(0);
    setCorrectAnswers(0);
  };

  const handleAnswerSelected = (answer, questionIndex) => {
    setSelectedAnswers((prevAnswers) => ({ ...prevAnswers, [questionIndex]: answer }));
  };

  return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>ZK's Animal Quiz</Text>
        <ScrollView>
          {questions.map((question, index) => (
              <View key={index}>
                <Image source={question.image} style={styles.image} />
                <Text style={styles.question}>{question.question}</Text>
                <Picker
                    selectedValue={selectedAnswers[index]}
                    onValueChange={(answer) => handleAnswerSelected(answer, index)}
                    style={styles.picker}
                >
                  {question.options.map((option, index) => (
                      <Picker.Item label={option} value={index} key={index} />
                  ))}
                </Picker>
              </View>
          ))}
          <Button title="Submit" onPress={submitAnswers} style={styles.button} />
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bfec60',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 10,
  },
  question: {
    fontSize: 20,
    marginBottom: 10,
  },
  picker: {
    width: 200,
    height: 50,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
