const worldState = {
    momentum: 0,
    energy: 3,
    flags: {
      labUnlocked: false,
      citySeen: false,
      ticketRunActive: false,
      encounterCount: 0
    }
  };
  
  function makeScene(id, location, text, choices) {
    return { id, location, text, choices };
  }
  
  /* -----------------------
     SCENE REGISTRY (100-ish nodes)
  ------------------------ */
  
  const scenes = {};
  
  /* -------- HUB -------- */
  
  scenes.city_0 = makeScene(
    "city_0",
    "City District",
    `
  You step into the City District.
  
  The world feels slightly misaligned today.
  `,
    [
      { text: "Walk forward", next: "city_1" },
      { text: "Enter the Lab", next: "lab_0" }
    ]
  );
  
  /* -------- CITY CHAIN (30 scenes) -------- */
  
  for (let i = 1; i <= 30; i++) {
    scenes[`city_${i}`] = makeScene(
      `city_${i}`,
      "City District",
      `
  You continue through the city.
  
  ${i % 7 === 0 ? "Something about the environment feels different." : "The city flows around you normally."}
  `,
      [
        { text: "Keep walking", next: i < 30 ? `city_${i + 1}` : "ticket_0" },
        { text: "Return", next: "city_0" },
        { text: "Enter Lab", next: "lab_0" }
      ]
    );
  }
  
  /* -------- LAB CHAIN (20 scenes) -------- */
  
  scenes.lab_0 = makeScene(
    "lab_0",
    "Game Dev Lab",
    `
  You open the prototype.
  
  It is simple, but responsive.
  `,
    [
      { text: "Run system", next: "encounter_0" },
      { text: "Modify system", next: "lab_1" }
    ]
  );
  
  for (let i = 1; i <= 20; i++) {
    scenes[`lab_${i}`] = makeScene(
      `lab_${i}`,
      "Game Dev Lab",
      `
  You adjust the system.
  
  Iteration ${i} changes something subtle in behavior.
  `,
      [
        { text: "Test system", next: "encounter_0" },
        { text: "Return to city", next: "city_0" },
        { text: "Continue editing", next: i < 20 ? `lab_${i + 1}` : "lab_final" }
      ]
    );
  }
  
  scenes.lab_final = makeScene(
    "lab_final",
    "Game Dev Lab",
    `
  The system feels stable now.
  
  Not finished. But coherent.
  `,
    [
      { text: "Return to city", next: "city_0" }
    ]
  );
  
  /* -------- ENCOUNTERS (10 nodes reused via counter) -------- */
  
  scenes.encounter_0 = makeScene(
    "encounter_0",
    "System Encounter",
    `
  Something unexpected happens.
  
  The system behaves differently than intended.
  `,
    [
      { text: "Stabilize", next: "lab_1" },
      { text: "Observe", next: "encounter_1" }
    ]
  );
  
  for (let i = 1; i <= 9; i++) {
    scenes[`encounter_${i}`] = makeScene(
      `encounter_${i}`,
      "System Encounter",
      `
  Encounter ${i} emerges.
  
  A deviation in expected behavior is detected.
  `,
      [
        { text: "Stabilize", next: "lab_1" },
        { text: "Observe", next: i < 9 ? `encounter_${i + 1}` : "ticket_0" }
      ]
    );
  }
  
  /* -------- TICKET / REAL WORLD CHAIN (20 scenes) -------- */
  
  scenes.ticket_0 = makeScene(
    "ticket_0",
    "City District",
    `
  You begin moving through public space intentionally.
  
  This is no longer passive observation.
  `,
    [
      { text: "Continue interaction", next: "ticket_1" }
    ]
  );
  
  for (let i = 1; i <= 20; i++) {
    scenes[`ticket_${i}`] = makeScene(
      `ticket_${i}`,
      "City District",
      `
  Public interaction phase ${i}.
  
  Reactions vary. Some connect. Some do not.
  `,
      [
        { text: "Continue", next: i < 20 ? `ticket_${i + 1}` : "reflection_0" }
      ]
    );
  }
  
  /* -------- REFLECTION CHAIN (10 scenes) -------- */
  
  scenes.reflection_0 = makeScene(
    "reflection_0",
    "Reflection Layer",
    `
  You pause.
  
  The system, the city, and your actions feel interconnected.
  `,
    [
      { text: "Return to Lab", next: "lab_1" },
      { text: "Restart cycle", next: "city_0" }
    ]
  );
  
  for (let i = 1; i <= 10; i++) {
    scenes[`reflection_${i}`] = makeScene(
      `reflection_${i}`,
      "Reflection Layer",
      `
  Reflection deepens.
  
  Layer ${i} reveals patterns in the system.
  `,
      [
        { text: "Return to Lab", next: "lab_1" },
        { text: "Restart", next: "city_0" }
      ]
    );
  }
  
  /* -----------------------
     ENGINE
  ------------------------ */
  
  let currentScene = "city_0";
  
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