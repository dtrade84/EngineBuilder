const supabase = supabase.createClient(
  "https://olblfcfjrscgsizdsxxz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sYmxmY2ZqcnNjZ3NpemRzeHh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MjEzNTYsImV4cCI6MjA4OTQ5NzM1Nn0.zRrs3dr1MCYAA-x2Zn4mNZz3r2VlGNU21XyYQ9L0osc"
);

let total = 0;
let selectedEngine = "ls3";

async function loadEngines() {
  const { data } = await supabase.from("engines").select("*");

  const select = document.getElementById("engineSelect");
  select.innerHTML = "";

  data.forEach(engine => {
    const option = document.createElement("option");
    option.value = engine.id;
    option.text = engine.name;
    select.appendChild(option);
  });

  selectedEngine = data[0].id;
  loadParts();
}

async function loadParts() {
  const { data } = await supabase.from("parts").select("*");

  const container = document.getElementById("partsList");
  container.innerHTML = "";

  data.forEach(part => {
    const btn = document.createElement("button");
    btn.innerText = part.name + " ($" + part.price + ")";

    if (!part.compatible_engines.includes(selectedEngine)) {
      btn.disabled = true;
      btn.style.background = "red";
    }

    btn.onclick = () => {
      total += part.price;
      document.getElementById("total").innerText = total;
    };

    container.appendChild(btn);
  });
}

document.getElementById("engineSelect").onchange = (e) => {
  selectedEngine = e.target.value;
  total = 0;
  document.getElementById("total").innerText = 0;
  loadParts();
};

loadEngines();