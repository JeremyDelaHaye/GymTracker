let currentWorkout;
let sessionExercise = []

function renderWorkoutBar()
{
    fetch('api.php',
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({action: 'get_workouts'})
    })
    .then(response => response.json())
    .then(result =>
    {
        let bar = document.getElementById("workoutBar")
        bar.innerHTML = ""

        for (let i = 0; i < result.length; i++)
        {
            let btn = document.createElement("button")
            btn.textContent = result[i].name
            btn.onclick = function()
            {
                loadWorkout(result[i].id)
                currentWorkout = result[i].id
            }
            bar.appendChild(btn)
        }
    });
}

function loadWorkout(id)
{
    fetch('api.php',
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({action: 'get_exersizes', workout_id: id})
    })
    .then(response => response.json())
    .then(result =>
    {
        let container = document.getElementById("checklistContainer")
        container.innerHTML = ""

        for (let i = 0; i < result.length; i++)
        {
            let item = document.createElement("div")
            item.className = "exercise-card"
            item.innerHTML = `
            <span class="exercise-name">${result[i].name}</span>
            <div class="exercise-inputs">
                <input type="number" id="sets${i}" value="${result[i].planned_sets}" min="1" class="small-input">
                <label>sets</label>
                <input type="number" id="reps${i}" value="${result[i].planned_reps}" min="1" class="small-input">
                <label>reps</label>
                <input type="number" id="weight${i}" placeholder="kg" min="0" class="small-input">
                <label>kg</label>
            </div>`
            

            let checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.id = `exercise${i}`
            checkbox.onclick = function()
            {
                if (checkbox.checked)
                {
                    let setNum = document.getElementById(`sets${i}`).value
                    let reps = document.getElementById(`reps${i}`).value
                    let weight = document.getElementById(`weight${i}`).value

                    if (setNum === '' || reps === '' || weight === '')
                    {
                        alert('Please fill in sets, reps and weight before checking off')
                        checkbox.checked = false
                    }
                    else
                    {
                        addExercise(result[i].id, setNum, reps, weight)
                    }
                }
            }

            item.prepend(checkbox)
            container.appendChild(item)
        }
    });
}

function saveSession()
{
    fetch('api.php',
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify
        ({
            action: 'save_session',
            workout_id: currentWorkout,
        })
    })
    .then(response => response.text())
    .then(result =>
    {
        let sessionId = parseInt(result)

        for (let i = 0; i < sessionExercise.length; i++)
        {
            fetch('api.php',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify
                ({
                    action: 'save_session_set',
                    session_id: sessionId,
                    exercise_id: sessionExercise[i].id,
                    set_number: sessionExercise[i].setNum,
                    rep_number: sessionExercise[i].reps,
                    weight: sessionExercise[i].weight,
                    completed: sessionExercise[i].completed
                })
            })
            .then(response => response.text())
            .then(result => console.log(result))
        }
    })
}

function addExercise(id, setNum, reps, weight)
{
    let exercise = 
    {
        id: id,
        setNum: setNum,
        reps: reps,
        weight: weight,
        completed: true 
    }

    sessionExercise.push(exercise)
}
renderWorkoutBar()