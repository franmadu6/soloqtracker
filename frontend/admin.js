function login(){
if(user.value==="admin123"&&pass.value==="admin123")
panel.style.display="block";
}
function add(){
fetch("https://soloqtracker.onrender.com",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
summoner:summoner.value,
puuid:puuid.value,
region:"euw1"
})
});
}