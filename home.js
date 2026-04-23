let currentWorkout;
let sessionExercise = []

function renderDropDown()
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
        let menu = document.getElementById("dropdownMenu")
        menu.innerHTML = ""

        for (let i = 0; i < result.length; i++)
        {
            let btn = document.createElement("button")
            btn.textContent = result[i].name
            btn.onclick = function()
            {
                loadWorkout(result[i].id)
                currentWorkout = results[i].id
            }
            menu.appendChild(btn)
        }

        menu.classList.toggle("hidden")
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
            item.innerHTML = `
            <input type="checkbox" id="exercise${i}">


            <label for="exercise${i}">${result[i].name}</label>
            <input type="number" id="sets${i}" value="${result[i].planned_sets}" min="1" class="small-input">
            <label>sets</label>
            <input type="number" id="reps${i}" value="${result[i].planned_reps}" min="1" class="small-input">
            <label>reps</label>
            <input type="number" id="weight${i}" placeholder="kg" min="0" class="small-input">
            `
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
    then(response => response.json())
    .then(result =>
    {
        let sessionId = parseInt(result)
        for (let i = 0; i < sessionExercise.length;i++)
        {
            fetch('api.php',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify
                ({
                    action: 'save_session_set',
                    sessionId: sessionId,
                    exercise_id: sessionExercise[i].id,
                    set_number: sessionExercise[i].setNum,
                    weight: sessionExercise[i].weight,
                    completed: sessionExercise[i].completed
                })
            })
        }
    })
}

function addExersize()
{
    //remeber object struct
    let exercise = 
    {
        sessionId: '',
        id:'',
        setNum:'',
        weight:'',
        completed: true 
    }
}


