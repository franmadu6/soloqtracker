fetch("https://soloqtracker.onrender.com")
.then(r=>r.json()).then(data=>{
const tbody=document.querySelector("tbody");
data.forEach((p,i)=>{
tbody.innerHTML+=`<tr>
<td>${i+1}</td><td>${p.summoner}</td>
<td>${p.tier} ${p.rank}</td><td>${p.lp}</td>
<td>${p.wins}</td><td>${p.losses}</td><td>${p.winrate}%</td>
</tr>`;
});
});