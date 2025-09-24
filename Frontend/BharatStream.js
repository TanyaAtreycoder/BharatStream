// ---------------- Hazard Form ----------------
document.getElementById("hazardForm").addEventListener("submit", function(e){
  e.preventDefault();
  const name = document.getElementById("hazardName").value.trim();
  const loc = document.getElementById("hazardLocation").value.trim();
  const type = document.getElementById("hazardType").value;
  const desc = document.getElementById("hazardDesc").value.trim();
  const file = document.getElementById("hazardFile").files[0];

  if(!file){ alert("Please upload a photo/video!"); return; }

  const hazards = JSON.parse(localStorage.getItem("hazards") || "[]");
  if(hazards.some(h => h.name===name && h.loc===loc && h.desc===desc)){ alert("You have already submitted this hazard report!"); return; }
  hazards.push({name, loc, type, desc});
  localStorage.setItem("hazards", JSON.stringify(hazards));

  const table = document.getElementById("hazardTable").querySelector("tbody");
  const row = table.insertRow();
  row.insertCell(0).textContent = name;
  row.insertCell(1).textContent = loc;
  row.insertCell(2).textContent = type;
  row.insertCell(3).textContent = desc;
  addPin(loc);
  this.reset();
});

// ---------------- Cleanup Form ----------------
document.getElementById("cleanupForm").addEventListener("submit", function(e){
  e.preventDefault();
  const name = document.getElementById("cleanupName").value.trim();
  const loc = document.getElementById("cleanupLocation").value.trim();
  const type = document.getElementById("cleanupType").value;
  const desc = document.getElementById("cleanupDesc").value.trim();
  const file = document.getElementById("cleanupFile").files[0];

  if(!file){ alert("Please upload a photo/video!"); return; }

  const cleanups = JSON.parse(localStorage.getItem("cleanups") || "[]");
  if(cleanups.some(c => c.name===name && c.loc===loc && c.desc===desc)){ alert("You have already submitted this cleanup report!"); return; }
  cleanups.push({name, loc, type, desc});
  localStorage.setItem("cleanups", JSON.stringify(cleanups));

  const table = document.getElementById("cleanupTable").querySelector("tbody");
  const row = table.insertRow();
  row.insertCell(0).textContent = name;
  row.insertCell(1).textContent = loc;
  row.insertCell(2).textContent = type;
  row.insertCell(3).textContent = desc;
  addPin(loc);
  this.reset();
});

// ---------------- Registration Form ----------------
document.getElementById("registerForm").addEventListener("submit", function(e){
  e.preventDefault();
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const phone = document.getElementById("regPhone").value.trim();
  const region = document.getElementById("regRegion").value.trim();
  const type = document.getElementById("regType").value;

  const regs = JSON.parse(localStorage.getItem("registrations") || "[]");
  if(regs.some(r => r.email===email || r.phone===phone)){ alert("This user is already registered!"); return; }
  regs.push({name,email,phone,region,type});
  localStorage.setItem("registrations", JSON.stringify(regs));

  const table = document.getElementById("registerTable").querySelector("tbody");
  const row = table.insertRow();
  row.insertCell(0).textContent = name;
  row.insertCell(1).textContent = email;
  row.insertCell(2).textContent = phone;
  row.insertCell(3).textContent = region;
  row.insertCell(4).textContent = type;
  this.reset();
});

// ---------------- Map Pins ----------------
function addPin(location){
  const mapPins = document.getElementById("mapPins");
  const pin = document.createElement("div");
  pin.className = "pin";
  pin.style.top = Math.random()*90 + "%";
  pin.style.left = Math.random()*90 + "%";
  mapPins.appendChild(pin);
}

// ---------------- Location Auto-suggest ----------------
const hazardLocation = document.getElementById("hazardLocation");
const cleanupLocation = document.getElementById("cleanupLocation");
const regRegion = document.getElementById("regRegion");

const states = ["Gujarat","Maharashtra","Tamil Nadu","Karnataka","West Bengal","Delhi","Rajasthan"];

[hazardLocation, cleanupLocation, regRegion].forEach(input=>{
  input.addEventListener("input", function(){
    const val = this.value.toLowerCase();
    const match = states.find(s => s.toLowerCase().startsWith(val));
    if(match) this.value = match;
  });
});
