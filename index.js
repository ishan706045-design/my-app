const express = require("express")

const app = express();
require('dotenv').config()

const port = process.env.PORT ?? 3000;

const env = process.env;


app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DevOps Deployment Architecture</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <style>
    body {
      margin: 0;
      font-family: Inter, system-ui, Arial;
      background: linear-gradient(180deg, #f1f5ff, #ffffff);
      color: #0f172a;
    }

    .wrapper {
      max-width: 1300px;
      margin: auto;
      padding: 50px 20px;
    }

    .header {
      text-align: center;
      margin-bottom: 60px;
    }

    .header h1 {
      font-size: 48px;
      margin: 0;
      letter-spacing: -1px;
      background: linear-gradient(90deg, #2563eb, #7c3aed);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .header p {
      margin-top: 14px;
      font-size: 17px;
      color: #475569;
    }

    /* FLOW ROW */
    .flow {
      display: grid;
      grid-template-columns: repeat(13, 1fr);
      align-items: center;
      gap: 12px;
      margin-bottom: 70px;
    }

    .node {
      grid-column: span 2;
      background: #ffffff;
      border-radius: 20px;
      padding: 20px 10px 22px;
      text-align: center;
      box-shadow: 0 20px 45px rgba(15, 23, 42, 0.12);
      border: 1px solid #e5e7eb;
    }

    .node img {
      width: 42px;
      height: 42px;
      margin-bottom: 10px;
    }

    .node h3 {
      margin: 0;
      font-size: 14px;
      font-weight: 800;
    }

    .node p {
      margin: 4px 0 0;
      font-size: 12px;
      color: #64748b;
    }

    .git img { filter: grayscale(100%); }
    .jenkins { background: linear-gradient(180deg, #fff5f5, #ffffff); }
    .docker { background: linear-gradient(180deg, #eff6ff, #ffffff); }
    .helm { background: linear-gradient(180deg, #f5f3ff, #ffffff); }
    .gke { background: linear-gradient(180deg, #ecfeff, #ffffff); }
    .ingress { background: linear-gradient(180deg, #f0fdf4, #ffffff); }
    .users { background: linear-gradient(180deg, #f8fafc, #ffffff); }

    .arrow {
      grid-column: span 1;
      text-align: center;
      font-size: 26px;
      font-weight: 900;
      color: #2563eb;
    }

    /* STACK GRID */
    .stack {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 26px;
    }

    .stack-card {
      background: #ffffff;
      border-radius: 22px;
      padding: 26px;
      box-shadow: 0 20px 40px rgba(15, 23, 42, 0.1);
      border: 1px solid #e5e7eb;
    }

    .stack-card h4 {
      margin: 0 0 10px;
      font-size: 16px;
      font-weight: 800;
    }

    .stack-card p {
      margin: 0;
      font-size: 14px;
      color: #475569;
      line-height: 1.6;
    }

    .footer {
      margin-top: 60px;
      text-align: center;
      font-size: 14px;
      color: #64748b;
    }

    .footer b {
      color: #0f172a;
    }

    @media (max-width: 900px) {
      .flow {
        grid-template-columns: 1fr;
      }

      .arrow {
        transform: rotate(90deg);
      }

      .node {
        grid-column: span 1;
      }
    }
  </style>
</head>

<body>
  <div class="wrapper">

    <div class="header">
  <h1>Production-Grade DevOps CI/CD Architecture</h1>
  <p style="font-weight:700; color:#0f172a; margin-top:10px;">
    Aayush Chauhan
  </p>
  <p style="margin-top:6px;">
    End-to-End Automated Deployment on Google Cloud using Jenkins, Docker, Helm & GKE
  </p>
</div>


    <!-- FLOW DIAGRAM -->
    <div class="flow">

      <div class="node git">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" />
        <h3>Git</h3>
        <p>Source Code</p>
      </div>

      <div class="arrow">➜</div>

      <div class="node jenkins">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" />
        <h3>Jenkins</h3>
        <p>CI Pipeline</p>
      </div>

      <div class="arrow">➜</div>

      <div class="node docker">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" />
        <h3>Docker</h3>
        <p>Build & Push</p>
      </div>

      <div class="arrow">➜</div>

      <div class="node helm">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/helm/helm-original.svg" />
        <h3>Helm</h3>
        <p>Deploy Charts</p>
      </div>

      <div class="arrow">➜</div>

      <div class="node gke">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" />
        <h3>GKE</h3>
        <p>Kubernetes Cluster</p>
      </div>

      <div class="arrow">➜</div>

      <div class="node ingress">
        <img src="https://static.thenounproject.com/png/1661629-200.png" />
        <h3>Ingress</h3>
        <p>Traffic Routing</p>
      </div>

      <div class="arrow">➜</div>

      <div class="node users">
        <img src="https://static.thenounproject.com/png/2366465-200.png" />
        <h3>Users</h3>
        <p>Live Traffic</p>
      </div>

    </div>

    <!-- STACK DETAILS -->
    <div class="stack">

      <div class="stack-card">
        <h4>🔁 CI/CD Automation</h4>
        <p>Automated Jenkins pipelines trigger on Git commit and deploy directly to GKE using Helm.</p>
      </div>

      <div class="stack-card">
        <h4>📦 Containerization</h4>
        <p>Docker images are built and pushed to Google Artifact Registry.</p>
      </div>

      <div class="stack-card">
        <h4>☁️ Cloud & Orchestration</h4>
        <p>Google Kubernetes Engine manages workloads with rolling updates and health checks.</p>
      </div>

      <div class="stack-card">
        <h4>🌐 Networking</h4>
        <p>Ingress controller with external Load Balancer exposes the application.</p>
      </div>

      <div class="stack-card">
        <h4>📈 Auto Scaling</h4>
        <p>Horizontal Pod Autoscaler dynamically scales pods based on load.</p>
      </div>

      <div class="stack-card">
        <h4>🔐 Security</h4>
        <p>Secrets stored in Google Secret Manager and synced to Kubernetes using controllers.</p>
      </div>

    </div>

    <div class="footer">
      🚀 Built & Deployed by <b>Aayush Chauhan</b>
    </div>

  </div>
</body>
</html>
  `);
});

app.get("/health",(req,res)=>{
    res.status(200).json({success:true,message:"app health was good"})
})

app.get("/dev-changes",(req,res)=>{
    res.status(200).json({success:true,message:"Changes on the dev branch for staging env"})
})


app.get('/country/:name', async (req, res, next) => {
  try {
    const name = encodeURIComponent(req.params.name);
    const resp = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const data = await resp.json();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
});


app.listen(port,()=>{
    console.log(`app is listening on port ${process.env.PORT}`)
})
