from flask import Flask, request, jsonify
import requests
import openai
import os

app = Flask(__name__)

# Openai api, Telegram token, Telegram chat id
openai.api_key = os.getenv('OPENAI_API_KEY')
telegram_token = os.getenv('TELEGRAM_TOKEN')
telegram_chat_id = os.getenv('TELEGRAM_CHAT_ID')

@app.route('/zabbix-webhook', methods=['POST'])
def zabbix_webhook():
    try:
        data = request.json
        message = data.get('message', '')
        event_id = data.get('event_id', '')
        trigger_status = data.get('trigger_status', '')

        prompt = (f"Alert Message: {message}\n"
                  f"Status: {trigger_status}\n"
                  f"Event ID: {event_id}\n\n"
                  " Can you provide me with a solution recommendation regarding this alert from Zabbix? ")

        info = (f"Alert Message:\n{message}\n")

        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1000
        )
        answer = response.choices[0].message['content'].strip()

        telegram_message = f"Zabbix warning:\n\n{info}\n\nAI:\n\n{answer}"
        telegram_url = f"https://api.telegram.org/bot{telegram_token}/sendMessage"
        payload = {'chat_id': telegram_chat_id, 'text': telegram_message}

        telegram_response = requests.post(telegram_url, json=payload)

        if telegram_response.status_code == 200:
            return jsonify({"status": "success"}), 200
        else:
            return jsonify({"status": "failed to send to Telegram"}), 500

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
