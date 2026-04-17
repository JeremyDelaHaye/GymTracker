let exercises = []

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
    });

    
}

function addExersize()
{   
    let exercise = 
    {
        name: document.getElementById("exersizeName").value,
        sets: document.getElementById("setNum").value,
        reps: document.getElementById("repNum").value
    }

    exercises.push(exercise)
    /*

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
    */
}

function createWorkout()
{
    fetch('api.php',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({action: 'save_workout', name: document.getElementById("workoutName").value})   
        }
    )
    .then(response => response.text())
    .then(result => 
    {
        let workoutId = parseInt(result);

        for(let i = 0; i < exercises.length; i++)
        {
            fetch('api.php',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    action: 'save_exersize',
                    workout_id: workoutId,
                    name: exercises[i].name,
                    planned_sets: exercises[i].sets,
                    planned_reps: exercises[i].reps
                })
            })   
        }
    });

    alert('Workout added!')
}

