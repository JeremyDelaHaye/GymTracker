function testApi()
{
    fetch('api.php',
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({action: 'get_workouts'})
    }
    )   
        .then(response => response.json())
        .then(result => 
        {
            for (let i = 0; i< result.length; i++)
            {
                console.log(result[i].name)
            }
        });
}