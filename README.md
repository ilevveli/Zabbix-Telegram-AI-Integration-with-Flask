# Zabbix-Telegram-AI-Integration-with-Flask
In this project, I created an automated system that integrates Zabbix monitoring alerts with Telegram and OpenAI's GPT-4 via a Flask server. This setup allows Zabbix alerts to trigger AI-generated responses that are sent directly to a Telegram chat, providing smart recommendations based on alert messages.
Project Overview
•	Technology Stack:
o	Zabbix: For system monitoring and alert management.
o	Flask: As the backend server to handle Zabbix's webhook alerts.
o	OpenAI API: To generate intelligent responses to alerts.
o	Telegram API: To forward alerts and AI suggestions to a specific chat.
o	Docker (optional): To simplify deployment using python:3.8-slim.
Requirements
To set up this system, you will need:
•	Python 3.8
•	Flask==2.3.2
•	requests==2.31.0
•	openai==0.27.8
Make sure to have the OpenAI API key, Telegram bot token, and Telegram chat ID for the integration.

1. Setting Up the Flask Server
The Flask server will act as a webhook endpoint, receiving Zabbix alerts, processing them via OpenAI's API, and forwarding the results to a Telegram chat.

2. Configuring Zabbix Webhook
To trigger alerts from Zabbix to your Flask server, create a new media type in Zabbix using a webhook:
•	Type: Webhook
•	Parameters:
o	EventId: {EVENT.ID}
o	Message: {ALERT.MESSAGE}
o	TriggerStatus: {TRIGGER.STATUS}
o	WebhookUrl: http://<your-flask-server-ip>:5000/zabbix-webhook

3. How It Works
1.	Zabbix triggers an alert: When an issue arises, Zabbix sends an alert to the Flask server via the webhook.
2.	Flask server processes the alert: The server receives the alert, formats a prompt for OpenAI’s GPT-4 model, and asks for recommendations or explanations.
3.	AI responds: GPT-4 provides a concise recommendation related to the alert.
4.	Telegram notification: Flask sends the original Zabbix alert message along with GPT-4’s response to a designated Telegram chat.
4. Deployment (Optional: Docker)
To containerize and deploy the Flask server, you can create a simple Docker setup:
Dockerfile:
FROM python:3.8-slim
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
requirements.txt:
Flask==2.3.2
requests==2.31.0
openai==0.27.8
Conclusion
This project demonstrates how you can integrate powerful AI models into your monitoring workflows using Zabbix and Telegram. The system provides real-time, smart recommendations directly within your communication channels, making alert management more efficient and insightful.




