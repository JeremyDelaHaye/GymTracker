let currentWorkout;
let charts = { weight: null, reps: null, sets: null }

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
        bar.innerHTML = "<option value=''>Select Workout</option>"

        for (let i = 0; i < result.length; i++)
        {
            let option = document.createElement("option")
            option.value = result[i].id
            option.textContent = result[i].name
            bar.appendChild(option)
        }
    });
}

function loadExerciseDropdown(workoutId)
{
    if (workoutId === '') return
    currentWorkout = workoutId

    fetch('api.php',
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({action: 'get_exersizes', workout_id: workoutId})
    })
    .then(response => response.json())
    .then(result =>
    {
        let menu = document.getElementById("exerciseDropdownMenu")
        menu.innerHTML = "<option value=''>Select Exercise</option>"

        for (let i = 0; i < result.length; i++)
        {
            let option = document.createElement("option")
            option.value = result[i].id
            option.textContent = result[i].name
            menu.appendChild(option)
        }
    });
}

function loadGraphs(exerciseId)
{
    fetch('api.php',
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({action: 'get_exercise_history', exercise_id: exerciseId})
    })
    .then(response => response.json())
    .then(result =>
    {
        let dates = result.map(r => r.date)
        let weights = result.map(r => r.weight)
        let reps = result.map(r => r.rep_number)
        let sets = result.map(r => r.set_number)

        document.getElementById("graphContainer").classList.remove("hidden")

        renderChart("weightChart", "weight", dates, weights, "Weight (kg)", "#4e9af1")
        renderChart("repsChart", "reps", dates, reps, "Reps", "#f1c84e")
        renderChart("setsChart", "sets", dates, sets, "Sets", "#4ef1a0")
    });
}

function renderChart(id, chartKey, labels, data, label, colour)
{
    if (charts[chartKey]) charts[chartKey].destroy()

    charts[chartKey] = new Chart(document.getElementById(id),
    {
        type: 'line',
        data:
        {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                borderColor: colour,
                backgroundColor: colour + "33",
                tension: 0.3,
                fill: true
            }]
        },
        options:
        {
            plugins: { legend: { labels: { color: 'white' } } },
            scales:
            {
                x: { ticks: { color: 'white' }, grid: { color: '#ffffff22' } },
                y: { ticks: { color: 'white' }, grid: { color: '#ffffff22' } }
            }
        }
    })
}

document.getElementById("workoutBar").addEventListener("change", function()
{
    loadExerciseDropdown(this.value)
})

document.getElementById("exerciseDropdownMenu").addEventListener("change", function()
{
    if (this.value) loadGraphs(this.value)
})

renderWorkoutBar()