<?php
require_once 'db.php';

// Workouts
$workouts = ['Push', 'Pull', 'Legs'];
$workoutIds = [];

foreach ($workouts as $workout)
{
    $stmt = $conn->prepare("INSERT INTO workouts (name) VALUES (:name)");
    $stmt->execute([':name' => $workout]);
    $workoutIds[$workout] = $conn->lastInsertId();
}

// Exercises
$exercises = 
[
    'Push' => [
        ['Bench Press', 4, 8],
        ['Shoulder Press', 3, 10],
        ['Tricep Pushdown', 3, 12],
        ['Chest Fly', 3, 10]
    ],
    'Pull' => [
        ['Deadlift', 4, 6],
        ['Lat Pulldown', 3, 10],
        ['Bicep Curl', 3, 12],
        ['Cable Row', 3, 10]
    ],
    'Legs' => [
        ['Squat', 4, 8],
        ['Leg Press', 3, 12],
        ['Leg Curl', 3, 12],
        ['Calf Raise', 4, 15]
    ]
];

$exerciseIds = [];

foreach ($exercises as $workout => $list)
{
    foreach ($list as $exercise)
    {
        $stmt = $conn->prepare("INSERT INTO exercises (workout_id, name, planned_sets, planned_reps) VALUES (:workout_id, :name, :planned_sets, :planned_reps)");
        $stmt->execute([
            ':workout_id' => $workoutIds[$workout],
            ':name' => $exercise[0],
            ':planned_sets' => $exercise[1],
            ':planned_reps' => $exercise[2]
        ]);
        $exerciseIds[$exercise[0]] = $conn->lastInsertId();
    }
}

// Sessions - 8 sessions per workout spread over 8 weeks
$dates = [
    '2025-03-01', '2025-03-08', '2025-03-15', '2025-03-22',
    '2025-03-29', '2025-04-05', '2025-04-12', '2025-04-19'
];

foreach ($workouts as $workout)
{
    foreach ($dates as $date)
    {
        $stmt = $conn->prepare("INSERT INTO sessions (workout_id, date) VALUES (:workout_id, :date)");
        $stmt->execute([
            ':workout_id' => $workoutIds[$workout],
            ':date' => $date
        ]);
        $sessionId = $conn->lastInsertId();

        foreach ($exercises[$workout] as $exercise)
        {
            $baseWeight = rand(40, 100);

            $stmt = $conn->prepare("INSERT INTO session_sets (session_id, exercise_id, set_number, rep_number, weight, completed) VALUES (:session_id, :exercise_id, :set_number, :rep_number, :weight, :completed)");
            $stmt->execute([
                ':session_id' => $sessionId,
                ':exercise_id' => $exerciseIds[$exercise[0]],
                ':set_number' => $exercise[1],
                ':rep_number' => $exercise[2],
                ':weight' => $baseWeight + rand(0, 10),
                ':completed' => 1
            ]);
        }
    }
}
echo "Done!";
?>