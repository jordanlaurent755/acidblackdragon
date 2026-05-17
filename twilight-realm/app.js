const worldState = {
    momentum: 0
  };
  
  const scenes = {
    city: {
      location: "City District",
      text: `
  You step into the City District after work.
  The air feels slightly heavier than usual.
  
  Something in you is still deciding whether to continue or stop.
      `,
      choices: [
        {
          text: "Enter the Game Dev Lab",
          next: "lab"
        },
        {
          text: "Keep walking through the city",
          next: "city_walk"
        }
      ]
    },
  
    lab: {
      location: "Game Dev Lab",
      text: `
  You open your prototype.
  
  It still feels unstable… but alive.
  Something reacts differently than you expect.
      `,
      choices: [
        {
          text: "Try to fix it",
          next: "city"
        },
        {
          text: "Observe what happens",
          next: "city"
        }
      ]
    },
  
    city_walk: {
      location: "City District",
      text: `
  You keep walking.
  Nothing dramatic happens.
  
  But the moment still feels like a decision.
      `,
      choices: [
        {
          text: "Return to City Start",
          next: "city"
        }
      ]
    }
  };
  
  let currentScene = "city";
  
  function renderScene() {
    const scene = scenes[currentScene];
  
    document.getElementById("location").innerText = scene.location;
    document.getElementById("sceneText").innerText = scene.text;
  
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";
  
    scene.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.innerText = choice.text;
      btn.onclick = () => {
        currentScene = choice.next;
        renderScene();
      };
      choicesDiv.appendChild(btn);
    });
  }
  
  renderScene();