<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
require_once 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$action = $data['action'];

if ($action === 'save_workout') 
{
    $stmt = $conn->prepare("INSERT INTO workouts (name) VALUES (:name)");
    $stmt->execute([':name' => $data['name']]);
    echo $conn->lastInsertId();
}

if ($action === 'get_workouts') 
{
    $stmt = $conn->prepare("SELECT * FROM workouts");
    $stmt->execute();
    echo json_encode($stmt->fetchAll());
}

if ($action === 'save_exersize') 
{
   $stmt = $conn->prepare("INSERT INTO exercises (workout_id, name, planned_sets, planned_reps) VALUES (:workout_id, :name, :planned_sets, :planned_reps)");
   $stmt->execute([
    ':workout_id' => $data['workout_id'],
    ':name' => $data['name'],
    ':planned_sets' => $data['planned_sets'],
    ':planned_reps' => $data['planned_reps']
    ]);
}

if ($action === 'get_exersizes')
{
    $stmt = $conn->prepare("SELECT * FROM exercises WHERE workout_id = :workout_id");
    $stmt->execute([':workout_id' => $data['workout_id']]);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

if ($action === 'save_session')
{
    $stmt = $conn->prepare("INSERT INTO sessions (workout_id, date) VALUES (:workout_id, :date)");
    $stmt->execute([
        ':workout_id' => $data['workout_id'],
        ':date' => date('Y-m-d')
    ]);
    echo $conn->lastInsertId();
}

if ($action === 'save_session_set')
{
    $stmt = $conn->prepare("INSERT INTO session_sets (session_id, exercise_id, set_number, rep_number, weight, completed) VALUES (:session_id, :exercise_id, :set_number, :rep_number, :weight, :completed)");
    $stmt->execute([
        ':session_id' => $data['session_id'],
        ':exercise_id' => $data['exercise_id'],
        ':set_number' => $data['set_number'],
        ':rep_number' => $data['rep_number'],
        ':weight' => !empty($data['weight']) ? $data['weight'] : 0,
        ':completed' => $data['completed']
    ]);
    echo "Saved!";
}

if ($action === 'get_exercise_history')
{
    $stmt = $conn->prepare("
        SELECT session_sets.weight, session_sets.rep_number, session_sets.set_number, sessions.date
        FROM session_sets
        JOIN sessions ON session_sets.session_id = sessions.id
        WHERE session_sets.exercise_id = :exercise_id
        ORDER BY sessions.date ASC
    ");
    $stmt->execute([':exercise_id' => $data['exercise_id']]);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

?>