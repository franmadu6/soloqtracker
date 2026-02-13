function login(){
if(user.value==="admin123"&&pass.value==="admin123")
panel.style.display="block";
}
function add() {
  fetch("https://soloqtracker.onrender.com/admin/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      summoner: document.getElementById("summoner").value,
      tagLine: document.getElementById("tag").value,
      region: "euw1"
    })
  })
    .then(r => r.json())
    .then(res => {
      document.getElementById("msg").innerText =
        res.ok ? "Jugador añadido ✅" : res.error;
    });
}
