let workoutId;

function addWorkout()
{
    let workoutName = document.getElementById("workoutName").value
    fetch('api.php',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({action: 'save_workout',name: workoutName})   
        }
    )
    .then(response => response.text())
    .then(result => 
    {
        workoutId = parseInt(result);
        console.log(workoutId);
    });

    
}

function addExersize()
{
    let exersizeName = document.getElementById("exersizeName").value
    let sets = document.getElementById("setNum").value
    let reps = document.getElementById("repNum").value

    fetch('api.php',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                action:'save_exersize',
                workout_id: workoutId,
                name: exersizeName,
                planned_sets: sets,
                planned_reps: reps
            })
        }
    )
}

