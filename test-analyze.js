fetch("http://localhost:3000/api/analyze", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    resumeText: "John Doe. Software Engineer at Google. Skills: React, Node.js, Next.js. Improved performance by 20%.",
    roles: ["Software Engineer"],
    companies: ["Google"]
  })
})
.then(res => res.json())
.then(data => console.log(JSON.stringify(data, null, 2)))
.catch(err => console.error(err));
