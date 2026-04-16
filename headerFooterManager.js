class SpecialFooter extends HTMLElement
{
    connectedCallback()
    {
        this.innerHTML = 
        `<footer>
        <a href="workouts.html"><button id="Workouts">Workouts</button></a>
        <a href="index.php"><button id="home">Home</button></a>
        <a href="stats.html"><button id="stats">Stats</button></a>
        </footer>`
    }
}

class SpecialHeader extends HTMLElement
{
    connectedCallback()
    {
        this.innerHTML = 
        `<header>
        <h1>GymTracker</h1>
        </header>`
    }

}

customElements.define(`special-footer`,SpecialFooter)
customElements.define(`special-header`,SpecialHeader)
