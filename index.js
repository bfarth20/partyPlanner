// almost identical build to the guided practice

const API =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2504-FTB-ET-WEB-FT/events";

// State
let parties = [];
let selectedParty;

//updates state with all parties from the API
async function getParties() {
  try {
    const response = await fetch(API);
    const json = await response.json();
    parties = json.data;
    render();
  } catch (error) {
    console.error("Failed to fetch parties:", error);
  }
}

//Updates state with a single party from the API
async function getParty(id) {
  try {
    const response = await fetch(`${API}/${id}`);
    const json = await response.json();
    selectedParty = json.data;
    render();
  } catch (error) {
    console.error("Failed to fetch party details:", error);
  }
}

//Components

//party name that shows the name, ID, date, description, and location of selected party

function PartyListItem(party) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = "#selected";
  a.textContent = party.name;

  a.addEventListener("click", () => {
    getParty(party.id);
  });

  li.appendChild(a);
  return li;
}

//A list of names of all the Parties

function PartyList() {
  const ul = document.createElement("ul");
  ul.classList.add("party-list");

  parties.forEach((party) => {
    const li = PartyListItem(party);
    ul.appendChild(li);
  });

  return ul;
}
// Detailed information about the selected party

function PartyDetails() {
  if (!selectedParty) {
    const p = document.createElement("p");
    p.textContent = "Please select a party to view details.";
    return p;
  }

  const section = document.createElement("section");
  section.classList.add("party");

  const heading = document.createElement("h3");
  heading.textContent = `${selectedParty.name}`;

  const id = document.createElement("p");
  id.textContent = `ID: ${selectedParty.id}`;

  const date = document.createElement("p");
  date.textContent = `Date: ${new Date(selectedParty.date).toLocaleString()}`;

  const description = document.createElement("p");
  description.textContent = selectedParty.description;

  const location = document.createElement("p");
  location.textContent = `Location: ${selectedParty.location}`;

  section.appendChild(heading);
  section.appendChild(id);
  section.appendChild(date);
  section.appendChild(description);
  section.appendChild(location);

  return section;
}

//render the above functions
function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  // Main Title
  const title = document.createElement("h1");
  title.textContent = "Party Planner";
  app.appendChild(title);

  // Upcoming Parties Section
  const listHeader = document.createElement("h2");
  listHeader.textContent = "Upcoming Parties";
  app.appendChild(listHeader);

  const ul = PartyList(); // Renders list of party <li> items
  app.appendChild(ul);

  // Party Details Section
  const detailHeader = document.createElement("h2");
  detailHeader.textContent = "Party Details";
  app.appendChild(detailHeader);

  const details = PartyDetails(); // Shows selected party info
  app.appendChild(details);
}
getParties();
