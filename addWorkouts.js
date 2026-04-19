let exercises = []

function addExersize()
{   
    if (
        inputVal(document.getElementById("exersizeName").value,'')&&
        inputVal(document.getElementById("setNum").value,'')&&
        inputVal(document.getElementById("repNum").value,'')
    )
    {
        
        let exercise = 
        {
            name: document.getElementById("exersizeName").value,
            sets: document.getElementById("setNum").value,
            reps: document.getElementById("repNum").value
        }

        exercises.push(exercise)
        clearExerciseInputs()
        renderExercises()
    }
    else
    {
        alert('All exercise fields must have inputs!')
    }
       
}

function createWorkout()
{
    if(!inputVal(document.getElementById("workoutName").value,'') || !inputVal(exercises.length,0) )
    {   
        alert('All boxes must have inputs')
    }
    else
    {
        fetch('api.php',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({action: 'save_workout', name: document.getElementById("workoutName").value})   
        })
    
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
                    body: JSON.stringify
                    ({
                    action: 'save_exersize',
                    workout_id: workoutId,
                    name: exercises[i].name,
                    planned_sets: exercises[i].sets,
                    planned_reps: exercises[i].reps
                    })
                })   
            }   
            alert('Workout added!')
            clearInputs()
        });
    } 
}

function renderExercises()
{
    let list = document.getElementById("exerciseList")
    list.innerHTML = ""

    for(let i = 0; i < exercises.length; i++)
    {
        let item = document.createElement("li")
        item.textContent = exercises[i].name + " — " + exercises[i].sets + " sets x " + exercises[i].reps + " reps"
        list.appendChild(item)
    }
}

function clearInputs()
{
    document.getElementById("workoutName").value = ""
    document.getElementById("exersizeName").value = ""
    document.getElementById("setNum").value = ""
    document.getElementById("repNum").value = ""
    exercises = []
    renderExercises()
}

function clearExerciseInputs()
{
    document.getElementById("exersizeName").value = ""
    document.getElementById("setNum").value = ""
    document.getElementById("repNum").value = ""
}

function inputVal(input,condition)
{
    if (input === condition)
    {
        return false
    }
    else 
    {
        return true
    }
}

