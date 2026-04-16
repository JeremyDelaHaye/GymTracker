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
?>