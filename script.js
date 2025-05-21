
let client;

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (username === "TCC_CJ" && password === "CJ_IFPB") {
    document.getElementById("login").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    startMQTT();
  } else {
    document.getElementById("login-error").textContent = "Usuário ou senha inválidos!";
  }
}

function startMQTT() {
  client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt");
  client.on("connect", function () {
    client.subscribe("data");
  });

  client.on("message", function (topic, message) {
    if (topic === "data") {
      const rpm = parseFloat(message.toString());
      updateChart(rpm);
    }
  });
}

function sendCommand(command) {
  client.publish("Acionamento", command);
  document.getElementById("motor-img").src = command === "ON" ? "motor_spin.gif" : "motor_static.png";
}

function sendSetpoint() {
  const setpoint = document.getElementById("setpoint").value;
  client.publish("IFPBCajazeiras/setpoint", setpoint);
}

let rpmChart = new Chart(document.getElementById("rpmChart").getContext("2d"), {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "Velocidade (RPM)",
      borderColor: "lime",
      data: [],
      fill: false,
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'Tempo' }},
      y: { title: { display: true, text: 'RPM' }}
    }
  }
});

function updateChart(rpm) {
  const chart = rpmChart;
  const time = new Date().toLocaleTimeString();
  chart.data.labels.push(time);
  chart.data.datasets[0].data.push(rpm);
  if (chart.data.labels.length > 20) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
  }
  chart.update();
}
